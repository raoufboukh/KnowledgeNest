import { Car } from "../models/car.models.ts";
import cloudinary from "../lib/cloudinary.ts";
import { User } from "../models/auth.models.ts";
import mongoose from "mongoose";

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
      name,
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
      !name ||
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
        message: !name
          ? "Name is required"
          : !brand
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

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "cars",
      });
      images[i] = result.secure_url;
    }

    const id = new mongoose.Types.ObjectId();
    const newCar = {
      _id: id,
      name,
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
      user: req.user._id,
    };

    console.log("New car data:", newCar);

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        cars: newCar,
      },
    });

    admins.forEach(async (admin) => {
      await User.findByIdAndUpdate(admin._id, {
        $push: {
          notifications: {
            $each: [
              {
                message: `New car added: ${brand} ${model}`,
                cars: newCar,
                senderId: req.user._id,
                createdAt: new Date(),
              },
            ],
            $position: 0,
          },
        },
      });
    });
    res.status(201).json({ message: "Car sent at Admins" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error adding car" });
  }
};

export const acceptCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID is required" });

    // Find the notification across all admin users
    let notification = null;
    let adminWithNotification = null;

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    // Search for the notification in all admin accounts
    for (const admin of admins) {
      const foundNotification = admin.notifications.find(
        (notif: any) => notif._id.toString() === id
      );
      if (foundNotification) {
        notification = foundNotification;
        adminWithNotification = admin;
        break;
      }
    }

    if (!notification || !adminWithNotification)
      return res.status(404).json({ message: "Notification not found" });

    const senderId = notification.senderId;
    const notificationCar = notification.cars._id;

    console.log(notificationCar);

    console.log("Sender ID:", senderId);
    // console.log(
    //   "Notification car data:",
    //   JSON.stringify(notificationCar, null, 2)
    // );

    // Find the user
    const user = await User.findById(senderId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.name);

    // Since the car ID from notification is undefined, let's find the car by matching other fields
    let carIndex = -1;
    let matchedCar = null;

    if (user.cars && Array.isArray(user.cars)) {
      for (let i = 0; i < user.cars.length; i++) {
        const car = user.cars[i];

        // Match by multiple fields to find the correct car
        if (
          car._id.toString() === notificationCar.toString() &&
          car.status === "pending" // Ensure we only accept pending cars
        ) {
          // Only pending cars
          carIndex = i;
          matchedCar = car;
          console.log("Found matching car at index:", i);
          console.log("Car ID:", car._id);
          break;
        }
      }
    }

    if (carIndex === -1) {
      return res
        .status(404)
        .json({ message: "Matching pending car not found in user's array" });
    }

    // Update using direct index (most reliable method)
    const updateQuery: { [key: string]: any } = {};
    updateQuery[`cars.${carIndex}.status`] = "accepted";

    const updateResult = await User.findByIdAndUpdate(
      senderId,
      { $set: updateQuery },
      { new: true }
    );

    console.log(
      "Update with index result:",
      updateResult ? "Success" : "Failed"
    );

    if (updateResult) {
      console.log("Updated car status:", updateResult.cars[carIndex].status);
    }

    // Create a new car document in the Car collection using the matched car data
    const carToSave = matchedCar; // Use the actual car from user's array

    if (!carToSave) {
      return res.status(404).json({ message: "Car data not found" });
    }

    const newCar = new Car({
      name: carToSave.name,
      brand: carToSave.brand,
      model: carToSave.model,
      color: carToSave.color,
      fuel: carToSave.fuel,
      engine: carToSave.engine,
      document: carToSave.document,
      gearBox: carToSave.gearBox,
      mileage: carToSave.mileage,
      year: carToSave.year,
      price: carToSave.price,
      images: carToSave.images,
      description: carToSave.description,
      carOption: carToSave.carOption,
      contact: carToSave.contact,
      user: senderId,
      status: "accepted",
    });

    const savedCar = await newCar.save();
    console.log("New car created:", savedCar._id);

    // Remove the notification from all admin accounts
    for (const admin of admins) {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { _id: id },
        },
      });
    }

    res.status(200).json({
      message: "Car accepted successfully",
      car: savedCar,
    });
  } catch (error: any) {
    console.error("Error accepting car:", error);
    res.status(500).json({ message: error.message || "Error accepting car" });
  }
};

export const rejectCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID is required" });

    // Find the notification across all admin users
    let notification = null;
    let adminWithNotification = null;

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    // Search for the notification in all admin accounts
    for (const admin of admins) {
      const foundNotification = admin.notifications.find(
        (notif: any) => notif._id.toString() === id
      );
      if (foundNotification) {
        notification = foundNotification;
        adminWithNotification = admin;
        break;
      }
    }

    if (!notification || !adminWithNotification)
      return res.status(404).json({ message: "Notification not found" });

    const senderId = notification.senderId;
    const notificationCar = notification.cars._id;
    console.log("Notification Id Car", notificationCar);

    console.log("Sender ID:", senderId);

    // Find the user
    const user = await User.findById(senderId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the notification from all admin accounts
    for (const admin of admins) {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { _id: id },
        },
      });
    }

    res.status(200).json({ message: "Car rejected successfully" });
  } catch (error: any) {
    console.error("Error rejecting car:", error);
    res.status(500).json({ message: error.message || "Error rejecting car" });
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

export const getAllBrands = async (req: any, res: any) => {
  try {
    const cars = await Car.find();
    const brands = Array.from(new Set(cars.map((car) => car.brand))).sort();
    res.status(200).json(brands);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error fetching brands" });
  }
};

export const deleteCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Car ID is required" });
    const car = await Car.findByIdAndDelete(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car" });
  }
};
