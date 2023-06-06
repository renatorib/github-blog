import { gql } from "code-tag";
import { createDataType } from "../core/datatype";
import { Reactions_ReactionGroupFragment, ReactionContent } from "../types";

export enum Reaction {
  ThumbsUp = "THUMBS_UP",
  ThumbsDown = "THUMBS_DOWN",
  Laugh = "LAUGH",
  Smile = "LAUGH",
  Hooray = "HOORAY",
  Tada = "HOORAY",
  Confused = "CONFUSED",
  Heart = "HEART",
  Rocket = "ROCKET",
  Eyes = "EYES",
}

type Reactions = {
  THUMBS_UP: number;
  THUMBS_DOWN: number;
  LAUGH: number;
  HOORAY: number;
  CONFUSED: number;
  HEART: number;
  ROCKET: number;
  EYES: number;
};

type ReactionsInput = Reactions_ReactionGroupFragment[];

export const Reactions = createDataType<ReactionsInput, Reactions>({
  fragment: gql`
    fragment Reactions_ReactionGroup on ReactionGroup {
      content
      users {
        totalCount
      }
    }
  `,
  translator: (reactionGroups) => {
    return (reactionGroups ?? []).reduce(
      (acc, curr) => ({
        ...acc,
        [curr.content]: curr.users?.totalCount,
      }),
      {}
    ) as Reactions;
  },
  fallback: {
    THUMBS_UP: 0,
    THUMBS_DOWN: 0,
    LAUGH: 0,
    HOORAY: 0,
    CONFUSED: 0,
    HEART: 0,
    ROCKET: 0,
    EYES: 0,
  },
});
