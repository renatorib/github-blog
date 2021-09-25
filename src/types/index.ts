export * from "../__generated__/index";

export type Unwrap<T> = T extends Promise<infer U> ? U : never;
