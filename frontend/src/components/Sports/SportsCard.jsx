import React, { useState } from 'react';
import img2 from "../../assets/tut.jpg";
import { Link } from 'react-router-dom';
import Card from '../props/Card';

const SportsCard = () => {
  const newsData = Array(12).fill({ // Dummy news items (you can replace this with dynamic data)
    title: '२ करोड बराबरको अनलाइन जुवा खेलाएको आरोपमा २ जना पक्राउ',
    image: img2
  });

  const itemsPerPage = 8; // Items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  // Slice the data for the current page
  const currentNews = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='mb-4'>
      <div className="cards mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card   title= '२ करोड बराबरको अनलाइन जुवा खेलाएको आरोपमा २ जना पक्राउ' 
      image={img2} />
      <Card   title= '२ करोड बराबरको अनलाइन जुवा खेलाएको आरोपमा २ जना पक्राउ' 
      image={img2} /><Card   title= '२ करोड बराबरको अनलाइन जुवा खेलाएको आरोपमा २ जना पक्राउ' 
      image={img2} /><Card   title= '२ करोड बराबरको अनलाइन जुवा खेलाएको आरोपमा २ जना पक्राउ' 
      image={img2} /><Card   title= '२ करोड बराबरको अनलाइन जुवा खेलाएको आरोपमा २ जना पक्राउ' 
      image={img2} />
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SportsCard;
