import { GraphQLClient } from "graphql-request";
import { GithubQueryArgs, githubQueryBuilder } from "./utils/github-query";
import { PagerArgs, buildPager } from "./utils/pager";

import { getPosts } from "./methods/getPosts";
import { getPost } from "./methods/getPost";
import { getComments } from "./methods/getComments";

import { getSdk } from "./core/sdk";

export type GithubBlogParams = {
  token: string;
  repo: string;
  queryDefaults?: Partial<GithubQueryArgs>;
  paginationDefaults?: Partial<PagerArgs>;
};
export class GithubBlog {
  client: GraphQLClient;
  sdk: ReturnType<typeof getSdk>;
  repo: string;
  buildQuery: (args?: GithubQueryArgs) => ReturnType<ReturnType<typeof githubQueryBuilder>>;
  buildPager: (args?: PagerArgs) => ReturnType<typeof buildPager>;

  constructor(params: GithubBlogParams) {
    this.repo = params.repo;
    this.client = new GraphQLClient("https://api.github.com/graphql", {
      headers: { Authorization: `Bearer ${params.token}` },
    });
    this.sdk = getSdk(this.client);
    const buildQuery = githubQueryBuilder(this.repo);
    this.buildQuery = (args) => buildQuery(args, params.queryDefaults);
    this.buildPager = (args) => buildPager(args, params.paginationDefaults);
  }

  getPosts = getPosts(this);
  getPost = getPost(this);
  getComments = getComments(this);
}
