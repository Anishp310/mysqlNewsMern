import React from 'react'
import img1 from "../../assets/kp_oli.jpg"
import PropBanner from '../props/PropBanner'
import Toplist from '../props/Toplist'

const OthersBanner = () => {
  return (
    <div className="mt-6">
    <div className="flex flex-col">
      <div className="main flex flex-col justify-center items-center">
        <div className="container pt-4 gap-5 flex flex-col md:flex-row md:justify-between items-center">
          {/* Image Section */}
          <PropBanner/>

          {/* Top Others Section */}
          <div className="lg:w-1/3  w-full bg-slate-50 shadow-md p-4 md:rounded-r-md rounded-b-md">
            <Toplist />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OthersBanner