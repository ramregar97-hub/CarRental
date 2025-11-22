// src/components/CarCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

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
    isLive?: boolean;
}

interface CarCardProps {
    car: Car;
    isMyCar?: boolean;
    onDelete?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, isMyCar, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-card text-card-foreground rounded-lg shadow overflow-hidden">
            <div className="h-44 bg-muted flex items-center justify-center">
                {car.images && car.images.length ? (
                    //   show first image
                    //   eslint-disable-next-line @next/next/no-img-element
                    <img src={car.images[0]} alt={car.title} className="h-full w-full object-cover" />
                ) : (
                    <div className="text-muted-foreground">No Image</div>
                )}
            </div>

            <div className="p-3">
                <h4 className="font-semibold">{car.title ?? `${car.brand} ${car.model}`}</h4>
                <p className="text-sm text-muted-foreground">Year: {car.year ?? "-"} </p>
                <p className="text-sm text-muted-foreground">
                    {car.kmDriven.toLocaleString()} km · {car.fuelType} · {car.transmission}
                </p>
                <p className="text-lg font-bold mt-2">₹ {car.price.toLocaleString()}</p>

                <div className="mt-3 flex gap-2">
                    <Button onClick={() => navigate(`/car/${car._id}`)}>
                        View
                    </Button>
                    {isMyCar && (
                        <Button variant="destructive" onClick={onDelete}>Delete</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarCard;
