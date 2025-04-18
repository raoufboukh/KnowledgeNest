import mongoose from "mongoose";

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
    googleId: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", user);
