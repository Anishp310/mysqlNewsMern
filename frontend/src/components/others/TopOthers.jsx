import React from 'react';
import Banner from '../../assets/tut.jpg';

const TopOthers = () => {
  const newsItems = [
    { id: 1, title: "Title for News 1", image: Banner },
    { id: 2, title: "Title for News 2", image: Banner },
    { id: 3, title: "Title for News 3", image: Banner },
  ];

  return (
    <div className="my-4 w-full px-5 md:px-8">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-red-500">Top News</h3>
        <ul className="space-y-4">
          {newsItems.map((news) => (
            <li key={news.id} className="flex items-center gap-4 border-b pb-2">
              <img
                src={news.image}
                alt="News"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-sm cursor-pointer whitespace-nowrap hover:text-red-600">
                {news.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopOthers;
