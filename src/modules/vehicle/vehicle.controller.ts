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

const getVehicles = async (req: Request, res: Response) => {
   try {
      const result = await vehicleServices.getVehicles();

      if (result.rows.length === 0) {
         res.status(200).json({
            success: true,
            message: "No vehicles found",
            data: result.rows,
         });
      }

      res.status(200).json({
         success: true,
         message: "Vehicles retrieved successfully",
         data: result.rows,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
         errors: error,
      });
   }
};

const getSingleVehicle = async (req: Request, res: Response) => {
   try {
      const result = await vehicleServices.getSingleVehicle(
         req.params.vehicleId!
      );

      if (result.rows.length === 0) {
         res.status(200).json({
            success: true,
            message: "No vehicles found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Vehicle retrieved successfully",
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

const updateVehicle = async (req: Request, res: Response) => {
   try {
      const result = await vehicleServices.updateVehicle(
         req.body,
         req.params.vehicleId!
      );
      res.status(200).json({
         success: true,
         message: "Vehicle updated successfully",
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

const deleteVehicle = async (req: Request, res: Response) => {
   try {
      const result = await vehicleServices.deleteVehicle(req.params.vehicleId!);

      res.status(200).json({
         success: true,
         message: "Vehicle deleted successfully",
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
   getVehicles,
   getSingleVehicle,
   updateVehicle,
   deleteVehicle,
};
