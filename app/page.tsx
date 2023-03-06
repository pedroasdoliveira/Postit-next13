"use client";

import CreatePost from "./components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Posts";
import { PostType } from "@/types/types";

const allPosts = async () => {
  const response = await axios.get("./api/posts/handlePost");
  return response.data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
    cacheTime: 3000,
  });

  if (error) return error;

  if (isLoading) return "Carregando...";

  return (
    <main>
      <CreatePost />
      {data?.map((post) => (
        <Posts
          key={post.id}
          id={post.id}
          name={post.user.name}
          image={post.user.image}
          postTitle={post.title}
          comments={post.comment} 
        />
      ))}
    </main>
  );
}
