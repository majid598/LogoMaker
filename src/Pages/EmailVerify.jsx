import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { server } from "../main";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const EmailVerify = () => {
  const query = useQuery();
  const token = query.get("token");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${server}api/v1/user/verify-email?token=${token}`)
      .then(({ data }) => {
        setSuccess(data.success);
      })
      .catch((err) => {
        setSuccess(data.false);
      });

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 p-6 text-white flex flex-col items-center justify-center">
      {loading && <Loader />}
      <div className="absolute top-10 left-20 text-5xl font-extrabold">
        LogoMaker
      </div>
      {success ? (
        <>
          <h1 className="text-3xl font-semibold text-center">
            Email verified successfully. <br /> You can now log in.
          </h1>
          <div className="rounded-full mt-10 bg-white">
            <img src="/assets/done.png" alt="" />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-center">
            Invalid or expired token
          </h1>
          <div className="">
            <img src="/assets/false.png" className="w-1/3 mx-auto" alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default EmailVerify;


