import React from 'react'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import EconomicCard from '../components/economic/EconomicCard'
import AdsBanner from '../components/ads/AdsBanner'
import EconomicBanner from '../components/economic/EconomicBanner'

const Economic = () => {
  return (
<div className="md:px-20 px-5 ">
        <Bannergif image={banner1} />
  
    {/* banner */}
    <EconomicBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <EconomicCard />
  </div>  )
}

export default Economic