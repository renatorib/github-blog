import { GithubBlog } from "../dist/github-blog";

const blog = new GithubBlog({
  repo: "renatorib/github-blog-tests",
  token: process.env.GITHUB_E2E_TESTS_TOKEN!,
});

describe("getLabels", () => {
  test("get all labels", async () => {
    const result = await blog.getLabels();

    expect(result.totalCount).toBeGreaterThan(6);
    expect(result.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cursor: expect.any(String),
          label: {
            id: expect.any(String),
            name: expect.any(String),
            prefix: expect.any(String),
            fullName: expect.any(String),
            color: expect.any(String),
            quantity: expect.any(Number),
          },
        }),
      ])
    );
  });

  test("get labels by query", async () => {
    const result = await blog.getLabels({ query: "tag:" });

    expect(result.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cursor: expect.any(String),
          label: {
            id: expect.any(String),
            name: expect.any(String),
            prefix: expect.stringMatching("tag"),
            fullName: expect.stringContaining("tag:"),
            color: expect.any(String),
            quantity: expect.any(Number),
          },
        }),
      ])
    );
  });
});
