import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import Home from "./Pages/Home.tsx";
import NavBar from "./components/Layout/NavBar.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CarDetails from "./Pages/CarDetails.tsx";
import MyCars from "./Pages/MyCars.tsx"; // Import MyCars component
import AddCar from "./Pages/AddCar.tsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen ">
      <NavBar />
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-car"
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cars"
            element={
              <ProtectedRoute>
                <MyCars />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};
export default App;
