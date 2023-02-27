"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error: any) => {
        console.log(error);
      },
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setTitle("");
        setIsDisable(false);
      },
    }
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsDisable(true);
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
