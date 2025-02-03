import React from 'react'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import AdsCard from '../components/ads/AdsCard'
import AdsBanner from '../components/ads/AdsBanner'

const Ads = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />

    {/* banner */}
    <AdsBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <AdsCard />
  </div>  )
}

export default Ads