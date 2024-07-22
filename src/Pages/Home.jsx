import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import LogoComponent from "../Components/LogoComponent";
import { server } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../redux/reducers/userReducer";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [logos, setLogos] = useState(null);

  const logout = () => {
        localStorage.removeItem("token")
        navigate("/login");
        dispatch(userNotExists(true));
        toast.success("Logouted");
  };

  useEffect(() => {
    axios
      .get(`${server}api/v1/logo/my/all`, { headers:{
        "token":localStorage.getItem("token")
      }
      })
      .then(({ data }) => {
        setLogos(data.logos);
      })
      .catch((err) => console.log(err));
  }, [logos, axios]);
  return (
    <div className="bg-gray-900 px-20 text-white min-h-screen pt-44">
      {isLoading && <Loader />}
      <Header user={user} />
      {user && (
        <div className="absolute right-32 top-36">
          <button
            onClick={() => setMenu((prev) => !prev)}
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center overflow-hidden"
          >
            {user && (
              <>
                {user?.profile ? (
                  <img
                    src={user.profile}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <FaUser className="text-3xl" />
                )}
              </>
            )}
          </button>
          {menu && (
            <div className="rounded-xl overflow-hidden bg-gray-800 absolute left-1/2 -translate-x-1/2">
              <Link
                to={"/settings"}
                className="px-6 inline-block w-full transition-all duration-300 text-center py-2 hover:bg-gray-950 font-semibold"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="px-6 w-full transition-all duration-300 text-center py-2 hover:bg-gray-950 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      <h1 className="text-3xl font-semibold">{user?.name}&apos;s Logos</h1>
      <div className="w-full flex flex-wrap mt-10 gap-4 justify-start">
        {logos?.map((i) => (
          <LogoComponent i={i} />
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
