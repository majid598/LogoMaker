import { useEffect, useState } from "react";
import Editor from "../Sections/Editor";
import Preview from "../Sections/Preview";
import Sidebar from "../Sections/Sidebar";

const Home = () => {
  const [icons, setIcons] = useState(true);
  const [background, setBackground] = useState(false);
  const [iconsSize, setIconSize] = useState(localStorage.getItem("icon-size"));
  const [iconRotation, setIconRotation] = useState(
    localStorage.getItem("icon-rotation")
  );
  const [bgRounded, setBgRounded] = useState(
    localStorage.getItem("bg-rounded")
  );
  const [padding, setPadding] = useState(localStorage.getItem("padding"));
  const [selectedIcon, setSelectedIcon] = useState(
    localStorage.getItem("selected-icon")
  );
  const [logoImage, setLogoImage] = useState(
    localStorage.getItem("logo-image")
  );
  const [iconColor, setIconColor] = useState(
    localStorage.getItem("icon-color") || "black"
  );
  const [logoBgColor, setLogoBgColor] = useState(
    localStorage.getItem("logo-bg-color") || "white"
  );

  useEffect(() => {
    localStorage.setItem("icon-color", iconColor);
    localStorage.setItem("logo-bg-color", logoBgColor);
  }, [iconColor, setIconColor, logoBgColor, setLogoBgColor]);

  return (
    <div className="w-full h-screen bg-gray-900 text-white pt-32 grid grid-col-4">
      <div className="w-full h-full">
        <Sidebar setIcons={setIcons} setBackground={setBackground} />
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <Editor
          icons={icons}
          background={background}
          iconSize={iconsSize}
          setIconSize={setIconSize}
          iconRotation={iconRotation}
          setIconRotation={setIconRotation}
          rounded={bgRounded}
          setRounded={setBgRounded}
          padding={padding}
          setPadding={setPadding}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          logoImage={logoImage}
          setLogoImage={setLogoImage}
          logoBgColor={logoBgColor}
          setLogoBgColor={setLogoBgColor}
          iconColor={iconColor}
          setIconColor={setIconColor}
        />
      </div>
      <div className="w-full h-full">
        <Preview
          logoImage={logoImage}
          bgRounded={bgRounded}
          padding={padding}
          iconSize={iconsSize}
          selectedIcon={selectedIcon}
          iconRotation={iconRotation}
          iconColor={iconColor}
          logoBgColor={logoBgColor}
        />
      </div>
      <div className="w-full h-full">adds</div>
    </div>
  );
};

export default Home;
