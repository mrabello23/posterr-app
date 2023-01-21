import Quote from "./Quote";

export type PostEntity = {
  id: string;
  text: string;
  user_id: string;
  repost?: boolean;
  original_post_id?: string;
  created_at?: string;
};

export default class Post {
  private id: string;
  private text: string;
  private userId: string;
  private originalPostId: string | undefined;
  private repost: boolean | undefined;
  private createdAt: string | undefined;

  constructor(data: PostEntity) {
    const { id, text, user_id, repost, created_at, original_post_id } = data;

    this.id = id;
    this.text = text;
    this.userId = user_id;
    this.repost = repost;
    this.createdAt = created_at;
    this.originalPostId = original_post_id;
  }

  getId() {
    return this.id;
  }
  getText() {
    return this.text;
  }
  getUserId() {
    return this.userId;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getRepost() {
    return this.repost;
  }
  getOriginalPostId() {
    return this.originalPostId;
  }
}

export type Feed = {
  posts: Post[];
  quotes?: Quote[];
  previousPage: number;
  nextPage: number;
};

export type UserProfileFeed = {
  feed: Feed;
  userId?: string;
  totalPosts?: number;
};

export type GetPostFeedRequestData = {
  userId?: string;
  from?: string;
  to?: string;
};

export type GetPostRequestData = {
  page: number;
  userId?: string;
  from?: string;
  to?: string;
};

export enum PostType {
  POST = "post",
  REPOST = "repost",
  QUOTEPOST = "quote-post",
}

export type CreatePostRequestData = {
  text: string;
  userId: string;
  postId?: string;
  type: PostType;
};
