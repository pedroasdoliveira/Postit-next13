import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "./../../../prisma/client";

async function handlerCreate(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Por favor escreva alguma coisa" });
  }

  console.log("CORPO ------->");
  console.log(req.body);

  const title: string = req.body.title;
  console.log("TEXTO --------->");
  console.log(title);

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

async function handlerGetAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        Comment: true
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

export default function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return handlerCreate(req, res);
    case "GET":
      return handlerGetAll(req, res);
  }
}
