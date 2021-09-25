[@rena.to/github-blog](README.md) / Exports

# @rena.to/github-blog

## Table of contents

### Classes

- [GithubBlog](classes/GithubBlog.md)

### Type aliases

- [Author](modules.md#author)
- [Comment](modules.md#comment)
- [GetComments](modules.md#getcomments)
- [GetCommentsParams](modules.md#getcommentsparams)
- [GetCommentsResult](modules.md#getcommentsresult)
- [GetLabels](modules.md#getlabels)
- [GetLabelsParams](modules.md#getlabelsparams)
- [GetLabelsResult](modules.md#getlabelsresult)
- [GetPinnedPosts](modules.md#getpinnedposts)
- [GetPinnedPostsParams](modules.md#getpinnedpostsparams)
- [GetPinnedPostsResult](modules.md#getpinnedpostsresult)
- [GetPost](modules.md#getpost)
- [GetPostParams](modules.md#getpostparams)
- [GetPostResult](modules.md#getpostresult)
- [GetPosts](modules.md#getposts)
- [GetPostsParams](modules.md#getpostsparams)
- [GetPostsResult](modules.md#getpostsresult)
- [GithubBlogParams](modules.md#githubblogparams)
- [GithubQueryParams](modules.md#githubqueryparams)
- [Label](modules.md#label)
- [Labels](modules.md#labels)
- [PagerParams](modules.md#pagerparams)
- [Post](modules.md#post)
- [PostReduced](modules.md#postreduced)
- [Reactions](modules.md#reactions)

## Type aliases

### Author

Ƭ **Author**: typeof `Author.Type`

#### Defined in

[public-types.ts:4](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L4)

---

### Comment

Ƭ **Comment**: typeof `Comment.Type`

#### Defined in

[public-types.ts:7](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L7)

---

### GetComments

Ƭ **GetComments**: `ReturnType`<typeof `getComments`\>

#### Defined in

[methods/getComments.ts:74](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getComments.ts#L74)

---

### GetCommentsParams

Ƭ **GetCommentsParams**: `Object`

#### Type declaration

| Name     | Type                                                                      | Description                                                                    |
| :------- | :------------------------------------------------------------------------ | :----------------------------------------------------------------------------- |
| `pager?` | `Omit`<[`PagerParams`](modules.md#pagerparams), `"limit"` \| `"offset"`\> | Pagination with limit and offset don't work in comments. Use cursor pagination |
| `query?` | [`GithubQueryParams`](modules.md#githubqueryparams)                       | -                                                                              |

#### Defined in

[methods/getComments.ts:33](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getComments.ts#L33)

---

### GetCommentsResult

Ƭ **GetCommentsResult**: `Unwrap`<`ReturnType`<[`GetComments`](modules.md#getcomments)\>\>

#### Defined in

[methods/getComments.ts:76](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getComments.ts#L76)

---

### GetLabels

Ƭ **GetLabels**: `ReturnType`<typeof `getLabels`\>

#### Defined in

[methods/getLabels.ts:71](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getLabels.ts#L71)

---

### GetLabelsParams

Ƭ **GetLabelsParams**: `Object`

#### Type declaration

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `pager?` | [`PagerParams`](modules.md#pagerparams) |
| `query?` | `string`                                |

#### Defined in

[methods/getLabels.ts:36](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getLabels.ts#L36)

---

### GetLabelsResult

Ƭ **GetLabelsResult**: `Unwrap`<`ReturnType`<[`GetLabels`](modules.md#getlabels)\>\>

#### Defined in

[methods/getLabels.ts:73](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getLabels.ts#L73)

---

### GetPinnedPosts

Ƭ **GetPinnedPosts**: `ReturnType`<typeof `getPinnedPosts`\>

#### Defined in

[methods/getPinnedPosts.ts:41](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPinnedPosts.ts#L41)

---

### GetPinnedPostsParams

Ƭ **GetPinnedPostsParams**: `never`

#### Defined in

[methods/getPinnedPosts.ts:25](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPinnedPosts.ts#L25)

---

### GetPinnedPostsResult

Ƭ **GetPinnedPostsResult**: `Unwrap`<`ReturnType`<[`GetPinnedPosts`](modules.md#getpinnedposts)\>\>

#### Defined in

[methods/getPinnedPosts.ts:43](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPinnedPosts.ts#L43)

---

### GetPost

Ƭ **GetPost**: `ReturnType`<typeof `getPost`\>

#### Defined in

[methods/getPost.ts:39](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPost.ts#L39)

---

### GetPostParams

Ƭ **GetPostParams**: `Object`

#### Type declaration

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `query?` | [`GithubQueryParams`](modules.md#githubqueryparams) |

#### Defined in

[methods/getPost.ts:19](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPost.ts#L19)

---

### GetPostResult

Ƭ **GetPostResult**: `Unwrap`<`ReturnType`<[`GetPost`](modules.md#getpost)\>\>

#### Defined in

[methods/getPost.ts:41](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPost.ts#L41)

---

### GetPosts

Ƭ **GetPosts**: `ReturnType`<typeof `getPosts`\>

#### Defined in

[methods/getPosts.ts:66](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPosts.ts#L66)

---

### GetPostsParams

Ƭ **GetPostsParams**: `Object`

#### Type declaration

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `pager?` | [`PagerParams`](modules.md#pagerparams)             |
| `query?` | [`GithubQueryParams`](modules.md#githubqueryparams) |

#### Defined in

[methods/getPosts.ts:29](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPosts.ts#L29)

---

### GetPostsResult

Ƭ **GetPostsResult**: `Unwrap`<`ReturnType`<[`GetPosts`](modules.md#getposts)\>\>

#### Defined in

[methods/getPosts.ts:68](https://github.com/renatorib/github-blog/blob/f53d5a9/src/methods/getPosts.ts#L68)

---

### GithubBlogParams

Ƭ **GithubBlogParams**: `Object`

#### Type declaration

| Name                  | Type                                                            |
| :-------------------- | :-------------------------------------------------------------- |
| `paginationDefaults?` | `Partial`<[`PagerParams`](modules.md#pagerparams)\>             |
| `queryDefaults?`      | `Partial`<[`GithubQueryParams`](modules.md#githubqueryparams)\> |
| `repo`                | `string`                                                        |
| `token`               | `string`                                                        |

#### Defined in

[github-blog.ts:13](https://github.com/renatorib/github-blog/blob/f53d5a9/src/github-blog.ts#L13)

---

### GithubQueryParams

Ƭ **GithubQueryParams**: `Object`

#### Type declaration

| Name         | Type                   |
| :----------- | :--------------------- |
| `author?`    | `string` \| `string`[] |
| `flag?`      | `string` \| `string`[] |
| `notAuthor?` | `string` \| `string`[] |
| `notFlag?`   | `string` \| `string`[] |
| `notState?`  | `string` \| `string`[] |
| `notTag?`    | `string` \| `string`[] |
| `notType?`   | `string` \| `string`[] |
| `overrides?` | `string`               |
| `search?`    | `string`               |
| `slug?`      | `string`               |
| `sort?`      | `Sort`                 |
| `state?`     | `string` \| `string`[] |
| `tag?`       | `string` \| `string`[] |
| `type?`      | `string` \| `string`[] |

#### Defined in

[utils/github-query.ts:12](https://github.com/renatorib/github-blog/blob/f53d5a9/src/utils/github-query.ts#L12)

---

### Label

Ƭ **Label**: typeof `Label.Type`

#### Defined in

[public-types.ts:10](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L10)

---

### Labels

Ƭ **Labels**: typeof `Labels.Type`

#### Defined in

[public-types.ts:13](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L13)

---

### PagerParams

Ƭ **PagerParams**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `after?`  | `string` |
| `before?` | `string` |
| `first?`  | `number` |
| `last?`   | `number` |
| `limit?`  | `number` |
| `offset?` | `number` |

#### Defined in

[utils/pager.ts:1](https://github.com/renatorib/github-blog/blob/f53d5a9/src/utils/pager.ts#L1)

---

### Post

Ƭ **Post**: typeof `Post.Type`

#### Defined in

[public-types.ts:16](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L16)

---

### PostReduced

Ƭ **PostReduced**: typeof `PostReduced.Type`

#### Defined in

[public-types.ts:19](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L19)

---

### Reactions

Ƭ **Reactions**: typeof `Reactions.Type`

#### Defined in

[public-types.ts:22](https://github.com/renatorib/github-blog/blob/f53d5a9/src/public-types.ts#L22)
