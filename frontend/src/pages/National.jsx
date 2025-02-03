import React from 'react'
import NationalCard from '../components/national/NationalCard'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import NationalBanner from '../components/national/NationalBanner'
import Headlines from '../components/props/Headlines'

const National = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />

            <Headlines
          title="सामाजिक सञ्जाल नियमन विधेयक : कुन कसुरमा कस्तो सजाय प्रस्ताव ?"
          time="10:00 AM"
          link="/"
        />
            
      
    {/* banner */}
    <NationalBanner />
    
    

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>
   
    {/*news cards */}
    <NationalCard />
  </div>
  )
}

export default National