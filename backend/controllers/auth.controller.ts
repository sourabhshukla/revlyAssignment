import { RequestHandler } from "express";
import { UserModel } from "../utils/interfaces";
import { authService, userService } from "../services";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

const registerUser: RequestHandler = catchAsync(async (req, res, next) => {
  const user: UserModel = req.body;
  const hashed_password = await authService.hashPassword(user.password);
  user.password = hashed_password;
  const result = await authService.createUser(user);
  if (user.role === "Tutor") {
    const newUser = await userService.getUserByEmail(user.email);
    await authService.createTutorAvailabilityTable(newUser.user_id);
  }
  const token = authService.generateJwtToken(user.email);
  res.status(httpStatus.CREATED).json({
    success: true,
    result,
    token,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await userService.getUserByEmail(email);
  const isPasswordMatching = await authService.comparePassowords(
    user.password,
    password
  );
  const token = authService.generateJwtToken(user.email);
  delete user.password;
  if (isPasswordMatching) {
    res.status(httpStatus.OK).json({
      success: true,
      user,
      token,
    });
  } else {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Username or password incorrect" });
  }
});

export { registerUser, loginUser };
