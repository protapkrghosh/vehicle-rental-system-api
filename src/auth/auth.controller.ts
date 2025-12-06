import { Request, Response } from "express";
import { authServices } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
   try {
      const result = await authServices.registerUser(req.body);
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
         errors: error,
      });
   }
};

export const authControllers = {
   registerUser,
};
