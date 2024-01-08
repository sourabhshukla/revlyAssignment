import express, { Request, Response } from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { UserModel } from "./utils/interfaces";
import routes from "./routes";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import errorHandler from "./middlewares/error";
import cors from "cors";
config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}

app.use("/api/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "NOT_FOUND"));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
