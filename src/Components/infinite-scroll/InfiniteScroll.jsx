import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState(null);

  const observerTarget = useRef(null);
  const debounceRef = useRef(null);

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `https://dummyjson.com/products/?limit=10&skip=${(page - 1) * 10}`
      );

      setProducts((pre) => [...pre, ...data.data.products]);
      page === 1 && setTotalProducts(data.data.total);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) setError(err);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    if (products.length >= totalProducts) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            setPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchData(nextPage);
              return nextPage;
            });
          }, 400);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [products]);

  return (
    <>
      <div className="products-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div ref={observerTarget}></div>
      <p>
        Loaded {products.length} of {totalProducts} products
      </p>
    </>
  );
};

export default InfiniteScroll;
