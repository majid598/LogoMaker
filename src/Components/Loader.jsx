import { useEffect, useState } from "react";

const Loader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 100) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 30);

      return () => clearInterval(interval);
    }
  }, [count]);

  return (
    <div className="bg-gray-900 flex items-center justify-center w-full h-screen fixed top-0 left-0 z-[999] text-white">
      <div className="flex flex-col items-center">
        <span className="text-9xl font-semibold">{count}%</span>
        <div className="w-96 h-4 mt-4 rounded-lg overflow-hidden">
          <div className="loader h-full w-0 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
