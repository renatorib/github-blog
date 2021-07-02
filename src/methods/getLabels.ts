import { gql } from "graphql-request";
import { isNonNull } from "../utils/func";
import type { GithubBlog } from "../github-blog";
import { PagerArgs } from "../utils/pager";
import { Label } from "../datatypes/Label";

gql`
  query GetLabels(
    $query: String
    $name: String!
    $owner: String!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    repository(name: $name, owner: $owner) {
      labels(query: $query, first: $first, last: $last, before: $before, after: $after) {
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
            ...Label_Label
          }
        }
      }
    }
  }
`;

type GetLabelsParams = {
  query?: string;
  pager?: PagerArgs;
};

export const getLabels = (blog: GithubBlog) => async (params?: GetLabelsParams) => {
  const [owner, name] = blog.repo.split("/");
  const pager = blog.buildPager(params?.pager);
  const result = await blog.sdk.GetLabels({ owner, name, ...pager, first: pager.first ?? 100 });

  const edges = result.repository?.labels?.edges ?? [];
  const pageInfo = result.repository?.labels?.pageInfo ?? {};
  const totalCount = result.repository?.labels?.totalCount ?? 0;

  return {
    pageInfo,
    totalCount,
    edges: edges.filter(isNonNull).map((edge) => {
      return {
        cursor: edge.cursor,
        label: Label.translate(edge.node),
      };
    }),
  };
};
