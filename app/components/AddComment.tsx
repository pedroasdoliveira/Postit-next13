"use client";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type CommentProp = {
  id: string;
};

type CommentType = {
  postId: string;
  title: string;
};

const AddComment = ({ id }: CommentProp) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();
  let addCommentToast: string;

  const { mutate } = useMutation({
    mutationFn: async (data: CommentType) =>
      await axios.post("/api/posts/comment", { data }),
    onError: (error: any) => {
      console.error(error);
      setIsDisabled(false);
      setTitle("");
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, {
          duration: 5000,
          id: addCommentToast,
        });
      }
    },
    onSuccess: (data) => {
      console.log(data);
      setTitle("");
      setIsDisabled(false);
      toast.success("Novo comentário adicionado!", {
        duration: 5000,
        id: addCommentToast,
      });
      queryClient.invalidateQueries(["detail-post"]);
    },
  });

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    addCommentToast = toast.loading("Salvando seu comentário", {
      id: addCommentToast,
    });
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Criar um comentário</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-lg disabled:opacity-25"
          type="submit"
          disabled={isDisabled}
        >
          Adicionar comentário
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 500 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/650`}</p>
      </div>
    </form>
  );
};

export default AddComment;
