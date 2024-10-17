import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import ProtectedRoute from "./Components/ProtectedRoute";
import { server } from "./main";
import { userExists, userNotExists } from "./redux/reducers/userReducer";
const EmailVerify = lazy(() => import("./Pages/EmailVerify"));
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const LogoMaker = lazy(() => import("./Pages/LogoMaker"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));
const Settings = lazy(() => import("./Pages/Settings"));
const EmailSent = lazy(() => import("./Pages/EmailSent"));

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}api/v1/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        dispatch(userExists(data.user));
      })
      .catch((err) => dispatch(userNotExists(true)));
  }, [dispatch, user]);
  return loader ? (
    <Loader />
  ) : (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* <Route
            element={
              <ProtectedRoute isAuthenticated={user} redirect="/login" />
            }
          > */}
            <Route path="/" element={<Home />} />
            <Route path="/logo/make" element={<LogoMaker user={user} />} />
            <Route path="/logo/edit" element={<LogoMaker user={user} />} />
            <Route path="/settings" element={<Settings user={user} />} />
          {/* </Route> */}
          <Route
            element={<ProtectedRoute isAuthenticated={!user} redirect="/" />}
          >
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route path="/load" element={<Loader />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route
              path="/reset-password"
              element={<ResetPassword user={user} />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
