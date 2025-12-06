import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = req.headers.authorization;

         if (!token) {
            return res.status(401).json({
               success: false,
               message: "Invalid authentication token",
            });
         }

         const authToken = token.split(" ")[1] || token;

         const decoded = jwt.verify(
            authToken,
            config.jwtSecret as string
         ) as JwtPayload;
         req.user = decoded;

         if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({
               success: false,
               message: "Unauthorized!!",
            });
         }

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
