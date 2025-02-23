import { useState } from "react";
import { IoArrowBack, IoArrowForwardCircle } from "react-icons/io5";

const CreateQuizStep2 = ({ quizData, setQuizData, setStep }) => {
  const [error, setError] = useState("");

  const handleClick = () => {
    if (quizData.quiz_name) {
      setStep(3);
    } else {
      setError("Bitte gib einen Namen für dein Quiz an");
    }
  };

  // User Input updaten
  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      quiz_name: event.target.value,
    });
  };

  return (
    <>
      <IoArrowBack
        className="ml-8 mt-8 text-4xl cursor-pointer hover:text-secondary"
        onClick={() => setStep(1)}
      />
      <div className="w-[100%] text-center flex flex-col items-center">
        <label
          htmlFor="quizNameInput"
          className="font-bold text-2xl w-[100%] block"
        >
          Wie soll dein Quiz heißen?
        </label>
        <input
          type="text"
          id="quizNameInput"
          value={quizData.quiz_name}
          className="input w-[70%] text-xl mt-8 rounded-4xl h-12 !bg-base-100"
          placeholder="Gib deinem Quiz einen Namen..."
          onChange={handleChange}
        />
        <br></br>
        <IoArrowForwardCircle
          className={`text-6xl cursor-pointer mt-8 mb-8 ${
            !quizData.quiz_name
              ? "text-neutral"
              : "text-primary hover:text-secondary"
          }`}
          onClick={handleClick}
        />
      </div>
      {error && (
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
      )}
    </>
  );
};
export default CreateQuizStep2;
