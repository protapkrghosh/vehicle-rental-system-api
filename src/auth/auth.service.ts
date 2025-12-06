import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";
import config from "../config";

const signUpUser = async (payload: Record<string, unknown>) => {
   const { name, email, password, phone, role } = payload;

   const hashPassword = await bcrypt.hash(password as string, 10);

   const result = await pool.query(
      `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashPassword, phone, role]
   );
   result.rows.map((user) => delete user.password);

   return result;
};

const signInUser = async (email: string, password: string) => {
   const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

   if (!user) {
      throw new Error("User not found!");
   }

   const matchPassword = await bcrypt.compare(password, user.rows[0].password);

   if (!matchPassword) {
      throw new Error("Invalid Credentials!");
   }

   const jwtPayload = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      role: user.rows[0].role,
   };

   const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
      expiresIn: "15d",
   });

   delete user.rows[0].password;

   return { token, user: user.rows[0] };
};

export const authServices = {
   signUpUser,
   signInUser,
};
