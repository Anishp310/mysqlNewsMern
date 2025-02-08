import React, { useEffect, useState } from 'react';
import img from "../../assets/deepseek.jpg";
import img1 from "../../assets/ime.gif";
import img2 from "../../assets/ad1.gif";
import img3 from "../../assets/evcar.jpg";
import Bannergif from '../ads/advertisements/Bannergif';
import DetailHeadline from '../detailed/DetailHeadline';
import Squareads from '../ads/advertisements/Squareads';
import RecentUploadAside from '../detailed/RecentUploadAside';
import SummaryApi from '../../API/Api';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function NationalDetail() {
  const { slug } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    if (slug) {
      axios.get(`http://localhost:8080/getNational/${slug}`)
        .then(response => {
          setNewsDetail(response.data);
        })
        .catch(error => console.error('Error fetching national news:', error));
    }
  }, [slug]);
console.log(newsDetail)
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <Bannergif
        link=""
        image="https://npcdn.ratopati.com/media/promo/1140-x-90_7hjVvvk2Jr.gif"
      />

      <DetailHeadline title={newsDetail?.title } />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-3/4">
          <img
            className="my-4 w-full rounded-lg shadow-md"
            src={newsDetail?.image_data || img}
            alt={newsDetail?.title || "Deepseek"}
          />

          <p className="text-lg font-medium text-justify leading-relaxed">
            {newsDetail?.description ||
              `बेइजिङ । एआईको दुनियाँमा अमेरिकी कम्पनीहरूको दबदबा रहँदै आएको छ।
              तर चीनको एआई स्टार्टअप डीपसिकले यसलाई तोड्ने देखिएको छ।`}
          </p>

          <Bannergif
            link=""
            image="https://npcdn.ratopati.com/media/promo/classic-tech-desktop_0paFHrfwlV.gif"
          />

          <p className="text-lg font-medium text-justify leading-relaxed mt-4">
            {newsDetail?.additionalInfo ||
              `डीपसिक बजारमा छिर्ने बित्तिकै ठुला अमेरिकी कम्पनीका मालिक र अधिकारीहरूको चिन्तित बनेका छन्।`}
          </p>

          <Bannergif
            link=""
            image="https://npcdn.ratopati.com/media/promo/rbb-gif_57T7yDVxqc.gif"
          />
        </div>

        {/* Sidebar for large screens */}
        <aside className="w-full xl:w-1/4">
          <div className="hidden xl:block space-y-4">
            <Squareads image={img1} link="" />
            <Squareads image={img2} link="" />
            <Squareads image={img3} link="" />
          </div>

          <RecentUploadAside />

          <div className="hidden xl:block">
            <Squareads image={img1} link="" />
          </div>
        </aside>
      </div>

      <Bannergif
        link=""
        image="https://npcdn.ratopati.com/media/promo/855x90-_xIVwtSB01m.gif"
      />
    </div>
  );
}

export default NationalDetail;
