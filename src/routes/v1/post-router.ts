import { NextFunction, Request, Response, Router } from "express";
import NodeCache from "node-cache";
import PostgreAdapter from "../../infra/adapters/PostgreAdapter";
import PostRepositoryPostgreAdapter from "../../infra/adapters/PostRepositoryPostgreAdapter";

const postRouterV1 = Router();

const cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // Numbers in seconds

const database = new PostgreAdapter();
const userRepository = new PostRepositoryPostgreAdapter(database);

const validateCache = (req: Request, res: Response, next: NextFunction) => {
  const cacheKeys = {
    PostIdCache: `post|id|${req.params.postId}`,
  };

  try {
    if (cache.has(cacheKeys.PostIdCache)) {
      const cacheData = cache.get(cacheKeys.PostIdCache);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached" });
    }

    return next();
  } catch (error) {
    console.log("Cache error ", error);
    throw error;
  }
};

postRouterV1.get("/v1/post/:postId", validateCache, async (req: Request, res: Response) => {
  console.log("params", req.params);

  cache.set(`post|id|${req.params.postId}`, `cached value`);

  res.send({ success: true, message: "Ok", data: [] });
});

postRouterV1.post("/v1/post", validateCache, async (req: Request, res: Response) => {
  console.log("body", req.body);
  res.send({ success: true, message: "Ok", data: [] });
});

postRouterV1.post("/v1/re-post", validateCache, async (req: Request, res: Response) => {
  console.log("body", req.body);
  res.send({ success: true, message: "Ok", data: [] });
});

postRouterV1.post("/v1/quote-post", validateCache, async (req: Request, res: Response) => {
  console.log("body", req.body);
  res.send({ success: true, message: "Ok", data: [] });
});

export { postRouterV1 };
