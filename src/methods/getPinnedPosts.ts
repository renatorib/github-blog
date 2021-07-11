import { gql } from "graphql-request";
import type { GithubBlog } from "../github-blog";
import { isNonNull } from "../utils/func";
import { PostReduced } from "../datatypes/PostReduced";
import { Author } from "../datatypes/Author";

gql`
  query GetPinnedPosts($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      pinnedIssues(first: 3) {
        nodes {
          pinnedBy {
            ...Author_Actor
          }
          issue {
            ...Post_Issue
          }
        }
      }
    }
  }
`;

export const getPinnedPosts = (blog: GithubBlog) => async () => {
  const [owner, name] = blog.repo.split("/");

  const result = await blog.sdk.GetPinnedPosts({ owner, name });
  const nodes = result.repository?.pinnedIssues?.nodes ?? [];

  return {
    pinnedPosts: nodes.filter(isNonNull).map((pinnedIssue) => ({
      pinnedBy: Author.translate(pinnedIssue.pinnedBy),
      post: PostReduced.translate(pinnedIssue.issue),
    })),
  };
};
