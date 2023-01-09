import { Request, Response, Router } from "express";

import { database } from "../connection";
import PostRepositoryPostgreAdapter from "../../infra/adapters/PostRepositoryPostgreAdapter";
import UserRepositoryPostgreAdapter from "../../infra/adapters/UserRepositoryPostgreAdapter";

const postRouterV1 = Router();

const postRepository = new PostRepositoryPostgreAdapter(database);
const userRepository = new UserRepositoryPostgreAdapter(database);

postRouterV1.post("/v1/post", async (req: Request, res: Response) => {
  console.log("body", req.body);
  res.send({ success: true, message: "Ok", data: [] });
});

postRouterV1.post("/v1/repost", async (req: Request, res: Response) => {
  console.log("body", req.body);
  res.send({ success: true, message: "Ok", data: [] });
});

postRouterV1.post("/v1/quote-post", async (req: Request, res: Response) => {
  console.log("body", req.body);
  res.send({ success: true, message: "Ok", data: [] });
});

export { postRouterV1 };
