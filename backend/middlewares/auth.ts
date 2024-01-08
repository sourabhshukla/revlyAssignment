import { RequestHandler } from "express";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userService } from "../services";

const isAuthenticatedUser: RequestHandler = catchAsync(
  async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(
        new ApiError(
          httpStatus.UNAUTHORIZED,
          "Please Login to access this resource"
        )
      );
    }

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = await userService.getUserByEmail(decodedData.email);
    next();
  }
);

const isStudent: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "Student") {
    return next(
      new ApiError(
        httpStatus.FORBIDDEN,
        `Role ${req.user?.role} is not allowed to access this resource`
      )
    );
  }
  next();
};

const isTutor: RequestHandler = (req, res, next) => {
  console.log(req.user);
  if (req.user?.role !== "Tutor") {
    return next(
      new ApiError(
        httpStatus.FORBIDDEN,
        `Role ${req.user?.role} is not allowed to access this resource`
      )
    );
  }
  next();
};

export { isAuthenticatedUser, isStudent, isTutor };
