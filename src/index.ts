import express, { Express } from "express";
import { config } from "dotenv";
import { AppDataSource } from "./database/data-store";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./auth/auth.route";
import { logger } from "./logger/logger.service";
import { handleError } from "./middleware/error/error-handler.middleware";
import userRoute from "./user/user.route";

config();

const app: Express = express();

// Define the allowed origin

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

AppDataSource.initialize()
  .then(async () => {
    app.use("/auth", authRoute);
    app.use("/user", userRoute);
    app.use(handleError);

    app.use((req, res, next) => {
      res.status(404).send({
        message: "Not Found",
        status: 404,
        additionalInfo: "Route not found",
      });
    });

    app.listen(process.env.APP_PORT, () => {
      logger.info(
        `🚀 Server is running at http://localhost:${process.env.APP_PORT}`
      );
    });
  })
  .catch(async (error) => {
    console.log(error.message);
  });
