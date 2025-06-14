import express from "express";
import {
  acceptCar,
  addCar,
  deleteCar,
  getAllBrands,
  getCarById,
  getCars,
  getCarsByInformation,
  rejectCar,
} from "../controllers/car.controllers.ts";

const carRouter = express.Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.post("/add", addCar);
carRouter.get("/getCarsByInformation", getCarsByInformation);
carRouter.get("/getAllBrands", getAllBrands);
carRouter.delete("/:id", deleteCar);
carRouter.put("/reject/:id", rejectCar);
carRouter.put("/accept/:id", acceptCar);

export default carRouter;
