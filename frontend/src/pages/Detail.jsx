import React from "react";
import Bannergif from "../components/ads/advertisements/Bannergif";
import img from "../assets/deepseek.jpg";
import img1 from "../assets/ime.gif";
import img2 from "../assets/ad1.gif";
import img3 from "../assets/evcar.jpg";

import DetailHeadline from "../components/detailed/DetailHeadline";
import PropTypes from "prop-types";
import Squareads from "../components/ads/advertisements/Squareads";
import RecentUploadAside from "../components/detailed/RecentUploadAside";

Detail.propTypes = {
  title: PropTypes.string.isRequired,
};

function Detail() {
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <Bannergif
        link=""
        image="https://npcdn.ratopati.com/media/promo/1140-x-90_7hjVvvk2Jr.gif"
      />

      <DetailHeadline title="को हुन् डिपसिक बनाउने लियाङ वेनफेङ ?" />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-3/4">
          <img
            className="my-4 w-full rounded-lg shadow-md"
            src={img}
            alt="Deepseek"
          />

          <p className="text-lg font-medium text-justify leading-relaxed">
            बेइजिङ । एआईको दुनियाँमा अमेरिकी कम्पनीहरूको दबदबा रहँदै आएको छ । तर
            चीनको एआई स्टार्टअप डीपसिकले यसलाई तोड्ने देखिएको छ । लन्च भएको केही
            दिनमै कम्पनीले एआईको क्षेत्रमा हलचल मच्चाएको छ । बेइजिङ । एआईको
            दुनियाँमा अमेरिकी कम्पनीहरूको दबदबा रहँदै आएको छ । तर चीनको एआई
            स्टार्टअप डीपसिकले यसलाई तोड्ने देखिएको छ ।
          </p>

          {/* Banner Ad */}
          <Bannergif
            link=""
            image="https://npcdn.ratopati.com/media/promo/classic-tech-desktop_0paFHrfwlV.gif"
          />

          <p className="text-lg font-medium text-justify leading-relaxed mt-4">
            डीपसिक बजारमा छिर्ने बित्तिकै ठुला अमेरिकी कम्पनीका मालिक र
            अधिकारीहरूको चिन्तित बनेका छन् । एनभिडिया र माइक्रोसफ्ट जस्ता
            कम्पनीहरूको शेयर मूल्यमा पहिरो जानु यसको एउटा संकेत हो ।डीपसिक
            बजारमा छिर्ने बित्तिकै ठुला अमेरिकी कम्पनीका मालिक र अधिकारीहरूको
            चिन्तित बनेका छन् । एनभिडिया र माइक्रोसफ्ट जस्ता कम्पनीहरूको शेयर
            मूल्यमा पहिरो जानु यसको एउटा संकेत हो । लन्च भएको केही दिनमै
            कम्पनीले एआईको क्षेत्रमा हलचल मच्चाएको छ । बेइजिङ । एआईको दुनियाँमा
            अमेरिकी कम्पनीहरूको दबदबा रहँदै आएको छ । तर चीनको एआई स्टार्टअप
            डीपसिकले यसलाई तोड्ने देखिएको छ । लन्च भएको केही दिनमै कम्पनीले
            एआईको क्षेत्रमा हलचल मच्चाएको छ । बेइजिङ । एआईको दुनियाँमा अमेरिकी
            कम्पनीहरूको दबदबा रहँदै आएको छ । तर चीनको एआई स्टार्टअप डीपसिकले
            यसलाई तोड्ने देखिएको छ । लन्च भएको केही दिनमै कम्पनीले एआईको
            क्षेत्रमा हलचल मच्चाएको छ ।
          </p>

          {/* Another Banner Ad */}
          <Bannergif
            link=""
            image="https://npcdn.ratopati.com/media/promo/rbb-gif_57T7yDVxqc.gif"
          />

          <p className="text-lg font-medium text-justify leading-relaxed mt-4">
            २०२४ को को मेमा डीपसिकले भीटू र अन्त्यमा भीथ्री मोडेल लन्च गर्याे ।
            त्यसपछि कम्पनीले आर वन ल्यायो । कम्पनीले यो मोडल बनाउन जम्मा ५६ लाख
            डलर मात्रै खर्च गरेको खबरले सनसनी मच्चायो । २०२४ को को मेमा डीपसिकले
            भीटू र अन्त्यमा भीथ्री मोडेल लन्च गर्याे । त्यसपछि कम्पनीले आर वन
            ल्यायो । कम्पनीले यो मोडल बनाउन जम्मा ५६ लाख डलर मात्रै खर्च गरेको
            खबरले सनसनी मच्चायो । २०२४ को को मेमा डीपसिकले भीटू र अन्त्यमा
            भीथ्री मोडेल लन्च गर्याे । त्यसपछि कम्पनीले आर वन ल्यायो । कम्पनीले
            यो मोडल बनाउन जम्मा ५६ लाख डलर मात्रै खर्च गरेको खबरले सनसनी मच्चायो
            । २०२४ को को मेमा डीपसिकले भीटू र अन्त्यमा भीथ्री मोडेल लन्च गर्याे
            । त्यसपछि कम्पनीले आर वन ल्यायो । कम्पनीले यो मोडल बनाउन जम्मा ५६
            लाख डलर मात्रै खर्च गरेको खबरले सनसनी मच्चायो ।२०२४ को को मेमा
            डीपसिकले भीटू र अन्त्यमा भीथ्री मोडेल लन्च गर्याे । त्यसपछि कम्पनीले
            आर वन ल्यायो । कम्पनीले यो मोडल बनाउन जम्मा ५६ लाख डलर मात्रै खर्च
            गरेको खबरले सनसनी मच्चायो । २०२४ को को मेमा डीपसिकले भीटू र अन्त्यमा
            भीथ्री मोडेल लन्च गर्याे । त्यसपछि कम्पनीले आर वन ल्यायो । कम्पनीले
            यो मोडल बनाउन जम्मा ५६ लाख डलर मात्रै खर्च गरेको खबरले सनसनी मच्चायो
            । २०२४ को को मेमा डीपसिकले भीटू र अन्त्यमा भीथ्री मोडेल लन्च गर्याे
            । त्यसपछि कम्पनीले आर वन ल्यायो । कम्पनीले यो मोडल बनाउन जम्मा ५६
            लाख डलर मात्रै खर्च गरेको खबरले सनसनी मच्चायो । २०२४ को को मेमा
            डीपसिकले भीटू र अन्त्यमा भीथ्री मोडेल लन्च गर्याे । त्यसपछि कम्पनीले
            आर वन ल्यायो । कम्पनीले यो मोडल बनाउन जम्मा ५६ लाख डलर मात्रै खर्च
            गरेको खबरले सनसनी मच्चायो ।
          </p>

          {/* Final Banner Ad */}
          <Bannergif
            link=""
            image="https://npcdn.ratopati.com/media/promo/ratopati_1140x95-(1)_XeskOaSzoa.gif"
          />
        </div>

        {/* Sidebar (Appears only on large screens) */}
        <aside className="w-full xl:w-1/4">
          <div className="hidden xl:block space-y-4">
            <Squareads image={img1} link="" />
            <Squareads image={img2} link="" />
            <Squareads image={img3} link="" />
          </div>

          {/* Recent Uploads */}
          <RecentUploadAside />

          {/* Extra Ad */}
          <div className="hidden xl:block">
            <Squareads image={img1} link="" />
          </div>
        </aside>
      </div>

      {/* Bottom Banner */}
      <Bannergif
        link=""
        image="https://npcdn.ratopati.com/media/promo/855x90-_xIVwtSB01m.gif"
      />
    </div>
  );
}

export default Detail;
