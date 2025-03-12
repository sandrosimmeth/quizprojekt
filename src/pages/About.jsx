const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Über Quizify
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Quizify ist eine kollaborative Plattform, die Lernen unterhaltsam und
          spannend macht. Entwickelt von einem engagierten Studententeam der{" "}
          <span className="font-semibold">IU Internationalen Hochschule</span>,
          ermöglicht Quizify Nutzern das Erstellen, Teilen und Spielen von
          Quizzen zu jedem Thema.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Unsere Mission ist es, Kreativität und Zusammenarbeit zu fördern,
          indem wir eine intuitive Plattform für das Erstellen von Quizzen
          bereitstellen. Egal, ob du dich auf eine Prüfung vorbereitest, einen
          Trivia-Abend veranstaltest oder Freunde herausforderst – Quizify ist
          die richtige Wahl.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Unser Team
          </h2>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>🎓 Christopher Geuking</li>
            <li>🎓 Christoph Werner</li>
            <li>🎓 Joé Martins</li>
            <li>🎓 Luca Hörsting</li>
            <li>🎓 Sandro Simmeth</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kontakt</h2>
          <p className="text-lg text-gray-600">
            Du hast Fragen oder Feedback? Schreib uns eine E-Mail an{" "}
            <a
              href="mailto:kontakt@quizify.de"
              className="text-blue-600 hover:underline"
            >
              kontakt@quizify.de
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
