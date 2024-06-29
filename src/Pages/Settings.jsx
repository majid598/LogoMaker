import axios from "axios";
import { useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = ({ user }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name);
  const [profile, setProfile] = useState(user?.profile);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}api/v1/user/me/profile/edit`,
        { name, profile },
        { withCredentials: true }
      )
      .then(({ data }) => {
        navigate("/");
        toast.success(data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const deleteAccount = () => {
    toast.loading("Account Deleting", { duration: 3000 });
    axios
      .delete(`${server}api/v1/user/me/profile/delete`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        navigate("/login");
        toast.success(data?.message);
        console.log(data)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-[24rem] rounded-2xl bg-gray-950 pt-12 p-20">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Edit Your Profile !{user?.name}
        </h1>

        <form className="w-full flex flex-col gap-2" onSubmit={formSubmit}>
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-gray-800 outline-none placeholder:text-xs"
            placeholder="Profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
          <button className="w-full p-2 mt-2 font-bold rounded-xl bg-gray-800 hover:bg-gray-900 transition-all duration-300">
            Submit
          </button>
        </form>
        <div className="w-full flex justify-center pt-6">
          <button
            onClick={deleteAccount}
            className="text-sm font-bold bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-lg px-5 py-2"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
