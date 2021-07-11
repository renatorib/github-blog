import { GraphQLClient } from "graphql-request";
import { GithubQueryParams, githubQueryBuilder } from "./utils/github-query";
import { PagerParams, buildPager } from "./utils/pager";

import { getSdk } from "./core/sdk";

import { getPosts } from "./methods/getPosts";
import { getPinnedPosts } from "./methods/getPinnedPosts";
import { getPost } from "./methods/getPost";
import { getComments } from "./methods/getComments";
import { getLabels } from "./methods/getLabels";

export type GithubBlogParams = {
  token: string;
  repo: string;
  queryDefaults?: Partial<GithubQueryParams>;
  paginationDefaults?: Partial<PagerParams>;
};
export class GithubBlog {
  client: GraphQLClient;
  sdk: ReturnType<typeof getSdk>;
  repo: string;
  buildQuery: (args?: GithubQueryParams) => ReturnType<ReturnType<typeof githubQueryBuilder>>;
  buildPager: (args?: PagerParams) => ReturnType<typeof buildPager>;

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
  getLabels = getLabels(this);
  getPinnedPosts = getPinnedPosts(this);
}
