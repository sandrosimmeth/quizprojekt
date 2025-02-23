import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHome, IoSave } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";
import EditQuestion from "../components/EditQuestion";

const Edit = ({ user }) => {
  const [quizData, setQuizData] = useState({}); // geladene Quiz-Daten aus der Datenbank
  const [currentQuestion, setCurrentQuestion] = useState([]); // Aktuell bearbeitende Frage
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(""); // Fehlermeldung
  const [modules, setModules] = useState([]); // Modules from the database
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [message, setMessage] = useState(""); // Nachricht für Operationen
  const [add, setAdd] = useState(false); // Nachricht für Operationen
  const navigate = useNavigate();
  const location = useLocation();

  // Parsing der Query Parameter
  const queryParams = new URLSearchParams(location.search);

  // Catalog_id aus query parameter
  const catalog_id = queryParams.get("catalog_id");

  // Quiz Namen ändern: User Input im Array updaten
  const handleQuizNameChange = (event) => {
    setQuizData({
      ...quizData,
      quiz_name: event.target.value,
    });
  };
  // Modul ändern: User Input im Array updaten
  const handleModuleChange = (event) => {
    setQuizData({
      ...quizData,
      module_id: event.target.value,
    });
  };
  // Frage löschen: User Input im Array updaten
  const handleDelete = (index) => {
    const updatedQuestions = quizData.questions.filter(
      (_, qIndex) => qIndex !== index
    );
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  const handleEditQuestion = (index) => {
    setShowEditQuestion(true);
    console.log(quizData.questions[index]);
    setCurrentQuestion(quizData.questions[index]);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/update_quiz.php`,
        { quizData },
        { withCredentials: true }
      );
      // Überprüfen, ob die API-Antwort erfolgreich war
      if (response.data.status === "ok") {
        setMessage(response.data.message);
      } else {
        // Wenn die Antwort nicht "ok" ist -> Fehlermeldung
        setError(
          `Es gab einen Fehler beim Speichern des Quizzes: ${response.data.message}`
        );
      }
    } catch (error) {
      console.error("Fehler beim Upaten des Quizzes:", error);
      setError("Ein Fehler ist beim Aufruf des Servers aufgetreten."); // Fehlernachricht für den Benutzer
    }
  };

  const handleAddQuestion = () => {
    setAdd(true);
    setCurrentQuestion({
      text: "",
      answers: [
        { text: "", is_correct: true },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ],
      explanation_text: "",
    });
    setShowEditQuestion(true);
  };
  const handleDeleteQuiz = async () => {
    const proceed = window.confirm(
      "Bist du sicher, dass du dieses Quiz löschen möchtest?"
    );
    if (!proceed) {
      console.log("Delete action canceled.");
      return; // Stoppt die weiteren Befehle in der Funktion
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/delete_quiz.php`,
        { catalog_id }
      );
      if (response.data.status === "ok") {
        setMessage(response.data.message);
        navigate("/dashboard");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Aufruf der Funktion getModules() bei rendern der Komponente
  useEffect(() => {
    // Module aus der DB holen
    const getModules = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/get_module.php`,
          {}
        );
        setModules(response.data.modules);
      } catch (error) {
        setError("Fehler beim Laden der Module.");
        console.log(error);
      }
    };
    getModules();
  }, []);

  // useEffect: Führe getQuiz aus, wenn die Komponente gerendert wird und catalog_id vorhanden ist
  useEffect(() => {
    if (!catalog_id) {
      console.error("catalog_id fehlt in den Query-Parametern.");
      setError("Kein gültiger Quiz-Katalog gefunden."); // Fehlernachricht setzen, wenn catalog_id fehlt
      setLoading(false); // Ladezustand beenden
      return; // Verhindere die Ausführung der getQuiz-Funktion
    }
    //Hier wird das Quiz geladen, auf das der Nutzer geklickt hat
    // wird im Query (?catalog_id="")der URL übergeben
    // Fetch modules from the database
    const getQuiz = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/get_quiz.php`,
          { catalog_id },
          { withCredentials: true }
        );
        // Überprüfen, ob die API-Antwort erfolgreich war
        if (response.data.status === "ok") {
          console.log(response.data.quiz);
          setQuizData(response.data.quiz);
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

    getQuiz(); // Funktion ausführen, um das Quiz zu laden
  }, [catalog_id]); // Abhängig von catalog_id (wenn sich catalog_id ändert, wird der Effekt erneut ausgeführt)

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
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // Set the message to null after 10 seconds
      }, 5000); // 10 seconds in milliseconds

      // Clear the timer if the component unmounts or if the message is cleared
      return () => clearTimeout(timer);
    }
  }, [error]); // Only run the effect when the message state changes

  return (
    <div className="base-100 w-screen h-screen flex flex-col items-center select-none">
      <Link to="/dashboard" className="absolute top-3 left-3 text-4xl">
        <IoHome className="hover:text-secondary" />
      </Link>
      <header className="flex flex-col items-center w-full mt-4">
        <h1 className="text-4xl font-black text-center mb-8">
          Hey {user.username}, hier kannst du dein Quiz bearbeiten
        </h1>
      </header>
      {showEditQuestion && (
        <div className="backdrop-blur-xl w-screen h-screen fixed top-0 left-0 z-10 flex flex-col items-center justify-center">
          <div className="w-[50rem] flex flex-col justify-center bg-base-200 shadow-xl rounded-4xl">
            <EditQuestion
              setQuizData={setQuizData}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              setShowEditQuestion={setShowEditQuestion}
              add={add}
              setAdd={setAdd}
              setError={setError}
            />
          </div>
        </div>
      )}
      {loading ? (
        <span>Lade Quiz-Daten...</span>
      ) : (
        <>
          <span className="text-lg font-bold">Modul:</span>
          <select
            className="text-center text-xl rounded-4xl h-12 !bg-base-100"
            value={quizData.module_id}
            id="moduleDataList"
            disabled={loading}
            onChange={handleModuleChange}
          >
            <option value="invalid" disabled>
              Wähle ein Modul aus...
            </option>
            {modules.map((module) => (
              <option key={module.module_id} value={module.module_id}>
                {module.name}
              </option>
            ))}
          </select>
          <span className="text-lg font-bold mt-4">Name:</span>

          <input
            className="pl-6 pr-6  border-b-2 border-t-0 border-l-0 border-r-0 text-2xl text-center font-bold focus:outline-none"
            value={quizData.quiz_name}
            onChange={handleQuizNameChange}
          />
          <ul className="grid grid-cols-6 gap-4 w-[95%] mt-12">
            {quizData.questions.map((question, qIndex) => (
              <li
                key={qIndex}
                className="shadow-md pl-1 pr-1 pt-8 pb-8 font-black rounded-2xl text-lg text-center cursor-pointer bg-base-200 flex flex-col items-center justify-center hover:bg-secondary hover:text-base-100 relative"
                onClick={() => handleEditQuestion(qIndex)}
              >
                <span className="bg-base-100 p-1 absolute right-1 top-1 rounded-full">
                  <IoTrash
                    className="text-2xl !text-neutral  hover:!text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(qIndex);
                    }}
                  />
                </span>
                <span className="flex">{question.text}</span>
              </li>
            ))}
            <li
              key="createNewQuestion"
              className="shadow-md pl-1 pr-1 pt-8 pb-8 font-black rounded-2xl text-lg text-center cursor-pointer bg-base-200 flex flex-col items-center justify-center hover:bg-secondary hover:text-base-100 relative"
              onClick={handleAddQuestion}
            >
              <IoAddCircle className="text-6xl" />
            </li>
          </ul>
          <div className="w-[10rem] bg-base-200 shadow-xl rounded-2xl"></div>
          <button
            className="btn mt-8 w-54 h-14 rounded-2xl bg-success hover:bg-green-700 text-neutral hover:text-base-100 border-0 flex text-xl font-bold"
            onClick={handleSave}
          >
            <IoSave className="mr-2 text-2xl" />
            Quiz speichern
          </button>
          <button
            className="btn mt-8 w-38 h-8 text-sm rounded-2xl bg-red-400 text-neutral hover:bg-red-500 hover:text-base-100 border-0 flex"
            onClick={handleDeleteQuiz}
          >
            <IoTrash className="mr-2 text-2xl" />
            Quiz löschen
          </button>
        </>
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
    </div>
  );
};

export default Edit;
