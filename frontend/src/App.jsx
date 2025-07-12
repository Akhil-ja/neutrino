import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
