import { RequestHandler } from "express";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const getSingleUserDoubt: RequestHandler = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.user_id;
    if (!userId) {
      return next(new ApiError(httpStatus.BAD_REQUEST, "BAD_REQUEST"));
    }
    const { rows } = await userService.getSingleUserDoubts(userId);
    res.status(httpStatus.OK).json({
      success: true,
      data: rows,
    });
  }
);

const createDoubtRequest: RequestHandler = async (req, res, next) => {
  const userId = req.user?.user_id;
  const subject = req.user?.subject;
  const grade = req.user?.grade;
  const language = req.user?.language;
  if (!userId || !subject || !grade || !language) {
    return next(new ApiError(httpStatus.BAD_REQUEST, "BAD_REQUEST"));
  }
  const { description } = req.body;
  const result = await userService.createDoubtRequest(
    userId,
    description,
    subject,
    grade,
    language
  );
  console.log(result);
  res.status(httpStatus.CREATED).json({
    success: true,
  });
};

const getTutorMatchingDoubts: RequestHandler = catchAsync(
  async (req, res, next) => {
    const tutor_id = req.user?.user_id;
    const subject = req.user?.subject;
    const grade = req.user?.grade;
    const language = req.user?.language;

    if (!tutor_id || !subject || !grade || !language) {
      return next(new ApiError(httpStatus.BAD_REQUEST, "BAD_REQUEST"));
    }

    const { rows } = await userService.getTutorMatchingDoubts(
      subject,
      grade,
      language
    );

    res.status(httpStatus.OK).json({
      success: true,
      data: rows,
    });
  }
);

const pingTutor: RequestHandler = catchAsync(async (req, res, next) => {
  const tutor_id = req.user?.user_id;

  if (!tutor_id) {
    return next(new ApiError(httpStatus.BAD_REQUEST, "BAD_REQUEST"));
  }
  const result = await userService.pingTutor(tutor_id);
  res.status(httpStatus.OK).json({ success: true, result });
});

export {
  getSingleUserDoubt,
  createDoubtRequest,
  getTutorMatchingDoubts,
  pingTutor,
};
