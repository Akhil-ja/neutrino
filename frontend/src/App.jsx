import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <Outlet />
    </div>
  );
}

export default App;
