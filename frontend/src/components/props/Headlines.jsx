import React from "react";
import { FaClock } from "react-icons/fa";
import PropTypes from "prop-types";
Headlines.propTypes = {
  title: PropTypes.string.isRequired, // title is required and must be a string
  time: PropTypes.string.isRequired, // time is required and must be a string
  link: PropTypes.string.isRequired, // link is required and must be a string
};
function Headlines({ title, time, link }) {
  return (
    <div className="my-4 md:my-8">
      <a href={link}>
        <h1 className="text-xl md:text-[50px] font-bold text-center hover:text-teal-800">
          {title}
        </h1>
      </a>
      <div className="flex gap-2 justify-center">
        <FaClock className="mt-[2px] md:mt-2  text-teal-600" />
        <p className="text-[12px] md:text-lg">{time}</p>
      </div>
      <hr className="text-slate-300 my-5 md:my-10" />
    </div>
  );
}

export default Headlines;
