import bcrypt from "bcryptjs";
import { pool } from "../../config/database";

interface userPayload {
   name: string;
   email: string;
   password: string;
   phone: string;
   role: string;
}

const getUsers = async () => {
   const result = await pool.query(`SELECT * FROM users`);
   result.rows.map((user) => delete user.password);

   return result;
};

const updateUser = async (payload: userPayload, id: string) => {
   let { name, email, password, phone, role } = payload;
   const currentUser = await pool.query(`SELECT role FROM users WHERE id=$1`, [
      id,
   ]);

   const currentRole = currentUser.rows[0].role;
   if (currentRole === "customer") {
      role = "customer";
   } else {
      role = role || currentRole;
   }

   const hashPassword = await bcrypt.hash(String(password), 10);

   const result = await pool.query(
      `UPDATE users 
       SET name=$1, email=$2, password=$3, phone=$4, role=$5 
       WHERE id=$6 RETURNING *`,
      [name, email, hashPassword, phone, role, id]
   );

   delete result.rows[0].password;

   return result;
};

const deleteUser = async (id: string) => {
   const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);

   return result;
};

export const userServices = {
   getUsers,
   updateUser,
   deleteUser,
};
