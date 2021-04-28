import { gql } from "graphql-request";
import type { GithubBlog } from "../github-blog";
import { GithubQueryArgs } from "../utils/github-query";
import { PagerArgs } from "../utils/pager";
import { isNonNull } from "../utils/func";
import { Comment } from "../datatypes/Comment";

gql`
  query GetComments($query: String!, $first: Int, $last: Int, $before: String, $after: String) {
    search(first: 1, type: ISSUE, query: $query) {
      nodes {
        ... on Issue {
          comments(first: $first, last: $last, before: $before, after: $after) {
            totalCount
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                ...Comment_IssueComment
              }
            }
          }
        }
      }
    }
  }
`;

type GetCommentsParams = {
  query?: GithubQueryArgs;
  pager?: Omit<PagerArgs, "limit" | "offset">;
};

export const getComments = (blog: GithubBlog) => async (params: GetCommentsParams) => {
  const query = blog.buildQuery(params.query);
  const pager = blog.buildPager(params.pager);

  const result = await blog.sdk.GetComments({ query, ...pager });

  const issue = result.search.nodes?.[0];

  if (!issue) {
    return {
      pageInfo: {},
      totalCount: 0,
      edges: [],
    };
  }

  const connection = (issue as Extract<typeof issue, { __typename?: "Issue" }>).comments;
  const edges = connection.edges ?? [];
  const pageInfo = connection.pageInfo ?? {};
  const totalCount = connection.totalCount ?? 0;

  return {
    pageInfo,
    totalCount,
    edges: edges.filter(isNonNull).map((edge) => {
      return {
        cursor: edge.cursor,
        comment: Comment.translate(edge.node),
      };
    }),
  };
};
