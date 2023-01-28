import { randomUUID } from "crypto";

import Post, { CreatePostRequestData, PostEntity, PostType } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";
import QuoteRepository from "../infra/repositories/QuoteRepository";

// Constraints:
// - A user is not allowed to post more than 5 posts in one day (including reposts and quote posts)
// - Posts can have a maximum of 777 characters
// - Reposting: Users can repost other users' posts, limited to original posts and quote posts, not reposts

export default class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async execute(data: CreatePostRequestData): Promise<void> {
    const { type, text, userId, postId } = data;

    if (!text) throw new Error("Post text not found.");
    if (!userId) throw new Error("User Id not found.");

    if (type === PostType.POST) {
      await this.createPost(userId, text);
      return;
    }

    if (!postId) throw new Error("Original post id not found.");
    await this.createRepost(userId, text, postId);
  }

  private async validatePostData(userId: string, text: string): Promise<void> {
    if (text.length > 777) throw new Error("Your Post is too long. Max 777 characters.");

    const date = new Date();
    const from = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`;
    const to = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`;

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

    if (posts && quotes && posts.length + quotes.length >= 5) {
      throw new Error("You reached the daily post limit (up to 5).");
    }
  }

  private async createPost(userId: string, text: string): Promise<void> {
    await this.validatePostData(userId, text);

    const dataToSave: PostEntity = {
      id: randomUUID(),
      text,
      user_id: userId,
      created_at: new Date().toDateString(),
    };

    return this.postRepository.save(new Post(dataToSave));
  }

  private async createRepost(userId: string, text: string, postId: string): Promise<void> {
    await this.validatePostData(userId, text);

    const post = await this.postRepository.getById(postId);
    if (post && post.getRepost()) throw new Error("You cannot repost a reposted post.");

    const dataToSave: PostEntity = {
      id: randomUUID(),
      text,
      user_id: userId,
      repost: true,
      original_post_id: postId,
      created_at: new Date().toDateString(),
    };

    return this.postRepository.save(new Post(dataToSave));
  }
}
