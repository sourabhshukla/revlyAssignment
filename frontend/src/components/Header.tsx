import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoutComponentProps {
  username: string | null;
}

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const gotoHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-slate-200 flex justify-between items-center py-2 w-full">
      <button onClick={gotoHome} className="btn ml-5 font-bold">
        Home
      </button>
      <div className="flex gap-6 items-center pr-5">
        {username ? (
          <LogoutComponent username={username} />
        ) : (
          <LoginComponent />
        )}
      </div>
    </nav>
  );
}

const LogoutComponent: React.FC<LogoutComponentProps> = ({ username }) => {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  console.log(username);
  return (
    <>
      <p className="capitalize">{username}</p>
      <button onClick={logout} className="btn btn-primary">
        Logout
      </button>
    </>
  );
};

const LoginComponent = () => {
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <button onClick={gotoLogin} className="btn btn-primary btn-outline">
        Login
      </button>
      <button onClick={gotoRegister} className="btn btn-primary">
        Register
      </button>
    </>
  );
};
