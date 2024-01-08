import axios from "axios";
import { useState } from "react";
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

export default function StudentHomeComponent({
  setDoubtData,
}: {
  setDoubtData: React.Dispatch<React.SetStateAction<DoubtRequest[]>>;
}) {
  const [doubtMsg, setDoubtMsg] = useState("");
  const token = localStorage.getItem("token");

  const createDoubtRequest = async () => {
    await axios.post(
      `${BASE_URL}/user/me/create`,
      { description: doubtMsg },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDoubtMsg("");
    const response = await axios.get(`${BASE_URL}/user/me/doubts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDoubtData(response.data.data);
  };
  return (
    <>
      {" "}
      <input
        type="text"
        value={doubtMsg}
        onChange={(e) => {
          setDoubtMsg(e.target.value);
        }}
        placeholder="Brief Description of your Doubt . . ."
        className="input input-bordered w-[80%]"
      />
      <button className="btn btn-secondary" onClick={createDoubtRequest}>
        Create A Doubt Request
      </button>
    </>
  );
}
