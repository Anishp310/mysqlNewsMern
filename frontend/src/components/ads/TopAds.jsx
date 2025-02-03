import React from 'react'
import Banner from './Banner'

const TopAds = () => {
  return (
    <div className='mb-4'>
      <div className="space-y-8 flex-1 md:mt-12 w-[60%]">
                <div className="">
                  <h3 className="mb-6 text-2xl font-bold text-red-500">Top News</h3>
                  <ul className="space-y-2">
                      <li
                       
                        className="flex items-center gap-2 border-b"
                      >
                        <img
                          src={Banner}
                          alt=""
                          className="w-8 h-8 mb-2 rounded-full"
                        />
                        <span
                          className="mb-2 cursor-pointer"
                          onClick={() => handleBlogClick(post)}
                        >
                       title is here for the 
                        </span>
                      </li>
                    
                  </ul>
                </div>
                
              
              </div>
    </div>
  )
}

export default TopAds