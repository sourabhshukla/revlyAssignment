import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";

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
