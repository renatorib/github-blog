import { gql } from "code-tag";
import { createDataType } from "../core/datatype";
import { Post_IssueFragment } from "../types";
import { frontmatter } from "../utils/frontmatter";

import { Reactions } from "./Reactions";
import { Labels } from "./Labels";
import { Author } from "./Author";

type Post = {
  id: string;
  number: number;
  url: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  author: typeof Author.Type;
  body: string;
  frontmatter: { [key: string]: string };
  labels: typeof Labels.Type;
  reactions: typeof Reactions.Type;
  totalComments: number;
  totalReactions: number;
};

type PostInput = Post_IssueFragment;

export const Post = createDataType<PostInput, Post>({
  fragment: gql`
    fragment Post_Issue on Issue {
      id
      number
      url
      updatedAt
      createdAt
      title
      body
      author {
        ...Author_Actor
      }
      reactionGroups {
        ...Reactions_ReactionGroup
      }
      labels(first: 100) {
        ...Labels_LabelConnection
      }
      comments {
        totalCount
      }
      reactions {
        totalCount
      }
    }
  `,
  translator: (issue) => {
    const { data, content } = frontmatter(issue.body);

    return {
      id: issue.id,
      number: issue.number,
      url: issue.url,
      updatedAt: issue.updatedAt,
      createdAt: issue.createdAt,
      frontmatter: data,
      body: content,
      title: issue.title,
      author: Author.translate(issue.author),
      labels: Labels.translate(issue.labels),
      totalComments: issue.comments.totalCount,
      reactions: Reactions.translate(issue.reactionGroups),
      totalReactions: issue.reactions.totalCount,
    };
  },
});
