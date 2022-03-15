/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

/**
 *this is a user registration page
 *@param {Object} req for request.
 *@param {Object} res for result.
 *@return {void}
 **/
export default async function createEvent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, additional_note, date, eventTypeId } = req.body;
      const event = await prisma.event.create({
        data: {
          name: name,
          email: email,
          additional_note: additional_note,
          eventTypeId: parseInt(eventTypeId),
          date: new Date(date),
        },
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
