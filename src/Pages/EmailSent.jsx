import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";

const EmailSent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [text, setText] = useState("Email Sent");
  const [resentReq, setResentReq] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}api/v1/user/resend-email`,
        { email },
        { withCredentials: true }
      )
      .then(({ data }) => {
        setEmail("");
        setResentReq(false);
        setText("Email resent");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <div className="w-full text-white h-screen flex items-center justify-center bg-gray-900">
      <div className="rounded-2xl bg-gray-950 pt-12 p-20 pb-10">
        <h1 className="text-2xl font-semibold text-center mb-4">{text}</h1>
        {resentReq && (
          <form className="w-full flex flex-col gap-2" onSubmit={formSubmit}>
            <input
              type="text"
              className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full p-2 mt-2 font-bold rounded-xl bg-gray-800 hover:bg-gray-900 transition-all duration-300">
              Submit
            </button>
          </form>
        )}
        <div className="flex gap-2 mt-10">
          <button
            onClick={() => setResentReq(true)}
            className="px-6 py-2 rounded-lg border-2 border-white text-sm bg-red-600 hover:bg-red-700 transition-all duration-300 font-bold text-white"
          >
            Resend Email
          </button>
          <a
            target="_blank"
            href="https://mail.google.com/"
            className="px-6 py-2 rounded-lg border-2 border-green-600 text-sm bg-green-600 hover:bg-green-500 transition-all duration-300 font-bold text-white"
          >
            Got Mail Box
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
