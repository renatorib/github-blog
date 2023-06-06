import { GithubBlog } from "../src/github-blog";

const blog = new GithubBlog({
  repo: "renatorib/github-blog-tests",
  token: process.env.GITHUB_E2E_TESTS_TOKEN!,
});

describe("getComments", () => {
  test("get post comments by slug", async () => {
    const result = await blog.getComments({ query: { slug: "first-post" }, pager: { first: 10 } });

    expect(result.totalCount).toBeGreaterThan(1);
    expect(result.edges[0].comment.body).toBe("hi from comments");
    expect(result.edges[0].comment.author.login).toBe("renatorib");
    expect(result.edges[0].comment.isMinimized).toBe(false);

    expect(result.edges[1].comment.isMinimized).toBe(true);
    expect(result.edges[1].comment.body).toBe("minimized");
    expect(result.edges[1].comment.minimizedReason).toBe("outdated");
  });
});
