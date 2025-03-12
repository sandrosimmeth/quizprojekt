import axios from "axios";
import { useEffect, useState } from "react";
import { IoHome, IoCheckmark, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const ReportedQuestions = () => {
  const [error, setError] = useState(""); //Fehlermeldung
  const [message, setMessage] = useState(""); // Meldung
  const [reports, setReports] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getReports = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/get_reported_questions.php`,
        {},
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        setReports(response.data.reported_questions);
        setLoading(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Es gab einen internen Serverfehler");
    }
  };
  useEffect(() => {
    getReports();
  }, []);

  const handleCheck = async (report_id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/check_report.php`,
        { report_id },
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        setMessage(response.data.message);
        getReports();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Es gab einen internen Serverfehler");
    }
  };
  const handleDismiss = async (report_id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/dismiss_report.php`,
        { report_id },
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        setMessage(response.data.message);
        getReports();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Es gab einen internen Serverfehler");
    }
  };

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

  return (
    <>
      <header className="flex flex-row justify-between p-4  w-screen">
        <Link to="/dashboard" className="text-4xl">
          <IoHome className="hover:text-secondary" />
        </Link>
        <h1 className="text-3xl font-black">Meldungen zu deinen Fragen</h1>
        <div></div>
      </header>
      <div className="w-screen flex flex-col items-center mt-16">
        <table className="table w-[60%] min-w-[400px] flex max-w-[1000px]">
          {/* head */}
          <thead>
            <tr>
              <th>Quizname</th>
              <th>Frage</th>
              <th>Meldung</th>
              <th>Gemeldet von</th>
              <th>Meldedatum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              reports && reports.length > 0 ? (
                reports.map((report) => (
                  <tr
                    key={report.report_id}
                    className="hover:bg-base-200 cursor-pointer"
                    style={{
                      textDecoration:
                        report.dismissed === 1 ? "line-through" : "none",
                      opacity: report.dismissed === 1 || report.done ? 0.5 : 1,
                      backgroundColor: report.done
                        ? "oklch(0.962 0.044 156.743)"
                        : "",
                    }}
                    onClick={() => {
                      if (report.done === 0 && report.dismissed === 0) {
                        navigate(
                          `/edit?catalog_id=${report.catalog_id}&highlight=${report.question_id}`
                        );
                      }
                    }}
                  >
                    <td>{report.catalog_name}</td>
                    <td>{report.question_text}</td>
                    <td className="text-red-600">{report.report_reason}</td>
                    <td>{report.reporter}</td>
                    <td>
                      {(() => {
                        // Convert the date_reported to a Date object
                        const date = new Date(
                          report.date_reported.replace(" ", "T")
                        );

                        // Format the date to European format (e.g., DD.MM.YYYY, HH:MM:SS)
                        const europeanDate = new Intl.DateTimeFormat("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }).format(date);

                        // Return the formatted date string
                        return europeanDate;
                      })()}
                    </td>
                    <td>
                      <div className="flex flex-row">
                        {!report.dismissed && !report.done && (
                          <>
                            <button
                              className="btn bg-green-400 mr-2 hover:bg-green-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCheck(report.report_id);
                              }}
                            >
                              <IoCheckmark />
                            </button>

                            <button
                              className="btn bg-red-400 hover:bg-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDismiss(report.report_id);
                              }}
                            >
                              <IoClose />
                            </button>
                          </>
                        )}

                        {report.dismissed === 1 && <IoClose />}
                        {report.done === 1 && <IoCheckmark />}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    Niemand hat etwas zu deinen Fragen gemeldet.
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">
                  Lade Meldungen...
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default ReportedQuestions;
