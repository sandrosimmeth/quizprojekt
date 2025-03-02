import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";

const CreateQuizStep1 = ({ quizData, setQuizData, setStep, setError }) => {
  const [modules, setModules] = useState([]); // Modules from the database
  const [loading, setLoading] = useState(true); // Loading state
  const [input, setInput] = useState("invalid");

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    // Überprüfe, ob `quizData.module_id` existiert und setze `input`
    if (quizData.module_id) {
      setInput(quizData.module_id);
    }
  }, [quizData.module_id]); // Der Effekt wird ausgelöst, wenn `quizData.module_id` sich ändert

  //Aufruf der Funktion getModules() bei rendern der Komponente
  useEffect(() => {
    // Fetch modules from the database
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
      } finally {
        setLoading(false);
      }
    };
    getModules();
  }, [setError]);

  // Funktion für Klick auf den "Weiter Button"
  const handleClick = () => {
    if (input !== "invalid") {
      setQuizData((prevData) => ({
        ...prevData, // Kopiert restliche Werte
        module_id: parseInt(input, 10), // Überschreibt nur module_id als Int
      }));
      setStep(2);
    } else {
      setError("Bitte wähle zuerst ein gültiges Modul aus.");
    }
  };

  return (
    <>
      <div className="w-[100%] text-center flex flex-col items-center">
        <label
          htmlFor="moduleDataList"
          className="font-bold text-2xl w-[100%] block mt-8"
        >
          Für welches Modul möchtest du ein Quiz anlegen?
        </label>
        {loading ? (
          <p>Lade Module...</p>
        ) : (
          <select
            className="w-[70%] text-xl mt-8 rounded-4xl h-12 !bg-base-100"
            defaultValue={quizData.module_id || "invalid"}
            id="moduleDataList"
            disabled={loading}
            onChange={handleChange}
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
        )}

        <br></br>
        <IoArrowForwardCircle
          className={`text-6xl cursor-pointer mt-8 mb-8 ${
            input === "invalid"
              ? "text-neutral"
              : "text-primary hover:text-secondary"
          }`}
          onClick={handleClick}
        />
      </div>
    </>
  );
};
export default CreateQuizStep1;
