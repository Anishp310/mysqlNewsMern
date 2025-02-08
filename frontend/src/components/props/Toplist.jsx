import React from 'react'

const Toplist = ({image,title}) => {
  return (
    <div className="my-4 w-full px-5 md:px-8">
    <div className="space-y-6">
      <ul className="space-y-4">
          <li className="flex items-center gap-4 border-b pb-2">
            <img
              src={image}
              alt="News"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-sm cursor-pointer whitespace-nowrap hover:text-red-600">
              {title}
            </span>
          </li>
      </ul>
    </div>
  </div>
  )
}

export default Toplist