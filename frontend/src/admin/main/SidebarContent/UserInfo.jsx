import React, { useState, useEffect, useRef } from 'react';
import img from "../../../assets/kpoli.png";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const UserInfo = () => {
  const [openbox, setOpenbox] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenbox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative flex justify-between gap-2 cursor-pointer hover:bg-stone-300 rounded-lg"
        onClick={() => setOpenbox(!openbox)}
      >
        <div className="head flex gap-2">
          <img src={img} alt="" className="rounded-lg w-10 h-10 p-1" />
          <div className="title cursor-pointer">
            <p className="font-bold">Anish Pandey</p>
            <p className="text-xs">anishp310@gmail.com</p>
          </div>
        </div>
        <div className="absolute right-0 top-4 text-xs cursor-pointer">
          {openbox ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {openbox && (
        <div className="absolute transparent bg-slate-400 w-20 h-10 rounded-lg top-full right-2 flex justify-center p-2 cursor-pointer">
          <ul>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
