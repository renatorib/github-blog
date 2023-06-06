import { gql } from "code-tag";
import { createDataType } from "../core/datatype";
import { Author_ActorFragment } from "../types";

type Author = {
  avatarUrl: string | null;
  name: string;
  login: string | null;
  twitterUsername: string | null;
};

type AuthorInput = Author_ActorFragment;

export const Author = createDataType<AuthorInput, Author>({
  fragment: gql`
    fragment Author_Actor on Actor {
      ... on User {
        avatarUrl
        name
        login
        twitterUsername
      }
      ... on Organization {
        avatarUrl
        name
        login
        twitterUsername
      }
      ... on EnterpriseUserAccount {
        avatarUrl
        name
        login
      }
      ... on Bot {
        avatarUrl
        login
      }
    }
  `,
  translator: (actor) => {
    return {
      avatarUrl: "avatarUrl" in actor ? actor.avatarUrl : null,
      login: "login" in actor ? actor.login : null,
      name: "name" in actor && actor.name ? actor.name : "login" in actor ? actor.login : "Unknown",
      twitterUsername: "twitterUsername" in actor ? actor.twitterUsername ?? null : null,
    };
  },
  fallback: {
    avatarUrl: null,
    login: null,
    name: "Unknown",
    twitterUsername: null,
  },
});
