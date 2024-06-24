import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const server = "http://localhost:5000/";

const ResetPassword = ({ user }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confrimPassword, setConfrimPassword] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    if (confrimPassword !== password)
      return toast.error("passwords aren't match!");
    axios
      .post(
        `${server}api/v1/user/reset-password`,
        { email, password },
        { withCredentials: true }
      )
      .then(({ data }) => {
        setEmail("");
        setPassword("");
        setConfrimPassword("");
        navigate("/");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <div className="w-full text-white h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[24rem] rounded-2xl bg-gray-950 pt-12 p-20">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Reset-Password
        </h1>
        <form className="w-full flex flex-col gap-2" onSubmit={formSubmit}>
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
            placeholder="Confrim New Password"
            value={confrimPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
          />
          <button className="w-full p-2 mt-2 font-bold rounded-xl bg-gray-800 hover:bg-gray-900 transition-all duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
