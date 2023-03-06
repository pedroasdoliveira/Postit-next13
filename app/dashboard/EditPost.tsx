"use client";

import Image from "next/image";
import { CommentType } from "@/types/types";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: CommentType[];
};

const EditPost = ({ id, name, avatar, title, comments }: EditProps) => {
  return (
    <section className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt="Imagem do avatar do usuário"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>

      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-gray-700">
          {comments?.length} Comentários
        </p>
        <button className="text-sm font-bold text-red-600">Deletar</button>
      </div>
    </section>
  );
};

export default EditPost;
