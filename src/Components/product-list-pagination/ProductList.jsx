import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchProducts, setSearchProducts] = useState("");

  const fetchProducts = async (page, searchProducts) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const url = searchProducts
      ? `https://dummyjson.com/products/search?q=${searchProducts}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const { data } = await axios.get(url);
    return data;
  };
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["products", page, searchProducts],
    queryFn: () => fetchProducts(page, searchProducts),
    keepPreviousData: true,
  });

  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / 10);

  const handleSearch = () => {
    if (searchText != "") {
      setSearchProducts(searchText);
      setPage(1);
    }
  };
  const handleClearSearch = () => {
    setSearchProducts("");
    setSearchText("");
    setPage(1);
  };

  return (
    <div>
      <p>Search product</p>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />{" "}
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClearSearch}>Clear Search</button>
      <h2>ProductList</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        data.products.map((p) => (
          <div key={p.id} style={{ margin: "0.5rem 0" }}>
            {p.title} - ${p.price}
          </div>
        ))
      )}
      {page >= 2 && (
        <button onClick={() => setPage((pre) => pre - 1)}>Pre page</button>
      )}
      {page < totalPages && (
        <button onClick={() => setPage((pre) => pre + 1)}>Next page</button>
      )}
    </div>
  );
};

export default ProductList;
