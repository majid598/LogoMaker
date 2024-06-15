import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const Add = ({ images, href = "", isClose, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);
  return (
    <div className={`w-full h-full p-3 relative ${isClose && "hidden"}`}>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 bg-red-600 p-0.5 rounded-md"
      >
        <IoMdClose />
      </button>
      <a
        href={href}
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
