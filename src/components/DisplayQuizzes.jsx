import { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { IoAlbums } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoSwapHorizontal } from "react-icons/io5";

const DisplayQuizzes = ({
  navigate,
  quizzes,
  favorites,
  handleFavorite,
  userId,
  setError,
  text,
}) => {
  const [sortMethod, setSortMethod] = useState("Bewertung");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const handlePlay = (catalog_id, total_questions) => {
    if (total_questions >= 10) {
      navigate(`/play?catalog_id=${catalog_id}`);
    } else {
      setError(
        "Dieses Quiz hat weniger als 10 Fragen und kann deswegen noch nicht gespielt werden."
      );
    }
  };
  const handleSort = () => {
    if (sortMethod == "Datum") {
      setFilteredQuizzes(
        filteredQuizzes.sort((a, b) => {
          const ratingA = a.avg_rating ? parseFloat(a.avg_rating) : 0; // Konvertiere zu Float or 0 wenn null
          const ratingB = b.avg_rating ? parseFloat(b.avg_rating) : 0; // Konvertiere zu Float or 0 wenn null

          return ratingB - ratingA;
        })
      );
      setSortMethod("Bewertung");
    } else {
      setFilteredQuizzes(
        filteredQuizzes.sort((a, b) => {
          return parseInt(b.catalog_id) - parseInt(a.catalog_id); // Konvertiert zu Int für Vergleich
        })
      );
      setSortMethod("Datum");
    }
  };
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setFilteredQuizzes(
      quizzes.filter(
        (quiz) =>
          quiz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.module_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  useEffect(() => {
    setFilteredQuizzes(
      quizzes.sort((a, b) => {
        const ratingA = a.avg_rating ? parseFloat(a.avg_rating) : 0; // Konvertiere zu Float or 0 wenn null
        const ratingB = b.avg_rating ? parseFloat(b.avg_rating) : 0; // Konvertiere zu Float or 0 wenn null

        return ratingB - ratingA;
      })
    );
  }, [quizzes]);

  return (
    <>
      <div className="flex flex-row items-baseline mb-2 select-none">
        <div className="text-3xl font-black">{text}</div>
        <div
          className="text-base font-light flex ml-16 cursor-pointer hover:text-secondary"
          onClick={handleSort}
        >
          <IoSwapHorizontal className="size-5 " />
          <span className="ml-2 ">
            Sortiert nach <span className="font-bold">{sortMethod}</span>
          </span>
        </div>
        <div className="flex ml-8">
          <IoSearchOutline className="size-5" />

          <input
            className="pl-1 pr-6 ml-2 border-b-2 border-t-0 border-l-0 border-r-0 font-light focus:outline-none"
            placeholder="Tippen, um zu suchen..."
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredQuizzes.length == 0 ? (
        <div className="ml-2 mt-4 text-lg text-base-300">
          Sieht aus als gibt es keine Quizzes, dieser Kategorie...
        </div>
      ) : (
        <div className="mt-2 overflow-x-scroll h-full scroll-container">
          <ul className="flex flex-row gap-4 h-[80%]">
            {filteredQuizzes.map((quiz) => (
              <li
                key={quiz.catalog_id}
                className="bg-base-300 relative text-neutral rounded-2xl p-4 h w-84 h-64 flex-none flex flex-col justify-center items-center shadow-xl text-center cursor-pointer hover:bg-secondary hover:text-base-100"
                onClick={() =>
                  handlePlay(quiz.catalog_id, quiz.total_questions)
                }
              >
                {Number(userId) == Number(quiz.creator_id) && (
                  <div
                    className="cursor-pointer bg-base-100 text-neutral hover:text-secondary inline-flex rounded-br-2xl p-1 absolute top-0 left-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit?catalog_id=${quiz.catalog_id}`);
                    }}
                  >
                    <IoCreate className="text-3xl " />
                  </div>
                )}
                <IoHeart
                  className={`absolute top-2 right-2 text-3xl ${
                    favorites.includes(Number(quiz.catalog_id))
                      ? "text-pink-500"
                      : "hover:text-pink-500"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(quiz.catalog_id);
                  }}
                />
                <h3 className="mt-4">Modul:</h3>
                <h1 className="font-black text-xl">{quiz.module_name}</h1>

                <h2 className="font-bold mt-4">{quiz.name}</h2>

                <div className="mt-4 flex flex-row justify-center items-center font-bold">
                  <IoAlbums className="text-2xl mr-2" />
                  <span>
                    {quiz.correct_answers !== null ? quiz.correct_answers : "0"}
                    {"/" + quiz.total_questions}
                  </span>
                </div>
                <p className="mt-4">
                  Bewertung:{" "}
                  {quiz.avg_rating !== null
                    ? Math.round(quiz.avg_rating * 10) / 10
                    : "-"}
                </p>
                <span className="text-sm">
                  {"Von: " + quiz.creator_username}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default DisplayQuizzes;
