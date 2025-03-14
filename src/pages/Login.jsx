import quizLogo from "../assets/logo_quiz.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(""); // Nachricht für erfolgreiche Anmeldung
  const [success, setSuccess] = useState(0); // Variable für erfolgreiche Anmeldung 0 = Fehler 1 = Erfolg
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/login_process.php`,
        { username, password },
        { withCredentials: true }
      );
      setMsg(response.data.message);
      setSuccess(response.data.success);
      if (response.data.success === 1) {
        setUser({
          username: response.data.username,
          user_id: response.data.user_id,
        });
        setTimeout(function () {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Login fehlgeschlagen", error);
    }
  };

  return (
    <>
      <div className="bg-linear-to-bl from-primary to-secondary w-screen min-h-screen flex flex-col items-center font-[Nunito] justify-center select-none">
        <div className="bg-base-100 flex flex-col items-center h-[36rem] w-[26rem] mt-[-2rem] justify-center shadow-xl rounded-2xl p-4">
          <img src={quizLogo} className="w-48 mb-auto" />
          <h2 className="text-center text-quiz-800 font-black text-3xl mb-8">
            Willkommen bei Quizify!
            <br />
            Logge dich jetzt ein!
          </h2>
          <span
            className={`font-bold flex flex-col items-center ${
              success === 1 ? "text-green-800" : "text-red-700"
            }`}
          >
            {success === 1 && (
              <span className="block loading loading-dots loading-lg"></span>
            )}

            {msg}
          </span>
          <form
            className="flex items-center flex-col mb-24"
            onSubmit={handleLogin}
          >
            <label className="input validator mt-4 rounded-2xl w-72 h-10 text-base bg-quiz-800 text-quiz-50">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                value={username}
                placeholder="Benutzername"
                onChange={(e) => setUsername(e.target.value)}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                autoComplete="on"
                required
              />
            </label>
            <label className="input validator mt-2 rounded-2xl w-72 h-10 bg-quiz-800 text-quiz-50 text-base">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                autoComplete="on"
                required
              />
            </label>

            <button
              type="submit"
              className="btn mt-2 w-42 rounded-2xl bg-base-200 text-neutral hover:bg-secondary hover:text-base-100 border-0"
            >
              <IoIosLogIn className="text-2xl mr-2" />
              Login
            </button>
          </form>
        </div>
      </div>

      <footer className="text-base-100 absolute bottom-6 w-screen text-center">
        Eine Projektarbeit von Christopher Geuking, Christoph Werner, Luca
        Hörsting, Joé Martins und Sandro Simmeth.
      </footer>
    </>
  );
};
export default Login;
