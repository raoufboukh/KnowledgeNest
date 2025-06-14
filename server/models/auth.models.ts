import mongoose from "mongoose";
import { Car } from "./car.models.ts";

const user = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !(this as any).googleId;
      },
    },
    image: { type: String, default: "" },
    googleId: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    notifications: [
      {
        message: { type: String, required: true },
        cars: { type: Object },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    cars: [Car.schema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", user);
