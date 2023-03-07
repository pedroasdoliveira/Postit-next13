"use client";

import { CommentType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
  image: string;
  postTitle: string;
  comments: CommentType[];
};

const Posts = ({ id, name, image, postTitle, comments }: Props) => {
  const navigate = useRouter()

  return (
    <section className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={image}
          alt="imagem"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>

      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>

      <div className="flex items-center justify-center w-full h-auto">
        <div onClick={() => navigate.push(`/post/${id}`)} className="flex gap-4 cursor-pointer items-center justify-center py-2 px-6 rounded-xl bg-teal-600 w-1/2">
          <p className="text-sm font-bold text-gray-200">
            {comments.length} Comentários
          </p>
        </div>
      </div>
    </section>
  );
};

export default Posts;
