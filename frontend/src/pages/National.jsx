import React, { useEffect, useState } from 'react'
import NationalCard from '../components/national/NationalCard'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import NationalBanner from '../components/national/NationalBanner'
import Headlines from '../components/props/Headlines'
import SummaryApi from '../API/Api'

const National = () => {
  const [nationalData, setNationalData] = useState([]);
  const getApiData = async () => {
    try {
      const response = await fetch(SummaryApi.getAllNational.url);
      const jsonData = await response.json();
      setNationalData(jsonData);
    } catch (error) {
      console.error(error.message);
    } 
  };
  useEffect(() => {
    getApiData();
  }, []);


  return (
    <div className="md:px-20 px-5 ">
            <Bannergif 
            image={banner1} />
            <Headlines 
          title="सामाजिक सञ्जाल नियमन विधेयक : कुन कसुरमा कस्तो सजाय प्रस्ताव ?"
          time="10:00 AM"
          link="/"
        />
            
      
    {/* banner */}
    <NationalBanner />
    
    

    {/* adds */}
    <div>
      <Bannergif image={nationalData} />
    </div>
   
    {/*news cards */}
    <NationalCard  newsData={nationalData} />
  </div>
  )
}

export default National