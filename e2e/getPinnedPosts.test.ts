import { GithubBlog } from "../src/github-blog";

const blog = new GithubBlog({
  repo: "renatorib/github-blog-tests",
  token: process.env.GITHUB_E2E_TESTS_TOKEN!,
});

describe("getPinnedPosts", () => {
  test("get pinned posts", async () => {
    const result = await blog.getPinnedPosts();

    expect(result.pinnedPosts.length).toBe(1);
    expect(result.pinnedPosts[0].pinnedBy.login).toBe("renatorib");
    expect(result.pinnedPosts[0].post.title).toBe("Pinned post");
  });
});
