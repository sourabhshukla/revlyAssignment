import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUserData({ ...userData, [target.name]: target.value });
  };

  const validateInput = () => {
    if (userData.email === "" || userData.password === "") {
      enqueueSnackbar("All fields are mandatory", {
        autoHideDuration: 3000,
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateInput()) {
      try {
        const res = await axios.post(`${BASE_URL}/auth/login`, userData);
        const data = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.user.role);
        navigate("/");
        enqueueSnackbar("User logged in Successfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
      } catch (e: any) {
        console.log(e);
        enqueueSnackbar(e.response?.data?.message, {
          autoHideDuration: 3000,
          variant: "error",
        });
      }
    }
  };
  return (
    <div className="flex flex-col rounded-lg justify-around items-center border-2 w-96 p-8 gap-y-8 border-solid ">
      <h2 className="text-3xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-block btn-primary" onClick={handleSubmit}>
        Login
      </button>
      <div>
        Don't have an Account?{" "}
        <Link to="/register" className="text-primary">
          Register Now
        </Link>
      </div>
    </div>
  );
}
