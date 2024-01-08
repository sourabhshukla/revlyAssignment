import axios from "axios";
import { useSnackbar } from "notistack";
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

export default function TutorHomeComponent({
  setDoubtData,
}: {
  setDoubtData: React.Dispatch<React.SetStateAction<DoubtRequest[]>>;
}) {
  const [isOnline, setIsOnline] = useState(false);
  const token = localStorage.getItem("token");
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>("Not Updated Yet");
  const [intervalId, setIntervalId] = useState<number | undefined>();
  const { enqueueSnackbar } = useSnackbar();

  const toggleStatus = () => {
    if (isOnline) {
      clearInterval(intervalId);
      setIsOnline(false);
      enqueueSnackbar("You are now Offline", {
        autoHideDuration: 3000,
        variant: "error",
      });
    } else {
      const id = setInterval(() => {
        const date = new Date(Date.now());
        console.log(typeof date.toDateString());
        axios
          .put(
            `${BASE_URL}/user/tutor/ping`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            setLastUpdatedAt(`Last Pinged At: ${date.toLocaleString()}`);
          })
          .catch((err) => {
            console.error(err);
            setIsOnline(false);
            enqueueSnackbar(err.response?.data?.message, {
              autoHideDuration: 3000,
              variant: "error",
            });
          });

        axios
          .get(`${BASE_URL}/user/tutor/doubts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDoubtData(res.data.data);
          })
          .catch((err) => {
            console.error(err);
            setIsOnline(false);
            enqueueSnackbar(err.response?.data?.message, {
              autoHideDuration: 3000,
              variant: "error",
            });
          });
      }, 3000);
      setIntervalId(id);
      setIsOnline(true);
      enqueueSnackbar("You are now Online", {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
  };
  if (isOnline) {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleStatus}>
          Go Offline
        </button>
        <p className="text-gray-400 text-sm">{lastUpdatedAt}</p>
        <p className="text-green-500">Currently Online</p>
      </>
    );
  } else {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleStatus}>
          Go Online
        </button>
        <p className="text-gray-400 text-sm">{lastUpdatedAt}</p>
        <p className="text-red-500 text-left">Currently Offline</p>
      </>
    );
  }
}
