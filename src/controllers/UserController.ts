import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

import { PostFeed } from "../entities/Post";
import User from "../entities/User";
import GetPostFeedUseCase from "../usecases/GetPostFeedUseCase";
import GetUserProfileUseCase from "../usecases/GetUserProfileUseCase";

export default class UserController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly getPostFeedUseCase: GetPostFeedUseCase,
    private readonly cache: NodeCache,
  ) {}

  async getUserProfile(userId: string): Promise<{ profile: User; posts: PostFeed }> {
    const profile = await this.getUserProfileUseCase.execute(userId);

    const posts = await this.getPostFeedUseCase.execute({
      feed: "user_profile",
      filter: { userId },
    });

    return { profile, posts };
  }

  validateCache(req: Request, res: Response, next: NextFunction) {
    const cacheKeys = {
      UserProfileCache: `user|profile|${req.body.id}`,
      UserByUsernameCache: `user|usename|${req.params.username}`,
    };

    if (this.cache.has(cacheKeys.UserProfileCache)) {
      const cacheData = this.cache.get(cacheKeys.UserProfileCache);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached", data: cacheData });
    }

    if (this.cache.has(cacheKeys.UserByUsernameCache)) {
      const cacheData = this.cache.get(cacheKeys.UserByUsernameCache);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached", data: cacheData });
    }

    return next();
  }
}
