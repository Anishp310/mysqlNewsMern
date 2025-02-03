import React from 'react'

const HomeNewscard = ({title,image,desc}) => {
  return (
    <div>  

            <a
              href="#"
              className="my-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl  hover:bg-gray-100 "
            >
              <img
                className="object-cover w-full rounded-t-lg h-80 md:h-60 md:w-48 md:rounded-none md:rounded-s-lg"
                src={image}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-teal-800 ">
                  {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 text-justify ">
                  {desc}
                </p>
              </div>
            </a>
            
          </div>
        
  )
}

export default HomeNewscard