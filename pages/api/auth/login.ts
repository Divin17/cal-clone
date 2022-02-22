import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";
import { encodeToken } from "../../../helpers/auth";
import { NextApiRequest, NextApiResponse } from "next";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === "POST") {
      try {
         const { email, password } = req.body;
         const user: any = await prisma.user.findUnique({
            where: {
               email,
            },
         });
         const verifyPassword = await bcrypt.compareSync(
            password,
            user.password
         );
         if (!user || !verifyPassword) {
            return res.status(401).json({
               status: false,
               error: "Invalid credentials!",
               data: {},
            });
         }
         const token = encodeToken(user);
         delete user.password;
         res.status(200).json({
            status: true,
            message: "login succeded",
            token,
            data: { ...user },
         });
      } catch (error) {
         return res.status(400).json({
            status: "failed",
            error: "Bad Request",
            data: error,
         });
      }
   }
};

export default login;
