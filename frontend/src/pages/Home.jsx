import React from "react";
import banner1 from "../assets/innhotel.gif";
import banner2 from "../assets/leonmotors.gif";
import banner3 from "../assets/agnigroup.gif";
import img from "../assets/ime.gif";
import Bannergif from "../components/ads/advertisements/Bannergif";

import Headlines from "../components/props/Headlines";
import Latestnews from "../components/homepage/Latestnews";
import Title from "../components/props/Title";
import OthersNews from "../components/homepage/OthersNews";
import Squareads from "../components/ads/advertisements/Squareads";

const Home = () => {
  return (
    <div className="px-5 md:px-20 ">
      <Bannergif image={banner1} link="/" />
      <div>
        <Headlines
          title="सामाजिक सञ्जाल नियमन विधेयक : कुन कसुरमा कस्तो सजाय प्रस्ताव ?"
          time="10:00 AM"
          link="/"
        />
        <Headlines
          title="यू-१९ विश्‍वकपमा डेब्यूसँगै नेपाली महिला क्रिकेटमा नयाँ अध्याय"
          time="11:10 AM"
          link="/"
        />
      </div>
      <Bannergif image={banner2} link="/" />
      <Title title="प्रमुख समाचार" />
      <Latestnews />
      <Bannergif image={banner3} link="/" />

      <Title title="छुटाउनुभयो कि ?" />
      <OthersNews />
      <Bannergif image={banner3} link="/" />
      <Bannergif image={banner2} link="/" />
      <Squareads image={img} link="/" />
      <Bannergif image={banner2} link="/" />
    </div>
  );
};

export default Home;
