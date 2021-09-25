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
export type { GithubBlog, GithubBlogParams } from "./github-blog";

/* Methods Types */

export type { GetComments, GetCommentsParams, GetCommentsResult } from "./methods/getComments";
export type { GetLabels, GetLabelsParams, GetLabelsResult } from "./methods/getLabels";
// prettier-ignore
export type { GetPinnedPosts, GetPinnedPostsParams, GetPinnedPostsResult } from "./methods/getPinnedPosts";
export type { GetPost, GetPostParams, GetPostResult } from "./methods/getPost";
export type { GetPosts, GetPostsParams, GetPostsResult } from "./methods/getPosts";

/* Utils & Extras */

export type { GithubQueryParams } from "./utils/github-query";
export type { PagerParams } from "./utils/pager";
