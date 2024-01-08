import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

export default function RegisterForm() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    subject: "",
    role: "",
    language: "",
    grade: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    console.log(target);
    setUserData({ ...userData, [target.name]: target.value });
  };

  const validateInput = () => {
    for (const value of Object.values(userData)) {
      if (value === "") {
        enqueueSnackbar("All fields are mandatory", {
          autoHideDuration: 3000,
          variant: "warning",
        });
        return false;
      }
    }
    if (userData.password !== confirmPassword) {
      enqueueSnackbar("Password and Confirm Password should be same", {
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
        const res = await axios.post(`${BASE_URL}/auth/register`, userData);
        enqueueSnackbar("Registered Successfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        navigate("/login");
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
    <div className="flex flex-col rounded-lg justify-around items-center border-2 w-96 p-8 gap-y-4 border-solid ">
      <h2 className="text-3xl font-bold">Register</h2>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        placeholder="Confirm Password"
        className="input input-bordered w-full max-w-xs"
      />
      <select
        name="subject"
        value={userData.subject}
        onChange={handleInputChange}
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option value="" disabled selected>
          Subject
        </option>
        <option value="Biology">Biology</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Physics">Physics</option>
        <option value="Maths">Maths</option>
      </select>
      <select
        onChange={handleInputChange}
        name="role"
        value={userData.role}
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option value="" disabled selected>
          Role
        </option>
        <option value="Student">Student</option>
        <option value="Tutor">Tutor</option>
      </select>
      <select
        onChange={handleInputChange}
        name="language"
        value={userData.language}
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option value="" disabled selected>
          Language
        </option>
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
        <option value="Marathi">Marathi</option>
        <option value="Tamil">Tamil</option>
        <option value="Telugu">Telugu</option>
      </select>
      <select
        onChange={handleInputChange}
        name="grade"
        value={userData.grade}
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option value="" disabled selected>
          Grade
        </option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <button className="btn btn-block btn-primary" onClick={handleSubmit}>
        Register
      </button>
      <div>
        Already have an Account?{" "}
        <Link to="/login" className="text-primary">
          Login here
        </Link>
      </div>
    </div>
  );
}
