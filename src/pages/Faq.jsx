import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <>
      <header className="flex flex-row justify-between p-4  w-screen">
        <Link to="/dashboard" className="text-4xl">
          <IoHome className="hover:text-secondary" />
        </Link>
        <span className="text-3xl font-black">FAQ</span>
        <div></div>
      </header>
      <div className="flex flex-col items-center w-screen">
        <div className="w-[60%] max-w-[1000px] min-w-[400px] mt-16">
          <h1 className="width-full text-center text-xl mb-4 font-black">
            Allgemeines
          </h1>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-bold text-lg">
              Was ist Quizify?
            </div>
            <div className="collapse-content text-md">
              Quizify ist eine kollaborative Plattform, auf der Studierende der
              IU gemeinsam Quizfragen erstellen, bearbeiten und spielen können,
              um sich optimal auf Prüfungen vorzubereiten.
            </div>
          </div>
          <h1 className="width-full text-center text-xl mb-4 mt-4 font-black">
            Quiz-Erstellung & Verwaltung
          </h1>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Warum kann ich mein Quiz nicht spielen?
            </div>
            <div className="collapse-content text-md">
              Überprüfe, ob dein Quiz mindestens 10 Fragen enthält. Falls nicht,
              kannst du es nicht starten.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Wie kann ich ein Quiz erstellen?
            </div>
            <div className="collapse-content text-md">
              Klicke links oben im Dashboard auf „Quiz erstellen“. Nachdem du
              ein Modul ausgewählt und einen Namen für dein Quiz festgelegt
              hast, kannst du die ersten Fragen hinzufügen. Dein Quiz muss
              mindestens 10 Fragen enthalten, damit es spielbar ist.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Wie kann ich ein Quiz bearbeiten?
            </div>
            <div className="collapse-content text-md">
              Klicke oben links in der Quizbox auf das Stift-Icon, um dein Quiz
              zu bearbeiten. Hier kannst du Fragen ändern, löschen oder das
              gesamte Quiz entfernen.
            </div>
          </div>
          <h1 className="width-full text-center text-xl mb-4 mt-4 font-black">
            Quiz spielen & entdecken
          </h1>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Wie finde ich passende Quizzes?
            </div>
            <div className="collapse-content text-md">
              Nutze die Such- und Filterfunktion im Dashboard, um nach Modulen
              oder Quiznamen zu suchen.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Wie funktioniert die Rangliste?
            </div>
            <div className="collapse-content text-md">
              Für jede richtige Antwort in einem abgeschlossenen Quiz erhältst
              du einen Punkt.
            </div>
          </div>
          <h1 className="width-full text-center text-xl mb-4 mt-4 font-black">
            Fragen & Moderation
          </h1>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Wie kann ich eine Frage melden?
            </div>
            <div className="collapse-content text-md">
              Während des Spiels kannst du oben links in der Fragenbox auf das
              Melden-Icon klicken. Nach einer kurzen Beschreibung des Problems
              wird der Ersteller benachrichtigt.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Wofür ist der Menüpunkt „Meldungen“ da?
            </div>
            <div className="collapse-content text-md">
              Hier findest du alle von dir erstellten Fragen, die von anderen
              Spielern gemeldet wurden. Prüfe diese und passe sie gegebenenfalls
              an.
            </div>
          </div>
          <h1 className="width-full text-center text-xl mb-4 mt-4 font-black">
            Technische Fragen
          </h1>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-16">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold text-lg">
              Muss ich etwas installieren?
            </div>
            <div className="collapse-content text-md">
              Nein! Du kannst Quizify direkt im Browser nutzen – einfach
              anmelden und loslegen!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
