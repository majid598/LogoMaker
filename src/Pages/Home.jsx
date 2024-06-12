import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const Home = () => {
  const name = "Code With raju";
  return (
    <div className="bg-gray-900 px-20 text-white min-h-screen pt-44">
      <Header />
      <h1 className="text-3xl font-semibold">{name}&apos;s Logos</h1>
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
