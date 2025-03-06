import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { IoArrowForwardCircle, IoHome } from "react-icons/io5";
import { IoRibbon } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import Rate from "../components/Rate";
import Report from "../components/Report";
import { TbMessageReportFilled } from "react-icons/tb";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Play = ({ user }) => {
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(""); // Fehlermeldung
  const [message, setMessage] = useState(""); // Meldung
  const [quiz, setQuiz] = useState({}); // geladene Quiz-Daten aus der Datenbank
  const [index, setIndex] = useState(0); //index für die aktuelle Frage, wird sie beantwortet wird er um 1 erhöht
  const [answered, setAnswered] = useState(false); // State, um die Beantwortung einer Frage zu tracken
  const [points, setPoints] = useState(0); // trackt die Punkte für das aktuell gespielte Quiz
  const [wrongCount, setWrongCount] = useState(0); // trackt die Punkte für das aktuell gespielte Quiz
  const [correctQuestion, setCorrectQuestion] = useState([]); // trackt richtig beantwortete Fragen über die answer_option_id
  const [clickedIndex, setClickedIndex] = useState(null); //Auf welche Frage hat der Nutzer geklickt?
  const [rate, setRate] = useState(false);
  const [report, setReport] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(true);

  const location = useLocation();

  // Parsing der Query Parameter
  const queryParams = new URLSearchParams(location.search);

  // Catalog_id aus query parameter
  const catalog_id = queryParams.get("catalog_id");

  const updateProgress = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/update_progress.php`,
        { points, correctQuestion, user_id: user.user_id, catalog_id },
        { withCredentials: true }
      );
      // Überprüfen, ob die API-Antwort erfolgreich war
      if (response.data.status === "ok") {
        console.log("Updated");
      } else {
        // Wenn die Antwort nicht "ok" ist -> Fehlermeldung
        setError(
          `Es gab einen Fehler beim Speichern deines Fortschritts: ${response.data.message}`
        );
      }
    } catch (error) {
      console.log(error);
      setError("Ein Fehler ist beim Aufruf des Servers aufgetreten."); // Fehlernachricht für den Benutzer
    }
  };

  const handleForward = () => {
    if (answered && index < quiz.questions.length - 1) {
      setAnswered(false);
      setIndex(index + 1);
      setError("");
      setClickedIndex(null);
      setReport(false);
      resetTimer();
    } else if (answered && index === quiz.questions.length - 1) {
      // Hier werden werden Punkte und userAnswerLog aktualisiert
      updateProgress();
      setMessage("Gute Arbeit! Dein Fortschritt wurde gespeichert");
      setRate(true);
      setReport(false);
    } else {
      setError("Beantworte zuerst die Frage");
    }
  };
  const handleAnswer = (aIndex) => {
    // answered === false heißt, dass der Nutzer noch keine Antwort abgegeben hat
    if (answered === false) {
      setIsRunning(false);
      // validate überprüft, ob die Antwort des Nutzers richtig war
      let validate = quiz.questions[index].answers[aIndex].is_correct;
      if (validate === 1) {
        // Punkte des aktuellen Spiels updaten
        setPoints(points + 1);
        // korrekte Antworten für den User-Answer-Log speichern, damit richtig beantwortete Fragen in Zukunkt nicht noch einmal angezeigt werden
        setCorrectQuestion((prevLog) => [
          ...prevLog,
          quiz.questions[index].question_id,
        ]);
      } else {
        setWrongCount(wrongCount + 1);
      }
      setClickedIndex(aIndex);
      setAnswered(true);
    }
  };
  // useEffect: Führe getQuiz aus, wenn die Komponente gerendert wird und catalog_id vorhanden ist
  useEffect(() => {
    // Überprüfe, ob catalog_id fehlt
    if (!catalog_id) {
      console.error("catalog_id fehlt in den Query-Parametern."); // Logge einen Fehler in der Konsole
      setError("Kein gültiger Quiz-Katalog gefunden."); // Setze eine verständliche Fehlermeldung für den Nutzer
      setLoading(false); // Beende den Ladezustand
      return; // Beende den Effekt frühzeitig, um unnötige Ausführung zu vermeiden
    }
    //Hier wird das Quiz geladen, auf das der Nutzer geklickt hat
    // wird im Query (?catalog_id="")der URL übergeben
    // Fetch modules from the database
    const getQuiz = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/play.php`,
          { catalog_id },
          { withCredentials: true }
        );
        // Überprüfen, ob die API-Antwort erfolgreich war
        if (response.data.status === "ok") {
          setQuiz(response.data.quiz);
          setMessage(response.data.message);
          setLoading(false); // Ladezustand beenden, wenn es keinen Fehler gab
        } else {
          // Wenn die Antwort nicht "ok" ist -> Fehlermeldung
          setError(
            `Es gab einen Fehler beim Laden des Quizzes: ${response.data.message}`
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen des Quizzes:", error);
        setError("Ein Fehler ist beim Aufruf des Servers aufgetreten."); // Fehlernachricht für den Benutzer
      }
    };
    // Führe die Funktion zum Laden des Quiz aus
    getQuiz();
  }, [catalog_id]); // Abhängig von catalog_id

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // Set the message to null after 10 seconds
      }, 5000); // 10 seconds in milliseconds

      // Clear the timer if the component unmounts or if the message is cleared
      return () => clearTimeout(timer);
    }
  }, [error]); // Only run the effect when the message state changes

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // Set the message to null after 10 seconds
      }, 5000); // 10 seconds in milliseconds

      // Clear the timer if the component unmounts or if the message is cleared
      return () => clearTimeout(timer);
    }
  }, [message]); // Only run the effect when the message state changes

  useEffect(() => {
    if (timeLeft <= 0 || !isRunning) {
      if (timeLeft <= 0) {
        setAnswered(true);
        setWrongCount((wrongCount) => wrongCount + 1);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning]);

  const resetTimer = () => {
    setTimeLeft(20);
    setAnswered(false);
    setIsRunning(true);
  };

  const widthPercentage = (timeLeft / 20) * 100;
  const barColor = timeLeft <= 5 ? "red-400" : "green-400";

  return (
    <>
      <header className="flex flex-row justify-between p-4 w-screen">
        <Link to="/dashboard" className="text-4xl">
          <IoHome className="hover:text-secondary" />
        </Link>
        <span className="text-3xl font-black">{quiz.quiz_name}</span>
        <span className=" text-2xl flex text-neutral font-black items-center select-none opacity-70">
          <IoRibbon className="text-3xl mr-2" />
          {points}
        </span>
      </header>
      {loading ? (
        <span className="relative top-20 left-20">Lade Quiz-Daten...</span>
      ) : (
        <div className="flex flex-col items-center justify-center w-screen bg-base-100 select-none mt-16">
          {rate && (
            <Rate
              setError={setError}
              setMessage={setMessage}
              catalog_id={catalog_id}
            />
          )}
          {report && (
            <Report
              setError={setError}
              setMessage={setMessage}
              question_id={quiz.questions[index].question_id}
              setReport={setReport}
            />
          )}
          <div className="w-[50%] min-w-[400px] max-w-[1000px] flex flex-col items-center justify-center">
            <div className="w-[70%] text-center text-2xl">
              <span
                className={`font-black transition-color duration-1000`}
                style={{
                  color: `${
                    timeLeft <= 5
                      ? `var(--color-red-400)`
                      : `var(--color-green-400)`
                  }`,
                }}
              >
                {timeLeft}
              </span>
              <div
                className={`${
                  timeLeft <= 0 ? `bg-red-400` : `bg-base-200`
                } rounded-full h-4 mb-4 overflow-hidden`}
              >
                <div
                  className={`bg-${barColor} h-4 rounded-full transition-all duration-1000`}
                  style={{ width: `${widthPercentage}%` }}
                ></div>
              </div>
            </div>
            {/* Frage anzeigen */}
            <div className="mb-4 pt-28 pb-28 pl-2 pr-2 relative bg-secondary rounded-4xl w-full justify-center flex items-center shadow-md">
              <TbMessageReportFilled
                className="absolute top-0 left-0 rounded-br-4xl text-neutral bg-base-100 p-2 size-12 cursor-pointer hover:text-amber-500"
                data-tooltip-id="tooltip-report"
                data-tooltip-content="Fehler oder sonstiges in der Frage melden"
                onClick={() => setReport((prev) => !prev)}
              />
              <Tooltip id="tooltip-report" />

              <span className="mb-2 text-2xl font-black text-center text-base-100">{`${
                index + 1
              }. ${quiz.questions[index].text}`}</span>
            </div>

            {/* Antwortmöglichkeiten */}
            <ul className="answers-list grid grid-cols-2 grid-rows-2 gap-4 w-full">
              {quiz.questions[index].answers.map((answer, aIndex) => (
                <li
                  key={aIndex}
                  className={`shadow-md answer-item pl-2 pr-2 pt-8 pb-8 font-black rounded-2xl text-lg text-center cursor-pointer transition-colors duration-100 ease-in ${
                    answered
                      ? "bg-red-400"
                      : "hover:bg-secondary hover:text-base-100 bg-base-200"
                  } ${
                    answered &&
                    quiz.questions[index].answers[aIndex].is_correct === 1 &&
                    "!bg-green-400 "
                  } ${clickedIndex === aIndex && "border-3 border-secondary"} `}
                  onClick={() => handleAnswer(aIndex)}
                >
                  {answer.text}
                </li>
              ))}
            </ul>
            {/* {quiz.questions[index].explanation_text && answered && ( */}
            <div
              className={`bg-amber-300 mt-4 text-neutral w-[100%] rounded-full items-center flex flex-row shadow-md overflow-hidden transition-height duration-200 ease-in-out ${
                quiz.questions[index].explanation_text && answered
                  ? `h-auto p-4`
                  : `h-0`
              }`}
            >
              <FaLightbulb className="text-2xl ml-2 mr-2 basis-1/16" />
              <span className="pl-4 pr-4 basis-15/16 font-bold italic text-lg">
                {quiz.questions[index].explanation_text}
              </span>
            </div>
            {/* )} */}
            <IoArrowForwardCircle
              className={`text-6xl mt-4 transition-colors duration-300 ease-in-out ${
                answered === false
                  ? "text-base-300"
                  : "text-neutral hover:text-secondary cursor-pointer"
              }`}
              onClick={handleForward}
            />
          </div>
          <div className="w-[70%] max-w-[1200px] h-2 gap-2 mt-4 flex flex-row mb-8">
            <div
              className="bg-green-400 rounded-full h-full transition-[width] duration-600 ease-in-out"
              style={{ width: `${points * 10}%` }}
            ></div>
            <div
              className="bg-red-400 rounded-full h-full transition-[width] duration-600 ease-in-out"
              style={{ width: `${wrongCount * 10}%` }}
            ></div>
            <div
              className="bg-base-300 rounded-full h-full transition-[width] duration-600 ease-in-out"
              style={{ width: `${(10 - (points + wrongCount)) * 10}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Fehler anzeigen */}
      {error && (
        <div className="bottom-4 z-30 fixed flex justify-center w-full">
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      {/* Meldung */}
      {message && (
        <div className="bottom-4 z-30 fixed flex justify-center w-full">
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Play;
