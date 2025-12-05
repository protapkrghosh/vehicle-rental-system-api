import { Request, Response } from "express";
import { userServices } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
   try {
      const result = await userServices.getUsers(req.body);
      // console.log(result.rows[0]);

      res.status(201).json({
         success: true,
         message: "User Inserted Successfully",
         data: result.rows[0],
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const updateUser = async (req: Request, res: Response) => {
   const result = await userServices.updateUser(req.body, req.params.userId!);

   try {
      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "User not found",
            data: result.rows[0],
         });
      } else {
         res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
         });
      }
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const deleteUser = async (req: Request, res: Response) => {
   const result = await userServices.deleteUser(req.params.userId!);

   try {
      res.status(200).json({
         success: true,
         message: "Users deleted successfully",
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const userControllers = {
   getUsers,
   updateUser,
   deleteUser,
};
