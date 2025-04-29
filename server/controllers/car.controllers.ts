import { Car } from "../models/car.models.ts";
import cloudinary from "../lib/cloudinary.ts";

export const getCars = async (req: any, res: any) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const getCarsByInformation = async (req: any, res: any) => {
  try {
    const { brand, model } = req.body;
    const cars = await Car.find({ brand, model });
    if (cars.length === 0)
      return res.status(404).json({ message: "No cars found" });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const addCar = async (req: any, res: any) => {
  try {
    const {
      brand,
      model,
      color,
      fuel,
      engine,
      document,
      gearBox,
      mileage,
      year,
      price,
      images,
      description,
      contact,
      carOption,
    } = req.body;
    if (
      !brand ||
      !model ||
      !color ||
      !fuel ||
      !engine ||
      !document ||
      !gearBox ||
      !mileage ||
      !year ||
      !images ||
      !description ||
      !contact
    )
      return res.status(400).json({
        message: !brand
          ? "Brand is required"
          : !model
          ? "Model is required"
          : !color
          ? "Color is required"
          : !fuel
          ? "Fuel is required"
          : !engine
          ? "Engine is required"
          : !document
          ? "Document is required"
          : !gearBox
          ? "GearBox is required"
          : !mileage
          ? "Mileage is required"
          : !year
          ? "Year is required"
          : !images
          ? "Images are required"
          : !description
          ? "Description is required"
          : "Contact is required",
      });

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "cars",
      });
      images[i] = result.secure_url;
    }
    const newCar = new Car({
      brand,
      model,
      color,
      fuel,
      engine,
      document,
      gearBox,
      mileage,
      year,
      price,
      images,
      description,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        city: contact.city,
        country: contact.country,
      },
      carOption,
    });
    await newCar.save();
    res.status(201).json({ message: "Car added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding car" });
  }
};

export const getCarById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Car ID is required" });
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car" });
  }
};
