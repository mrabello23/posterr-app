import { Feed, GetPostRequestData } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";

// User Profile feed:
// - Posts are loaded on-demand on chunks of 5 posts

// Homepage feed:
// - Posts are loaded on-demand on chunks of 10 posts
// - Filter: All posts / Only mine posts (both options with original post, repost and quote-post)
// - Filter: Optional Date range option ("start date" and "end date") based on the "Posted date"

export default class GetPostUseCase {
  constructor(readonly postRepository: PostRepository) {}

  async execute(data: GetPostRequestData): Promise<Feed> {
    console.log("GetPostUseCase.execute", data);
    throw new Error("not implemented.");
  }
}
