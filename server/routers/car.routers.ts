import express from "express";
import {
  addCar,
  deleteCar,
  getAllBrands,
  getCarById,
  getCars,
  getCarsByInformation,
} from "../controllers/car.controllers.ts";

const carRouter = express.Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.post("/add", addCar);
carRouter.get("/getCarsByInformation", getCarsByInformation);
carRouter.get("/getAllBrands", getAllBrands);
carRouter.delete("/:id", deleteCar);

export default carRouter;
