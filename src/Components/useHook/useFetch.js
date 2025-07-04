import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};
export default useFetch;
