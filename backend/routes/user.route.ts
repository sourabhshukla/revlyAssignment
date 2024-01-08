import express from "express";
import { isAuthenticatedUser, isStudent, isTutor } from "../middlewares/auth";
import { userController } from "../controllers";
const router = express.Router();

router.get(
  "/me/doubts",
  isAuthenticatedUser,
  isStudent,
  userController.getSingleUserDoubt
);
router.post(
  "/me/create",
  isAuthenticatedUser,
  isStudent,
  userController.createDoubtRequest
);
router.get(
  "/tutor/doubts",
  isAuthenticatedUser,
  isTutor,
  userController.getTutorMatchingDoubts
);
router.put(
  "/tutor/ping",
  isAuthenticatedUser,
  isTutor,
  userController.pingTutor
);
export default router;
