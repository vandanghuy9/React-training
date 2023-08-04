import Grid from "./page/Grid";
import Map from "./page/Map";
import Table from "./page/Table";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className=" px-10 h-[100vh]  ">
      <div className="bg-white mx-auto">
        <nav className="px-1 py-1 border-black-100 border-solid border-[1px]">
          <ul className="flex flex-row ">
            {["table", "map", "grid"].map((item, index) => {
              let link = item === "table" ? "/" : item;
              return (
                <li className="px-6 py-3 hover:bg-blue-100 " key={index}>
                  <Link to={link}>{item[0].toUpperCase() + item.slice(1)}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/map" element={<Map />} />
            <Route path="/grid" element={<Grid />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
