import { useEffect, useState } from "react";

const Add = () => {
  const images = ["add.png", "add2.png", "add3.png", "add4.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length]);
  return (
    <div className="w-full h-full p-3">
      <a
        href="https://burgerpizzapoint.vercel.app/"
        target="_blank"
        className="w-full h-full rounded-xl overflow-hidden inline-block"
      >
        <img
          src={`/assets/${images[currentIndex]}`}
          alt=""
          className="w-full h-full"
        />
      </a>
    </div>
  );
};

export default Add;
