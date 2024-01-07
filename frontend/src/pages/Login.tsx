import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

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
