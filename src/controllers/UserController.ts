import { Feed } from "../entities/Post";
import User from "../entities/User";

import PostRepository from "../infra/repositories/PostRepository";
import QuoteRepository from "../infra/repositories/QuoteRepository";
import UserRepository from "../infra/repositories/UserRepository";

import GetUserProfileFeedUseCase from "../usecases/GetUserProfileFeedUseCase";
import GetUserProfileUseCase from "../usecases/GetUserProfileUseCase";

declare type UserProfile = {
  profile: User;
  feed: Feed;
  totalPosts: number | undefined;
};

export default class UserController {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async getUserProfile(userId: string): Promise<UserProfile> {
    console.log("UserController.getUserProfile");

    const getUserProfileUseCase = new GetUserProfileUseCase(this.userRepository);
    const profile = await getUserProfileUseCase.execute(userId);

    const getUserProfileFeedUseCase = new GetUserProfileFeedUseCase(
      this.postRepository,
      this.quoteRepository,
    );
    const posts = await getUserProfileFeedUseCase.execute({ userId });

    return { profile, feed: posts.feed, totalPosts: posts.totalPosts };
  }

  async getUserData(username: string): Promise<User> {
    console.log("UserController.getUserData");
    return this.userRepository.getByUsername(username);
  }
}
