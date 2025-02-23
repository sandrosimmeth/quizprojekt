import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateQuizStep1 from "../components/CreateQuizStep1";
import CreateQuizStep2 from "../components/CreateQuizStep2";
import CreateQuizStep3 from "../components/CreateQuizStep3";
import { IoHome } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";

const Create = ({ user }) => {
  const [step, setStep] = useState(1);
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
        console.log("Save action canceled.");
        return; // Stoppt die weiteren Befehle in der Funktion
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/create_quiz.php`,
        { quizData },
        { withCredentials: true } // Pass credentials configuration
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="base-100 w-screen h-screen flex flex-col items-center select-none">
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
      <div className="w-[50rem] flex flex-col justify-center bg-base-200 shadow-xl rounded-4xl">
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
          />
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {step === 4 && (
          <button
            className="btn text-lg bg-success text-neutral-50 mt-8 h-[3rem] hover:bg-secondary"
            onClick={handleSubmit}
          >
            <IoIosSave className="text-4xl" />
            Quiz speichern
          </button>
        )}
      </div>
    </div>
  );
};

export default Create;
