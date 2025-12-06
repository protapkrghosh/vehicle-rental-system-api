import bcrypt from "bcryptjs";
import { pool } from "../config/database";

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
   const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

   return result;
};

export const authServices = {
   signUpUser,
   signInUser,
};
