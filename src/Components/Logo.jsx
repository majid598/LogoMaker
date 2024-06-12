import { useRef } from "react";
import Header from "./Header";
import { Icon } from "./Icons";
import { Smile } from "lucide-react";

const Logo = ({
  logoImage,
  bgRounded,
  padding,
  iconSize,
  selectedIcon,
  iconRotation,
  iconColor,
  logoBgColor,
}) => {
  const logoRef = useRef(null);
  const downloadImage = async () => {
    const htmlToImage = await import("html-to-image");
    htmlToImage.toPng(logoRef.current).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "logo.png";
      link.href = dataUrl;
      link.click();
      localStorage.clear();
    });
  };
  return (
    <>
      <Header download={downloadImage} />
      <div
        style={{ padding: `${padding}px` }}
        className="border w-[27rem] h-[27rem]"
      >
        <div
          ref={logoRef}
          style={{
            borderRadius: `${bgRounded}px`,
            backgroundColor: logoBgColor,
          }}
          className="w-full h-full overflow-hidden"
        >
          <div
            style={{ rotate: `${iconRotation}deg` }}
            className="w-full flex h-full items-center justify-center"
          >
            {logoImage ? (
              <div
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                }}
              >
                <img src={logoImage} alt="" className="w-full h-full" />
              </div>
            ) : (
              <Icon name={selectedIcon} size={iconSize} color={iconColor} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Logo;
