import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const server = "http://localhost:5000/";

const Login = ({ user }) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
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
        navigate("/");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };
  const Login = (e) => {
    e.preventDefault();
    if (confrimPassword !== signUpInfo.password)
      return toast.error("passwords aren't match !");
    axios
      .post(`${server}api/v1/user/login`, loginInfo, { withCredentials: true })
      .then(({ data }) => {
        setLoginInfo({ email: "", password: "" });
        navigate("/");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  const click = () => {
    window.open("http://localhost:5000/api/v1/user/google", "_self");
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
              <input
                type="text"
                className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
                placeholder="Password"
                name="password"
                value={loginInfo.password}
                onChange={loginChanger}
              />
              <button className="w-full p-2 mt-2 font-bold rounded-xl bg-gray-800 hover:bg-gray-900 transition-all duration-300">
                Log in
              </button>
            </form>
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
            <input
              type="text"
              className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
              placeholder="Password"
              name="password"
              value={signUpInfo.password}
              onChange={signUpChanger}
            />
            <input
              type="text"
              className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
              placeholder="Confrim Password"
              value={confrimPassword}
              onChange={(e) => setConfrimPassword(e.target.value)}
            />
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
            onClick={() => setIsLogin((prev) => !prev)}
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
