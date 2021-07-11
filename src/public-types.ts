/* Datatypes Types */

import { Author } from "./datatypes/Author";
export type AuthorType = typeof Author.Type;

import { Comment } from "./datatypes/Comment";
export type CommentType = typeof Comment.Type;

import { Label } from "./datatypes/Label";
export type LabelType = typeof Label.Type;

import { Labels } from "./datatypes/Labels";
export type LabelsType = typeof Labels.Type;

import { Post } from "./datatypes/Post";
export type PostType = typeof Post.Type;

import { PostReduced } from "./datatypes/PostReduced";
export type PostReduced = typeof PostReduced.Type;

import { Reactions } from "./datatypes/Reactions";
export type Reactions = typeof Reactions.Type;

/* Methods Types */

type Unwrap<T> = T extends Promise<infer U> ? U : never;

import { getComments } from "./methods/getComments";
export type GetComments = ReturnType<typeof getComments>;
export type GetCommentsParams = Parameters<GetComments>[0];
export type GetCommentsResult = Unwrap<ReturnType<GetComments>>;

import { getLabels } from "./methods/getLabels";
export type GetLabels = ReturnType<typeof getLabels>;
export type GetLabelsParams = Parameters<GetLabels>[0];
export type GetLabelsResult = Unwrap<ReturnType<GetLabels>>;

import { getPinnedPosts } from "./methods/getPinnedPosts";
export type GetPinnedPosts = ReturnType<typeof getPinnedPosts>;
export type GetPinnedPostsParams = undefined;
export type GetPinnedPostsResult = Unwrap<ReturnType<GetPinnedPosts>>;

import { getPost } from "./methods/getPost";
export type GetPost = ReturnType<typeof getPost>;
export type GetPostParams = Parameters<GetPost>[0];
export type GetPostResult = Unwrap<ReturnType<GetPost>>;

import { getPosts } from "./methods/getPosts";
export type GetPosts = ReturnType<typeof getPosts>;
export type GetPostsParams = Parameters<GetPosts>[0];
export type GetPostsResult = Unwrap<ReturnType<GetPosts>>;
