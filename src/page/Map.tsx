// import Modal from "../components/Modal";
import { number, Row } from "../data/data";
import React, { useEffect, useRef, useState } from "react";
var row = 7;
var col = 5;
const Modal = React.lazy(() => import("../components/Modal"));
const Map: React.FC = () => {
  const [map, setMap] = useState<Row[]>(number);
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [modal, setModal] = useState<any>();
  const countRef = useRef(0);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  const handleMap = (q: string) => {
    switch (q) {
      case "MOVE UP": {
        if (row > 0 && map[row - 1][col] !== 1) {
          map[row - 1][col] = 2;
          map[row][col] = 0;
          row -= 1;
          setMap([...map]);
        }
        break;
      }
      case "MOVE DOWN": {
        if (row < 7 && map[row + 1][col] !== 1) {
          map[row + 1][col] = 2;
          map[row][col] = 0;
          row += 1;
          setMap([...map]);
        }
        break;
      }
      case "MOVE LEFT": {
        if (col > 0 && map[row][col - 1] !== 1) {
          map[row][col - 1] = 2;
          map[row][col] = 0;
          col -= 1;
          setMap([...map]);
        }
        break;
      }
      case "MOVE RIGHT": {
        if (col < 5 && map[row][col + 1] !== 1) {
          map[row][col + 1] = 2;
          map[row][col] = 0;
          col += 1;
          setMap([...map]);
        }
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const words = input.trim().toUpperCase().split("\n");
    console.log(words);
    setInput("");
    setQuery(words);
    handleMap(words[countRef.current]);
    countRef.current += 1;
  };
  const closeModal = () => {
    setIsSuccess(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (row === 0 && col === 4) {
        setIsSuccess(true);
      }
      if (countRef.current < query.length) {
        handleMap(query[countRef.current]);
        countRef.current += 1;
      } else {
        countRef.current = 0;
      }
    }, 1100);
    return () => {
      clearTimeout(timer);
    };
  }, [map]);
  return (
    <div className="flex flex-row">
      <div className="flex flex-col border-solid border-black px-10 py-10">
        <table>
          <tbody>
            {map.map((row, index) => (
              <tr key={index}>
                {row.map((item, i) => (
                  <td
                    key={i}
                    className={
                      item === 1
                        ? "px-8 py-8 bg-blue-500 "
                        : item === 2
                        ? "px-8 py-8 mario"
                        : item === 3
                        ? "px-8 py-8 diamond"
                        : "px-8 py-8"
                    }
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col">
        <label htmlFor="input">Enter query:</label>
        <textarea
          id="input"
          name="input"
          value={input}
          placeholder="Enter input"
          onChange={handleChange}
          className="mx-10 my-10 h-[50px] border-[1px] border-solid border-black px-3 py-3"
          rows={5}
          cols={30}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-300 border-solid px-3 py-3 hover:bg-blue-500"
        >
          Run
        </button>
        {isSuccess && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Modal message="Success hoohoo" closeModal={closeModal} />
          </React.Suspense>
        )}
      </div>
    </div>
  );
};

export default Map;
