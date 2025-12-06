import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = () => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = req.headers.authorization;

         if (!token) {
            return res.status(401).json({ message: "You are not authorized!" });
         }

         const decode = jwt.verify(token, config.jwtSecret as string);
         console.log({ token, decode });

         next();
      } catch (error: any) {
         res.status(500).json({
            success: false,
            message: error.message,
            errors: error,
         });
      }
   };
};

export default auth;
