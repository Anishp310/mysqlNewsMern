import PropTypes from "prop-types";
import React from "react";

Squareads.propTypes = {
  image: PropTypes.string.isRequired, // title is required and must be a string
  // time is required and must be a string
  link: PropTypes.string.isRequired, // link is required and must be a string
};
function Squareads({ image, link }) {
  return (
    <div>
      <div>
        <a href={link}>
          {" "}
          <img className="w-91 h-72" src={image} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Squareads;
