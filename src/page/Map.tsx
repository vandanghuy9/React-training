import { number, Row } from "../data/data";
import { useEffect, useRef, useState } from "react";
var row = 7;
var col = 5;
const Map: React.FC = () => {
  const [map, setMap] = useState<Row[]>(number);
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string[]>([]);
  const countRef = useRef(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleMap = (q: string) => {
    switch (q) {
      case "UP": {
        if (row > 0 && map[row - 1][col] !== 1) {
          map[row - 1][col] = 2;
          map[row][col] = 0;
          row -= 1;
          setMap([...map]);
        }
        break;
      }
      case "DOWN": {
        if (row < 7 && map[row + 1][col] !== 1) {
          map[row + 1][col] = 2;
          map[row][col] = 0;
          row += 1;
          setMap([...map]);
        }
        break;
      }
      case "LEFT": {
        if (col > 0 && map[row][col - 1] !== 1) {
          map[row][col - 1] = 2;
          map[row][col] = 0;
          col -= 1;
          setMap([...map]);
        }
        break;
      }
      default: {
        if (col < 5 && map[row][col + 1] !== 1) {
          map[row][col + 1] = 2;
          map[row][col] = 0;
          col += 1;
          setMap([...map]);
        }
      }
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const words = input.toUpperCase().split(" ");
    const seperatedinput = words.filter((item) => item !== "MOVE");
    setInput("");
    setQuery(seperatedinput);
    handleMap(seperatedinput[countRef.current]);
    countRef.current += 1;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
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
        <form onSubmit={handleSubmit}>
          <input
            id="input"
            name="input"
            value={input}
            placeholder="Enter input"
            onChange={handleChange}
            className="mx-10 my-10 h-[50px] "
            style={{
              border: "1px solid black",
            }}
          ></input>
          <button
            type="submit"
            className="bg-blue-300 border-solid px-3 py-3 hover:bg-blue-500"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
};

export default Map;
