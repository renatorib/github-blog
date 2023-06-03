import { GithubBlog } from "../dist/github-blog";

const blog = new GithubBlog({
  repo: process.env.GITHUB_E2E_TESTS_REPO!,
  token: process.env.GITHUB_E2E_TESTS_TOKEN!,
});

describe("getPosts", () => {
  test("get posts by tag", async () => {
    const result = await blog.getPosts({
      query: { tag: "foo" },
      pager: { limit: 10, offset: 0 },
    });

    expect(result.edges.map((edge) => edge.post.labels.tag)).toEqual(
      expect.arrayContaining([expect.arrayContaining(["foo"])])
    );
  });

  test("get posts by state", async () => {
    const result = await blog.getPosts({
      query: { state: "published" },
      pager: { limit: 10, offset: 0 },
    });

    expect(result.edges.map((edge) => edge.post.labels.state)).toEqual(
      expect.arrayContaining([expect.arrayContaining(["published"])])
    );
  });
});
