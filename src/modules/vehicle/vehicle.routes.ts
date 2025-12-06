import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleControllers.createVehicle);
router.get("/", vehicleControllers.getVehicles);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);

export const vehicleRoutes = router;
