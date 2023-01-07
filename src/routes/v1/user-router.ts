import { NextFunction, Request, Response, Router } from "express";
import NodeCache from "node-cache";

const userRouterV1 = Router();

const cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // Numbers in seconds

const validateCache = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKeys = {
      CacheKey1: "cache|test|key|" + req.params.id,
    };

    if (cache.has(cacheKeys.CacheKey1)) {
      const cacheData = cache.get(cacheKeys.CacheKey1);
      console.log("cache", cacheData);

      return res.send({ success: true, message: "Ok Data cached" });
    }

    return next();
  } catch (error) {
    throw error;
  }
};

userRouterV1.post("/v1/user/profile", validateCache, (req: Request, res: Response) => {
  console.log("body", req.body);

  // TODO: implement controller layer
  cache.set("cache|test|key|" + req.body.id, "cached value");

  res.send({ success: true, message: "Ok" });
});

userRouterV1.get("/v1/user/:username", validateCache, (req: Request, res: Response) => {
  console.log("params", req.params);

  // TODO: implement controller layer
  cache.set("cache|test|key|" + req.params.username, "cached value");

  res.send({ success: true, message: "Ok" });
});

export { userRouterV1 };
