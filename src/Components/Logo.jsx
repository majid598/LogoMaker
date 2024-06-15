import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Icon } from "./Icons";

const Logo = ({
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
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("logo");
  const logoRef = useRef(null);
  const downloadImage = async () => {
    const htmlToImage = await import("html-to-image");
    htmlToImage.toPng(logoRef.current).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = `${name}.png`;
      link.href = dataUrl;
      link.click();
      localStorage.clear();
      setName("");
      setPopup(false);
      navigate("/");
    });
  };
  return (
    <>
      <Header download={downloadImage} setPopup={setPopup} />
      <div
        style={{ padding: `${padding}px` }}
        className="logo border w-[27rem] h-[27rem]"
      >
        <div
          ref={logoRef}
          style={{
            borderRadius: `${bgRounded}px`,
            backgroundColor: logoBgColor,
          }}
          className="w-full h-full overflow-hidden -z-10"
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
                <img
                  src={logoImage}
                  alt=""
                  style={{ opacity: imageOpacity}}
                  className={`w-full h-full`}
                />
              </div>
            ) : (
              <Icon name={selectedIcon} size={iconSize} color={iconColor} />
            )}
          </div>
        </div>
      </div>
      {popup && (
        <>
          <div
            onClick={() => setPopup(false)}
            className="w-full h-screen bg-black/60 fixed top-0 left-0 z-[99]"
          ></div>
          <div className="bg-gray-900 flex flex-col justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] rounded-2xl px-20 py-10 border-2 w-[30rem] min-h-[40vh]">
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 border p-1 text-2xl rounded-md"
            >
              <IoMdClose />
            </button>
            <div className="w-full">
              <div className="flex flex-col">
                <label className="font-semibold">Save as</label>
                <input
                  type="text"
                  className="bg-transparent mt-2 rounded-md p-2 outline-none border"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Logo Name"
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div></div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPopup(false);
                    setName("");
                  }}
                  className="bg-white text-gray-900 border-2 font-bold px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={downloadImage}
                  className="hover:bg-white hover:text-gray-900 transition-all duration-300 border-2 font-bold px-4 py-2 rounded-md"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Logo;
