import { useLocation } from "react-router-dom";
import Logo from "../Components/Logo";
import EditLogoC from "../Components/EditLogoC";

const Preview = ({
  logoImage,
  bgRounded,
  padding,
  iconSize,
  selectedIcon,
  iconRotation,
  iconColor,
  logoBgColor,
  imageOpacity,
}) => {
  const location = useLocation();

  return (
    <div className="border-r-2 flex items-center justify-center w-full h-full">
      {location.pathname === "/logo/make" ? (
        <Logo
          logoImage={logoImage}
          bgRounded={bgRounded}
          padding={padding}
          iconSize={iconSize}
          selectedIcon={selectedIcon}
          iconRotation={iconRotation}
          iconColor={iconColor}
          logoBgColor={logoBgColor}
          imageOpacity={imageOpacity}
        />
      ) : (
        <EditLogoC
          logoImage={logoImage}
          bgRounded={bgRounded}
          padding={padding}
          iconSize={iconSize}
          selectedIcon={selectedIcon}
          iconRotation={iconRotation}
          iconColor={iconColor}
          logoBgColor={logoBgColor}
          imageOpacity={imageOpacity}
        />
      )}
    </div>
  );
};

export default Preview;
