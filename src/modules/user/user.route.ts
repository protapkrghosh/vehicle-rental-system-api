import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/", userControllers.getUsers); // TODO Applying get method
router.put("/:userId", userControllers.updateUser);

export const userRoutes = router;
