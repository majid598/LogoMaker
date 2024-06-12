import BgEdit from "../Components/BgEdit";
import IconList from "../Components/IconList";

const Editor = ({
  icons,
  background,
  iconSize,
  setIconSize,
  iconRotation,
  setIconRotation,
  rounded,
  setRounded,
  padding,
  setPadding,
  selectedIcon,
  setSelectedIcon,
  logoImage,
  setLogoImage,
  logoBgColor,
  setLogoBgColor,
  iconColor,
  setIconColor,
  setImageOpacity,
  imageOpacity,
}) => {
  return (
    <div className="w-full h-full px-4 pt-4">
      {icons && (
        <>
          <IconList
            iconSize={iconSize}
            setIconSize={setIconSize}
            iconRotation={iconRotation}
            setIconRotation={setIconRotation}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            logoImage={logoImage}
            setLogoImage={setLogoImage}
            logoBgColor={logoBgColor}
            setLogoBgColor={setLogoBgColor}
            iconColor={iconColor}
            setIconColor={setIconColor}
            imageOpacity={imageOpacity}
            setImageOpacity={setImageOpacity}
          />
        </>
      )}
      {background && (
        <BgEdit
          rounded={rounded}
          setRounded={setRounded}
          padding={padding}
          setPadding={setPadding}
          bgColor={logoBgColor}
          setBgColor={setLogoBgColor}
        />
      )}
    </div>
  );
};

export default Editor;
