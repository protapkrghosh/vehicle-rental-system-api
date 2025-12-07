import express, { Request, Response } from "express";
import initDB from "./config/database";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";

const app = express();
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
   res.send("Vehicle Rental System Running...");
});

app.use("/api/v1/users", userRoutes); // User CRUD
app.use("/api/v1/auth", authRoutes); // Auth Routes
app.use("/api/v1/vehicles", vehicleRoutes); // Vehicle Routes
app.use("/api/v1/bookings", bookingRoutes); // Booking Routes

// Find not found route
app.use((req: Request, res: Response) => {
   res.status(404).json({
      success: false,
      message: "Route not found",
      path: req.path,
   });
});

export default app;
