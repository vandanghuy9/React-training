import { useEffect, useState } from "react";
const Table = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let timer: any;
    if (count <= 5) {
      timer = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return <>{count}</>;
};
export default Table;
