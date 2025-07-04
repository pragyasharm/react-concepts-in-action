import React from "react";
import useFetch from "./useFetch";

const DataList = () => {
  const { loading, error, data } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(loading, data);

  if (loading) <div>loading......</div>;
  return (
    <div>
      <h2> 100 posts - datalist </h2>
      <ul>{data && data.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
    </div>
  );
};

export default DataList;
