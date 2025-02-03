import React from 'react'
import SportsBanner from '../components/Sports/SportsBanner'
import SportsCard from '../components/Sports/SportsCard'
import Bannergif from '../components/ads/advertisements/Bannergif'
import banner1 from "../assets/innhotel.gif"

const Sports = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />
      
    {/* banner */}
    <SportsBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <SportsCard />
  </div>  
  )
}

export default Sports