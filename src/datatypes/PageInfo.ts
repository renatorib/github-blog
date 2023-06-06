import { gql } from "code-tag";
import { createDataType } from "../core/datatype";
import { PageInfo_PageInfoFragment } from "../types";

type PageInfo = {
  endCursor?: string;
  startCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

export const PageInfo = createDataType<PageInfo_PageInfoFragment, PageInfo>({
  fragment: gql`
    fragment PageInfo_PageInfo on PageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  `,
  translator: (pageInfo) => {
    return {
      endCursor: pageInfo.endCursor ?? undefined,
      startCursor: pageInfo.startCursor ?? undefined,
      hasNextPage: pageInfo.hasNextPage ?? undefined,
      hasPreviousPage: pageInfo.hasPreviousPage ?? undefined,
    };
  },
});
