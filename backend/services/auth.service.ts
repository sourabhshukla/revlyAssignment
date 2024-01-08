import bcryptjs from "bcryptjs";
import { UserModel } from "../utils/interfaces";
import { query } from "../db";
import jwt from "jsonwebtoken";
const hashPassword = (password: string) => {
  return bcryptjs.hash(password, 10);
};

const createUser = (user: UserModel) => {
  return query(
    `insert into users (role,language,subject,grade,username,password,email) values ($1,$2,$3,$4,$5,$6,$7)`,
    [
      user.role,
      user.language,
      user.subject,
      user.grade,
      user.username,
      user.password,
      user.email,
    ]
  );
};

const createTutorAvailabilityTable = (id: string) => {
  const currTime = Date.now();
  return query(
    `insert into tutoravailability (tutor_id,last_ping_time) values ($1,to_timestamp($2/1000.0))`,
    [id, currTime]
  );
};

const generateJwtToken = (email: string) => {
  return jwt.sign({ email: email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const comparePassowords = (realPassword: string, userPassword: string) => {
  //order matters
  return bcryptjs.compare(userPassword, realPassword);
};

export {
  hashPassword,
  createUser,
  generateJwtToken,
  comparePassowords,
  createTutorAvailabilityTable,
};
