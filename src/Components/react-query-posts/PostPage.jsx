import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();

  const fetchPost = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
  };

  const {
    data: postData,
    isError,
    isLoading,
    error,
  } = useQuery({
    staleTime: 1000 * 60 * 1,
    queryKey: ["posts", id],
    queryFn: fetchPost,
  });

  if (isLoading) return <div>Loading.....</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>PostPage</h1>
      <br></br>
      <h3>Title: {postData.title}</h3>
      <br></br>
      Body: {postData.body}
      <br></br>
    </div>
  );
};

export default PostPage;
