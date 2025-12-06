import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signUpUser = async (req: Request, res: Response) => {
   try {
      const result = await authServices.signUpUser(req.body);

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

const signInUser = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      const result = await authServices.signInUser(email, password);

      res.status(200).json({
         success: true,
         message: "User signin Successfully",
         data: result,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const authControllers = {
   signUpUser,
   signInUser,
};
