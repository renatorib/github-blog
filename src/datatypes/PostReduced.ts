import { createDataType } from "../core/datatype";

import { Post } from "./Post";

type PostReducedType = Omit<typeof Post.Type, "body">;
type PostReducedInput = typeof Post.InputType;

export const PostReduced = createDataType<PostReducedInput, PostReducedType>({
  translator: (issue) => {
    const { body, ...post } = Post.translate(issue);
    return post;
  },
});
