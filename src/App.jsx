import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import EmailVerify from "./Pages/EmailVerify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LogoMaker from "./Pages/LogoMaker";
import ResetPassword from "./Pages/ResetPassword";
import Settings from "./Pages/Settings";
import { server } from "./main";
import { userExists, userNotExists } from "./redux/reducers/userReducer";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExists(data.user));
      })
      .catch((err) => dispatch(userNotExists(true)));
  }, [dispatch, user]);
  return (
    <Router>
      <Routes>
        {/* <Route element={<ProtectedRoute user={user} redirect="/login" />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/logo/make" element={<LogoMaker user={user} />} />
        <Route path="/logo/edit" element={<LogoMaker user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
        {/* </Route> */}
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/reset-password" element={<ResetPassword user={user} />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
