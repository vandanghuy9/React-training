import React, { useState } from "react";
import img from "/furniture.jpg";
import ImageRow from "../components/ImageRow";
type Table = {
  row: number;
  col: number;
};
const Grid: React.FC = () => {
  const defaultTable: Table = {
    row: 1,
    col: 1,
  };
  const [table, setTable] = useState<Table>(defaultTable);
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const [imgGrid, setImgGrid] = useState<Array<any>>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let i = 0; i < table.row; i++) {
      imgGrid.push(<ImageRow key={i} col={table.col} img={img} />);
    }
    setImgGrid([...imgGrid]);
    setIsShowTable(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTable({ ...table, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="row"
            className="px-3 border-solid border-black border-[1px]"
          >
            Chọn số hàng:
          </label>
          <input
            name="row"
            value={table.row}
            id="row"
            type="number"
            min={defaultTable.row}
            max="100"
            onChange={handleChange}
          ></input>
          <label
            htmlFor="row"
            className="px-3 border-solid border-black border-[1px]"
          >
            Chọn số cột:
          </label>
          <input
            name="col"
            value={table.col}
            id="col"
            type="number"
            min={defaultTable.col}
            max="100"
            onChange={handleChange}
          ></input>
          <button
            type="submit"
            className="border-solid border-black border-[1px] px-5 bg-blue-200 hover:bg-blue-300"
          >
            Render
          </button>
        </form>
      </div>
      {isShowTable && (
        <div>
          <div className="flex flex-col">
            <div className="flex flex-col ">{imgGrid}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
