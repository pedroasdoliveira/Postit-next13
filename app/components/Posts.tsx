"use client";

import { CommentType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  image: string;
  postTitle: string;
  comments: CommentType;
};

const Posts = ({ id, name, image, postTitle, comments }: Props) => {
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
        <div className="flex gap-4 cursor-pointer items-center justify-center py-2 px-6 rounded-xl bg-teal-600 w-1/2">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-200">
              {comments.message?.length} Comentários
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Posts;
