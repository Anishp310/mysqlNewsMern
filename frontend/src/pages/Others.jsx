import React from 'react'
import OthersCard from '../components/others/OthersCard'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import OthersBanner from '../components/others/OthersBanner'
const Others = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />
      
    {/* banner */}
    <OthersBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <OthersCard />
  </div>  )
}

export default Others