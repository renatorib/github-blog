import { GithubBlog } from "../dist/github-blog";

const blog = new GithubBlog({
  repo: process.env.GITHUB_E2E_TESTS_REPO!,
  token: process.env.GITHUB_E2E_TESTS_TOKEN!,
});

const author = process.env.GITHUB_E2E_TESTS_AUTHOR!;

describe("getPinnedPosts", () => {
  test("get pinned posts", async () => {
    const result = await blog.getPinnedPosts();

    expect(result.pinnedPosts.length).toBe(1);
    expect(result.pinnedPosts[0].pinnedBy.login).toBe(author);
    expect(result.pinnedPosts[0].post.title).toBe("Pinned post");
  });
});
