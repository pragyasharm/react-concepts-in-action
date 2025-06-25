import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

export default function TestMutation() {
  const createPost = async (newPost) =>
    axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
  const { mutate, isLoading } = useMutation({ mutationFn: createPost });

  React.useEffect(() => {
    console.log("isLoading state:", isLoading);
  }, [isLoading]);
  const data = undefined;
  return <h1>{data.property}</h1>;
  //return <button onClick={() => mutate({ title: "test" })}>Test</button>;
}
