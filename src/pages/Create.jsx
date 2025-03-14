import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateQuizStep1 from "../components/CreateQuizStep1";
import CreateQuizStep2 from "../components/CreateQuizStep2";
import CreateQuizStep3 from "../components/CreateQuizStep3";
import { IoHome } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";

const Create = ({ user }) => {
  let navigate = useNavigate();
  const [error, setError] = useState(""); //Fehlermeldung
  const [message, setMessage] = useState(""); // Meldung
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [quizData, setQuizData] = useState({
    catalog_id: null,
    module_id: null,
    quiz_name: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    answers: [
      { text: "", isCorrect: true },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    explanationText: "",
  });

  // Senden der Quiz Dateien an das Backend mit einer Warnung, dass das Quiz
  const handleSubmit = async () => {
    if (quizData.questions.length < 10) {
      const proceed = window.confirm(
        "Du hast weniger als 10 Fragen angelegt, damit ist dein Quiz noch nicht spielbar. Du kannst allerdings jederzeit unter 'Quiz bearbeiten' weitere Fragen hinzufügen."
      );
      if (!proceed) {
        return; // Stoppt die weiteren Befehle in der Funktion
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/create_quiz.php`,
        { quizData },
        { withCredentials: true } // Pass credentials configuration
      );
      if (response.data.status === "ok") {
        setMessage(
          'Quiz erfolgreich erstellt. Du findest es nun unter "Von mir erstellt" auf deinem Homescreen'
        );
        setSubmitted(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError("Es gab einen Fehler beim Speichern deines Quizzes.");
      }
    } catch (error) {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
      setError("Es gab einen Fehler in der Übermittlung deiner Quizdaten.");
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="base-100 w-screen flex flex-col items-center select-none">
      <Link to="/dashboard" className="absolute top-3 left-3 text-4xl">
        <IoHome className="hover:text-secondary" />
      </Link>
      <header className="flex flex-col items-center w-full mt-4">
        <h1 className="text-4xl font-black text-center mb-8">
          Hey {user.username}, hier kannst du dein eigenes Quiz erstellen
        </h1>
        <ul className="steps mb-8">
          <li className={`step ${step >= 1 && "step-secondary"}`}>Modul</li>
          <li className={`step ${step >= 2 && "step-secondary"}`}>Quizname</li>
          <li className={`step ${step >= 3 && "step-secondary"}`}>
            Fragen & Antworten
          </li>
        </ul>
      </header>
      <div className="w-[50%] max-w-[1200px] min-w-[600px] flex flex-col justify-center bg-base-200 shadow-xl rounded-4xl">
        {step === 1 && (
          <CreateQuizStep1
            quizData={quizData}
            setQuizData={setQuizData}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <CreateQuizStep2
            quizData={quizData}
            setQuizData={setQuizData}
            setStep={setStep}
          />
        )}
        {step >= 3 && (
          <CreateQuizStep3
            quizData={quizData}
            setQuizData={setQuizData}
            setStep={setStep}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setError={setError}
          />
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {step === 4 && (
          <button
            className="btn text-lg bg-success text-neutral-50 mt-8 h-[3rem] hover:bg-secondary mb-8"
            onClick={handleSubmit}
            disabled={submitted}
          >
            <IoIosSave className="text-4xl" />
            Quiz speichern
          </button>
        )}
      </div>
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
    </div>
  );
};

export default Create;
