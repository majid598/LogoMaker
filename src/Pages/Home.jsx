import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { user } from "../data/icons";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, [isLoading]);
  return (
    <div className="bg-gray-900 px-20 text-white min-h-screen pt-44">
      {isLoading && <Loader />}
      <Header />
      <h1 className="text-3xl font-semibold">{user.name}&apos;s Logos</h1>
      <div className="w-full flex flex-wrap mt-10 gap-4 justify-center">
        {Array(11)
          .fill()
          .map((i) => (
            <div className="w-[15rem] border-2 rounded-sm h-[20vh]"></div>
          ))}
        <Link
          to={"/logo/make"}
          className="w-[15rem] flex items-center justify-center text-5xl hover:bg-white hover:text-gray-900 transition-all duration-300 border-2 rounded-sm h-[20vh]"
        >
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default Home;
