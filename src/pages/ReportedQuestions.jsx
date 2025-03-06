import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const ReportedQuestions = () => {
  return (
    <>
      <header className="flex flex-row justify-between p-4  w-screen">
        <Link to="/dashboard" className="text-4xl">
          <IoHome className="hover:text-secondary" />
        </Link>
        <h1 className="text-3xl font-black">Meldungen zu deinen Fragen</h1>
        <div></div>
      </header>
      <div className="w-[800px] ml-[400px] mt-24">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportedQuestions;
