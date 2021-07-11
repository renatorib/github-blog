import { gql } from "graphql-request";
import { createDataType } from "../core/datatype";

import { Post } from "./Post";

type PostReduced = Omit<typeof Post.Type, "body">;
type PostReducedInput = typeof Post.InputType;

export const PostReduced = createDataType<PostReducedInput, PostReduced>({
  fragment: gql`
    fragment PostReduced_Issue on Issue {
      ...Post_Issue
    }
  `,
  translator: (issue) => {
    const { body, ...post } = Post.translate(issue);
    return post;
  },
});
