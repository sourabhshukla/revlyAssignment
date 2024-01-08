export interface UserModel {
  user_id?: string;
  role: UserType;
  language: string;
  subject: string;
  grade: string;
  username: string;
  password: string;
  email: string;
}

type UserType = "Student" | "Tutor";
