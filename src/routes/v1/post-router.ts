import { NextFunction, Request, Response, Router } from "express";
import NodeCache from "node-cache";

import { database } from "../connection";
import PostRepositoryPostgreAdapter from "../../infra/adapters/PostRepositoryPostgreAdapter";
import QuoteRepositoryPostgreAdapter from "../../infra/adapters/QuoteRepositoryPostgreAdapter";
import PostController from "../../controllers/PostController";

const postRouterV1 = Router();
const cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // Numbers in seconds

const controller = new PostController(
  new PostRepositoryPostgreAdapter(database),
  new QuoteRepositoryPostgreAdapter(database),
);

postRouterV1.post(
  "/v1/post/feed",
  // Set cache key
  (req: Request, res: Response, next: NextFunction) => {
    req.params.cacheKey = `post|homepage|${req.body.user}`;
    return next();
  },
  // Validate cache
  (req: Request, res: Response, next: NextFunction) => {
    if (cache.has(req.params.cacheKey)) {
      const cacheData = cache.get(req.params.cacheKey);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached", data: cacheData });
    }

    return next();
  },
  async (req: Request, res: Response) => {
    try {
      const returnData = await controller.getHomepage(req.body);

      cache.set(req.params.cacheKey, returnData);

      res.send({ success: true, message: "Ok", data: returnData });
    } catch (error) {
      let message = "Unknow error.";
      if (error instanceof Error) message = error.message;

      console.log(message);
      res.status(500).send({ success: false, message });
    }
  },
);

postRouterV1.post("/v1/post", async (req: Request, res: Response) => {
  try {
    await controller.doPost({ userId: req.body.user, text: req.body.text });

    res.send({ success: true, message: "Ok" });
  } catch (error) {
    let message = "Unknow error.";
    if (error instanceof Error) message = error.message;

    console.log(message);
    res.status(500).send({ success: false, message });
  }
});

postRouterV1.post("/v1/repost", async (req: Request, res: Response) => {
  try {
    await controller.doRepost({
      userId: req.body.user,
      text: req.body.text,
      postId: req.body.original_post_id,
    });

    res.send({ success: true, message: "Ok" });
  } catch (error) {
    let message = "Unknow error.";
    if (error instanceof Error) message = error.message;

    console.log(message);
    res.status(500).send({ success: false, message });
  }
});

postRouterV1.post("/v1/quote-post", async (req: Request, res: Response) => {
  try {
    controller.doQuotePost();

    res.send({ success: true, message: "Ok" });
  } catch (error) {
    let message = "Unknow error.";
    if (error instanceof Error) message = error.message;

    console.log(message);
    res.status(500).send({ success: false, message });
  }
});

export { postRouterV1 };
