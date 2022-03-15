import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const getEventType = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { slug } = req.query;
    console.log({ slug });
    try {
      const event_type = await prisma.eventType.findFirst({
        where: {
          slug,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "",
        data: event_type,
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

export default getEventType;
