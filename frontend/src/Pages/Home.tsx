import React, { useEffect, useState } from "react";
import { getAllCars } from "../API/api";
import CarCard from "../components/CarCard";
import { useAuth } from "../context/AuthContext";

export interface Car {
    _id: string;
    title: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    kmDriven: number;
    fuelType: string;
    transmission: string;
    images?: string[];
    isSold?: boolean;
    owner: {
        _id: string;
        name: string;
        email: string;
    };
}

const Home: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Filters
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");
    const [showMyCars, setShowMyCars] = useState(false);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const data = await getAllCars();
            setCars(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    // Filtering Logic
    const applyFilters = () => {
        let list = [...cars];

        // "My Cars" filter
        if (showMyCars && user) {
            list = list.filter((car) => car.owner._id === user.id);
        }

        // Search by name
        if (search.trim()) {
            list = list.filter((car) =>
                car.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Min Price
        if (minPrice) {
            list = list.filter((car) => car.price >= parseInt(minPrice));
        }

        // Max Price
        if (maxPrice) {
            list = list.filter((car) => car.price <= parseInt(maxPrice));
        }

        // Sort
        if (sort === "low") {
            list.sort((a, b) => a.price - b.price);
        } else if (sort === "high") {
            list.sort((a, b) => b.price - a.price);
        }

        setFilteredCars(list);
    };

    const clearFilters = () => {
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        setSort("");
        setShowMyCars(false);
    };

    useEffect(() => {
        applyFilters();
    }, [search, minPrice, maxPrice, sort, cars, showMyCars, user]);

    const handleCarDeleted = () => {
        fetchCars(); // Refetch cars after deletion
    };

    return (
        <div className="w-full pb-10">

            {/* 🔥 TOP HERO SECTION */}
            <div className="relative h-[300px] sm:h-[380px] w-full rounded-xl overflow-hidden shadow-md">
                <img
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
                    alt="Car Banner"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                        Find Your Perfect Ride 🚗
                    </h1>
                    <p className="mt-2 text-lg sm:text-xl opacity-90">
                        Buy & Sell Second-Hand Cars with Trusted Owners
                    </p>
                </div>
            </div>

            {/* 🔍 FILTERS SECTION */}
            <div className="mt-8 p-4 rounded-lg bg-muted shadow-sm border">

                <h2 className="text-xl font-semibold mb-4">Filter Cars</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">

                    {/* Search by Name */}
                    <input
                        type="text"
                        placeholder="Search by car name..."
                        className="border p-2 rounded-md md:col-span-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Min Price */}
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="border p-2 rounded-md"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />

                    {/* Max Price */}
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="border p-2 rounded-md"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />

                    {/* Sort Options */}
                    <select
                        className="border p-2 rounded-md"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="low">Price: Low → High</option>
                        <option value="high">Price: High → Low</option>
                    </select>
                </div>
                
                {/* My Cars Filter */}
                {user && (
                    <div className="mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showMyCars}
                                onChange={(e) => setShowMyCars(e.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-700">Show My Cars Only</span>
                        </label>
                    </div>
                )}

                <div className="mt-4 flex gap-4">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-md"
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 p-2 rounded-md"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* 🚘 AVAILABLE CARS */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>

                {loading ? (
                    <div>Loading...</div>
                ) : filteredCars.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map((c) => (
                            <CarCard car={c} key={c._id} onDelete={handleCarDeleted} />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-lg mt-4 text-center">
                        No cars found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
