import React from 'react'
import EntertainmentCard from '../components/entertainment/EntertainmentCard'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import EntertainmentBanner from '../components/entertainment/EntertainmentBanner'

const Entertainment = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />
      
    {/* banner */}
    <EntertainmentBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <EntertainmentCard />
  </div>
  )
}

export default Entertainment