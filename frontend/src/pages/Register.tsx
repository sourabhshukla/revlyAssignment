import { redirect } from "react-router-dom";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import SnackbarUtils from "../utils/CustomSnackbar";

export const loader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    SnackbarUtils.warning("Please logout first to Register");
    return redirect("/");
  }
  return null;
};

export default function Register() {
  // toast.success("sg");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <div className="h-full flex items-center">
        <RegisterForm />
      </div>
    </div>
  );
}
