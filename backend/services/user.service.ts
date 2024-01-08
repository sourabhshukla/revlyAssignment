import { query } from "../db";

const getUserByEmail = async (email: string) => {
  const { rows } = await query("select * from users where email=$1", [email]);
  return rows[0];
};
const getSingleUserDoubts = (id: string) => {
  return query(
    "select * from doubtrequests where student_id=$1 order by doubt_time desc",
    [id]
  );
};
const createDoubtRequest = (
  studentId: string,
  description: string,
  subject: string,
  grade: string,
  language: string
) => {
  return query(
    "insert into doubtrequests (student_id,doubt_subject,doubt_description,grade,language) values ($1,$2,$3,$4,$5)",
    [studentId, subject, description, grade, language]
  );
};
const getTutorMatchingDoubts = (
  subject: string,
  grade: string,
  language: string
) => {
  return query(
    "select * from doubtrequests where doubt_subject=$1 and grade=$2 and language=$3 order by doubt_time desc",
    [subject, grade, language]
  );
};
const pingTutor = (id: string) => {
  const currTime = Date.now();
  return query(
    `update tutoravailability set last_ping_time=(to_timestamp($1/1000.0))`,
    [currTime]
  );
};
export {
  getUserByEmail,
  getSingleUserDoubts,
  createDoubtRequest,
  getTutorMatchingDoubts,
  pingTutor,
};
