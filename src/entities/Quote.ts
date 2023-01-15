export type QuoteEntity = {
  id: string;
  text: string;
  user_id: string;
  original_post_id: string;
  created_at?: string;
};

export default class Quote {
  private id: string;
  private text: string;
  private userId: string;
  private originalPostId: string;
  private createdAt: string | undefined;

  constructor(data: QuoteEntity) {
    const { id, text, user_id, created_at, original_post_id } = data;

    this.id = id;
    this.text = text;
    this.userId = user_id;
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
  getOriginalPostId() {
    return this.originalPostId;
  }
}

export type CreateQuoteRequestData = {
  text: string;
  userId: string;
  postId: string;
};
