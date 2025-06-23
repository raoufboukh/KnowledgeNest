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

    let notification = null;
    let adminWithNotification = null;

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

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

    const user = await User.findById(senderId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let carIndex = -1;
    let matchedCar = null;

    if (user.cars && Array.isArray(user.cars)) {
      for (let i = 0; i < user.cars.length; i++) {
        const car = user.cars[i];

        if (
          car._id.toString() === notificationCar.toString() &&
          car.status === "pending"
        ) {
          carIndex = i;
          matchedCar = car;
          break;
        }
      }
    }

    if (carIndex === -1) {
      return res
        .status(404)
        .json({ message: "Matching pending car not found in user's array" });
    }

    const updateQuery: { [key: string]: any } = {};
    updateQuery[`cars.${carIndex}.status`] = "accepted";

    const updateResult = await User.findByIdAndUpdate(
      senderId,
      { $set: updateQuery },
      { new: true }
    );

    const carToSave = matchedCar;

    if (!carToSave) {
      return res.status(404).json({ message: "Car data not found" });
    }

    const newCar = new Car({
      _id: carToSave._id,
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

    let notification = null;
    let adminWithNotification = null;

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

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

    const user = await User.findById(senderId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findOneAndUpdate(
      { _id: senderId, "cars._id": notificationCar },
      { $set: { cars: { status: "rejected" } } }
    );

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
    await User.updateOne(
      { cars: { $elemMatch: { _id: id } } },
      { $pull: { cars: { _id: id } } }
    );
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car" });
  }
};

export const updateCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Car ID is required" });

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

    const car = await Car.findById(id);

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const processedImages = [...images];
    for (let i = 0; i < processedImages.length; i++) {
      if (processedImages[i].startsWith("data:image")) {
        const result = await cloudinary.uploader.upload(processedImages[i], {
          folder: "cars",
        });
        processedImages[i] = result.secure_url;
      }
    }

    const carUpdated = await User.findOneAndUpdate(
      { "cars._id": id },
      {
        $set: {
          "cars.$.name": name,
          "cars.$.brand": brand,
          "cars.$.model": model,
          "cars.$.color": color,
          "cars.$.fuel": fuel,
          "cars.$.engine": engine,
          "cars.$.document": document,
          "cars.$.gearBox": gearBox,
          "cars.$.mileage": mileage,
          "cars.$.year": year,
          "cars.$.price": price,
          "cars.$.images": processedImages,
          "cars.$.description": description,
          "cars.$.contact": contact,
          "cars.$.carOption": carOption,
          "cars.$.status": "pending",
        },
      },
      { new: true }
    );

    await Car.findByIdAndDelete(id);

    const user = await User.findOne({ "cars._id": id });
    const updatedCarFromArray = user?.cars.find(
      (car: any) => car._id.toString() === id
    );

    for (const admin of admins) {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { "cars._id": id },
        },
      });

      await User.findByIdAndUpdate(admin._id, {
        $push: {
          notifications: {
            $each: [
              {
                message: `Car updated: ${brand} ${model}`,
                cars: updatedCarFromArray,
                senderId: req.user._id,
                createdAt: new Date(),
              },
            ],
            $position: 0,
          },
        },
      });
    }

    res
      .status(200)
      .json({ message: "Car updated successfully", car: carUpdated });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error updating car" });
    console.error("Error updating car:", error);
  }
};
