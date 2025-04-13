import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routers/auth.routers.ts";
import MongoStore from "connect-mongo";
import session from "express-session";
import configurePassport from "./controllers/auth.controllers.ts";
import passport from "passport";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectionUrl = process.env.CONNECTION_URL || "";

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "library_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: connectionUrl,
    }),
  })
);

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", router);

mongoose.connect(connectionUrl).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
