import { Car } from "../models/car.model.js";
import path from "path";

export const addCar = async (req, res) => {
  try {
    const owner = req.user.id;

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => `/uploads/${path.basename(file.path)}`);
    } else {
      imagePaths = ["https://stmartinblue.com/images/cars/default_car.jpg"];
    }

    const {
      title,
      brand,
      model,
      year,
      price,
      kmDriven,
      fuelType,
      transmission,
    } = req.body;

    const car = await Car.create({
      title,
      brand,
      model,
      year,
      price,
      kmDriven,
      fuelType,
      transmission,
      images: imagePaths,
      owner,
    });

    res.json({ message: "Car added successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const buyCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const buyerId = req.user.id;

    const car = await Car.findById(carId).populate("owner");

    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.owner.id === buyerId) {
      return res.status(400).json({ message: "You cannot buy your own car" });
    }
    if (car.isSold) return res.status(400).json({ message: "Car already sold" });

    car.isSold = true;
    car.buyer = buyerId;
    await car.save();

    res.json({
      message: "Car purchased successfully",
      ownerDetails: {
        name: car.owner.name,
        email: car.owner.email,
        phone: car.owner.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isSold: false, isLive: true }).populate(
      "owner",
      "name email _id"
    );
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate(
      "owner",
      "name email _id"
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCars = async (req, res) => {
  try {
    const myCars = await Car.find({ owner: req.user.id });
    res.status(200).json(myCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (car.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await car.deleteOne();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLiveStatus = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (car.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    car.isLive = !car.isLive;
    await car.save();
    res.status(200).json({ message: "Car status updated successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
