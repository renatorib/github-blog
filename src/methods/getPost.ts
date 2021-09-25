import { gql } from "graphql-request";
import type { Unwrap } from "../types";
import type { GithubBlog } from "../github-blog";
import { Post } from "../datatypes/Post";
import { GithubQueryParams } from "../utils/github-query";

gql`
  query GetPost($query: String!) {
    search(first: 1, type: ISSUE, query: $query) {
      nodes {
        ... on Issue {
          ...Post_Issue
        }
      }
    }
  }
`;

export type GetPostParams = {
  query?: GithubQueryParams;
};

export const getPost = (blog: GithubBlog) => async (params: GetPostParams) => {
  const query = blog.buildQuery(params.query);
  const result = await blog.sdk.GetPost({ query });

  const nodes = result.search.nodes ?? [];
  const issue = nodes[0] as Extract<typeof nodes[number], { __typename: "Issue" }>;

  if (!issue) {
    return { post: null };
  }

  return {
    post: Post.translate(issue),
  };
};

export type GetPost = ReturnType<typeof getPost>;

export type GetPostResult = Unwrap<ReturnType<GetPost>>;
