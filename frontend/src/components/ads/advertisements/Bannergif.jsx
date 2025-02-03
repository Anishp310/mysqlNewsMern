import React from "react";
import PropTypes from "prop-types";
Bannergif.propTypes = {
  image: PropTypes.string.isRequired,

  link: PropTypes.string.isRequired,
};
function Bannergif({ image, link }) {
  return (
    <div className="my-4 md:my-8">
      <a href={link}>
        <img src={image} alt="" className="w-[100%]  rounded-lg " />
      </a>
    </div>
  );
}

export default Bannergif;
