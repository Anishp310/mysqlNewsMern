import React from "react";
import PropTypes from "prop-types";
Title.propTypes = {
  title: PropTypes.string.isRequired,
};
function Title({ title }) {
  return (
    <div className="my-4 md:my-8">
      <h2 className="text-lg md:text-3xl text-center text-rose-800 font-bold">
        {title}
      </h2>
    </div>
  );
}

export default Title;
