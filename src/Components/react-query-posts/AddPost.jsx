import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const createPost = async (newPost) => {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    return data;
  };

  const { mutate, isError, error, isLoading, isSuccess } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previous = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old = []) => [
        ...old,
        { id: Date.now(), ...newPost },
      ]);

      return { previous };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["posts"], context.previous);
      console.error("Failed to create post:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title });
    setTitle("");
  };

  useEffect(() => {
    console.log("isLoading state:", isLoading); // ✅ This should now work
  }, [isLoading]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving…" : "Add Post"}
        </button>
      </form>
      {isError && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {isSuccess && <p style={{ color: "green" }}>Post added!</p>}
    </div>
  );
};

export default AddPost;
