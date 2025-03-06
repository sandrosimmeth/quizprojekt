import axios from "axios";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import {
  BsEmojiHeartEyes,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiTear,
  BsEmojiDizzy,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Rate = ({ setError, setMessage, catalog_id }) => {
  const [rating, setRating] = useState(5);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const rate = async () => {
    if (rating) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/rate_quiz.php`,
          { catalog_id, rating },
          { withCredentials: true }
        );
        if (response.data.status === "ok") {
          setMessage("Danke für deine Bewertung!");
          setDisabled(true);
          // Navigate nach 2 Sekunden
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Es gab einen internen Serverfehler");
      }
    }
  };

  const handleChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center backdrop-blur-3xl z-50">
      <div className="w-full h-full text-9xl flex flex-col justify-center items-center">
        <span className="text-4xl font-black mb-8">
          Wie fandest du dieses Quiz?
        </span>
        {rating == 10 ? (
          <BsEmojiHeartEyes />
        ) : rating > 7 ? (
          <BsEmojiSmile />
        ) : rating > 4 ? (
          <BsEmojiNeutral />
        ) : rating > 1 ? (
          <BsEmojiTear />
        ) : (
          <BsEmojiDizzy />
        )}

        <div className="w-full max-w-xs">
          <input
            type="range"
            defaultValue={5}
            min={1}
            max="10"
            className="range range-xl"
            step="1"
            onChange={handleChange}
          />
          <div className="mt-[-16px]">
            <div className="flex justify-between px-2.5 text-sm">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between px-2.5 mt-2 text-sm">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <button
          onClick={rate}
          className="btn w-48 h-12 text-md rounded-2xl bg-neutral text-base-100 hover:bg-primary text-md border-0 flex mt-8"
          disabled={disabled && `disabled`}
        >
          <IoStar className="text-3xl mr-2" />
          Bewerten
        </button>
      </div>
    </div>
  );
};

export default Rate;
