import React from 'react'
import { Link } from 'react-router-dom';


const Card = ({title,image,desc}) => {
  return (
     
          <div >
            <Link to={`/ads/1`}>
              <img
                src={image}
                alt=""
                className="rounded-md w-full h-[250px] object-cover"
              />
              <div className="title mt-3 text-center p-2 bg-white shadow-md rounded-md">
                <p className="font-bold text-sm md:text-base">
                  {title}
                </p>
              </div>
         </Link>
          </div>
     
  )
}

export default Card