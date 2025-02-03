import PropTypes from "prop-types";
import React from "react";
import { FaCircle } from "react-icons/fa";

RecentUploadTitle.propTypes = {
  title: PropTypes.string.isRequired,

  link: PropTypes.string.isRequired,
};

function RecentUploadTitle({ title, link }) {
  return (
    <div className="w-90">
      <hr className="my-5" />

      <a href={link} className="flex gap-2">
        {" "}
        <span>
          <FaCircle className="text-red-800 text-[12px] mt-2" />
        </span>
        <h3 className=" text-md md:text-lg text-start  text-rose-800 font-bold">
          {title}
        </h3>
      </a>
    </div>
  );
}

export default RecentUploadTitle;
