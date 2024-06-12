import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = ({ download }) => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <header className="w-full fixed top-0 left-0">
        <nav className="w-full border-b-2 flex justify-between items-center px-20 h-28">
          <Link to={"/"} className="text-4xl font-extrabold">
            Logo Maker
          </Link>
          {download ? (
            <button
              onClick={() => setPopup(true)}
              className="px-6 py-3 rounded-md border-2 hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold"
            >
              Download
            </button>
          ) : (
            <Link
              to={"/logo/make"}
              className="px-6 py-3 rounded-md border-2 hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold"
            >
              Create Logo
            </Link>
          )}
        </nav>
      </header>
      {popup && (
        <>
          <div
            onClick={() => setPopup(false)}
            className="w-full h-screen bg-black/60 fixed top-0 left-0 z-[99] flex items-center justify-center"
          ></div>
          <div className="bg-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] rounded-2xl px-20 py-10 border-2 w-[30rem] min-h-[40vh]">
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 border p-1 text-2xl rounded-md"
            >
              <IoMdClose />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
