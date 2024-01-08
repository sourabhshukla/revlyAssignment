import { useState } from "react";
import Header from "../components/Header";
import DoubtContainer from "../components/DoubtContainer";
import { redirect, useLoaderData } from "react-router-dom";
import TutorHomeComponent from "../components/TutorHomeComponent";
import StudentHomeComponent from "../components/StudentHomeComponent";
import axios from "axios";
import { BASE_URL } from "../utils/config";

interface DoubtRequest {
  doubt_description: string;
  doubt_id: number;
  doubt_subject: string;
  doubt_time: string;
  grade: string;
  is_accepted: boolean;
  tutor_id: number | null;
}

export const loader = async () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  if (!role || !username || !token) {
    // SnackbarUtils.warning("Please login to access this resource");
    return redirect("/login");
  }

  try {
    if (role === "Student") {
      const res = await axios.get(`${BASE_URL}/user/me/doubts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      // console.log(typeof res.data.data[0].doubt_time);
      return res.data.data;
    } else {
      const res = await axios.get(`${BASE_URL}/user/tutor/doubts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(res.data.data);
      // console.log(typeof res.data.data[0].doubt_time);
      return res.data.data;
    }
  } catch (e: any) {
    console.log(e);
    // SnackbarUtils.error(e.response?.data?.message);
  }

  return null;
};

export default function Home() {
  const role = localStorage.getItem("role");
  const data: DoubtRequest[] = useLoaderData() as DoubtRequest[];
  const [doubtData, setDoubtData] = useState<DoubtRequest[]>(data);
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="h-full flex-col flex items-center w-[60vw] mt-40 ">
        <div className="flex justify-between items-center w-[90%] mb-20">
          {role === "Tutor" ? (
            <TutorHomeComponent setDoubtData={setDoubtData} />
          ) : (
            <StudentHomeComponent setDoubtData={setDoubtData} />
          )}
        </div>
        {doubtData.map((item) => (
          <DoubtContainer
            text={item.doubt_description}
            status={item.is_accepted}
            timestamp={item.doubt_time}
            subject={item.doubt_subject}
          />
        ))}
      </div>
    </div>
  );
}
