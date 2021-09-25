import cn from "classnames";

export type SortDescAsc = "interactions" | "reactions" | "author-date" | "created" | "updated";
export type SortReaction =
  | "reactions-+1"
  | "reactions--1"
  | "reactions-smile"
  | "reactions-tada"
  | "reactions-heart";
export type Sort = SortDescAsc | `${SortDescAsc}-asc` | `${SortDescAsc}-desc` | SortReaction;

export type GithubQueryParams = {
  tag?: string | string[];
  notTag?: string | string[];
  flag?: string | string[];
  notFlag?: string | string[];
  state?: string | string[];
  notState?: string | string[];
  type?: string | string[];
  notType?: string | string[];
  author?: string | string[];
  notAuthor?: string | string[];

  sort?: Sort;
  slug?: string;
  search?: string;
  overrides?: string;
};

const multiple = (prefix: string, value: string | string[] | undefined) => {
  if (!value) return null;
  return (Array.isArray(value) ? value : [value]).map((v) => `${prefix}:${v}`);
};

const single = (prefix: string, value: string | undefined) => {
  if (!value) return null;
  return `${prefix}:${value}`;
};

export const githubQueryBuilder = (repo: string) => (
  _args?: GithubQueryParams | undefined,
  _defaults?: Partial<GithubQueryParams> | undefined
): string => {
  const args = _args ?? {};
  const defaults = _defaults ?? {};

  const query = cn(
    `repo:${repo}`, // Should search on instance repo
    `type:issue`, // Should search for issues only

    args.overrides ?? defaults.overrides, // Overrides should came before as the former has priority
    `is:open`, // Search for opened issues only
    multiple("label:tag", args.tag ?? defaults.tag),
    multiple("-label:tag", args.notTag ?? defaults.notTag),
    multiple("label:flag", args.flag ?? defaults.flag),
    multiple("-label:flag", args.notFlag ?? defaults.notFlag),
    multiple("label:state", args.state ?? defaults.state),
    multiple("-label:state", args.notState ?? defaults.notState),
    multiple("label:type", args.type ?? defaults.type),
    multiple("-label:type", args.notType ?? defaults.notType),
    single("label:slug", args.slug ?? defaults.slug),
    multiple("author", args.author ?? defaults.author),
    multiple("-author", args.notAuthor ?? defaults.notAuthor),
    single("sort", args.sort ?? defaults.sort ?? "created"),
    args.search ?? defaults.search // Free field that can be used to search for terms
  );

  return query;
};
