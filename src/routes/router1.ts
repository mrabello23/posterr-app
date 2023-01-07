import { NextFunction, Request, Response, Router } from "express";
import NodeCache from "node-cache";

const router1 = Router();

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

router1.get("/route_1/teste", validateCache, (req: Request, res: Response) => {
  console.log(req.query);
  console.log(req.params);

  // TODO: implement controller layer
  cache.set("cache|test|key|" + req.params.id, "cached value");

  res.send({ success: true, message: "Ok" });
});

export { router1 };
