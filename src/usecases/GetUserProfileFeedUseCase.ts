import { GetPostFeedRequestData, UserProfileFeed } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";
import QuoteRepository from "../infra/repositories/QuoteRepository";

// User Profile feed:
// - Latest 5 posts, including reposts and quote-posts
// - Older posts are loaded on-demand on chunks of 5 posts

export default class GetUserProfileFeedUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async execute(data: GetPostFeedRequestData): Promise<UserProfileFeed> {
    const { userId } = data;

    const FIRST_PAGE = 1;
    const POSTS_LIMIT = 5;

    if (!userId) throw new Error("UserId is missing.");

    const totalPostsByUser = await this.postRepository.getTotalPostsByUserId(userId);
    const totalQuotesByUser = await this.quoteRepository.getTotalByUserId(userId);

    const posts = await this.postRepository.getAllByUserId(userId, {
      page: FIRST_PAGE.toString(),
      size: POSTS_LIMIT.toString(),
    });

    const quotes = await this.quoteRepository.getAllByUserId(userId, {
      page: FIRST_PAGE.toString(),
      size: POSTS_LIMIT.toString(),
    });

    return {
      feed: {
        posts,
        quotes,
        previousPage: FIRST_PAGE <= 1 ? 1 : FIRST_PAGE - 1,
        nextPage: FIRST_PAGE + 1,
      },
      userId,
      totalPosts: Number(totalPostsByUser) + Number(totalQuotesByUser),
    };
  }
}
