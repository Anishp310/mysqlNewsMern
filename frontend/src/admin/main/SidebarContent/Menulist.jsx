import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaGlobe, FaMoneyBill, FaInfoCircle, FaFootballBall, FaTv, FaAd, FaEllipsisH } from 'react-icons/fa';

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/admin/national", label: "National", icon: <FaGlobe /> },
  { path: "/admin/international", label: "International", icon: <FaGlobe /> },
  { path: "/admin/economic", label: "Economic", icon: <FaMoneyBill /> },
  { path: "/admin/information", label: "Information", icon: <FaInfoCircle /> },
  { path: "/admin/sports", label: "Sports", icon: <FaFootballBall /> },
  { path: "/admin/entertainment", label: "Entertainment", icon: <FaTv /> },
  { path: "/admin/ads", label: "Ads", icon: <FaAd /> },
  { path: "/admin/others", label: "Others", icon: <FaEllipsisH /> },
];

const Menulist = () => {
  return (
    <div className="mt-3">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="hover:bg-stone-300 rounded-lg p-2 flex items-center">
            <Link to={item.path} className="flex items-center space-x-2">
              {item.icon} <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menulist;
