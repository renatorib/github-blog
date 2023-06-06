import { fetch } from "undici";
import { GithubQueryParams, githubQueryBuilder } from "./utils/github-query";
import { PagerParams, buildPager } from "./utils/pager";

import { getSdk, Requester } from "./core/sdk";

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
  sdk: ReturnType<typeof getSdk>;
  repo: string;
  buildQuery: (args?: GithubQueryParams) => ReturnType<ReturnType<typeof githubQueryBuilder>>;
  buildPager: (args?: PagerParams) => ReturnType<typeof buildPager>;

  constructor(params: GithubBlogParams) {
    this.repo = params.repo;
    const request: Requester<void, void> = async (query: string, variables: unknown) => {
      const body = JSON.stringify({
        query,
        variables,
      });
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
        },
        body,
      });
      const result = (await response.json()) as { data: any; errors: any };
      if (result.data) {
        return result.data;
      }
      const status = `${response.status} ${response.statusText}`;
      throw Error(`${status}\n${body}\n${JSON.stringify(result)}`);
    };
    this.sdk = getSdk(request);
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
