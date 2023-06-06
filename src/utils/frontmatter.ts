// inspired by https://github.com/vfile/vfile-matter

import { parse } from "yaml";

export const frontmatter = (content: string) => {
  const match = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(content);
  if (match) {
    return {
      data: parse(match[1]),
      content: content.slice(match[0].length),
    };
  }
  return {
    data: {},
    content,
  };
};
