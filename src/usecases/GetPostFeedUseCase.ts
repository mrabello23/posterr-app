import { GetPostFeedRequestData, Feed } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";
import QuoteRepository from "../infra/repositories/QuoteRepository";

// Homepage feed:
// - Latest 10 posts, including reposts and quote-posts
// - Older posts are loaded on-demand on chunks of 10 posts
// - Filter: All posts / Only mine posts (both options with original post, repost and quote-post)
// - Filter: Optional Date range option ("start date" and "end date") based on the "Posted date"

export default class GetPostFeedUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async execute(data: GetPostFeedRequestData): Promise<Feed> {
    const { from, to, userId } = data;
    const FIRST_PAGE = 1;
    const POSTS_LIMIT = 10;

    if (from || to) {
      if (userId) {
        return this.getPostsByUserIdAndPostedDate(userId, FIRST_PAGE, POSTS_LIMIT, from, to);
      }

      return this.getPostsByPostedDate(FIRST_PAGE, POSTS_LIMIT, from, to);
    }

    // Only Mine filter
    if (userId) {
      return this.getOnlyMinePosts(userId, FIRST_PAGE, POSTS_LIMIT);
    }

    // All posts
    return this.getAllPosts(FIRST_PAGE, POSTS_LIMIT);
  }

  private async getPostsByPostedDate(
    page: number,
    limit: number,
    from?: string,
    to?: string,
  ): Promise<Feed> {
    const posts = await this.postRepository.getAllByCreatedAt(
      { from, to },
      { page: page.toString(), size: limit.toString() },
    );

    const quotes = await this.quoteRepository.getAllByCreatedAt(
      { from, to },
      { page: page.toString(), size: limit.toString() },
    );

    return {
      posts,
      quotes,
      previousPage: page <= 1 ? 1 : page - 1,
      nextPage: page + 1,
    };
  }

  private async getPostsByUserIdAndPostedDate(
    userId: string,
    page: number,
    limit: number,
    from?: string,
    to?: string,
  ): Promise<Feed> {
    const posts = await this.postRepository.getAllByUserIdAndCreatedAt(
      userId,
      { from, to },
      { page: page.toString(), size: limit.toString() },
    );

    const quotes = await this.quoteRepository.getAllByUserIdAndCreatedAt(
      userId,
      { from, to },
      { page: page.toString(), size: limit.toString() },
    );

    return {
      posts,
      quotes,
      previousPage: page <= 1 ? 1 : page - 1,
      nextPage: page + 1,
    };
  }

  private async getOnlyMinePosts(userId: string, page: number, limit: number): Promise<Feed> {
    const posts = await this.postRepository.getAllByUserId(userId, {
      page: page.toString(),
      size: limit.toString(),
    });

    const quotes = await this.quoteRepository.getAllByUserId(userId, {
      page: page.toString(),
      size: limit.toString(),
    });

    return {
      posts,
      quotes,
      previousPage: page <= 1 ? 1 : page - 1,
      nextPage: page + 1,
    };
  }

  private async getAllPosts(page: number, limit: number): Promise<Feed> {
    const posts = await this.postRepository.getAll({
      page: page.toString(),
      size: limit.toString(),
    });

    const quotes = await this.quoteRepository.getAll({
      page: page.toString(),
      size: limit.toString(),
    });

    return {
      posts,
      quotes,
      previousPage: page <= 1 ? 1 : page - 1,
      nextPage: page + 1,
    };
  }
}
