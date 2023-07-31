import Grid from "./page/Grid";
import Map from "./page/Map";
import Table from "./page/Table";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="bg-blue-200 px-10 h-[100vh]  ">
      <div className="bg-white mx-auto">
        <h1 className="text-center py-[30px]">Vite + React</h1>

        <nav className="px-1 w-[100px]">
          <ul className="flex flex-row w-[100px]">
            <li className="px-[10px] hover:bg-blue-100">
              <Link to={"/"}>Table</Link>
            </li>
            <li className="px-[10px] hover:bg-blue-100">
              <Link to={"/map"}>Map</Link>
            </li>
            <li className="px-[10px] hover:bg-blue-100">
              <Link to={"/grid"}>Grid</Link>
            </li>
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
