import { gql } from "graphql-request";

type Or<Type, Or> = Type | Or;
type Maybe<Type> = Or<Type, null | undefined>;

type TranslatorType<Input, Output> = (input: Input) => Output;

export const createDataType = <
  Input,
  Output,
  Fallback extends Maybe<Partial<Output>> = Output
>(config: {
  fragment?: ReturnType<typeof gql>;
  translator: TranslatorType<Input, Output>;
  fallback?: Fallback;
}) => {
  const Type = {} as Or<Output, Fallback>;
  const FallbackType = {} as Fallback;
  const OutputType = {} as Output;
  const InputType = {} as Input;

  const fallback = (config.fallback ?? null) as Fallback;

  const translate: TranslatorType<Maybe<Input>, typeof Type> = (input) => {
    if (input == null) {
      return fallback;
    }

    try {
      return config.translator(input);
    } catch (error) {
      if (process.env.NODE_ENV === "debug") {
        console.log(`[GithugBlog] DataType translator failed with error: `, error);
      }
      return fallback;
    }
  };

  return {
    Type,
    FallbackType,
    OutputType,
    InputType,

    translate,
    ...(config.fragment ? { fragment: config.fragment } : {}),
  };
};
