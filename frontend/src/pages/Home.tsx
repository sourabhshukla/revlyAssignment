import Header from "../components/Header";
import DoubtContainer from "../components/DoubtContainer";
// import { enqueueSnackbar } from "notistack";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = () => {
  // enqueueSnackbar("hellp");
  toast.success("hello");
  toast;
  const userType = localStorage.getItem("userType");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  if (!userType || !username || !token) {
    return redirect("/login");
  }
  return null;
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <div className="h-full flex-col flex items-center w-[60vw] mt-40 ">
        <div className="flex justify-between w-[90%] mb-20">
          <input
            type="text"
            placeholder="Brief Description of your Doubt . . ."
            className="input input-bordered w-[80%]"
          />
          <button className="btn btn-secondary">Create A Doubt Request</button>
        </div>
        <DoubtContainer
          text={"My first doubt"}
          status="Active"
          timestamp="1 January 2018"
          subject="Physics"
        />
        <DoubtContainer
          text={"My first doubt"}
          status="Active"
          timestamp="1 January 2018"
          subject="Chemistry"
        />
      </div>
    </div>
  );
}
