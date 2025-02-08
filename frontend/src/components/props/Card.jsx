import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, image, link,slug }) => {
  return (
    <div>
      <Link to={`/${link}/${slug}`}>
        {/* Check if the image is available, and apply fallback */}
        <img
          src={image || "fallback-image-url"} // Use a fallback image if none exists
          alt={title || "No Title Available"}
          className="rounded-md w-full h-[250px] object-cover"
        />
        <div className="title mt-3 text-center p-2 bg-white shadow-md rounded-md">
          <p className="font-bold text-sm md:text-base">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
