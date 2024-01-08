import { redirect } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import SnackbarUtils from "../utils/CustomSnackbar";

export const loader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    SnackbarUtils.warning("User is already logged In. Logout to login again");
    return redirect("/");
  }
  return null;
};

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <div className="h-full flex items-center">
        <LoginForm />
      </div>
    </div>
  );
}
