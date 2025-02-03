import PropTypes from "prop-types";
import React from "react";

DetailHeadline.propTypes = {
  title: PropTypes.string.isRequired,
};
function DetailHeadline({ title }) {
  return (
    <div>
      <h2 className="font-bold text-xl md:text-[50px] my-4 md:my-8 hover:text-teal-800">
        {title}
      </h2>
    </div>
  );
}

export default DetailHeadline;
