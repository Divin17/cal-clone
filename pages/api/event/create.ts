/* eslint-disable camelcase */
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
/**
 *this is a user registration page
 *@param {Object} req for request.
 *@param {Object} res for result.
 *@return {void}
 **/
export default async function createEvent(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === "POST") {
      try {
         const { name, email, note, date } = req.body;
         console.log(name, email, note, date);
         const event: any = await prisma.event
            .create({
               data: {
                  name,
                  email,
                  additional_note: note,
                  date,
               },
            })
            .then((res) => {
               console.log("success", res);
            })
            .catch((error) => {
               console.log("error", error);
            });
         console.log(event);
         res.status(200).json({
            status: true,
            message: "Event Created successfully!",
            data: { ...event },
         });
      } catch (error) {
         return res.status(400).json({
            status: false,
            error: "Action failed ",
            data: error,
         });
      }
   }
}
