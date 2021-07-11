/* Datatypes Types */

import { Author } from "./datatypes/Author";
export type Author = typeof Author.Type;

import { Comment } from "./datatypes/Comment";
export type Comment = typeof Comment.Type;

import { Label } from "./datatypes/Label";
export type Label = typeof Label.Type;

import { Labels } from "./datatypes/Labels";
export type Labels = typeof Labels.Type;

import { Post } from "./datatypes/Post";
export type Post = typeof Post.Type;

import { PostReduced } from "./datatypes/PostReduced";
export type PostReduced = typeof PostReduced.Type;

import { Reactions } from "./datatypes/Reactions";
export type Reactions = typeof Reactions.Type;

/* GithubBlog Types */

import { GithubBlog } from "./github-blog";
export type GithubBlogParams = ConstructorParameters<typeof GithubBlog>[0];
export type GithubBlogConstructorParams = GithubBlogParams;
export type GithubBlogInstance = InstanceType<typeof GithubBlog>;

/* Methods Types */

type Unwrap<T> = T extends Promise<infer U> ? U : never;

export type GetComments = GithubBlogInstance["getComments"];
export type GetCommentsParams = Parameters<GetComments>[0];
export type GetCommentsResult = Unwrap<ReturnType<GetComments>>;

export type GetLabels = GithubBlogInstance["getLabels"];
export type GetLabelsParams = Parameters<GetLabels>[0];
export type GetLabelsResult = Unwrap<ReturnType<GetLabels>>;

export type GetPinnedPosts = GithubBlogInstance["getPinnedPosts"];
export type GetPinnedPostsParams = undefined;
export type GetPinnedPostsResult = Unwrap<ReturnType<GetPinnedPosts>>;

export type GetPost = GithubBlogInstance["getPost"];
export type GetPostParams = Parameters<GetPost>[0];
export type GetPostResult = Unwrap<ReturnType<GetPost>>;

export type GetPosts = GithubBlogInstance["getPosts"];
export type GetPostsParams = Parameters<GetPosts>[0];
export type GetPostsResult = Unwrap<ReturnType<GetPosts>>;

/* Utils & Extras */

export type { GithubQueryParams } from "./utils/github-query";
export type { PagerParams } from "./utils/pager";
