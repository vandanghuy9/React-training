import React, { useState } from "react";
import img from "/furniture.jpg";
import ImageRow from "../components/ImageRow";
import { ImageArr } from "../data/data";
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
    let image = [...ImageArr];
    if (image.length > table.col * table.row) {
      const newLength = table.col * table.row;
      image = image.slice(0, newLength);
    }
    const LENGTH = image.length;
    const getCol: number = table.col;
    let start: number = 0,
      end: number = start + getCol;
    for (let i = 0; i < table.row - 1; i++) {
      imgGrid.push(<ImageRow key={i} img={image.slice(start, end)} />);
      start = end;
      end += getCol;
    }
    imgGrid.push(<ImageRow key={"left"} img={image.slice(start, LENGTH)} />);

    setImgGrid([...imgGrid]);
    setIsShowTable(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTable({ ...table, [e.target.name]: Number(e.target.value) });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="mx-5 my-5">
          <label htmlFor="row" className="px-3 mx-1">
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
            className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-100"
          ></input>
          <label htmlFor="row" className="px-3 mx-1 ">
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
            className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-100"
          ></input>
          <button
            type="submit"
            className="border-solid border-black border-[1px] rounded-md mx-3 px-5 bg-blue-200 hover:bg-blue-300"
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
