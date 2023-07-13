import { useEffect, useState } from "react";
import people from "../data/data";
import { Person } from "../data/data";
// import "../index.css";
const Table: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Array<Person>>([]);
  useEffect(() => {
    setPeopleList(people);
  }, []);
  return (
    <div className="mx-auto">
      <div className="flew flex-row">
        <div className="mx-auto">
          <form>
            <label></label>
          </form>
        </div>
        <table className="w-[100%]">
          <thead>
            <tr>
              <td className="px-3">STT</td>
              <td className="px-3">MSSV</td>
              <td className="px-3">Ho ten</td>
              <td className="px-3">Ngay sinh</td>
              <td className="px-3">Email</td>
              <td className="px-3"></td>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((item, index) => (
              <tr key={index}>
                <td className="px-3">{index}</td>
                <td>{item.mssv}</td>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.email}</td>
                <td>
                  <button type="button" className="bg-blue-300 text-white-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
