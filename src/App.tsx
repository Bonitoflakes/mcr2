import { NavLink, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Archived } from "./pages/Archived";

function App() {
  return (
    <>
      <nav className="flex justify-center gap-8 p-3 align-center">
        <NavLink className={({ isActive }) => (isActive ? "text-red-700" : "text-white")} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "text-red-700" : "text-white")} to="/archive">
          Archive
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/archive" element={<Archived />} />
        <Route path="*" element={<>404 Not found</>} />
      </Routes>
    </>
  );
}

export default App;
