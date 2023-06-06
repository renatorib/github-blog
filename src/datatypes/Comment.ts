import { gql } from "code-tag";
import { createDataType } from "../core/datatype";
import { Comment_IssueCommentFragment } from "../types";
import { Author } from "./Author";
import { Reactions } from "./Reactions";

type Comment = {
  id: string;
  body: string;
  createdAt: string;
  lastEditedAt: string | null;
  isMinimized: boolean;
  minimizedReason: string | null;
  author: typeof Author.Type;
  reactions: typeof Reactions.Type;
};

type CommentInput = Comment_IssueCommentFragment;

export const Comment = createDataType<CommentInput, Comment>({
  fragment: gql`
    fragment Comment_IssueComment on IssueComment {
      id
      body
      createdAt
      lastEditedAt
      isMinimized
      minimizedReason
      reactions {
        totalCount
      }
      reactionGroups {
        ...Reactions_ReactionGroup
      }
      author {
        ...Author_Actor
      }
    }
  `,
  translator: (issue) => {
    return {
      id: issue.id,
      body: issue.body,
      createdAt: issue.createdAt.toString(),
      lastEditedAt: issue.lastEditedAt?.toString() ?? null,
      isMinimized: issue.isMinimized,
      minimizedReason: issue.minimizedReason ?? null,
      author: Author.translate(issue.author),
      reactions: Reactions.translate(issue.reactionGroups),
      totalReactions: issue.reactions.totalCount,
    };
  },
});
