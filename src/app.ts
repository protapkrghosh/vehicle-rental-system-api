import express, { Request, Response } from "express";
import initDB from "./config/database";

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
   res.send("Vehicle Rental System...");
});

export default app;
