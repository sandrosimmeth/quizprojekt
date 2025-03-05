import {
  IoCreate,
  IoTrophy,
  IoHelpCircle,
  IoPerson,
  IoInformationCircle,
} from "react-icons/io5";
import quizLogo from "../assets/logo_quiz.svg";
import Logout from "./Logout";

const Header = ({ setShowLeaderboard, navigate, user, points }) => {
  return (
    <header className="relative top-0 flex flex-row w-full items-center justify-between pl-6 pr-6 select-none h-24 gap-12 ">
      <img src={quizLogo} className="mt-2 w-28 " />
      <div className="flex gap-18 mr-auto">
        <div
          onClick={() => navigate("/create")}
          className="text-md rounded-2xl uppercase text-neutral font-black hover:text-secondary border-0 flex cursor-pointer items-center "
        >
          <IoCreate className="text-2xl mb-1 mr-1 flex-none" />
          Quiz erstellen
        </div>
        <div
          onClick={() => setShowLeaderboard(true)}
          className="text-md rounded-2xl uppercase text-neutral font-black hover:text-secondary border-0 flex cursor-pointer items-center "
        >
          <IoTrophy className="text-2xl mb-1 mr-1 flex-none" />
          Rangliste
        </div>
        <div
          onClick={() => navigate("/reports")}
          className=" text-md rounded-2xl uppercase text-neutral font-black hover:text-secondary border-0 flex cursor-pointer items-center "
        >
          <IoInformationCircle className="text-2xl mb-1 mr-1 flex-none" />
          Meldungen
        </div>
        <div
          onClick={() => navigate("/faq")}
          className=" text-md rounded-2xl uppercase text-neutral font-black hover:text-secondary border-0 flex cursor-pointer items-center "
        >
          <IoHelpCircle className="text-2xl mb-1 mr-1 flex-none" />
          FAQ
        </div>
      </div>
      <div className="mt-2 flex flex-row items-center">
        <IoPerson className="size-10 mr-2" />

        <span className="text-sm flex-col flex mr-6">
          <span className="font-bold text-base">{user.username}</span>
          <span className="font-light text-sm">{points} CyberCredits</span>
        </span>

        <Logout />
      </div>
    </header>
  );
};
export default Header;
