import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import DisplayQuizzes from "../components/DisplayQuizzes";
import Leaderboard from "../components/Leaderboard";
import Header from "../components/Header";

const Dashboard = ({ user }) => {
  let navigate = useNavigate();
  const [error, setError] = useState(""); //Fehlermeldung
  const [message, setMessage] = useState(""); // Meldung
  const [favorites, setFavorites] = useState([Number]); // Favoriten des Nutzers hier sind nur catalog_id's drinnen
  const [loading, setLoading] = useState(true); // Ladezustand, welcher nach Abschluss der Asynchronen Funktionnen beendet wird
  const [studyProgram, setStudyProgram] = useState(""); // Der Studiengang des Nutzers
  const [exploreQuizzes, setExploreQuizzes] = useState([]); // Alle Quizzes mit Metadaten
  const [userQuizzes, setUserQuizzes] = useState([]); // Alle Quizzes, die der Nutzer selbst erstellt hat mit Metadaten -> wird aus allQuizzes gefiltert
  const [favoriteQuizzes, setFavoriteQuizzes] = useState([]); // Alle Quizzes, die der Nutzer favorisiert hat mit Metadaten -> wird aus allQuizzes gefiltert über favorited mit catalog_id
  const [matchingQuizzes, setMatchingQuizzes] = useState([]); // Alle Quizzes, die zum Studiengang des Nutzers passen mit Metadaten -> wird aus allQuizzes gefiltert über study_programm
  const [points, setPoints] = useState(); // Punkte des Nutzers, werden aus der Datenbank geladen
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Funktion für Favorisieren und Entfavorisieren von Quizzes
  const handleFavorite = async (catalog_id) => {
    if (favorites.includes(Number(catalog_id))) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/remove_from_favorites.php`,
          { catalog_id },
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setMessage("Erfolgreich aus deinen Favoriten entfernt.");
          setFavorites((prev) =>
            prev.filter((id) => id !== Number(catalog_id))
          ); // catalog_id aus favorites entfernen
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/add_to_favorites.php`,
          { catalog_id },
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setMessage("Erfolgreich zu deinen Favoriten hinzugefügt.");
          setFavorites((prev) => [...prev, Number(catalog_id)]);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    }
  };

  // useEffect wird beim Mount der Komponente ausgeführt
  useEffect(() => {
    // lädt die catalog_id's Favoriten des angemeldeten Nutzers aus der Datenbank und speichtert sie in favorites
    const getFavorites = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/get_favorites.php`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setFavorites(response.data.favorites);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    };

    // lädt die ID des Studiengangs des Nutzers, um den Array allQuizzes danach zu filtern
    const getStudyprogram = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/get_study_program.php`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setStudyProgram(response.data.study_program_id);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    };

    // lädt die ID des Studiengangs des Nutzers, um den Array allQuizzes danach zu filtern
    const getPoints = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/get_points.php`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setPoints(response.data.points);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    };
    getPoints(); // Punkte aus der Datenbank ladaen
    getFavorites(); // Favoriten aus der Datenbank laden
    getStudyprogram(); //Studiengang des Nutzers aus der Datenbank laden
  }, []);

  // useEffect wird beim Mount der Komponente ausgeführt und immer wenn sich favorites oder studyProgram ändern, damit der array filter funktioniert
  useEffect(() => {
    //Hier werden alle Quizzes geladen
    const getAllQuizzes = async () => {
      if (!favorites || !studyProgram || !user?.user_id) return;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/get_all_quizzes.php`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setExploreQuizzes(
            response.data.quizzes.filter(
              (quiz) => Number(user.user_id) != Number(quiz.creator_id)
            )
          );

          // Hier wird der Array userQuizzes mit allen Quizzes aus dem Array allQuizzes befüllt, bei dem die user_id mit der creator_id übereinstimmen
          setUserQuizzes(
            response.data.quizzes.filter(
              (quiz) => Number(user.user_id) == Number(quiz.creator_id)
            )
          );

          // Hier wird der Array favoriteQuizzes mit allen Quizzes aus dem Array allQuizzes befüllt, bei dem catalog_id in dem array favorites enthalten ist
          setFavoriteQuizzes(
            response.data.quizzes.filter((quiz) =>
              favorites.includes(Number(quiz.catalog_id))
            )
          );
          // Hier wird der Array favoriteQuizzes mit allen Quizzes aus dem Array allQuizzes befüllt, bei dem catalog_id in dem array favorites enthalten ist
          setMatchingQuizzes(
            response.data.quizzes.filter(
              (quiz) =>
                studyProgram == quiz.study_program_id &&
                Number(user.user_id) !== Number(quiz.creator_id)
            )
          );
          //Hier wird der ladezustand beendet, nachdem alle Arrays befüllt sind
          setLoading(false);
        } else {
          setError("Es gab einen Fehler beim Laden der Quizzes");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllQuizzes();
  }, [favorites, studyProgram, user.user_id]);

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

  useEffect(() => {
    // Funktion, damit man in den Quizzes horizontal scrollen kann... Ja das braucht man wirklich
    const scrollContainers = document.querySelectorAll(".scroll-container");

    // wheel event handler
    const handleWheel = (evt) => {
      evt.preventDefault();
      evt.currentTarget.scrollLeft += evt.deltaY;
    };

    // event listener auf alle elemente
    scrollContainers.forEach((container) => {
      container.addEventListener("wheel", handleWheel, { passive: false });
    });

    // Cleanup:  event listener
    return () => {
      scrollContainers.forEach((container) => {
        container.removeEventListener("wheel", handleWheel);
      });
    };
  }, []);

  return (
    <>
      {showLeaderboard && (
        <div className="w-screen h-screen backdrop-blur-2xl fixed flex flex-col items-center justify-center z-50">
          <div className="w-[50%] h-[70%] bg-base-100 flex shadow-2xl rounded-2xl max-w-[1000px]">
            <IoCloseCircle
              className="text-4xl hover:text-red-400 cursor-pointer m-4"
              onClick={() => setShowLeaderboard(false)}
            />
            <div className="w-full h-full flex flex-col items-center pt-18">
              <Leaderboard setError={setError} userId={user.user_id} />
            </div>
          </div>
        </div>
      )}
      <Header
        setShowLeaderboard={setShowLeaderboard}
        navigate={navigate}
        user={user}
        points={points}
      />
      <div className="w-screen h-screen bg-base-100 overflow-xclip">
        <div className="flex flex-col w-full h-96 pl-6 pr-6 mt-12">
          <div className="max-w-full flex flex-col flex-none h-full">
            <div className="mt-2 flex"></div>
            {/* Hier werden die selbst erstellten Quizzes angezeigt */}
            {loading && userQuizzes ? (
              <div>Lade Quizdaten... </div>
            ) : (
              <DisplayQuizzes
                navigate={navigate}
                quizzes={userQuizzes}
                favorites={favorites}
                handleFavorite={handleFavorite}
                userId={user.user_id}
                setError={setError}
                text="Von mir erstellt"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full h-96 pl-6 pr-6">
          <div className="max-w-full flex flex-col flex-none h-full">
            <div className="mt-2 flex"></div>
            {/*Hier werden die Favoriten des Nutzers angezeigt*/}
            {loading && favoriteQuizzes ? (
              <div>Lade Quizdaten... </div>
            ) : (
              <DisplayQuizzes
                navigate={navigate}
                quizzes={favoriteQuizzes}
                favorites={favorites}
                handleFavorite={handleFavorite}
                userId={user.user_id}
                setError={setError}
                text="Favoriten"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full h-96 pl-6 pr-6">
          <div className="max-w-full flex flex-col flex-none h-full">
            <div className="mt-2 flex"></div>
            {/*Hier werden die Quizzes passend zum Studiengang des Nutzers angezeigt*/}
            {loading && matchingQuizzes ? (
              <div>Lade Quizdaten... </div>
            ) : (
              <DisplayQuizzes
                navigate={navigate}
                quizzes={matchingQuizzes}
                favorites={favorites}
                handleFavorite={handleFavorite}
                userId={user.user_id}
                setError={setError}
                text="Passend zu meinem Studiengang"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full h-96 pl-6 pr-6 ">
          <div className="max-w-full flex flex-col flex-none h-full">
            <div className="mt-2 flex"></div>
            {/* Hier wird allQuizzes angezeigt*/}
            {loading && exploreQuizzes ? (
              <div>Lade Quizdaten... </div>
            ) : (
              <DisplayQuizzes
                navigate={navigate}
                quizzes={exploreQuizzes}
                favorites={favorites}
                handleFavorite={handleFavorite}
                userId={user.user_id}
                setError={setError}
                text="Entdecken"
              />
            )}
          </div>
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
    </>
  );
};

export default Dashboard;
