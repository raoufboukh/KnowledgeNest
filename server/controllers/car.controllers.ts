import { Car } from "../models/car.models.ts";
import cloudinary from "../lib/cloudinary.ts";
import { User } from "../models/auth.models.ts";

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
    const newCar = {
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

// ...existing code...

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
    const carId = notification.cars._id;
    if (!senderId)
      return res.status(400).json({ message: "Sender ID is required" });

    // Update the car status in the user's cars array
    await User.findOneAndUpdate(
      { _id: senderId, "cars._id": carId },
      {
        $set: {
          "cars.$.status": "accepted",
        },
      },
      { new: true }
    );

    // Get the car data from the notification
    const car = notification.cars;

    // Create a new car document in the Car collection
    const newCar = new Car({
      name: car.name,
      brand: car.brand,
      model: car.model,
      color: car.color,
      fuel: car.fuel,
      engine: car.engine,
      document: car.document,
      gearBox: car.gearBox,
      mileage: car.mileage,
      year: car.year,
      price: car.price,
      images: car.images,
      description: car.description,
      carOption: car.carOption,
      contact: {
        name: car.contact.name,
        email: car.contact.email,
        phone: car.contact.phone,
        address: car.contact.address,
        city: car.contact.city,
        country: car.contact.country,
      },
      user: senderId,
      status: "accepted",
    });
    await newCar.save();

    // Remove the notification from all admin accounts
    for (const admin of admins) {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { _id: id },
        },
      });
    }

    res.status(200).json({ message: "Car accepted successfully", car: newCar });
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
    const carId = notification.cars._id;
    if (!senderId)
      return res.status(400).json({ message: "Sender ID is required" });

    // Update the car status in the user's cars array
    await User.findOneAndUpdate(
      { _id: senderId, "cars._id": carId },
      {
        $set: {
          "cars.$.status": "rejected",
        },
      },
      { new: true }
    );

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

// ...existing code...

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
  } catch (error) {
    res.status(500).json({ message: "Error fetching brands" });
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
