import { Request, Response } from "express";
import { authServices } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
   try {
      const result = await authServices.registerUser(req.body);

      res.status(201).json({
         success: true,
         message: "User registered successfully",
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

const loginUser = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      const result = await authServices.loginUser(email, password);

      res.status(200).json({
         success: true,
         message: "Login successful",
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
   registerUser,
   loginUser,
};
