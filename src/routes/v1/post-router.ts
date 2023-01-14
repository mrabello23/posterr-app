import { Request, Response, Router } from "express";

import { database } from "../connection";
import PostRepositoryPostgreAdapter from "../../infra/adapters/PostRepositoryPostgreAdapter";
import UserRepositoryPostgreAdapter from "../../infra/adapters/UserRepositoryPostgreAdapter";
import PostController from "../../controllers/PostController";
import MakePostUseCase from "../../usecases/MakePostUseCase";

const postRouterV1 = Router();

const postRepository = new PostRepositoryPostgreAdapter(database);
const controller = new PostController(
  new MakePostUseCase(postRepository),
  new UserRepositoryPostgreAdapter(database),
);

postRouterV1.post("/v1/post", async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);
    controller.doPost();

    res.send({ success: true, message: "Ok", data: [] });
  } catch (error) {
    let message = "Unknow error.";
    if (error instanceof Error) message = error.message;

    res.status(500).send({ success: false, message });
  }
});

postRouterV1.post("/v1/repost", async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);
    controller.doRepost();

    res.send({ success: true, message: "Ok", data: [] });
  } catch (error) {
    let message = "Unknow error.";
    if (error instanceof Error) message = error.message;

    res.status(500).send({ success: false, message });
  }
});

postRouterV1.post("/v1/quote-post", async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);
    controller.doQuotePost();

    res.send({ success: true, message: "Ok", data: [] });
  } catch (error) {
    let message = "Unknow error.";
    if (error instanceof Error) message = error.message;

    res.status(500).send({ success: false, message });
  }
});

export { postRouterV1 };
