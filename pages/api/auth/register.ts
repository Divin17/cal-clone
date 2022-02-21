import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";
import { encodeToken } from "../../../helpers/auth";
/**
 *this is a user registration page
 *@param {Object} req for request.
 *@param {Object} res for result.
 *@return {void}
 **/
export default async function signUp(req: any, res: any) {
   if (req.method === "POST") {
      try {
         const { name, email, password } = req.body;
         const userExists = await prisma.user.findUnique({
            where: {
               email,
            },
         });
         if (userExists) {
            return res.status(422).json({
               status: false,
               error: "User account already exists!",
               data: {},
            });
         }
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(password, salt);
         const user: any = await prisma.user
            .create({
               data: {
                  name,
                  email,
                  password: hash,
               },
            })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
         const token = encodeToken(user);
         delete user.password;
         res.status(200).json({
            status: true,
            message: "User registration succeeded",
            token,
            data: {},
         });
      } catch (error) {
         return res.status(400).json({
            status: false,
            error: "Action failed",
            data: error,
         });
      }
   }
}
