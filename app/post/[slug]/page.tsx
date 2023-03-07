"use client";

import Posts from "@/app/components/Posts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostCommentsType } from "@/types/types";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostCommentsType>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-post"],
  });

  if (isLoading) {
    return "Carregando...";
  }

  return (
    <section>
      {data && (
        <>
          <Posts
            id={data.id}
            name={data.user.name}
            image={data.user.image}
            postTitle={data.title}
            comments={data.comment}
          />
          <AddComment id={data.id} />

          {data.comment.map((comment) => {      
            return (
              <section
                key={comment.id}
                className="my-6 bg-white p-8 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Image
                    className="mr-2 rounded-full"
                    width={24}
                    height={24}
                    src={comment.user?.image} // erro chato!!!
                    alt="Imagem de perfil do usuário"
                  />
                  <h2 className="font-bold text-lg">{comment.user?.name}</h2>
                  <h3 className="text-sm">{comment.createdAt}</h3>
                </div>

                <div className="py-4 mx-3">
                  <p className="text-left">{comment.message}</p>
                </div>
              </section>
            );
          })}
        </>
      )}
    </section>
  );
};

export default PostDetail;
