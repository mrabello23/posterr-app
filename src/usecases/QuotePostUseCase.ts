import { randomUUID } from "crypto";

import Post, { CreatePostRequestData, PostEntity } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";

// Constraints:
// - A user is not allowed to post more than 5 posts in one day (including reposts and quote posts)
// - Posts can have a maximum of 777 characters
// - Quote-post: Users can repost other users' posts and leave a comment limited to original and reposts, not quote-posts

export default class QuotePostUseCase {
  constructor(readonly postRepository: PostRepository) {}

  async execute(data: CreatePostRequestData): Promise<void> {
    const { text, userId, postId } = data;

    await this.validatePost(userId, text, postId);

    const dataToSave: PostEntity = {
      id: randomUUID(),
      text,
      user_id: userId,
      original_post_id: postId,
      created_at: new Date().toDateString(),
    };

    await this.postRepository.save(new Post(dataToSave));
  }

  private async validatePost(userId: string, text: string, postId?: string): Promise<void> {
    if (text.length > 777) throw new Error("Your Post is too long. Max 777 characters.");
  }
}
