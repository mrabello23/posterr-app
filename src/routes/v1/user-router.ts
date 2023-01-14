import { Request, Response, Router } from "express";
import NodeCache from "node-cache";

import { database } from "../connection";
import PostRepositoryPostgreAdapter from "../../infra/adapters/PostRepositoryPostgreAdapter";
import UserRepositoryPostgreAdapter from "../../infra/adapters/UserRepositoryPostgreAdapter";
import GetUserProfileUseCase from "../../usecases/GetUserProfileUseCase";
import GetPostFeedUseCase from "../../usecases/GetPostFeedUseCase";
import UserController from "../../controllers/UserController";

const userRouterV1 = Router();

const cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // Numbers in seconds

const postRepository = new PostRepositoryPostgreAdapter(database);
const userRepository = new UserRepositoryPostgreAdapter(database);

const controller = new UserController(
  new GetUserProfileUseCase(userRepository),
  new GetPostFeedUseCase(postRepository),
  cache,
);

userRouterV1.post(
  "/v1/user/profile",
  controller.validateCache,
  async (req: Request, res: Response) => {
    try {
      const returnData = await controller.getUserProfile(req.body.user);
      cache.set(`user|profile|${req.body.user}`, returnData);

      res.send({ success: true, message: "Ok", data: returnData });
    } catch (error) {
      let message = "Unknow error.";
      if (error instanceof Error) message = error.message;

      res.status(500).send({ success: false, message });
    }
  },
);

userRouterV1.get(
  "/v1/user/:username",
  controller.validateCache,
  async (req: Request, res: Response) => {
    try {
      const user = await userRepository.getByUsername(req.params.username);
      cache.set(`user|usename|${req.params.username}`, `cached value: ${user}`);

      res.send({ success: true, message: "Ok", data: user });
    } catch (error) {
      let message = "Unknow error.";
      if (error instanceof Error) message = error.message;

      res.status(500).send({ success: false, message });
    }
  },
);

export { userRouterV1 };
