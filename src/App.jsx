import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LogoMaker from "./Pages/LogoMaker";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logo/make" element={<LogoMaker />} />
      </Routes>
    </Router>
  );
};

export default App;
