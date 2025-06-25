import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const PostsList = () => {
  const fetchPosts = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading.....</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>Tanstack Query</h1>
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id} style={{ margin: "0.5rem 0" }}>
                <Link to={`post/${post.id}`}>{post.title}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default PostsList;
