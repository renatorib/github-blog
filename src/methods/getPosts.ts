import { gql } from "graphql-request";
import type { GithubBlog } from "../github-blog";
import { GithubQueryParams } from "../utils/github-query";
import { isNonNull } from "../utils/func";
import { PostReduced } from "../datatypes/PostReduced";
import { PagerParams } from "../utils/pager";

gql`
  query GetPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {
    search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {
      issueCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ...Post_Issue
        }
      }
    }
  }
`;

type GetPostsParams = {
  query?: GithubQueryParams;
  pager?: PagerParams;
};

export const getPosts = (blog: GithubBlog) => async (params: GetPostsParams) => {
  const query = blog.buildQuery(params.query);
  const pager = blog.buildPager(params.pager);

  const result = await blog.sdk.GetPosts({
    query,
    ...pager,
  });

  const edges = result.search.edges ?? [];
  const pageInfo = result.search.pageInfo ?? {};
  const totalCount = result.search.issueCount ?? 0;

  return {
    pageInfo,
    totalCount,
    edges: edges.filter(isNonNull).map((edge) => {
      return {
        cursor: edge.cursor,
        post: PostReduced.translate(
          edge.node as Extract<typeof edge.node, { __typename: "Issue" }>
        ),
      };
    }),
  };
};
