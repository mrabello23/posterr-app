import { NextFunction, Request, Response, Router } from "express";
import NodeCache from "node-cache";

import { database } from "../connection";
import PostRepositoryPostgreAdapter from "../../infra/adapters/PostRepositoryPostgreAdapter";
import UserRepositoryPostgreAdapter from "../../infra/adapters/UserRepositoryPostgreAdapter";
import GetUserProfileUseCase from "../../usecases/GetUserProfileUseCase";
import GetPostFeedUseCase from "../../usecases/GetPostFeedUseCase";

const userRouterV1 = Router();

const cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // Numbers in seconds

const postRepository = new PostRepositoryPostgreAdapter(database);
const userRepository = new UserRepositoryPostgreAdapter(database);

const validateCache = (req: Request, res: Response, next: NextFunction) => {
  const cacheKeys = {
    UserProfileCache: `user|profile|${req.body.id}`,
    UserByUsernameCache: `user|usename|${req.params.username}`,
  };

  try {
    if (cache.has(cacheKeys.UserProfileCache)) {
      const cacheData = cache.get(cacheKeys.UserProfileCache);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached", data: cacheData });
    }

    if (cache.has(cacheKeys.UserByUsernameCache)) {
      const cacheData = cache.get(cacheKeys.UserByUsernameCache);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached", data: cacheData });
    }

    return next();
  } catch (error) {
    console.log("Cache error ", error);
    throw error;
  }
};

userRouterV1.post("/v1/user/profile", validateCache, async (req: Request, res: Response) => {
  console.log("body", req.body);

  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  const profile = await getUserProfileUseCase.execute(req.body.user);

  const getPostFeedUseCase = new GetPostFeedUseCase(postRepository);
  const posts = await getPostFeedUseCase.execute({
    feed: "user_profile",
    filter: { userId: req.body.user },
  });

  const returnData = { profile, posts };
  cache.set(`user|profile|${req.body.user}`, returnData);

  res.send({ success: true, message: "Ok", data: returnData });
});

userRouterV1.get("/v1/user/:username", validateCache, async (req: Request, res: Response) => {
  console.log("params", req.params);

  const user = await userRepository.getByUsername(req.params.username);
  console.log(user);

  cache.set(`user|usename|${req.params.username}`, `cached value: ${user}`);

  res.send({ success: true, message: "Ok", data: user });
});

export { userRouterV1 };
