import React, { useEffect, useState } from 'react'
import NepaliDate from "nepali-date"; // Import the Nepali date library
import img from "../../assets/kpoli.png"
const Header = ({heading}) => {
  const [currentDate, setCurrentDate] = useState("");
    const [nepaliDate, setNepaliDate] = useState(""); // Nepali Date
  
    const [openBar, setOpenBar] = useState(false);
  
    useEffect(() => {
      const now = new Date();
      setCurrentDate(now.toDateString()); // Format date as "Mon Jan 27 2025"
      // Get Nepali date using NepaliDate library
      const nepali = new NepaliDate();
      const nepaliDateString = nepali.format("dddd, D MMMM YYYY"); // Format it to the desired Nepali format
      setNepaliDate(nepaliDateString);
    }, []);
  return (
    <div className=''>
      <div className=' float flex justify-between items-center'>
        <p className='font-bold text-lg'>{heading}</p>
        <div className='text-xs'>
        <p>{currentDate}</p>
        <p>{nepaliDate}</p>
        </div>
       
       
      </div>
      <hr className='mt-3' />

    </div>
  )
}

export default Header