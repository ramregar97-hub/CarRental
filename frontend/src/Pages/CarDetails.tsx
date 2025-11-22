// src/pages/CarDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById, buyCarAPI } from "../API/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

interface OwnerDetails {
    name?: string;
    email?: string;
    phone?: string;
}

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<any | null>(null);
    const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            if (!id) return;
            try {
                const data = await getCarById(id);
                setCar(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id]);

    const handleBuy = async () => {
        if (!id) return;
        try {
            const res = await buyCarAPI(id);
            // backend expected to return ownerDetails
            setOwnerDetails(res.ownerDetails || null);
            alert("Purchase successful! Owner details shown.");
            // refresh car
            const updated = await getCarById(id);
            setCar(updated);
        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Purchase failed");
        }
    };

    if (!car) return <div>Loading car...</div>;

    // The current user is the owner of the car
    const isOwner = user && car.owner._id === user.id;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    {car.images && car.images.length ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={car.images[0]} alt={car.title} className="w-full h-96 object-cover rounded" />
                    ) : (
                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center">No Image</div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold">{car.title ?? `${car.brand} ${car.model}`}</h2>
                    <p className="text-gray-600">Year: {car.year}</p>
                    <p className="text-gray-600">KM Driven: {car.kmDriven}</p>
                    <p className="text-gray-800 text-xl font-semibold mt-3">₹ {car.price?.toLocaleString()}</p>

                    <div className="mt-4">
                        {car.isSold ? (
                            <div className="text-red-600 font-medium">This car is already sold</div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <Button onClick={handleBuy} disabled={!user || isOwner}>
                                    Buy Now
                                </Button>
                                {isOwner && (
                                    <span className="text-sm text-gray-500">You cannot buy your own car</span>
                                )}
                                {!user && <span className="text-sm text-gray-500">Login to buy</span>}
                            </div>
                        )}
                    </div>

                    {ownerDetails && (
                        <div className="mt-6 p-4 border rounded">
                            <h4 className="font-semibold mb-2">Owner Details</h4>
                            <p>Name: {ownerDetails.name}</p>
                            <p>Email: {ownerDetails.email}</p>
                            <p>Phone: {ownerDetails.phone || "N/A"}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
