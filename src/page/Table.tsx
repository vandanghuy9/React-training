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
    <div className="mx-auto px-10">
      <div className="flew flex-row w-[80%]">
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>MSSV</td>
              <td>Ho ten</td>
              <td>Ngay sinh</td>
              <td>Email</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
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
