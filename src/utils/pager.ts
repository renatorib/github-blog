export type PagerParams = {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  limit?: number;
  offset?: number;
};

const btoa =
  typeof window !== "undefined"
    ? window.btoa
    : (text: string) => Buffer.from(text).toString("base64");

const cursor = (n: number) => btoa(`cursor:${n}`);

export const buildPager = (
  _args?: PagerParams | undefined,
  _defaults?: Partial<PagerParams> | undefined
): Omit<PagerParams, "offset"> => {
  const args = {
    ...(_defaults ?? {}),
    ...(_args ?? {}),
  };

  const offset = args?.offset ?? 0;

  return {
    after: args.after ?? (offset > 0 ? cursor(offset) : undefined),
    before: args.before,
    first: args.first ?? args.limit,
    last: args.last,
  };
};
