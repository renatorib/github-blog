import { gql } from "code-tag";
import type { GithubBlog } from "../github-blog";
import { Post } from "../datatypes/Post";
import { GithubQueryParams } from "../utils/github-query";

gql`
  query GetPost($query: String!) {
    search(first: 1, type: ISSUE, query: $query) {
      nodes {
        __typename
        ... on Issue {
          ...Post_Issue
        }
      }
    }
  }
`;

gql`
  query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        ...Post_Issue
      }
    }
  }
`;

gql`
  query GetPostById($id: ID!) {
    node(id: $id) {
      __typename
      ...Post_Issue
    }
  }
`;

export type GetPostParams = { id: string } | { number: number } | { query?: GithubQueryParams };

export const getPost = (blog: GithubBlog) => async (params: GetPostParams) => {
  if ("id" in params) {
    const result = await blog.sdk.GetPostById({ id: params.id });
    const issue = result.node?.__typename === "Issue" ? result.node : null;
    return { post: issue ? Post.translate(issue) : null };
  }

  if ("number" in params) {
    const [owner, name] = blog.repo.split("/");
    const result = await blog.sdk.GetPostByNumber({ number: params.number, owner, name });
    const issue = result.repository?.issue;
    return { post: issue ? Post.translate(issue) : null };
  }

  const query = blog.buildQuery(params.query);
  const result = await blog.sdk.GetPost({ query });
  const nodes = result.search.nodes ?? [];
  const issue = nodes[0] as Extract<typeof nodes[number], { __typename: "Issue" }>;
  return { post: issue ? Post.translate(issue) : null };
};

export type GetPost = ReturnType<typeof getPost>;

export type GetPostResult = Awaited<ReturnType<GetPost>>;
