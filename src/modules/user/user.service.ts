import bcrypt from "bcryptjs";
import { pool } from "../../config/database";

// Get all users
const getUsers = async (payload: Record<string, unknown>) => {
   const { name, email, password, phone, role } = payload;

   const hashPassword = await bcrypt.hash(password as string, 10);

   const result = await pool.query(
      `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashPassword, phone, role]
   );

   return result;
};

// Update single user
const updateUser = async (payload: Record<string, unknown>, id: string) => {
   const { name, email, password, phone, role } = payload;
   const hashPassword = await bcrypt.hash(password as string, 10)

   const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`,
      [name, email, hashPassword, phone, role, id]
   );
   return result;
};

export const userServices = {
   getUsers,
   updateUser,
};
