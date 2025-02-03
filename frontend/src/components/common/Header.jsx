import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaHome, FaFlag, FaGlobe, FaMoneyBill, FaInfoCircle, FaFootballBall, FaTv, FaEllipsisH, FaAd, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import NepaliDate from "nepali-date"; // Import the Nepali date library

const Menu = [
  { link: "/home", name: "गृहप्राघर", icon: <FaHome /> },
  { link: "/national", name: "राष्ट्रिय", icon: <FaFlag /> },
  { link: "/international", name: "अन्तर्राष्ट्रिय", icon: <FaGlobe /> },
  { link: "/economic", name: "अर्थतन्त्र", icon: <FaMoneyBill /> },
  { link: "/information_technology", name: "सूचना प्रविधि", icon: <FaInfoCircle /> },
  { link: "/sports", name: "खेलकुद", icon: <FaFootballBall /> },
  { link: "/entertainment", name: "मनोरञ्जन", icon: <FaTv /> },
  { link: "/others", name: "अन्य", icon: <FaEllipsisH /> },
  { link: "/ads", name: "विज्ञापन", icon: <FaAd /> },
];

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [nepaliDate, setNepaliDate] = useState("");
  const [openBar, setOpenBar] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toDateString());
    const nepali = new NepaliDate();
    const nepaliDateString = nepali.format("dddd, D MMMM YYYY");
    setNepaliDate(nepaliDateString);
  }, []);

  return (
    <div className="">
      {/* upper */}
      <div className="bg-rose-950 md:px-20 px-5">
        <div className="flex items-center justify-between text-white h-20">
          <div className="md:flex">
            <h1 className="text-3xl font-extrabold tracking-wide">SB News</h1>
          </div>

          <div className="flex flex-row items-center justify-around gap-1 md:gap-3 text-[8px] md:text-[10px] lg:text-sm">
            <p className="font-semibold">
              {currentDate}
              <br />
              <span className="font-semibold">{nepaliDate}</span>
            </p>
          </div>
        </div>
      </div>

      {/* lower */}
      <div
        className={`relative flex md:px-20 px-5 items-center z-[100] lg:pt-2 md:pt-1 shadow-lg ${
          openBar ? "justify-center" : "justify-between h-10"
        }`}
      >
        <div className={`${openBar ? "hidden md:block" : "block"}`}></div>

        <div className="flex items-center justify-between">
          <ul
            className={`relative flex flex-col pb-2 xl:gap-6  gap-1 lg:flex-row md:justify-center md:text-[1rem] cursor-pointer ${
              openBar ? "block" : "hidden lg:flex"
            }`}
          >
            {Menu.map((item, index) => (
              <li
                key={index}
                className=" flex items-center justify-around px-5 py-5 m-1 ease-out rounded-md cursor-pointer text-rose-800 md:py-1 md:px-1 hover:text-orange-400"
              >
                <Link onClick={() => setOpenBar(false)} to={item.link} className="flex items-center space-x-1">
                  {item.icon} <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-around px-5 py-4 m-1 ease-out rounded-md cursor-pointer text-rose-800 md:py-1 md:px-1 hover:text-orange-400">
              <a href="#footer" className="flex items-center gap-1">{<FaPhone />} सम्पर्क</a>
            </li>
          </ul>
          <div className={`lg:hidden flex justify-center items-center ${openBar ? "absolute top-0 right-2" : ""}`}>
            {openBar ? (
              <FaTimes onClick={() => setOpenBar(!openBar)} className="mt-4 text-2xl" />
            ) : (
              <FaBars onClick={() => setOpenBar(!openBar)} className="text-2xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
