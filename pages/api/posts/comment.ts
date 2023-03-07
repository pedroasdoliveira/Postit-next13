import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handlerAdd = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Por favor faça seu login!" });
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  try {
    const { title, postId } = req.body.data;

    if (!title.length) {
      return res
        .status(401)
        .json({ message: "Por favor faça algum comentário para cria-lo" });
    }

    if (title.length > 650) {
      return res
        .status(401)
        .json({ message: "O comentário não pode ter mais que 650 caracteres" });
    }

    const result = await prisma.comment.create({
      data: {
        message: title,
        postId,
        userId: prismaUser?.id,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: "Erro ao criar o comentário", err: error });
  }
};

export default function handlerComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return handlerAdd(req, res);
  }
}
