"use client";

import Image from "next/image";
import { CommentType } from "@/types/types";
import Toggle from "./Toggle";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: CommentType[];
};

const EditPost = ({ id, name, avatar, title, comments }: EditProps) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastId: string;

  const { mutate } = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete("/api/posts/handlePost", { data: id }),
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data.message, {
        duration: 5000,
        id: deleteToastId,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Post deletado do perfil!", {
        duration: 5000,
        id: deleteToastId,
      });
      queryClient.invalidateQueries(["auth-posts"]);
    },
  });

  const deletePost = () => {
    mutate(id);
    setToggle(false);
  };

  return (
    <>
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
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700 cursor-pointer">
              {comments?.length} Comentários
            </p>
          </Link>
          <button
            onClick={() => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-600"
          >
            Deletar
          </button>
        </div>
      </section>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPost;
