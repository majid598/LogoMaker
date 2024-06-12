import { useRef, useState } from "react";
// import htmlToImage from "html-to-image";

const LogoMaker = () => {
  const [width, setWidth] = useState(localStorage.getItem("width"));
  const [rounded, setRounded] = useState(localStorage.getItem("rounded"));
  const [bgColor, setBgColor] = useState(localStorage.getItem("bgColor"));

  const divRef = useRef(null);

  const downloadImage = async () => {
    const htmlToImage = await import("html-to-image");
    htmlToImage.toPng(divRef.current).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const colors = ["green", "red", "blue", "yellow"];
  return (
    <div className="w-full min-h-screen pt-32 px-20">
      <div className="w-full flex justify-center">
        <div
          id="image"
          ref={divRef}
          style={{
            width: `${width}%`,
            borderRadius: `${rounded}%`,
            backgroundColor: bgColor,
          }}
          className={`h-[50vh] flex items-center justify-center text-black text-4xl font-semibold`}
        >
          <div className="">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-20">
        width
        <input
          type="range"
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
            localStorage.setItem("width", width);
          }}
        />
        rounded
        <input
          type="range"
          value={rounded}
          onChange={(e) => {
            setRounded(e.target.value);
            localStorage.setItem("rounded", rounded);
          }}
        />
        colors
        <div className="flex mt-10 gap-3 items-center w-full justify-center">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setBgColor(color);
                localStorage.setItem("bgColor", color);
              }}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-md`}
            ></button>
          ))}
          <button onClick={() => downloadImage()}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default LogoMaker;
