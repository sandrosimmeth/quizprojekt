import { IoCreate } from "react-icons/io5";
import { IoAlbums } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

const DisplayQuizzes = ({
  navigate,
  quizzes,
  favorites,
  handleFavorite,
  userId,
  setError,
}) => {
  const handlePlay = (catalog_id, total_questions) => {
    if (total_questions >= 10) {
      navigate(`/play?catalog_id=${catalog_id}`);
    } else {
      setError(
        "Dieses Quiz hat weniger als 10 Fragen und kann deswegen noch nicht gespielt werden."
      );
    }
  };

  return (
    <>
      {quizzes && (
        <div className="mt-2 overflow-x-scroll h-full scroll-container">
          <ul className="flex flex-row gap-4 h-[80%]">
            {quizzes.map((quiz) => (
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
