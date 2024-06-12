import { useState } from "react";
import { PencilRuler, BgIcon, UpgradeIcon } from "../Components/Icons";

const Sidebar = ({ setIcons, setBackground }) => {
  const [selected, setSelected] = useState("Icon");
  const buttons = [
    {
      name: "Icon",
      icon: <PencilRuler />,
      handler: () => {
        setSelected("Icon");
        setIcons(true);
        setBackground(false);
      },
    },
    {
      name: "Background",
      icon: <BgIcon />,
      handler: () => {
        setSelected("Background");
        setBackground(true);
        setIcons(false);
      },
    },
    {
      name: "Upgrade",
      icon: <UpgradeIcon />,
      handler: () => {
        setSelected("Upgrade");
      },
    },
  ];
  return (
    <div className="w-full h-full border-r-2 flex flex-col items-start px-4 pt-4">
      {buttons.map((button) => (
        <button
          onClick={button.handler}
          key={button.name}
          className={`w-full px-6 py-3 text-start font-bold flex rounded-lg items-center gap-2 ${
            selected === button.name ? "bg-white text-gray-900" : ""
          }`}
        >
          {button.icon} {button.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
