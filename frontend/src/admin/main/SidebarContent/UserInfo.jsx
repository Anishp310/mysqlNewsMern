import React, { useState, useEffect, useRef } from 'react';
import img from "../../../assets/kpoli.png";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [openbox, setOpenbox] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const dropdownRef = useRef(null);
  const navigate  = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData)); 
    }
  }, []);

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

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate("/login")
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative flex justify-between gap-2  hover:bg-stone-300 rounded-lg cursor-pointer"
        onClick={() => setOpenbox(!openbox)}
      >
        <div className="head flex gap-2">
          <img src={img} alt="" className="rounded-lg w-10 h-10 p-1" />
          <div className="title ">
            {user ? (
              <>
                <p className="font-bold">{user.username}</p>
                <p className="text-xs">{user.email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="absolute right-0 top-4 text-xs ">
          {openbox ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {openbox && (
        <div className="absolute bg-white shadow-md w-32 rounded-lg top-full right-0 p-2 ">
          <ul>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
