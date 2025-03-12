import { IoSyncCircle, IoCloseCircle, IoAddCircle } from "react-icons/io5";

const EditQuestion = ({
  setQuizData,
  currentQuestion,
  setCurrentQuestion,
  setShowEditQuestion,
  add,
  setAdd,
  setError,
  setEdited,
}) => {
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
        is_correct: i === index,
      }));
      return { ...prev, answers: updatedAnswers };
    });
  };

  const updateQuestion = (question_id) => {
    if (
      currentQuestion.text.trim() !== "" &&
      currentQuestion.answers.every((answer) => answer.text.trim() !== "")
    ) {
      // Aktualisiert das Objekt quizData
      if (!add) {
        setQuizData((prevQuizData) => {
          const updatedQuestions = prevQuizData.questions.map((question) =>
            question.question_id === question_id
              ? { ...currentQuestion, id: question.id }
              : question
          );
          setEdited(true);
          return {
            ...prevQuizData,
            questions: updatedQuestions,
          };
        });
      } else {
        // Fügt die currentQuestion zu quizData.questions hinzu
        setQuizData((prevQuizData) => ({
          ...prevQuizData,
          questions: [
            ...prevQuizData.questions,
            {
              ...currentQuestion,
              question_id: `temp-${prevQuizData.questions.length + 1}`,
            },
          ],
        }));

        setEdited(true);
        // Reset der aktuellen Frage & Antworten
        setCurrentQuestion([]);
        setError("");
      }
      // Reset der aktuellen Frage & Antworten
      setCurrentQuestion([]);
      setError("");
      setShowEditQuestion(false);
      setAdd(false);
    } else {
      setError("Bitte gib eine Frage und 4 Antworten an!");
    }
  };

  const handleClose = () => {
    setShowEditQuestion(false);
    setCurrentQuestion([]);
    setError("");
  };

  return (
    <>
      <IoCloseCircle
        className="ml-8 mt-8 text-4xl cursor-pointer hover:text-red-500"
        onClick={handleClose}
      />
      <div className="w-[100%] text-center flex flex-col items-center">
        <textarea
          id="questionInput"
          className=" w-[640px] h-[10rem] font-bold p-6 textarea textarea-secondary bg-secondary text-white  text-xl mt-2 rounded-4xl resize-none text-center"
          placeholder="Gib eine Frage ein..."
          value={currentQuestion.text}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              text: e.target.value,
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
              checked={answer.is_correct}
              onChange={() => handleCorrectAnswerChange(index)}
            />
            <textarea
              placeholder={`Antwort ${index + 1}`}
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className={`textarea text-white mt-4 w-[240px] h-[3rem] bg-accent rounded-2xl text-xl resize-none text-center ${
                answer.is_correct && "bg-primary"
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
          value={currentQuestion.explanation_text}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              explanation_text: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-wrap w-[100%] justify-center">
        {add ? (
          <button
            className="btn mt-8 mb-8 w-[16rem] h-[3rem] font-bold bg-neutral text-neutral-content hover:bg-secondary"
            onClick={() => updateQuestion(currentQuestion.question_id)}
          >
            <IoAddCircle className="ml-[-2rem] mr-2 text-2xl" />
            Frage hinzufügen
          </button>
        ) : (
          <button
            className="btn mt-8 mb-8 w-[16rem] h-[3rem] font-bold bg-neutral text-neutral-content hover:bg-secondary"
            onClick={() => updateQuestion(currentQuestion.question_id)}
          >
            <IoSyncCircle className="ml-[-2rem] mr-2 text-2xl" />
            Frage aktualisieren
          </button>
        )}
      </div>
    </>
  );
};
export default EditQuestion;
