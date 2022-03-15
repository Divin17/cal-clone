import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      return res.status(200).json({
        status: "success",
        message: "",
        data: events,
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error: "Action Failed",
        data: error,
      });
    }
  }
};

export default getEvents;
