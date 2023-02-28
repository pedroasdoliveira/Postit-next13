import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from './../../../prisma/client';

export default async function handlerCreate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Por favor escreva alguma coisa" });
    }

    console.log('CORPO ------->');
    console.log(req.body)

    const title: string = req.body.title;
    console.log("TEXTO --------->");
    console.log(title)

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (title.length > 500) {
      return res
        .status(403)
        .json({ message: "O título deve ter no máximo 500 caracteres" });
    }

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Esse espaço não pode ficar vazio!" });
    }

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({ message: "Erro ao criar o post" });
    }
  }
}
