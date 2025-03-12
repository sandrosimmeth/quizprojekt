import { useEffect, useState } from "react";
import {
  IoAddCircle,
  IoArrowBack,
  IoSyncCircle,
  IoAlbums,
  IoArrowForward,
} from "react-icons/io5";

const CreateQuizStep3 = ({
  quizData,
  setQuizData,
  setStep,
  currentQuestion,
  setCurrentQuestion,
  setError,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(1); // Tracks the correct answer
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(quizData.questions.length)
  );
  // Update bei Eingabe der Antwort ins Feld
  const handleAnswerChange = (index, value) => {
    setCurrentQuestion((prev) => {
      const updatedAnswers = [...prev.answers];
      updatedAnswers[index].text = value;
      return { ...prev, answers: updatedAnswers };
    });
  };
  // Update der richtigen Antwort
  const handleCorrectAnswerChange = (index) => {
    setCurrentQuestion((prev) => {
      const updatedAnswers = prev.answers.map((answer, i) => ({
        ...answer,
        isCorrect: i === index,
      }));
      return { ...prev, answers: updatedAnswers };
    });
    setSelectedAnswer(index + 1);
  };

  const addQuestion = () => {
    if (
      currentQuestion.questionText.trim() !== "" &&
      currentQuestion.answers.every((answer) => answer.text.trim() !== "")
    ) {
      // Hinzufügen bzw. aktualisieren der Fragen im Objekt quizData
      setQuizData((prevQuizData) => {
        const updatedQuestions = [...prevQuizData.questions]; // Create a copy of the questions array

        if (currentQuestionIndex === updatedQuestions.length) {
          // If the index is at the end, add the new question
          updatedQuestions.push(currentQuestion);
        } else {
          // Otherwise, update the question at the specified index
          updatedQuestions[currentQuestionIndex] = currentQuestion;
        }

        return {
          ...prevQuizData,
          questions: updatedQuestions, // Update the questions array immutably
        };
      });

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset der aktuellen Frage & Antworten
      setCurrentQuestion({
        questionText: "",
        answers: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        explanationText: "",
      });
      setError("");
      setStep(4);
    } else {
      setError("Bitte gib eine Frage und 4 Antworten an!");
    }
  };
  const handleReturn = () => {
    if (currentQuestionIndex == 0) {
      setStep(2);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  useEffect(() => {
    if (
      currentQuestionIndex !== undefined &&
      currentQuestionIndex < quizData.questions.length
    ) {
      setCurrentQuestion(quizData.questions[currentQuestionIndex]);
    } else {
      setCurrentQuestion({
        questionText: "",
        answers: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        explanationText: "",
      });
    }
  }, [currentQuestionIndex]);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <IoArrowBack
            className="ml-6 mt-6 text-4xl cursor-pointer hover:text-secondary flex"
            onClick={handleReturn}
          />
          {currentQuestionIndex < quizData.questions.length && (
            <IoArrowForward
              className="ml-2 mt-6 text-4xl cursor-pointer hover:text-secondary flex"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            />
          )}
        </div>
        <div className="flex  font-light ">
          {"Frage " + parseInt(currentQuestionIndex + 1)}
        </div>
        <details className="dropdown mt-6 text-xl font-bold mr-6 cursor-pointer flex">
          <summary className="flex flex-row items-center hover:text-secondary">
            <IoAlbums className="size-9 flex mr-1 " />
            {quizData.questions.length}
          </summary>
          <ul className="menu dropdown-content bg-neutral text-base-100 rounded-box z-1 w-52 p-2 shadow-md text-sm">
            {quizData.questions.map((question, index) => (
              <li
                key={index}
                className="hover:bg-secondary rounded-full p-2"
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1 + ". " + question.questionText}
              </li>
            ))}
            {currentQuestionIndex < quizData.questions.length && (
              <li
                className="hover:bg-secondary rounded-full p-2 text-amber-300"
                onClick={() =>
                  setCurrentQuestionIndex(quizData.questions.length)
                }
              >
                Neue Frage hinzufügen
              </li>
            )}
          </ul>
        </details>
      </div>

      <div className="w-[100%] text-center flex flex-col items-center">
        <textarea
          id="questionInput"
          className=" w-[80%] h-[10rem] font-bold p-6 textarea textarea-secondary bg-secondary text-base-100 text-xl mt-2 rounded-4xl resize-none text-center"
          placeholder="Gib eine Frage ein..."
          value={currentQuestion.questionText}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              questionText: e.target.value,
            }))
          }
        />
        <div className="grid grid-cols-2 grid-rows-2 w-[80%] justify-center items-center mr-4">
          {currentQuestion.answers.map((answer, index) => (
            <div
              key={index}
              className="answer-item font-bold flex flex-row items-center w-full"
            >
              <input
                type="radio"
                name="correctAnswer"
                className="flex checkbox ml-2 mt-2 mr-1 border-red-400 checked:bg-green-500 checked:border-green-900"
                checked={selectedAnswer === index + 1}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <textarea
                placeholder={`Antwort ${index + 1}`}
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className={`textarea text-white mt-4 bg-accent w-full rounded-2xl text-lg h-24 resize-none text-center ${
                  selectedAnswer === index + 1 && "bg-primary"
                }`}
              />
            </div>
          ))}
        </div>
        <textarea
          id="explainerInput"
          placeholder="Warum ist diese Antwort korrekt?"
          className="h-32 w-[80%] font-bold p-6 textarea textarea-neutral bg-base-300 text-neutral text-lg mt-8 rounded-4xl resize-none text-center"
          value={currentQuestion.explanationText}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              explanationText: e.target.value,
            }))
          }
        />
        <button
          className="btn mt-8 mb-8 w-[16rem] h-[3rem] font-bold bg-neutral text-neutral-content hover:bg-secondary"
          onClick={addQuestion}
        >
          {currentQuestionIndex < quizData.questions.length ? (
            <IoSyncCircle className="ml-[-2rem] mr-2 text-2xl" />
          ) : (
            <IoAddCircle className="ml-[-2rem] mr-2 text-2xl" />
          )}
          {currentQuestionIndex < quizData.questions.length
            ? "Frage aktualisieren"
            : "Frage hinzufügen"}
        </button>
      </div>
    </>
  );
};
export default CreateQuizStep3;
