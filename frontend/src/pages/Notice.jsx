import React from 'react'
import banner1 from "../assets/innhotel.gif"
import Bannergif from '../components/ads/advertisements/Bannergif'
import NoticeCard from '../components/notice/NoticeCard'
import NoticeBanner from '../components/notice/NoticeBanner'

const Notice = () => {
  return (
    <div className="md:px-20 px-5 ">
            <Bannergif image={banner1} />
      
    {/* banner */}
    <NoticeBanner />

    {/* adds */}
    <div>
      <Bannergif image={banner1} />
    </div>

    {/*news cards */}
    <NoticeCard />
  </div>
  )
}

export default Notice