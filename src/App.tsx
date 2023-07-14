import Setup from "./page/Map";

function App() {
  return (
    <div className="bg-blue-200 px-10 h-[100vh] pt-[50px]">
      <div className="bg-white mx-auto">
        <h1 className="text-center py-[30px]">Vite + React</h1>
        <div>
          <Setup></Setup>
        </div>
      </div>
    </div>
  );
}

export default App;
