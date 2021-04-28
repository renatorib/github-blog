# Github Blog

<p align="center">
  <img src="cover.png">
</p>

<p align="center">
  Turn your github issues into a CMS for your blog.
</p>

<p align="center">

```sh
yarn add @rena.to/github-blog
```

</p>

## How it work?

The main idea is simple: each issue is a blog post entity.

Taxonomy is managed by **labels** and have `<key>:<value>` structure. Like `type:post`, `tag:javascript`, etc. Labels can be used to filter posts on querying, but is also available on post too. So you can use to add any kind of flags to your post. The built-in label keys are: `type`, `state`, `tag`, `flag` and `slug`.

Use **type** labels to differentiate _post_ from _article_, for example.  
Use **state** labels to handle _published_ and _draft_.  
Use **tag** labels to add tags to your posts, like _typescript_.  
Use **flag** labels to add any kind of flag to your post, like _outdated_ to mark post as outdated.

You can also add any **k:v** labels to your post, like `foo:bar`.

## Table of Contents

- [Getting Started](#getting-started)
  - [Repository](#repository)
  - [Issue](#issue)
  - [Fetch](#fetch)
- [Guide](#guide)
  - [Querying](#querying)
  - [Searching](#searching)
  - [Sorting](#sorting)
  - [Pagination](#pagination)
  - [Defaults](#defaults)
  - [Comments](#comments)
- [API Reference](#api-reference)
  - [Instance & Methods](#instance-&-methods)
    - [new GithubBlog](#new-githubblog)
    - [getPost](#getpost)
    - [getPosts](#getposts)
    - [getComments](#getcomments)
  - [Types](#types)
    - [ConstructorParams](#constructorparams)
    - [QueryParams](#queryparams)
    - [PagerParams](#pagerparams)
    - [GetPostResult](#getpostresult)
    - [GetPostsResult](#getpostsresult)
    - [GetCommentsResult](#getcommentsresult)
    - [Post](#post)
    - [PostReduced](#postreduced)
    - [Comment](#comment)

## Getting Started

Let's create your first blog post.

#### Repository

First, you will need to create a repository for your posts.  
It can be private, but I recommend you to create a public since it will allow people comment and react to your posts.  
Random people will be able to create issues but they can't add labels. So you can control what posts will be shown using some label like `type:post` for example. It will prevent random people to post on your blog. Also, by core github-blog only fetches by opened issues. You can close any random issue opened by others to keep posts organized.

![image](https://user-images.githubusercontent.com/3277185/115134566-a8039180-9fe7-11eb-9e74-eb23b488e860.png)

#### Issue

Create a issue with your content and add the labels `state:published`, `type:post`.  
Also add an label to your slug like `slug:my-first-post`

> Tip: Your issue content can have frontmatter data

![image](https://user-images.githubusercontent.com/3277185/115800402-ec5cac00-a3b0-11eb-9523-49dbaa341354.png)

#### Fetch

Here comes github-blog. First install

```sh
yarn add @rena.to/github-blog
# npm install @rena.to/github-blog
```

Now create a new blog instance passing your repo and your github token. [Create your token here](https://github.com/settings/tokens).

```ts
import { GithubBlog } from "@rena.to/github-blog";

const blog = new GithubBlog({
  repo: "<user>/<repo>", // e.g.: "renatorib/posts"
  token: "<token>",
});
```

Fetch your post using getPost:

```ts
const post = await blog.getPost({
  query: { slug: "my-first-post" },
});
```

Fetch post comments using getComments:

```ts
const comments = await blog.getComments({
  query: { slug: "my-first-post" },
  pager: { first: 100 },
});
```

Fetch all your posts using getPosts:

```ts
const posts = await blog.getPosts({
  query: { type: "post", state: "published" },
  pager: { limit: 10, offset: 0 },
});
```

## Guide

### Querying

All query works by AND logic. You can't query by OR because of the nature of github search.  
But you can exclude results using prefix `not` (`notType`, `notState`, etc.)  
E.g: If you want to query posts with type _post_ but it can't have a flag _outdated_, you can use:

```ts
const posts = await blog.getPosts({
  query: { type: "post", notFlag: "outdated" },
  pager: { limit: 10, offset: 0 },
});
```

You can also pass an array to most of [query params](#queryparams):

```ts
const posts = await blog.getPosts({
  query: { type: ["post", "article"], tag: ["javascript", "react"] },
  pager: { limit: 10, offset: 0 },
});
```

### Searching

You can also search for post that contain terms using `query.search` param:

```ts
const posts = await blog.getPosts({
  query: { type: "post", state: "published", search: "compiler" },
  pager: { limit: 10, offset: 0 },
});
```

### Sorting

You can sort results by `interactions`, `reactions`, `author-date`, `created`, `updated`.  
All of them are desc by default but you can suffix with `-asc`. See all [here](#queryparams)

```ts
const posts = await blog.getPosts({
  query: { type: "post", sort: "interactions" },
  pager: { limit: 10, offset: 0 },
});
```

### Pagination

You can paginate using `pager.limit` and `pager.offset` as you saw before, but you can also paginate using cursors with the pager params `after`, `before`, `first` and `last`.

```ts
// first 10 posts
const posts = await blog.getPosts({
  query: { type: "post" },
  pager: { first: 10 },
});

// more 10 posts
const morePosts = await blog.getPosts({
  query: { type: "post" },
  pager: { first: 10, after: posts.pageInfo.endCursor },
});
```

> **NOTE:** `limit` and `offset` uses `first` and `after` under the hood.  
> So if you pass both `limit` and `first` or `offset` and `after`, limit and offset will be ignored.

### Defaults

You can set some defaults for querying right in your blog instance, if you want to avoid some query repetition:

```ts
const blog = new GithubBlog({
  repo: "renatorib/posts",
  token: process.env.GITHUB_TOKEN,
  queryDefaults: {
    state: "published",
    type: "post",
  },
});

const posts = await blog.getPosts({
  pager: { first: 10, offset: 0 },
});
```

### Comments

You can fetch all post comments using `.getComments`

```ts
// first 10 comments
const comments = await blog.getComments({
  query: { slug: "my-first-post" },
  pager: { first: 10 },
});

// more 10 posts
const moreComments = await blog.getComments({
  query: { slug: "my-first-post" },
  pager: { first: 10, after: comments.pageInfo.endCursor },
});
```

> **NOTE:** Comment pagination by _limit_ and _offset_ is still not possible while I figure out on how generate v2 cursors based on offset.  
> Read more about this issue here, maybe you can help.

## API Reference

### Instance & Methods

#### new GithubBlog

```ts
const blog = new GithubBlog(ConstructorParams);
```

See: [ConstructorParams](#constructorparams);

### getPost

```ts
blog.getPost({ query: QueryParams }): Promise<GetPostResult>
```

See: [QueryParams](#queryparams); [GetPostResult](#getpostresult);

### getPosts

```ts
blog.getPosts({ query: QueryParams, pager: PagerParams }): Promise<GetPostsResult>
```

See: [QueryParams](#queryparams); [PagerParams](#pagerparams); [GetPostsResult](#getpostsresult);

### getComments

```ts
blog.getComments({ query: QueryParams, pager: PagerParams }): Promise<GetCommentsResult>
```

See: [QueryParams](#queryparams); [PagerParams](#pagerparams); [GetCommentsResult](#getcommentsresult);

### Types

#### `ConstructorParams`

```ts
type ConstructorParams = {
  token: string;
  repo: string;
  queryDefaults?: Partial<QueryParams>;
  paginationDefaults?: Partial<PagerParams>;
};
```

See: [QueryParams](#queryparams); [PagerParams](#pagerparams);

#### `QueryParams`

```ts
type QueryParams = {
  tag?: string | string[];
  notTag?: string | string[];
  flag?: string | string[];
  notFlag?: string | string[];
  state?: string | string[];
  notState?: string | string[];
  type?: string | string[];
  notType?: string | string[];
  author?: string | string[];
  notAuthor?: string | string[];
  sort?:
    | "interactions"
    | "reactions"
    | "author-date"
    | "created"
    | "updated"
    | "interactions-asc"
    | "reactions-asc"
    | "author-date-asc"
    | "created-asc"
    | "updated-asc"
    | "interactions-desc"
    | "reactions-desc"
    | "author-date-desc"
    | "created-desc"
    | "updated-desc"
    | "reactions-+1"
    | "reactions--1"
    | "reactions-smile"
    | "reactions-tada"
    | "reactions-heart";
  slug?: string;
  search?: string;
  overrides?: string;
};
```

#### `PagerParams`

```ts
type PagerParams = {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  limit?: number;
  offset?: number;
};
```

#### `GetPostResult`

```ts
type GetPostResult = {
  post: Post;
};
```

See: [Post](#post);

#### `GetPostsResult`

```ts
type GetPostsResult = {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    startCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  edges: {
    cursor: string;
    post: PostReduced;
  }[];
};
```

See: [PostReduced](#postreduced);

#### `GetCommentsResult`

```ts
type GetCommentsResult = {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    startCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  edges: {
    cursor: string;
    comment: Comment;
  }[];
};
```

See: [Comment](#comment);

#### `Post`

```ts
type Post = {
  id: string;
  url: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  body: string;
  frontmatter: {
    [key: string]: string;
  };
  author: {
    name: string;
    login: string;
    avatarUrl: string;
  };
  labels: {
    [key: string]: string[];
  };
  reactions: {
    THUMBS_UP: number;
    THUMBS_DOWN: number;
    LAUGH: number;
    HOORAY: number;
    CONFUSED: number;
    HEART: number;
    ROCKET: number;
    EYES: number;
  };
  totalComments: number;
  totalReactions: number;
};
```

#### `PostReduced`

Same as `Post` but without `body`.

See: [Post](#post);

#### `Comment`

```ts
type Comment = {
  id: string;
  body: string;
  createdAt: string;
  lastEditedAt: string | null;
  isMinimized: boolean;
  minimizedReason: string | null;
  author: {
    name: string;
    login: string;
    avatarUrl: string;
  };
  reactions: {
    THUMBS_UP: number;
    THUMBS_DOWN: number;
    LAUGH: number;
    HOORAY: number;
    CONFUSED: number;
    HEART: number;
    ROCKET: number;
    EYES: number;
  };
  totalReactions: number;
};
```
