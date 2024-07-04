import axios from "axios";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import { Icon } from "./Icons";
import toast from "react-hot-toast";

const LogoComponent = ({ i }) => {
  const navigate = useNavigate();
  const [editMenu, setEditMenu] = useState(false);
  //   console.log(localStorage);
  const edit = () => {
    localStorage.setItem("logoId", i._id);
    localStorage.setItem("selected-icon", i.selectedIcon);
    localStorage.setItem("logo-image", i.logoImage);
    localStorage.setItem("icon-color", i.iconColor);
    localStorage.setItem("logo-bg-color", i.logoBgColor);
    localStorage.setItem("image-opacity", i.imageOpacity);
    localStorage.setItem("bg-rounded", i.bgRounded);
    localStorage.setItem("icon-rotation", i.iconRotation);
    localStorage.setItem("icon-size", i.iconSize);
    localStorage.setItem("padding", i.padding);
    setTimeout(() => {
      navigate("/logo/edit");
    }, 300);
  };

  const handleDelete = () => {
    axios
      .delete(`${server}api/v1/logo/delete/${i._id}`, {
        withCredentials: true,
      })
      .then(({ data }) => toast.success(data?.message))
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <div className="w-[15rem] p-2 border-2 rounded-sm h-[20vh] relative">
      <div
        className={`h-full w-[8rem] flex items-center justify-center`}
        style={{
          backgroundColor: i.logoBgColor,
          borderRadius: `10px`,
        }}
      >
        {i.logoImage ? (
          <img
            src={i.logoImage}
            width={i.iconSize}
            className="w-full"
            style={{ rotate: `${i?.iconRotation}deg` }}
          />
        ) : (
          <div style={{ rotate: `${i?.iconRotation}deg` }}>
            <Icon name={i.selectedIcon} size={100} color={i.iconColor} />
          </div>
        )}
      </div>
      <button
        onClick={() => setEditMenu((prev) => !prev)}
        className="absolute top-2 right-2 text-xl"
      >
        <CiMenuKebab />
      </button>
      {editMenu && (
        <div className="w-1/2 rounded-xl overflow-hidden bg-gray-800 absolute right-2 top-10">
          <button
            onClick={edit}
            className="px-6 w-full transition-all duration-300 text-center py-2 hover:bg-gray-950 font-semibold"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-6 w-full transition-all duration-300 text-center py-2 hover:bg-gray-950 font-semibold"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoComponent;
