interface Props {
  text: string;
  status: boolean;
  timestamp: string;
  subject: string;
}

export default function DoubtContainer({
  text,
  status,
  timestamp,
  subject,
}: Props) {
  const color = status ? "text-green-500" : "text-red-500";
  return (
    <div className="card w-full bg-base-100 shadow-xl cursor-pointer mt-12">
      <div className="card-body flex flex-col  justify-between">
        <div className="flex flex-row justify-between w-full">
          <p className="text-wrap flex-wrap text-left">{text}</p>

          <p className={color + " font-semibold text-right"}>
            {status ? "Accepted" : "Pending"}
          </p>
        </div>
        <p className="text-right text-gray-400 text-sm">
          {subject + " • " + timestamp}
        </p>
      </div>
    </div>
  );
}
