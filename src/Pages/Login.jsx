import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userExists } from "../redux/reducers/userReducer";
import { server } from "../main";

const Login = ({}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    name: "",
    password: "",
  });

  const signUpChanger = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };
  const loginChanger = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const [confrimPassword, setConfrimPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const signUp = (e) => {
    e.preventDefault();
    if (confrimPassword !== signUpInfo.password)
      return toast.error("passwords aren't match !");
    axios
      .post(`${server}api/v1/user/new`, {
        email: signUpInfo.email,
        name: signUpInfo.name,
        password: signUpInfo.password,
      })
      .then(({ data }) => {
        setSignUpInfo({
          email: "",
          name: "",
          password: "",
        });
        dispatch(userExists(data.user));
        navigate("/email-sent");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };
  const Login = (e) => {
    e.preventDefault();
    axios
      .post(`${server}api/v1/user/login`, loginInfo, { withCredentials: true })
      .then(({ data }) => {
        setLoginInfo({ email: "", password: "" });
        localStorage.setItem("token",data?.token) 
        navigate("/");
        dispatch(userExists(true));
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  const click = () => {
    window.open(`${server}api/v1/user/google`, "_self");
  };

  return (
    <div className="w-full text-white h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[24rem] rounded-2xl bg-gray-950 pt-12 p-20">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Sign up"}
        </h1>
        {isLogin ? (
          <>
            <form className="w-full flex flex-col gap-2" onSubmit={Login}>
              <input
                type="text"
                className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
                placeholder="Email Address"
                name="email"
                value={loginInfo.email}
                onChange={loginChanger}
              />
              <div className="w-full relative">
                <input
                  type={`${showPass ? "text" : "password"}`}
                  className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
                  placeholder="Password"
                  name="password"
                  value={loginInfo.password}
                  onChange={loginChanger}
                />
                {loginInfo.password.length > 0 && (
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
              <button className="w-full p-2 mt-2 font-bold rounded-xl bg-gray-800 hover:bg-gray-900 transition-all duration-300">
                Log in
              </button>
            </form>
            <Link
              to="/reset-password"
              className="text-xs font-semibold mt-4 inline-block"
            >
              Forgotten Password?
            </Link>
            <button
              onClick={click}
              className="mt-5 font-bold text-center w-full p-2 rounded-xl bg-blue-700 flex justify-center gap-2 items-center"
            >
              <FaGoogle />
              Login With Google
            </button>
          </>
        ) : (
          <form className="w-full flex flex-col gap-2" onSubmit={signUp}>
            <input
              type="text"
              className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
              placeholder="Email Address"
              name="email"
              onChange={signUpChanger}
              value={signUpInfo.email}
            />
            <input
              type="text"
              className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
              placeholder="Name"
              name="name"
              onChange={signUpChanger}
              value={signUpInfo.name}
            />
            <div className="w-full relative">
              <input
                type={`${showPass ? "text" : "password"}`}
                className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
                placeholder="Password"
                name="password"
                value={signUpInfo.password}
                onChange={signUpChanger}
              />
              {signUpInfo.password.length > 0 && (
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>
            <div className="w-full relative">
              <input
                type={`${showConPass ? "text" : "password"}`}
                className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
                placeholder="Confrim Password"
                value={confrimPassword}
                onChange={(e) => setConfrimPassword(e.target.value)}
              />
              {confrimPassword.length > 0 && (
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setShowConPass(!showConPass)}
                >
                  {showConPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>
            <button
              className="w-full p-2 mt-2 font-bold rounded-xl bg-gray-800 hover:bg-gray-900 transition-all duration-300"
              placeholder="Confrim Password"
            >
              Sign up
            </button>
          </form>
        )}
        <h2 className="text-sm text-center mt-4 text-zinc-400">
          {isLogin ? "Don't" : "Already"} Have an account ?{" "}
          <button
            onClick={() => {
              setIsLogin((prev) => !prev);
              setShowConPass(false);
              setShowPass(false);
            }}
            className="hover:text-white font-semibold transition-none duration-300"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </h2>
      </div>
    </div>
  );
};

export default Login;
