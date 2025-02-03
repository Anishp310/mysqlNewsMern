import React from "react";
import Title from "../props/Title";
import RecentUploadTitle from "./RecentUploadTitle";
import PropTypes from "prop-types";
RecentUploadAside.propTypes = {
  title: PropTypes.string.isRequired,
};
function RecentUploadAside() {
  return (
    <div>
      <div>
        <h2 className="text-lg mt-4 xl:text-center md:text-3xl text-rose-800 font-bold">
          भर्खरै
        </h2>
      </div>
      <div>
        <RecentUploadTitle
          title="राष्ट्रिय सभा अध्यक्ष दाहाल र इजरायली राजदूतबिच शिष्टाचार भेट"
          link=""
        />
        <RecentUploadTitle
          title="ललितपुरमा दुईवटा घर भाडामा लिएर अनलाइन सट्टेबाजी, ३ अर्ब ४ करोड कारोबार"
          link=""
        />
        <RecentUploadTitle
          title="प्रहरीका ४ ब्युरोको अधिकार सशस्त्रलाई दिन प्रस्ताव"
          link=""
        />
        <RecentUploadTitle
          title="८ दलीय मोर्चाको कार्यदलमा नाउपाले राख्यो आफ्नो एजेन्डा"
          link=""
        />
      </div>
    </div>
  );
}

export default RecentUploadAside;
