import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LogoMaker from "./Pages/LogoMaker";
import Upgrade from "./Pages/Upgrade";
import Loader from "./Components/Loader";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logo/make" element={<LogoMaker />} />
        <Route path="/upgrade/choose/plan" element={<Upgrade />} />
        <Route path="/load" element={<Loader />} />
      </Routes>
    </Router>
  );
};

export default App;
