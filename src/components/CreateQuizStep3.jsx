import { useState } from "react";
import { IoAddCircle, IoArrowBack } from "react-icons/io5";

const CreateQuizStep3 = ({
  quizData,
  setQuizData,
  setStep,
  currentQuestion,
  setCurrentQuestion,
  setError,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(1); // Tracks the correct answer

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
      // Fügt die currentQuestion zu quizData.questions hinzu
      setQuizData((prevQuizData) => ({
        ...prevQuizData,
        questions: [...prevQuizData.questions, currentQuestion],
      }));

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

  return (
    <>
      <IoArrowBack
        className="ml-8 mt-8 text-4xl cursor-pointer hover:text-secondary"
        onClick={() => setStep(2)}
      />
      <span className="ml-auto flex mt-[-3rem] mb-[1rem] mr-6 font-bold">
        <IoAddCircle className="text-2xl flex mr-1" />
        {quizData.questions.length}
      </span>
      <div className="w-[100%] text-center flex flex-col items-center">
        <textarea
          id="questionInput"
          className=" w-[640px] h-[10rem] font-bold p-6 textarea textarea-secondary bg-secondary text-white  text-xl mt-2 rounded-4xl resize-none text-center"
          placeholder="Gib eine Frage ein..."
          value={currentQuestion.questionText}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              questionText: e.target.value,
            }))
          }
        />
      </div>
      <div className="answers-container flex flex-wrap w-[100%] justify-center">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="answer-item w-[300px] font-bold">
            <input
              type="radio"
              name="correctAnswer"
              className="checkbox mr-2 mt-2 border-red-400 checked:bg-green-500 checked:border-green-900"
              checked={selectedAnswer === index + 1}
              onChange={() => handleCorrectAnswerChange(index)}
            />
            <textarea
              placeholder={`Antwort ${index + 1}`}
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className={`textarea text-white mt-4 w-[240px] h-[3rem] bg-accent rounded-2xl text-xl resize-none text-center ${
                selectedAnswer === index + 1 && "bg-primary"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap w-[100%] justify-center">
        <textarea
          id="explainerInput"
          placeholder="Warum ist diese Antwort korrekt?"
          className=" w-[480px] h-[6rem] font-bold p-6 textarea textarea-neutral bg-base-300 text-neutral text-xl mt-8 rounded-4xl resize-none text-center"
          value={currentQuestion.explanationText}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              explanationText: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-wrap w-[100%] justify-center">
        <button
          className="btn mt-8 mb-8 w-[16rem] h-[3rem] font-bold bg-neutral text-neutral-content hover:bg-secondary"
          onClick={addQuestion}
        >
          <IoAddCircle className="ml-[-2rem] mr-2 text-2xl" />
          Frage hinzufügen
        </button>
      </div>
    </>
  );
};
export default CreateQuizStep3;
