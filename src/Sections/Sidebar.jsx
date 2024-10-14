import { useEffect, useState } from "react";
import { PencilRuler, BgIcon, UpgradeIcon } from "../Components/Icons";
import Add from "../Components/Add";
import { images } from "../data/icons";

const Sidebar = ({ setIcons, setBackground, setUpgrade, user }) => {
  const [selected, setSelected] = useState("Icon");
  const [isAddClose, setIsAddClose] = useState(false);
  const buttons = [
    {
      name: "Icon",
      icon: <PencilRuler />,
      handler: () => {
        setSelected("Icon");
        setIcons(true);
        setBackground(false);
        setUpgrade(false);
      },
    },
    {
      name: "Background",
      icon: <BgIcon />,
      handler: () => {
        setSelected("Background");
        setBackground(true);
        setIcons(false);
        setUpgrade(false);
      },
    },
    {
      name: "Upgrade",
      icon: <UpgradeIcon />,
      handler: () => {
        setSelected("Upgrade");
        setIcons(false);
        setBackground(false);
        setUpgrade(true);
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsAddClose(false);
    }, 5000);
  }, [isAddClose, setIsAddClose]);

  return (
    <div className="sidebar w-full h-full border-r-2 flex flex-col items-start px-4 pt-4">
      {buttons.map((button) => (
        <button
          onClick={button.handler}
          key={button.name}
          className={`w-full xl:px-6 px-3 py-3 text-start font-bold flex rounded-lg items-center gap-2 ${selected === button.name ? "bg-white text-gray-900" : ""
            }`}
        >
          {button.icon} {button.name}
        </button>
      ))}
      <div className="w-full h-[28rem] mt-20">
        {!user?.isSubscribed && (
          <Add />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
