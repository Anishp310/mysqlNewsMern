import React from 'react'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import InternationalCard from '../components/International/InternationalCard'
import InternationalBanner from '../components/International/InternationalBanner'

const International = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />
      
    {/* banner */}
    <InternationalBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <InternationalCard />
  </div>  )
}

export default International