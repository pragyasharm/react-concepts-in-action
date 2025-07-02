import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import PostsList from "./Components/react-query-posts/PostsList.jsx";
import PostPage from "./Components/react-query-posts/PostPage.jsx";
import AddPost from "./Components/react-query-posts/AddPost.jsx";
import TestMutation from "./TestMutation.jsx";
import { ErrorBoundary } from "react-error-boundary";
import InfiniteScroll from "./Components/infinite-scroll/InfiniteScroll.jsx";
import ProductList from "./Components/product-list-pagination/ProductList.jsx";
import Counter from "./Components/local-storage/Counter.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <PostsList /> },
      { path: "post/:id", element: <PostPage /> },
      { path: "add-post", element: <AddPost /> },
      { path: "test-post", element: <TestMutation /> },
      { path: "infinite-scroll", element: <InfiniteScroll /> },
      { path: "product-list", element: <ProductList /> },
      { path: "counter-local", element: <Counter /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
