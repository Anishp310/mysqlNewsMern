import React, { useEffect } from "react";
import PropBanner from "../props/PropBanner";
import Toplist from "../props/Toplist";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from "../../redux/counterSlice/index.js";

const OthersBanner = () => {
  const dispatch = useDispatch();
  const { others, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllNews()).unwrap();
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  const filteredotherss = others.slice(1);
  const sortedothers = filteredotherss.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error}</p>;

  // Extract first news for PropBanner
  const firstNews = sortedothers[0];
  const topThreeNews = sortedothers.slice(0, 3);

  return (
    <div className="mt-6">
    <div className="flex flex-col">
      <div className="main flex flex-col justify-center items-center">
        <div className="container pt-4 gap-5 flex flex-col lg:flex-row md:justify-between items-center">
          {/* Image Section */}
          {firstNews && (
              <PropBanner image={firstNews.image_data} />
            )}
          {/* Top Others Section */}
          <div className="lg:w-1/3  w-full bg-slate-50 shadow-md p-4 md:rounded-r-md rounded-b-md">
          <h3 className="text-2xl font-bold text-red-500">Top News</h3>
              {topThreeNews.map((news, index) => (
                <Toplist
                  key={index}
                  image={news.image_data}
                  title={news.title || "No Title Available"}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default OthersBanner;
