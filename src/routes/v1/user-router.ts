import { NextFunction, Request, Response, Router } from "express";
import NodeCache from "node-cache";
import PostgreAdapter from "../../infra/adapters/PostgreAdapter";
import UserRepositoryPostgreAdapter from "../../infra/adapters/UserRepositoryPostgreAdapter";
import GetUserProfileUseCase from "../../usecases/GetUserProfileUseCase";

const userRouterV1 = Router();

const cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // Numbers in seconds

const database = new PostgreAdapter();
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

      return res.send({ success: true, message: "Ok Data cached" });
    }

    if (cache.has(cacheKeys.UserByUsernameCache)) {
      const cacheData = cache.get(cacheKeys.UserByUsernameCache);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached" });
    }

    return next();
  } catch (error) {
    console.log("Cache error ", error);
    throw error;
  }
};

userRouterV1.post("/v1/user/profile", validateCache, async (req: Request, res: Response) => {
  console.log("body", req.body);

  const useCase = new GetUserProfileUseCase(userRepository);
  const profile = await useCase.execute(req.body.user);

  cache.set(`user|profile|${req.body.user}`, "cached value");

  res.send({ success: true, message: "Ok", data: profile });
});

userRouterV1.get("/v1/user/:username", validateCache, async (req: Request, res: Response) => {
  console.log("params", req.params);

  const user = await userRepository.getByUsername(req.params.username);
  console.log(user);

  cache.set(`user|usename|${req.params.username}`, `cached value: ${user}`);

  res.send({ success: true, message: "Ok", data: user });
});

export { userRouterV1 };
