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
  } catch (error) {
    res.status(500).json({ message: "Error adding car" });
  }
};

export const acceptCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID is required" });

    const notification = await User.findOne(
      {
        "notifications._id": id,
        _id: req.user._id,
      },
      { "notifications.$": 1 }
    );
    if (!notification || !notification.notifications[0])
      return res.status(404).json({ message: "Notification not found" });

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const senderId = notification.notifications[0].senderId;
    const carId = notification.notifications[0].cars._id;
    if (!senderId)
      return res.status(400).json({ message: "Sender ID is required" });

    await User.findOneAndUpdate(
      { _id: senderId, "cars._id": carId },
      {
        $set: {
          "cars.$.status": "accepted",
        },
      },
      { new: true }
    );

    let car;
    for (const admin of admins) {
      const notificationIndex = admin.notifications.findIndex(
        (notif) => notif.cars._id.toString() === id
      );
      if (notificationIndex !== -1) {
        car = admin.notifications[notificationIndex].cars;
        await User.findByIdAndUpdate(admin._id, {
          $pull: {
            notifications: { _id: admin.notifications[notificationIndex]._id },
          },
        });
        break;
      }
    }
    if (!car) return res.status(404).json({ message: "Car not found" });
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

    res.status(200).json({ message: "Car accepted successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Error accepting car" });
  }
};

export const rejectCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID is required" });

    const notification = await User.findOne(
      {
        "notifications._id": id,
        _id: req.user._id,
      },
      { "notifications.$": 1 }
    );
    if (!notification || !notification.notifications[0])
      return res.status(404).json({ message: "Notification not found" });

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const senderId = notification.notifications[0].senderId;
    const carId = notification.notifications[0].cars._id;
    if (!senderId)
      return res.status(400).json({ message: "Sender ID is required" });

    await User.findOneAndUpdate(
      { _id: senderId, "cars._id": carId },
      {
        $set: {
          "cars.$.status": "rejected",
        },
      },
      { new: true }
    );

    for (const admin of admins) {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { _id: id },
        },
      });
    }

    res.status(200).json({ message: "Car accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting car" });
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
