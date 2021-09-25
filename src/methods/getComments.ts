import { gql } from "graphql-request";
import type { Unwrap } from "../types";
import type { GithubBlog } from "../github-blog";
import { GithubQueryParams } from "../utils/github-query";
import { PagerParams } from "../utils/pager";
import { isNonNull } from "../utils/func";
import { Comment } from "../datatypes/Comment";
import { PageInfo } from "../datatypes/PageInfo";

gql`
  query GetComments($query: String!, $first: Int, $last: Int, $before: String, $after: String) {
    search(first: 1, type: ISSUE, query: $query) {
      nodes {
        ... on Issue {
          comments(first: $first, last: $last, before: $before, after: $after) {
            totalCount
            pageInfo {
              ...PageInfo_PageInfo
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

export type GetCommentsParams = {
  query?: GithubQueryParams;
  /**
   * Pagination with limit and offset don't work in comments. Use cursor pagination
   */
  pager?: Omit<PagerParams, "limit" | "offset">;
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
    totalCount,
    pageInfo: PageInfo.translate(pageInfo),
    edges: edges.filter(isNonNull).map((edge) => {
      return {
        cursor: edge.cursor,
        comment: Comment.translate(edge.node),
      };
    }),
  };
};

export type GetComments = ReturnType<typeof getComments>;

export type GetCommentsResult = Unwrap<ReturnType<GetComments>>;
