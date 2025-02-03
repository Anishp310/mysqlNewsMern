import React from 'react';
import TopOthers from '../others/TopOthers';

const PropBanner = ({ image }) => {
  return (
            <div className="flex-1 md:w-3/5 w-full h-auto">
              <div className="w-full h-[300px] md:h-[400px]">
                <img
                  src={image}
                  alt="Banner"
                  className="w-full h-full object-cover md:rounded-l-md rounded-t-md"
                />
              </div>
            </div>
  );
};

export default PropBanner;
