import * as dotenv from "dotenv";

if (process.env.ENVIRONMENT === "LOCAL" || process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const { ENVIRONMENT, DB_CONNECTION, PORT } = {
  ENVIRONMENT: process.env.ENVIRONMENT || "",
  DB_CONNECTION: process.env.DB_CONNECTION || "",
  PORT: process.env.PORT || "",
};
