import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from "../../redux/counterSlice/index.js";
import Card from '../props/Card';

const SportsCard = () => {
  const dispatch = useDispatch();
  const { sports, loading, error } = useSelector((state) => state.news);

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchAllNews()).unwrap();
        console.log("Fetched data:", result);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredsportss = sports.slice(1); 
  const filteredsports = filteredsportss.sort((a,b)=>(new Date(b.created_at) - new Date(a.created_at)))
  const totalPages = Math.ceil(filteredsports.length / itemsPerPage);
  const currentNews = filteredsports.slice(
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
        {currentNews.slice(1)?.map((item) => (
          <div className='' key={item.sports_id}>
            <Card title={item.title} image={item.image_data} slug={item.slug} />
          </div>
        ))}
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
