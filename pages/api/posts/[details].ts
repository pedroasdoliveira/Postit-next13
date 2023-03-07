import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handlerDetailsPosts = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          comment: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Erro ao encontrar o Post de acesso!" });
    }
  }
};

export default handlerDetailsPosts;
