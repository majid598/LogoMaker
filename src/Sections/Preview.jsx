import Logo from "../Components/Logo";

const Preview = ({
  logoImage,
  bgRounded,
  padding,
  iconSize,
  selectedIcon,
  iconRotation,
  iconColor,
  logoBgColor,
}) => {
  return (
    <div className="border-r-2 flex items-center justify-center w-full h-full">
      <Logo
        logoImage={logoImage}
        bgRounded={bgRounded}
        padding={padding}
        iconSize={iconSize}
        selectedIcon={selectedIcon}
        iconRotation={iconRotation}
        iconColor={iconColor}
        logoBgColor={logoBgColor}
      />
    </div>
  );
};

export default Preview;
