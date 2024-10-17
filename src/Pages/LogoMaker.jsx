import {
  Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import Add from "../Components/Add";
import Header from "../Components/Header";
import Subscribe from "../Components/Subscribe";
import Editor from "../Sections/Editor";
import Preview from "../Sections/Preview";
import Sidebar from "../Sections/Sidebar";
import { images } from "../data/icons";

const ElementProvider = ({ children }) => {
  return (
    <Elements
      stripe={loadStripe(
        "pk_test_51Okn15HmzRzfXGvShWJ4qyaxo6gNmN4XbyDhm8fJD9mZqIUdAZiymjpTkXzfGRIqBh1nfDdyKANZQPkxZ9kb9wDU00vhjmQzsH"
      )}
    >
      {children}
      {/* <LogoMaker /> */}
    </Elements>
  );
};

const LogoMaker = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [icons, setIcons] = useState(true);
  const [background, setBackground] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [active, setActive] = useState(false);
  const [iconsSize, setIconSize] = useState(
    localStorage.getItem("icon-size") || 20
  );
  const [iconRotation, setIconRotation] = useState(
    localStorage.getItem("icon-rotation") || 0
  );
  const [bgRounded, setBgRounded] = useState(
    localStorage.getItem("bg-rounded") || 0
  );
  const [padding, setPadding] = useState(localStorage.getItem("padding") || 0);
  const [selectedIcon, setSelectedIcon] = useState(
    localStorage.getItem("selected-icon")
  );
  const [logoImage, setLogoImage] = useState(
    localStorage.getItem("logo-image")
  );
  const [iconColor, setIconColor] = useState(
    localStorage.getItem("icon-color") || "black"
  );
  const [logoBgColor, setLogoBgColor] = useState(
    localStorage.getItem("logo-bg-color") || "white"
  );
  const [imageOpacity, setImageOpacity] = useState(
    localStorage.getItem("image-opacity") || 100
  );

  const unSub = () => {};

  useEffect(() => {
    localStorage.setItem("icon-color", iconColor);
    localStorage.setItem("logo-bg-color", logoBgColor);
  }, [iconColor, setIconColor, logoBgColor, setLogoBgColor]);

  return (
    <ElementProvider>
      <div
        className={`w-full h-screen bg-gray-900 text-white pt-28 grid ${
          !upgrade ? "grid-col-4" : "grid-col-3"
        }`}
      >
        <div className="w-full h-full">
          <Sidebar
            setIcons={setIcons}
            setBackground={setBackground}
            setUpgrade={setUpgrade}
            user={user}
          />
        </div>
        {!upgrade ? (
          <>
            <div
              className={`editor ${
                active && "active"
              } w-full h-full overflow-y-scroll`}
            >
              <button
                onClick={() => setActive((prev) => !prev)}
                className={`fixed top-32 menu-btn hidden ${
                  active ? "left-[21.7rem]" : "left-0"
                } bg-gray-900 rounded-tr-full rounded-br-full trans border-2 border-l-0 z-[999] h-10 py-2 justify-between pl-3 pr-5 flex-col gap-0.5`}
              >
                <span
                  className={`w-5 h-1 ${
                    active ? "rotate-45 mt-2" : "rotate-0"
                  } bg-white rounded-xl`}
                ></span>
                <span
                  className={`w-5 h-1 bg-white ${
                    active ? "hidden" : "flex"
                  } rounded-xl`}
                ></span>
                <span
                  className={`w-5 h-1 ${
                    active ? "-rotate-45 mb-1.5" : "rotate-0"
                  } bg-white rounded-xl`}
                ></span>
              </button>
              <Editor
                icons={icons}
                background={background}
                iconSize={iconsSize}
                setIconSize={setIconSize}
                iconRotation={iconRotation}
                setIconRotation={setIconRotation}
                rounded={bgRounded}
                setRounded={setBgRounded}
                padding={padding}
                setPadding={setPadding}
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
            </div>
            <div className="w-full h-full">
              <Preview
                logoImage={logoImage}
                bgRounded={bgRounded}
                padding={padding}
                iconSize={iconsSize}
                selectedIcon={selectedIcon}
                iconRotation={iconRotation}
                iconColor={iconColor}
                logoBgColor={logoBgColor}
                imageOpacity={imageOpacity}
                user={user}
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full">
            <Header user={user} />
            <div>
              {user?.isSubscribed ? (
                <div className="w-full h-full p-20 flex flex-col items-center">
                  <h1 className="text-3xl font-semibold text-center">
                    You Are Subscribed For {user.subscribedPlan}
                  </h1>
                  <button
                    onClick={unSub}
                    className="mx-auto inline-block mt-20 px-6 py-2 rounded-lg border-2 font-bold"
                  >
                    View
                  </button>
                </div>
              ) : (
                <div className="w-full mt-20 grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 md:gap-y-10 sm:px-8 px-0">
                  <div className="w-full px-2 md:my-0 my-10">
                    <div className="h-full w-full bg-gray-950 p-6 rounded-2xl flex flex-col relative overflow-hidden">
                      <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                        Monthly
                      </h2>
                      <h1 className="text-5xl leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                        <span>$7.99</span>
                        <span className="text-lg ml-1 font-normal">/mo</span>
                      </h1>
                      <button
                        onClick={() => setOpen(true)}
                        className="flex font-bold items-center text-gray-900 mt-4 bg-white border-2 justify-between hover:text-white py-2 px-4 w-full focus:outline-none hover:bg-gray-900 transition-all duration-300 rounded-md"
                      >
                        {user?.isSubscribed ? (
                          "unSubscribe"
                        ) : (
                          <>
                            Get For Month
                            <FaArrowRight />
                          </>
                        )}
                      </button>
                      <div className="mt-10 h-[20vh] flex items-center justify-center">
                        <h1 className="flex items-center gap-3 text-4xl font-semibold justify-center">
                          <span>
                            <FaCheck className="text-green-600" />
                          </span>{" "}
                          No Adds
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-2 md:my-0 my-10">
                    <div className="h-full w-full bg-gray-950 p-6 rounded-2xl flex flex-col relative overflow-hidden">
                      <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                        Yearly
                      </h2>
                      <h1 className="text-5xl leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                        <span>$75.99</span>
                        <span className="text-lg ml-1 font-normal">/year</span>
                      </h1>
                      <Link
                        href={"/login"}
                        className="flex font-bold items-center mt-4 text-gray-900 bg-white border-2 justify-between hover:text-white py-2 px-4 w-full focus:outline-none hover:bg-gray-900 transition-all duration-300 rounded-md"
                      >
                        Get For Year
                        <FaArrowRight />
                      </Link>
                      <div className="mt-10 h-[20vh] flex items-center justify-center">
                        <h1 className="flex items-center gap-3 text-4xl font-semibold justify-center">
                          <span>
                            <FaCheck className="text-green-600" />
                          </span>{" "}
                          No Adds
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="w-full lg-l:hidden h-full pt-4">
          {!user?.isSubscribed && (
            <Add images={images} url="https://burgerpizzapoint.vercel.app/" />
          )}
        </div>
        {open && <Subscribe user={user} open={open} setOpen={setOpen} />}
      </div>
    </ElementProvider>
  );
};

export default LogoMaker;
