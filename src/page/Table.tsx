import { useEffect, useState } from "react";
import people from "../data/data";
import { Person } from "../data/data";
// import "../index.css";
const Table: React.FC = () => {
  const defaultPerson: Person = {
    id: 0,
    mssv: "",
    name: "",
    dob: "",
    email: "",
  };
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [person, setPerson] = useState<Person>(defaultPerson);
  useEffect(() => {
    setPeopleList(people);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPeopleList((prevPeopleList) => [
      ...prevPeopleList,
      { ...person, id: peopleList.length + 1 },
    ]);
    setPerson(defaultPerson);
  };
  const handleDelete = (id: number) => {
    setPeopleList((prevPeopleList) =>
      prevPeopleList.filter((person) => person.id !== id)
    );
  };

  return (
    <div className="mx-auto">
      <div className="flew flex-row">
        <div className=" mx-auto w-[60%]">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <label htmlFor="">Mã số sinh viên</label>
              <input
                className="px-1"
                name="mssv"
                type="text"
                id="mssv"
                placeholder="Nhập mã số sinh viên"
                value={person.mssv}
                onChange={(e) =>
                  setPerson({ ...person, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <div className="flex flex-row">
              <label htmlFor="">Họ tên</label>
              <input
                className="px-1"
                name="name"
                type="text"
                id="name"
                placeholder="Nhập họ tên"
                value={person.name}
                onChange={(e) =>
                  setPerson({ ...person, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <div className="flex flex-row">
              <label htmlFor="">Ngày sinh</label>
              <input
                className="px-1"
                name="dob"
                type="date"
                id="dob"
                placeholder="Chọn ngày sinh"
                value={person.dob}
                onChange={(e) =>
                  setPerson({ ...person, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <div className="flex flex-row">
              <label htmlFor="">Email</label>
              <input
                className="px-1"
                name="email"
                type="text"
                id="email"
                placeholder="Nhập email"
                value={person.email}
                onChange={(e) =>
                  setPerson({ ...person, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <button className="bg-blue-300" type="submit">
              Submit
            </button>
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
            {peopleList.map((item) => (
              <tr key={item.id}>
                <td className="px-3">{item.id}</td>
                <td>{item.mssv}</td>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    type="button"
                    className="bg-blue-300 text-white-200"
                    onClick={() => handleDelete(item.id)}
                  >
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
