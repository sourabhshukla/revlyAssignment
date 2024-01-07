import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };
  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoRegister = () => {
    navigate("/register");
  };
  return (
    <nav className="bg-slate-200 flex justify-between items-center py-2 w-full">
      <button onClick={gotoHome} className="btn ml-5 font-bold">
        Home
      </button>
      <div className="flex gap-6 cursor-pointer pr-5">
        <button onClick={gotoLogin} className="btn btn-primary btn-outline">
          Login
        </button>
        <button onClick={gotoRegister} className="btn btn-primary">
          Register
        </button>
      </div>
    </nav>
  );
}
