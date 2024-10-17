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
  user
}) => {
  const location = useLocation();

  return (
    <div className="border-r-2 flex items-center justify-center w-full h-[calc(100vh-7rem)]">
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
          user={user}
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
          user={user}
        />
      )}
    </div>
  );
};

export default Preview;
