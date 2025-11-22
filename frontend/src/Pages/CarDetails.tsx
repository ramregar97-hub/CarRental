// src/pages/CarDetails.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, buyCarAPI, deleteCar } from "../API/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface OwnerDetails {
    name?: string;
    email?: string;
    phone?: string;
}

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<any | null>(null);
    const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

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
            toast.success("Purchase successful! Owner details shown.");
            // refresh car
            const updated = await getCarById(id);
            setCar(updated);
        } catch (err: any) {
            console.error(err);
            toast.error(err?.message || "Purchase failed");
        }
    };

    const confirmDelete = async () => {
        if (!id) return;
        try {
            await deleteCar(id);
            navigate("/", { state: { carDeleted: true } });
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                toast.error("This car has already been deleted.");
                navigate("/");
            } else {
                toast.error(err?.message || "Delete failed");
            }
        }
    };


    if (!car) return <div>Loading car...</div>;

    // The current user is the owner of the car
    const isOwner = user ? car.owner._id === user.id : false;

    return (
        <div className="max-w-4xl mx-auto bg-card text-card-foreground p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    {car.images && car.images.length ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={car.images[0]} alt={car.title} className="w-full h-96 object-cover rounded" />
                    ) : (
                        <div className="w-full h-96 bg-muted flex items-center justify-center">No Image</div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold">{car.title ?? `${car.brand} ${car.model}`}</h2>
                    <p className="text-muted-foreground">Year: {car.year}</p>
                    <p className="text-muted-foreground">KM Driven: {car.kmDriven}</p>
                    <p className="text-xl font-semibold mt-3">₹ {car.price?.toLocaleString()}</p>

                    <div className="mt-4">
                        {car.isSold ? (
                            <div className="text-red-600 font-medium">This car is already sold</div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <Button onClick={handleBuy} disabled={!user || isOwner}>
                                    Buy Now
                                </Button>
                                {isOwner && (
                                    <span className="text-sm text-muted-foreground">You cannot buy your own car</span>
                                )}
                                {!user && <span className="text-sm text-muted-foreground">Login to buy</span>}
                            </div>
                        )}
                    </div>

                    {isOwner && (
                         <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="mt-4">Delete Car</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        car and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={confirmDelete} >Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

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
