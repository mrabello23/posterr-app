import { randomUUID } from "crypto";

import { CreatePostRequestData } from "../entities/Post";
import Quote from "../entities/Quote";
import PostRepository from "../infra/repositories/PostRepository";
import QuoteRepository from "../infra/repositories/QuoteRepository";

// Constraints:
// - A user is not allowed to post more than 5 posts in one day (including reposts and quote posts)
// - Posts can have a maximum of 777 characters
// - Quote-post: Users can repost other users' posts and leave a comment limited to original and reposts, not quote-posts

export default class QuotePostUseCase {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(data: CreatePostRequestData): Promise<void> {
    const { text, userId, postId } = data;

    const quoteEntity = new Quote({
      id: randomUUID(),
      text,
      user_id: userId,
      original_post_id: postId as string,
    });

    await this.validateQuotePostDailyLimit(data);

    await this.quoteRepository.save(quoteEntity);
  }

  private async validateQuotePostDailyLimit(data: CreatePostRequestData): Promise<void> {
    const { userId, postId } = data;

    const quote = await this.quoteRepository.getById(postId!);

    if (quote && quote.getId()) throw new Error("You cannot quote a quoted post.");

    const date = new Date();
    const from = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 00:00:00`;
    const to = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 23:59:59`;

    const posts = await this.postRepository.getAllByUserIdAndCreatedAt(
      userId,
      { from, to },
      { page: "1", size: "5" },
    );

    const quotes = await this.quoteRepository.getAllByUserIdAndCreatedAt(
      userId,
      { from, to },
      { page: "1", size: "5" },
    );

    if (posts && quotes && posts.length + quotes.length === 5) {
      throw new Error("You reached the daily post limit (up to 5).");
    }
  }
}
