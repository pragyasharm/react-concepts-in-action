import React, { useContext, useEffect, useState } from "react";
import { getItem, setItem } from "./localStorage";
import { UserContext } from "../user-protected-route/UserContext";

const Counter = () => {
  const [count, setCount] = useState(() => {
    const item = getItem("count");
    return item || 0;
  });
  useEffect(() => {
    setItem("count", count);
  }, []);

  const increment = () => {
    setCount((pre) => pre + 1);
    setItem("count", count + 1);
  };

  const { loggedIn } = useContext(UserContext);

  return (
    <div>
      <h2>Counter using Local storage</h2>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
