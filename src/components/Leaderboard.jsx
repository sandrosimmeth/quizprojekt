import axios from "axios";
import { useEffect, useState } from "react";
import { IoPerson, IoRibbon } from "react-icons/io5";

const Leaderboard = ({ setError, userId }) => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/leaderboard.php`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setRanks(response.data.users);
          setLoading(false);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    };
    getLeaderboard();
  }, [setError]);
  return (
    <>
      {loading ? (
        <div>Lade Rangliste...</div>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md w-[80%] max-h-[100%] mb-8 mt-8 overflow-scroll">
          {ranks.map((rank, index) => (
            <li
              key={index}
              className={`${
                rank.user_id == userId && `bg-base-200`
              } p-4 pb-2 text-lg tracking-wide rounded-box`}
            >
              <li className="list-row">
                <div className="text-4xl font-thin opacity-70 tabular-nums ">
                  {index + 1}
                </div>
                <IoPerson className="size-10" />
                <div className="text-xl list-col-grow flex items-center">
                  {rank.username}
                </div>

                <div className="text-2xl font-black opacity-70 tabular-nums flex flex-row items-center">
                  {rank.points} <IoRibbon className="ml-2 size-8 flex" />
                </div>
              </li>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Leaderboard;
