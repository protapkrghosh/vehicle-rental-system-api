import express, { Request, Response } from "express";
import initDB from "./config/database";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./auth/auth.routes";

const app = express();
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
   res.send("Vehicle Rental System...");
});

app.use("/api/v1/users", userRoutes); // User CRUD
app.use("/api/v1/auth", authRoutes); // Auth Routes

export default app;
