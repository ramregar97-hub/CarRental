// src/pages/EditCar.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, updateCarAPI } from "../API/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const EditCar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    kmDriven: "",
    fuelType: "",
    transmission: "",
  });
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        getCarById(id).then((res) => {
            setForm({
                title: res.title,
                brand: res.brand,
                model: res.model,
                year: res.year,
                price: res.price,
                kmDriven: res.kmDriven,
                fuelType: res.fuelType,
                transmission: res.transmission,
            });
        });
    }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!form.brand || !form.model || !form.price) {
      toast.error("Brand, model, and price are required");
      return;
    }

    setLoading(true);
    try {
        if(!id) return;
      await updateCarAPI(id,form);
      toast.success("Car updated successfully");
      navigate(`/car/${id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Update car failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-muted p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Car</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Title (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <Input placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
        <Input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
        <Input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <Input placeholder="KM Driven" value={form.kmDriven} onChange={(e) => setForm({ ...form, kmDriven: e.target.value })} />
        <Input placeholder="Fuel Type" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} />
        <Input placeholder="Transmission" value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} />

        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Car"}
        </Button>
      </form>
    </div>
  );
};

export default EditCar;
