import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", user);
