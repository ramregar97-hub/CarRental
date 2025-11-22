import { useEffect, useState } from "react";
import { getMyCars } from "../API/api";
import CarCard from "../components/CarCard";
import type { Car } from "../components/CarCard";
import { useAuth } from "../context/AuthContext";

const MyCars = () => {
  const [myCars, setMyCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchMyCars = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const cars = await getMyCars();
      setMyCars(cars);
    } catch (error) {
      console.error("Failed to fetch my cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, [user]);

  const handleCarDeleted = () => {
    fetchMyCars(); // Refetch cars after deletion
  };

  if (!user) {
    return (
      <div className="container mx-auto text-center py-10">
        <p>Please login to see your cars.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold my-4">My Cars</h1>
      {loading ? (
        <p>Loading...</p>
      ) : myCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCars.map((car) => (
            <CarCard key={car._id} car={car} onDelete={handleCarDeleted} />
          ))}
        </div>
      ) : (
        <p>You have not listed any cars yet.</p>
      )}
    </div>
  );
};

export default MyCars;
