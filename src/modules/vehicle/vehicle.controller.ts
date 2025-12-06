import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
   try {
      const result = await vehicleServices.createVehicle(req.body);

      res.status(201).json({
         success: true,
         message: "Vehicle created successfully",
         data: result.rows[0],
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
         errors: error,
      });
   }
};

export const vehicleControllers = {
   createVehicle,
};
