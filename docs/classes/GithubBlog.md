[@rena.to/github-blog](../README.md) / GithubBlog

# Class: GithubBlog

## Table of contents

### Constructors

- [constructor](GithubBlog.md#constructor)

### Properties

- [buildPager](GithubBlog.md#buildpager)
- [buildQuery](GithubBlog.md#buildquery)
- [client](GithubBlog.md#client)
- [getComments](GithubBlog.md#getcomments)
- [getLabels](GithubBlog.md#getlabels)
- [getPinnedPosts](GithubBlog.md#getpinnedposts)
- [getPost](GithubBlog.md#getpost)
- [getPosts](GithubBlog.md#getposts)
- [repo](GithubBlog.md#repo)
- [sdk](GithubBlog.md#sdk)

## Constructors

### constructor

• **new GithubBlog**(`params`)

#### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `params` | [`GithubBlogParams`](../README.md#githubblogparams) |

#### Defined in

[github-blog.ts:26](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L26)

## Properties

### buildPager

• **buildPager**: (`args?`: [`PagerParams`](../README.md#pagerparams)) => `Omit`<[`PagerParams`](../README.md#pagerparams), `"offset"`\>

#### Type declaration

▸ (`args?`): `Omit`<[`PagerParams`](../README.md#pagerparams), `"offset"`\>

##### Parameters

| Name    | Type                                      |
| :------ | :---------------------------------------- |
| `args?` | [`PagerParams`](../README.md#pagerparams) |

##### Returns

`Omit`<[`PagerParams`](../README.md#pagerparams), `"offset"`\>

#### Defined in

[github-blog.ts:24](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L24)

---

### buildQuery

• **buildQuery**: (`args?`: [`GithubQueryParams`](../README.md#githubqueryparams)) => `string`

#### Type declaration

▸ (`args?`): `string`

##### Parameters

| Name    | Type                                                  |
| :------ | :---------------------------------------------------- |
| `args?` | [`GithubQueryParams`](../README.md#githubqueryparams) |

##### Returns

`string`

#### Defined in

[github-blog.ts:23](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L23)

---

### client

• **client**: `GraphQLClient`

#### Defined in

[github-blog.ts:20](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L20)

---

### getComments

• **getComments**: (`params`: [`GetCommentsParams`](../README.md#getcommentsparams)) => `Promise`<`Object`\>

#### Type declaration

▸ (`params`): `Promise`<`Object`\>

##### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `params` | [`GetCommentsParams`](../README.md#getcommentsparams) |

##### Returns

`Promise`<`Object`\>

#### Defined in

[github-blog.ts:39](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L39)

---

### getLabels

• **getLabels**: (`params?`: [`GetLabelsParams`](../README.md#getlabelsparams)) => `Promise`<`Object`\>

#### Type declaration

▸ (`params?`): `Promise`<`Object`\>

##### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `params?` | [`GetLabelsParams`](../README.md#getlabelsparams) |

##### Returns

`Promise`<`Object`\>

#### Defined in

[github-blog.ts:40](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L40)

---

### getPinnedPosts

• **getPinnedPosts**: () => `Promise`<`Object`\>

#### Type declaration

▸ (): `Promise`<`Object`\>

##### Returns

`Promise`<`Object`\>

#### Defined in

[github-blog.ts:41](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L41)

---

### getPost

• **getPost**: (`params`: [`GetPostParams`](../README.md#getpostparams)) => `Promise`<{ `post`: `null` = null } \| { `post`: `Post` }\>

#### Type declaration

▸ (`params`): `Promise`<{ `post`: `null` = null } \| { `post`: `Post` }\>

##### Parameters

| Name     | Type                                          |
| :------- | :-------------------------------------------- |
| `params` | [`GetPostParams`](../README.md#getpostparams) |

##### Returns

`Promise`<{ `post`: `null` = null } \| { `post`: `Post` }\>

#### Defined in

[github-blog.ts:38](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L38)

---

### getPosts

• **getPosts**: (`params`: [`GetPostsParams`](../README.md#getpostsparams)) => `Promise`<`Object`\>

#### Type declaration

▸ (`params`): `Promise`<`Object`\>

##### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `params` | [`GetPostsParams`](../README.md#getpostsparams) |

##### Returns

`Promise`<`Object`\>

#### Defined in

[github-blog.ts:37](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L37)

---

### repo

• **repo**: `string`

#### Defined in

[github-blog.ts:22](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L22)

---

### sdk

• **sdk**: `Object`

#### Type declaration

| Name             | Type                                                                                                     |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| `GetComments`    | (`variables`: `Exact`<`Object`\>, `requestHeaders?`: `HeadersInit`) => `Promise`<`GetCommentsQuery`\>    |
| `GetLabels`      | (`variables`: `Exact`<`Object`\>, `requestHeaders?`: `HeadersInit`) => `Promise`<`GetLabelsQuery`\>      |
| `GetPinnedPosts` | (`variables`: `Exact`<`Object`\>, `requestHeaders?`: `HeadersInit`) => `Promise`<`GetPinnedPostsQuery`\> |
| `GetPost`        | (`variables`: `Exact`<`Object`\>, `requestHeaders?`: `HeadersInit`) => `Promise`<`GetPostQuery`\>        |
| `GetPosts`       | (`variables`: `Exact`<`Object`\>, `requestHeaders?`: `HeadersInit`) => `Promise`<`GetPostsQuery`\>       |

#### Defined in

[github-blog.ts:21](https://github.com/renatorib/github-blog/blob/694d2f5/src/github-blog.ts#L21)
