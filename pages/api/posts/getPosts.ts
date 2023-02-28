import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../../prisma/client";

export default async function handlerGetAll(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error: "Não foi possível puxar os Posts" });
    }
  }
}
