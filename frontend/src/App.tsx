import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import Home from "./Pages/Home.tsx";
import AddCar from "./Pages/AddCar.tsx";
import NavBar from "./components/Layout/NavBar.tsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-car" element={<AddCar />} />
      </Routes>
    </>
  );
}

export default App;
