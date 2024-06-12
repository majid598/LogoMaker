import ColorPicker from "react-best-gradient-color-picker";

const BgEdit = ({
  rounded,
  setRounded,
  padding,
  setPadding,
  bgColor,
  setBgColor,
}) => {
  return (
    <div>
      <div className="flex flex-col items-start"></div>
      <div className="mt-5">
        <div className="w-full flex items-center justify-between">
          <label>Rounded</label>
          <span>{localStorage.getItem("bg-rounded") || 0} px</span>
        </div>
        <input
          type="range"
          value={rounded}
          min={-1}
          max={514}
          onChange={(e) => {
            setRounded(e.target.value);
            localStorage.setItem("bg-rounded", rounded);
          }}
          className="range w-full"
        />
      </div>
      <div className="mt-5">
        <div className="w-full flex items-center justify-between">
          <label>Padding</label>
          <span>{localStorage.getItem("padding") || 0} px</span>
        </div>
        <input
          type="range"
          value={padding}
          min={-1}
          max={101}
          onChange={(e) => {
            setPadding(e.target.value);
            localStorage.setItem("padding", padding);
          }}
          className="range w-full"
        />
      </div>
      <div className="pb-20 mt-4">
        <ColorPicker value={bgColor} onChange={setBgColor} />
      </div>
    </div>
  );
};

export default BgEdit;
