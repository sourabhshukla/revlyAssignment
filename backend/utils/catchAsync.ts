import { NextFunction, Request, Response } from "express";

function catchAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}

export default catchAsync;
