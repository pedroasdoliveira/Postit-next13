"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const queryClient = useQueryClient()
  let toastPostId: string;

  const { mutate } = useMutation({
    mutationFn: async (title: string) =>
      await axios.post("./api/posts/handlePost", { title }),
    onError: (error: any) => {
      console.log(error);
      setIsDisable(false);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, {
          duration: 5000,
          id: toastPostId,
        });
      }
    },
    onSuccess: (data) => {
      setTitle("");
      setIsDisable(false);
      queryClient.invalidateQueries(["posts"])
      toast.success("Post criado!", { duration: 5000, id: toastPostId });
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsDisable(true);
          toastPostId = toast.loading("Criando post...", { id: toastPostId });
          mutate(title);
        }}
        className="bg-white my-8 p-8 rounded-md"
      >
        <div className="flex flex-col my-4">
          <textarea
            className="p-4 text-lg rounded-md my-2 bg-gray-200"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            placeholder="O que está pensando?"
          ></textarea>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold text-sm ${
              title.length > 500 ? "text-red-700" : "text-gray-700"
            }`}
          >{`${title.length}/500`}</p>
          <button
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            disabled={isDisable}
            type="submit"
          >
            Criar Post
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
