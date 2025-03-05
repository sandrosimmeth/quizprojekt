import axios from "axios";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const Report = ({ setError, setMessage, question_id, setReport }) => {
  const [description, setDescription] = useState();
  const report = async () => {
    if (description) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/report_question.php`,
          { question_id, description },
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setMessage("Danke für deine Meldung!");
          setReport(false);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    } else {
      setError("Gib zuerst eine Erklärung zu deiner Meldung an");
    }
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    report();
  };

  return (
    <div className="p-2 mb-4 w-[50%] max-w-[1000px] flex flex-col items-center justify-center relative bg-orange-400 rounded-4xl z-10 ">
      <IoCloseCircle
        className="absolute top-2 left-2 size-8 hover:text-base-100 cursor-pointer"
        onClick={() => setReport(false)}
      />
      <span className="text-xl font-black mb-2">
        Was ist das Problem mit der Frage?
      </span>
      <textarea
        className="textarea resize-none mb-2 w-[80%]"
        placeholder="Erkläre dem Ersteller der Frage, was das Problem ist..."
        onChange={handleChange}
      ></textarea>
      <button className="btn" onClick={handleSubmit}>
        Senden
      </button>
    </div>
  );
};

export default Report;
