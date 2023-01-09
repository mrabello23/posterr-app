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
    let posts: Post[];

    if (filter?.from || filter?.to) {
      posts = await this.postRepository.getAllByCreatedAt(
        {
          from: filter.from,
          to: filter.to,
        },
        { page: FIRST_PAGE.toString(), size: POSTS_LIMIT.toString() },
      );
    } else {
      posts = await this.postRepository.getAll({
        page: FIRST_PAGE.toString(),
        size: POSTS_LIMIT.toString(),
      });
    }

    return {
      feed: {
        posts,
        previousPage: FIRST_PAGE - 1,
        nextPage: FIRST_PAGE + 1,
      },
    };
  }
}
