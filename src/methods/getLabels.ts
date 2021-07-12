import { gql } from "graphql-request";
import { isNonNull } from "../utils/func";
import type { GithubBlog } from "../github-blog";
import { PagerParams } from "../utils/pager";
import { Label } from "../datatypes/Label";
import { PageInfo } from "../datatypes/PageInfo";

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
          ...PageInfo_PageInfo
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
  pager?: PagerParams;
};

export const getLabels = (blog: GithubBlog) => async (params?: GetLabelsParams) => {
  const [owner, name] = blog.repo.split("/");
  const pager = blog.buildPager(params?.pager);
  const result = await blog.sdk.GetLabels({ owner, name, ...pager, first: pager.first ?? 100 });

  const labels = result.repository?.labels;
  if (!labels) {
    return {
      totalCount: 0,
      pageInfo: {},
      edges: [],
    };
  }

  const totalCount = labels.totalCount ?? 0;
  const pageInfo = labels.pageInfo ?? {};
  const edges = labels.edges ?? [];

  return {
    totalCount,
    pageInfo: PageInfo.translate(pageInfo),
    edges: edges.filter(isNonNull).map((edge) => {
      return {
        cursor: edge.cursor,
        label: Label.translate(edge.node),
      };
    }),
  };
};
