/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

import { Event } from "../../events/index.tsx";

/**
 *this is a user registration page
 *@param {Object} req for request.
 *@param {Object} res for result.
 *@return {void}
 **/
export default async function createEvent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, note, date, eventTypeId } = req.body;
      const event: Event = await prisma.event.create({
        data: {
          name,
          email,
          additional_note: note,
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
