import { GithubBlog } from "../src/github-blog";

const blog = new GithubBlog({
  repo: "renatorib/github-blog-tests",
  token: process.env.GITHUB_E2E_TESTS_TOKEN || process.env.GITHUB_TOKEN!,
});

describe("getPost", () => {
  test("get post by slug", async () => {
    const result = await blog.getPost({ query: { slug: "first-post" } });

    expect(result.post?.number).toBe(1);
    expect(result.post?.title).toBe("First post");
    expect(result.post?.frontmatter).toStrictEqual({ meta: "data" });
    expect(result.post?.body).toBe("\r\nHi");
    expect(result.post?.totalComments).toBeGreaterThan(0);
    expect(result.post?.totalReactions).toBeGreaterThan(0);
    expect(result.post?.reactions.THUMBS_UP).toBeGreaterThan(0);
  });

  test("get post by id", async () => {
    const result = await blog.getPost({ id: "MDU6SXNzdWU5MzYwOTEyMDc=" });

    expect(result.post?.title).toBe("First post");
    expect(result.post?.frontmatter).toStrictEqual({ meta: "data" });
    expect(result.post?.body).toBe("\r\nHi");
    expect(result.post?.totalComments).toBeGreaterThan(0);
    expect(result.post?.totalReactions).toBeGreaterThan(0);
    expect(result.post?.reactions.THUMBS_UP).toBeGreaterThan(0);
  });

  test("get post by number", async () => {
    const result = await blog.getPost({ number: 1 });

    expect(result.post?.title).toBe("First post");
    expect(result.post?.frontmatter).toStrictEqual({ meta: "data" });
    expect(result.post?.body).toBe("\r\nHi");
    expect(result.post?.totalComments).toBeGreaterThan(0);
    expect(result.post?.totalReactions).toBeGreaterThan(0);
    expect(result.post?.reactions.THUMBS_UP).toBeGreaterThan(0);
  });
});
