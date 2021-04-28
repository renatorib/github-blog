import { gql } from "graphql-request";
import { createDataType } from "../core/datatype";
import { Author_ActorFragment } from "../types";

type AuthorType = {
  avatarUrl: string | null;
  name: string;
  login: string | null;
};

type AuthorInput = Author_ActorFragment;

export const Author = createDataType<AuthorInput, AuthorType>({
  fragment: gql`
    fragment Author_Actor on Actor {
      ... on User {
        avatarUrl
        name
        login
      }
      ... on Bot {
        avatarUrl
        login
      }
      ... on EnterpriseUserAccount {
        avatarUrl
        name
        login
      }
    }
  `,
  translator: (actor) => {
    return {
      avatarUrl: "avatarUrl" in actor ? actor.avatarUrl : null,
      login: "login" in actor ? actor.login : null,
      name: "name" in actor && actor.name ? actor.name : "login" in actor ? actor.login : "Unknown",
    };
  },
  fallback: {
    avatarUrl: null,
    login: null,
    name: "Unknown",
  },
});
