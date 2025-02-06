import "./App.css";
import SideBar from "./components/SideBar";
import ThreeCanvas from "./components/ThreeCanvas";

function App() {
  return (
    <div className="flex justify-items-start w-[100vw] h-[100vh] max-w-[100vw] bg-amber-950 ">
      <div className="w-96 min-w-96 bg-amber-200 h-full">
        <SideBar />
      </div>
      <div className="flex-auto h-full">
        <ThreeCanvas />
      </div>
    </div>
  );
}

export default App;
