"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthPostsType } from "./../../types/types";
import EditPost from "./EditPost";

const featchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

const MyPosts = () => {
  const { data, isLoading } = useQuery<AuthPostsType>({
    queryFn: featchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading) {
    return <h1>Carregando posts...</h1>;
  }
    console.log(data);
  return (
    <section>
      {data?.post.map((post) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comment}
        />
      ))}
    </section>
  );
};

export default MyPosts;
