import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";

const Logout = ({ className }) => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/quiz/quizprojekt/php/api/logout.php",
        {},
        { withCredentials: true }
      );
      if (response.data.message === 1) {
        // Leeren der clientseitgen session storage nach erfolgreichem API Call
        sessionStorage.removeItem("user");
        setMessage(
          "Logout erfolgreich! Du wirst wieder zur Login-Seite weitergeleitet"
        );
        // Nutzer zur Login-Seite weiterleiten nach 1 sec
        setTimeout(function () {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      alert("Logout fehlgeschlagen:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className={`${className} btn text-sm rounded-2xl bg-base-200 text-neutral hover:bg-red-500 hover:text-base-100 border-0`}
      >
        <IoIosLogOut className="mr-2 text-2xl" />
        Abmelden
      </button>
      {message && (
        <div className="fixed top-0 left-0 z-50 backdrop-blur-sm w-screen h-screen flex flex-col items-center justify-center">
          <div className="w-[42rem] h-[12rem] bg-primary text-base-100 font-bold text-lg flex flex-col items-center justify-center rounded-4xl">
            <span className=" loading loading-dots loading-lg flex"></span>
            {message}
          </div>
        </div>
      )}
    </>
  );
};
export default Logout;
