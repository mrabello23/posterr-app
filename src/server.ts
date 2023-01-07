import express, { Request, Response } from "express";
import compression from "compression";

import { PORT } from "./envs";
import { router1, router2 } from "./routes";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use(router1);
app.use(router2);

app.get("/", (req: Request, res: Response) => {
  console.log("Up and Running.");
  res.send({ status: "Ok", message: "Server is Up and Running!" });
});

// serve static files (Frontend)
// app.use(express.static("public"));

app.listen(PORT);
