const Impressum = () => {
  return (
    <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>
      <p className="text-lg font-semibold mb-2">Angaben gemäß § 5 TMG</p>
      <p className="mb-4 leading-relaxed">
        <h2 className="text-lg font-bold mb-1">Projektteam „Quizify“</h2>
        Christopher Geuking
        <br />
        Christoph Werner
        <br />
        Joé Martins
        <br />
        Luca Hörrsting
        <br />
        Sandro Simmeth
        <br />
        <br />
        <h2 className="text-lg font-bold mb-1">Hochschule:</h2>
        IU International University of Applied Sciences <br />
        Muelheimer Strasse 38
        <br />
        53604 Bad Honnef
        <br />
        Deutschland
      </p>
      <p className="mb-4 leading-relaxed">
        <h2 className="text-lg font-bold mb-1">Vertreten durch:</h2>
        Christopher Geuking
        <br />
        Christoph Werner
        <br />
        Joé Martins
        <br />
        Luca Hörsting
        <br />
        Sandro Simmeth
      </p>
      <p className="mb-4 leading-relaxed">
        <span className="font-semibold">Kontakt:</span>
        <br />
        E-Mail:{" "}
        <a
          href="mailto:kontakt@quizify.de"
          className="text-blue-600 hover:underline"
        >
          kontakt@quizify.de
        </a>
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Hinweis:</span>
        <br />
        Dies ist ein studentisches Projekt der{" "}
        <span className="font-bold">
          IU International University of Applied Sciences
        </span>
        , das im Rahmen eines Studienkurses entwickelt wurde. Es handelt sich
        nicht um ein kommerzielles Angebot.
      </p>
    </div>
  );
};

export default Impressum;
