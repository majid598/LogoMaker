import { Link } from "react-router-dom";

const Header = ({ download, setPopup, user }) => {
  return (
    <>
      <header className="w-full fixed top-0 left-0 bg-gray-900">
        <nav className="w-full border-b-2 flex justify-between items-center px-20 h-28">
          <Link to={"/"} className="text-4xl font-extrabold">
            Logo Maker
          </Link>
          {user ? (
            <>
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
            </>
          ) : (
            <Link
              to={"/login"}
              className="px-6 py-3 rounded-md border-2 hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
