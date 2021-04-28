import { gql } from "graphql-request";
import { isNonNull } from "../utils/func";
import { createDataType } from "../core/datatype";
import { Labels_LabelConnectionFragment } from "../types";

type LabelsType = {
  state?: string[];
  type?: string[];
  tag?: string[];
  flag?: string[];
  slug?: string[];
  [k: string]: string[] | undefined;
};

type LabelsInput = Labels_LabelConnectionFragment;

export const Labels = createDataType<LabelsInput, LabelsType>({
  fragment: gql`
    fragment Labels_LabelConnection on LabelConnection {
      nodes {
        name
      }
    }
  `,
  translator: ({ nodes }) => {
    return (nodes ?? [])
      .filter(isNonNull)
      .map((label) => label.name)
      .reduce<LabelsType>((acc, curr) => {
        const [_prop, value] = curr.split(":");
        const prop = _prop as keyof LabelsType;
        return {
          ...acc,
          [prop]: acc[prop] ? [...acc[prop]!, value] : [value],
        };
      }, {});
  },
  fallback: {},
});