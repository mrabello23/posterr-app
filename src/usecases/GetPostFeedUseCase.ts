import Post, { GetPostFeedRequestData, PostFeed } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";

// User Profile feed:
// - Latest 5 posts, including reposts and quote-posts
// - Older posts are loaded on-demand on chunks of 5 posts

// Homepage feed:
// - Latest 10 posts, including reposts and quote-posts
// - Older posts are loaded on-demand on chunks of 10 posts
// - Filter: All posts / Only mine posts (both options with original post, repost and quote-post)
// - Filter: Optional Date range option ("start date" and "end date") based on the "Posted date"

enum FeedType {
  USERPROFILE = "user_profile",
  HOMEPAGE = "home_page",
}

export default class GetPostFeedUseCase {
  constructor(readonly postRepository: PostRepository) {}

  async execute(data: GetPostFeedRequestData): Promise<PostFeed> {
    console.log("GetPostFeedUseCase.execute", data);
    const { feed } = data;

    switch (feed) {
      case FeedType.HOMEPAGE:
        console.log("GetPostFeedUseCase.getUserProfileFeed");
        return this.buildHomepageFeed(data);
      case FeedType.USERPROFILE:
        console.log("GetPostFeedUseCase.getHomepageFeed");
        return this.buildUserProfileFeed(data);
      default:
        throw new Error("Feed type not implemented.");
    }
  }

  private async buildUserProfileFeed(data: GetPostFeedRequestData): Promise<PostFeed> {
    const { filter } = data;
    const FIRST_PAGE = 1;
    const POSTS_LIMIT = 5;

    if (!filter?.userId) throw new Error("UserId is missing.");

    const totalPostsByUser = await this.postRepository.getTotalPostsByUserId(filter.userId);

    const posts = await this.postRepository.getAllByUserId(filter.userId, {
      page: FIRST_PAGE.toString(),
      size: POSTS_LIMIT.toString(),
    });

    return {
      feed: {
        posts,
        previousPage: FIRST_PAGE - 1,
        nextPage: FIRST_PAGE + 1,
      },
      userId: filter.userId,
      totalPosts: totalPostsByUser,
    };
  }

  private async buildHomepageFeed(data: GetPostFeedRequestData): Promise<PostFeed> {
    const { filter } = data;
    const FIRST_PAGE = 1;
    const POSTS_LIMIT = 10;

    if (filter?.from || filter?.to) {
      if (filter?.userId) {
        return this.getPostsByUserIdAndPostedDate(
          filter.userId,
          FIRST_PAGE,
          POSTS_LIMIT,
          filter.from,
          filter.to,
        );
      }

      return this.getPostsByPostedDate(FIRST_PAGE, POSTS_LIMIT, filter.from, filter.to);
    }

    // Only Mine filter
    if (filter?.userId) {
      return this.getOnlyMinePosts(filter.userId, FIRST_PAGE, POSTS_LIMIT);
    }

    // All posts
    return this.getAllPosts(FIRST_PAGE, POSTS_LIMIT);
  }

  private async getPostsByPostedDate(
    page: number,
    limit: number,
    from?: string,
    to?: string,
  ): Promise<PostFeed> {
    const posts = await this.postRepository.getAllByCreatedAt(
      { from, to },
      { page: page.toString(), size: limit.toString() },
    );

    return {
      feed: {
        posts,
        previousPage: page - 1,
        nextPage: page + 1,
      },
    };
  }

  private async getPostsByUserIdAndPostedDate(
    userId: string,
    page: number,
    limit: number,
    from?: string,
    to?: string,
  ): Promise<PostFeed> {
    const posts = await this.postRepository.getAllByUserIdAndCreatedAt(
      userId,
      { from, to },
      { page: page.toString(), size: limit.toString() },
    );

    return {
      feed: {
        posts,
        previousPage: page - 1,
        nextPage: page + 1,
      },
    };
  }

  private async getOnlyMinePosts(userId: string, page: number, limit: number): Promise<PostFeed> {
    const posts = await this.postRepository.getAllByUserId(userId, {
      page: page.toString(),
      size: limit.toString(),
    });

    return {
      feed: {
        posts,
        previousPage: page - 1,
        nextPage: page + 1,
      },
    };
  }

  private async getAllPosts(page: number, limit: number): Promise<PostFeed> {
    const posts = await this.postRepository.getAll({
      page: page.toString(),
      size: limit.toString(),
    });

    return {
      feed: {
        posts,
        previousPage: page - 1,
        nextPage: page + 1,
      },
    };
  }
}
