import React from 'react'
import banner from "../../assets/innhotel.gif"
import Banner from './Banner'
import AdsCard from './AdsCard'

const AllAds = () => {
  return (
 <div className='md:px-20 px-5 '>
  {/* banner */}
        <Banner/>

        {/* adds */}
        <div>
           <div className='my-4'>
                     <img src={banner} alt="" className='w-[100%]  rounded-lg ' />
                   </div>
        </div>
        


{/*news cards */}
   <AdsCard/>

    </div>  
  )
}

export default AllAds