import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <div className="h-full flex items-center">
        <RegisterForm />
      </div>
    </div>
  );
}
