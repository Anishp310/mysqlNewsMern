import React from 'react'
import img1 from "../../assets/kp_oli.jpg"

const InternationalDetail = () => {
  return (
    <div className='my-5  px-5 md:px-20 mt-5'>
      <div className='flex flex-col justify-center items-center'>
      <p className="title font-bold text-red-500 text-4xl md:text-6xl text-center">
                          सडक पेटीमा फोहोर गर्ने वर्कसपलाई १० हजार जरिबाना
                          </p>


  <p className='inline-block mt-2 '>माघ १५, २०८१ |
  सजना बराल</p>


<img src={img1} alt=""  className='bg-red-800 rounded-lg max-h-[400px] md:max-w-[1000px] mt-6' />

<p className='max-w-[700px] mt-6 text-justify'>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nihil ab delectus? Perspiciatis et accusantium quod voluptate harum nihil, minima tempora fuga error mollitia quisquam sunt, similique reprehenderit, est animi!
</p>
      </div>

      
    </div>
  )
}

export default InternationalDetail