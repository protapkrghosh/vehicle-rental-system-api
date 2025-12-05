import express, { Request, Response } from "express";
import initDB from "./config/database";
import { userRoutes } from "./modules/user/user.route";

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
   res.send("Vehicle Rental System...");
});

app.use("/api/v1/users", userRoutes);

export default app;
