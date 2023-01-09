export type PostEntity = {
  id: string;
  text: string;
  user_id: string;
  quote?: string;
  repost: boolean;
  created_at: string;
};

export type GetPostFeedRequestData = {
  feed: string;
  filter?: { userId?: string; from?: string; to?: string };
};

export type GetPostRequestData = {
  page: number;
  userId?: string;
  from?: string;
  to?: string;
};

export default class Post {
  private id: string;
  private text: string;
  private userId: string;
  private quote: string | undefined;
  private repost: boolean;
  private createdAt: string;

  constructor(data: PostEntity) {
    const { id, text, user_id, quote, repost, created_at } = data;

    this.id = id;
    this.text = text;
    this.userId = user_id;
    this.quote = quote;
    this.repost = repost;
    this.createdAt = created_at;
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
  getQuote() {
    return this.quote;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getRepost() {
    return this.repost;
  }
}

export type Feed = {
  posts: Post[];
  previousPage: number;
  nextPage: number;
};

export type PostFeed = {
  feed: Feed;
  userId?: string;
  totalPosts?: number;
};
