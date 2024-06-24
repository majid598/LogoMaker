import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LogoMaker from "./Pages/LogoMaker";
import Upgrade from "./Pages/Upgrade";
import { server } from "./main";
import Settings from "./Pages/Settings";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const [user, setUser] = useState(null);
  // console.log(localStorage)
  useEffect(() => {
    axios
      .get(`${server}api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/logo/make" element={<LogoMaker user={user} />} />
        <Route path="/logo/edit" element={<LogoMaker user={user} />} />
        <Route path="/upgrade/choose/plan" element={<Upgrade />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="/reset-password" element={<ResetPassword user={user} />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
