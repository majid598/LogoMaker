import { Plus, Smile } from "lucide-react";
import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { IoMdClose } from "react-icons/io";
import { iconList } from "../data/icons";
import { Icon } from "./Icons";
import { emojis } from "../data/data";

const IconList = ({
  iconSize = 0,
  setIconSize,
  iconRotation = 0,
  setIconRotation,
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
  const [openIconList, setOpenIconList] = useState(false);
  const [icons, setIcons] = useState(true);
  const [colorIcons, setColorIcons] = useState(false);
  const imageHandler = (e) => {
    localStorage.removeItem("selected-icon");
    setSelectedIcon("");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
        localStorage.setItem("logo-image", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("logo-image", null);
    }
  };
  return (
    <div>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col relative items-start">
          <label htmlFor="icon-list">Icon</label>
          <button
            onClick={() => setOpenIconList((prev) => !prev)}
            id="icon-list"
            className="p-2 mt-2 rounded-md border-2 h-11 w-11"
          >
            {selectedIcon ? <Icon name={selectedIcon} /> : <Smile />}
          </button>
          {openIconList && (
            <div className="w-[20.5rem] z-[999] h-[60vh] rounded-xl absolute overflow-y-scroll left-0 top-24 bg-gray-900 border-2">
              <div className="w-full flex justify-between px-4 pt-5">
                <div className="flex relative rounded-lg bg-gray-800 overflow-hidden">
                  <div
                    className={`absolute h-full transition-all duration-500 ${
                      icons ? "w-1/3 left-0" : "w-2/3 left-1/3"
                    } rounded-lg bg-gray-950`}
                  ></div>
                  <button
                    onClick={() => {
                      setIcons(true);
                      setColorIcons(false);
                    }}
                    className={`px-4 py-3 transition-all relative duration-300 font-bold`}
                  >
                    Icons
                  </button>
                  <button
                    onClick={() => {
                      setIcons(false);
                      setColorIcons(true);
                    }}
                    className={`px-4 py-3 transition-all relative duration-300 font-bold`}
                  >
                    Colorful Icons
                  </button>
                </div>
                <button
                  onClick={() => setOpenIconList(false)}
                  className="fixed left-[33.5rem] top-[15rem] bg-gray-900 z-[999] text-2xl p-1 rounded-md border"
                >
                  <IoMdClose />
                </button>
              </div>
              <div className="w-full mt-6 flex flex-wrap gap-2 justify-center px-2">
                {icons && (
                  <>
                    {iconList.map((icon) => (
                      <button
                        onClick={() => {
                          setSelectedIcon(icon);
                          setLogoImage("");
                          localStorage.setItem("selected-icon", icon);
                          localStorage.removeItem("logo-image");
                          localStorage.removeItem("image-opacity");
                        }}
                        className="p-2 rounded-md border"
                      >
                        <Icon name={icon} />
                      </button>
                    ))}
                  </>
                )}
                {colorIcons && (
                  <>
                    {emojis.map((emoji) => (
                      <button
                        onClick={() => {
                          localStorage.removeItem("selected-icon");
                          setSelectedIcon("");
                          setLogoImage(emoji);
                          localStorage.setItem("logo-image", emoji);
                        }}
                        className="p-2 w-11 h-11 rounded-md border"
                      >
                        <img src={emoji} className="w-full h-full" alt="" />
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <span>Or</span>
        <div className="flex flex-col relative items-start">
          <label htmlFor="icon-list">Image</label>
          <label className="mt-2 overflow-hidden flex items-center justify-center rounded-md border-2 cursor-pointer h-11 w-11">
            {logoImage ? (
              <img src={logoImage} className="w-full h-full" />
            ) : (
              <Plus />
            )}
            <input type="file" hidden onChange={imageHandler} />
          </label>
        </div>
      </div>
      <div className="mt-5">
        <div className="w-full flex items-center justify-between">
          <label>Size</label>
          <span>{localStorage.getItem("icon-size") || 0} px</span>
        </div>
        <input
          type="range"
          value={iconSize}
          min={18}
          max={512}
          onChange={(e) => {
            setIconSize(e.target.value);
            localStorage.setItem("icon-size", iconSize);
          }}
          className="range w-full"
        />
      </div>
      <div className="mt-5">
        <div className="w-full flex items-center justify-between">
          <label>Rotate</label>
          <span>{localStorage.getItem("icon-rotation") || 0} °</span>
        </div>
        <input
          type="range"
          value={iconRotation}
          min={-1}
          max={361}
          onChange={(e) => {
            setIconRotation(e.target.value);
            localStorage.setItem("icon-rotation", iconRotation);
          }}
          className="range w-full"
        />
      </div>
      {!logoImage && (
        <div className="pb-20 mt-4">
          <ColorPicker value={iconColor} onChange={setIconColor} />
        </div>
      )}
      {logoImage && (
        <div>
          <div className="mt-5">
            <div className="w-full flex items-center justify-between">
              <label>Opacity</label>
              <span>{localStorage.getItem("image-opacity") || 100}</span>
            </div>
            <input
              type="range"
              value={imageOpacity}
              min={0}
              max={1}
              step="0.01"
              onChange={(e) => {
                setImageOpacity(e.target.value);
                localStorage.setItem("image-opacity", imageOpacity);
              }}
              className="range w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IconList;
