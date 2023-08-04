import { useEffect, useState } from "react";
import people from "../data/data";
import { Person } from "../data/data";

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
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPerson({ ...person, [e.target.name]: e.target.value });
  // };
  // const attributes: Props[] = [
  //   {
  //     type: "text",
  //     id: "mssv",
  //     value: person.mssv,
  //     name: "mmsv",
  //     placeHolder: "Enter mssv",
  //     label: "Mã số sinh viên",
  //     handleChange: handleChange,
  //   },
  // ];
  return (
    <div className="mx-auto">
      <div className="flew flex-row">
        <div className=" mx-auto w-[60%] ">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="py-5 border-solid border-black border-[1px]">
              <h1 className="font-bold px-10">Thao tác với Form</h1>
              {/* {attributes.map((item, index) => (
                <InputField
                  key={index}
                  type={item.type}
                  id={item.id}
                  value={item.value}
                  name={item.name}
                  placeHolder={item.placeHolder}
                  label={item.label}
                  handleChange={item.handleChange}
                />
              ))} */}
              <div className="flex flex-row px-5 py-3">
                <label htmlFor="mssv" className="w-40 pl-5">
                  Mã số sinh viên
                </label>
                <input
                  className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-100"
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
              <div className="flex flex-row px-5 py-3">
                <label htmlFor="name" className="w-40 pl-5">
                  Họ tên
                </label>
                <input
                  className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-100"
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
              <div className="flex flex-row px-5 py-3">
                <label htmlFor="dob" className="w-40 pl-5">
                  Ngày sinh
                </label>
                <input
                  className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-100"
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
              <div className="flex flex-row px-5 py-3">
                <label htmlFor="email" className="w-40 pl-5">
                  Email
                </label>
                <input
                  className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-100"
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
            </div>
            <button className="bg-blue-300 my-5" type="submit">
              Submit
            </button>
          </form>
        </div>
        <table className="w-[100%]">
          <thead>
            <tr>
              <td className="px-2 border-solid border-black-100 border-[1px] rounded-md">
                STT
              </td>
              <td className="px-2 border-solid border-black-100 border-[1px] rounded-md">
                MSSV
              </td>
              <td className="px-2 border-solid border-black-100 border-[1px] rounded-md">
                Ho ten
              </td>
              <td className="px-2 border-solid border-black-100 border-[1px] rounded-md">
                Ngay sinh
              </td>
              <td className="px-2 border-solid border-black-100 border-[1px] rounded-md">
                Email
              </td>
              <td className="px-2 border-solid border-black-100 border-[1px] rounded-md"></td>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((item) => (
              <tr key={item.id}>
                <td className="px-2 border-solid border-black-100 border-[1px] rounded-md">
                  {item.id}
                </td>
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
