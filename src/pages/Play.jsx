import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { IoArrowForwardCircle, IoHome } from "react-icons/io5";
import { IoRibbon } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import Rate from "../components/Rate";

const Play = ({ user }) => {
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(""); // Fehlermeldung
  const [message, setMessage] = useState(""); // Meldung
  const [quiz, setQuiz] = useState({}); // geladene Quiz-Daten aus der Datenbank
  const [index, setIndex] = useState(0); //index für die aktuelle Frage, wird sie beantwortet wird er um 1 erhöht
  const [answered, setAnswered] = useState(false); // State, um die Beantwortung einer Frage zu tracken
  const [points, setPoints] = useState(0); // trackt die Punkte für das aktuell gespielte Quiz
  const [correctQuestion, setCorrectQuestion] = useState([]); // trackt richtig beantwortete Fragen über die answer_option_id
  const [clickedIndex, setClickedIndex] = useState(null); //Auf welche Frage hat der Nutzer geklickt?
  const [rate, setRate] = useState(false);
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
    } else if (answered && index === quiz.questions.length - 1) {
      // Hier werden werden Punkte und userAnswerLog aktualisiert
      updateProgress();
      setMessage("Gute Arbeit! Dein Fortschritt wurde gespeichert");
      setRate(true);
    } else {
      setError("Beantworte zuerst die Frage");
    }
  };
  const handleAnswer = (aIndex) => {
    // answered === false heißt, dass der Nutzer noch keine Antwort abgegeben hat
    if (answered === false) {
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

  return (
    <>
      <Link to="/dashboard" className="absolute top-3 left-3 text-4xl">
        <IoHome className="hover:text-secondary" />
      </Link>
      <span className="absolute right-12 text-3xl top-12 flex text-secondary font-bold items-center select-none">
        <IoRibbon className="text-5xl mr-2" />+ {points}
      </span>

      {loading ? (
        <span className="relative top-20 left-20">Lade Quiz-Daten...</span>
      ) : (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-base-100 select-none">
          {rate && (
            <Rate
              setError={setError}
              setMessage={setMessage}
              catalog_id={catalog_id}
            />
          )}
          {/* Quiz Name anzeigen */}
          <h1 className="font-black top-8 text-4xl absolute">
            {quiz.quiz_name}
          </h1>
          <div className="p-4 w-[50%] h-[65%] flex flex-col items-center justify-center  ">
            {/* Frage anzeigen */}
            <div className="mb-4 bg-secondary rounded-4xl h-[40%] w-[95%] justify-center flex items-center shadow-md">
              <span className="mb-2 text-2xl font-black text-center text-base-100">{`${
                index + 1
              }. ${quiz.questions[index].text}`}</span>
            </div>

            {/* Antwortmöglichkeiten */}
            <ul className="answers-list grid grid-cols-2 gap-4 w-[95%]">
              {quiz.questions[index].answers.map((answer, aIndex) => (
                <li
                  key={aIndex}
                  className={`shadow-md answer-item pl-1 pr-1 pt-6 pb-6 font-black rounded-2xl text-lg text-center cursor-pointer ${
                    answered
                      ? "bg-accent"
                      : "hover:bg-secondary hover:text-base-100 bg-base-200"
                  } ${
                    answered &&
                    quiz.questions[index].answers[aIndex].is_correct === 1 &&
                    "!bg-primary"
                  } ${clickedIndex === aIndex && "border-3 border-secondary"} `}
                  onClick={() => handleAnswer(aIndex)}
                >
                  {answer.text}
                </li>
              ))}
            </ul>
            {quiz.questions[index].explanation_text && answered && (
              <div className="bg-amber-300 text-lg text-bold text-neutral w-[95%] mt-4 pt-4 pb-4 rounded-4xl flex-row items-center flex shadow-md">
                <FaLightbulb className="text-4xl ml-4 mr-4" />{" "}
                <span className="">
                  {quiz.questions[index].explanation_text}
                </span>
              </div>
            )}
            <IoArrowForwardCircle
              className={`text-6xl cursor-pointer mt-4 ${
                answered === false
                  ? "text-neutral"
                  : "text-primary hover:text-secondary"
              }`}
              onClick={handleForward}
            />
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
