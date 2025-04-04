import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectionUrl = process.env.CONNECTION_URL || "";

app.use(
  cors({
    origin: ["http://localhost:3000", ""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect(connectionUrl).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
