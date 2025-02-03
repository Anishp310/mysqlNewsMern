import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div  id="footer">
      <footer className="bg-rose-950 text-white px-6 py-4 shadow-md md:px-20 ">
        <div className="container mx-auto grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl  font-bold mb-4">हाम्रो बारेमा</h2>
            <p className="text-sm text-justify sm:w-80 md:w-full">
              यो वेबसाइट एसबीएन न्युजको आधिकारिक न्युज पोर्टल हो । नेपाली भाषाको
              यो पोर्टलले समाचार, विचार, मनोरञ्जन, खेल, विश्व, सूचना प्रविधि,
              भिडियो तथा समाजिक र आर्थिक जीवनका विभिन्न आयामका समाचार र
              विश्लेषणलाई समेट्छ।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:ms-10   gap-2 sm:gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">उपयोगी लिंकहरु</h3>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    गृहपृष्ठ
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    विज्ञापन
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    विश्व समाचार
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    खेलकुद
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">सम्पर्क गर्नुहोस्</h3>
              <div className="flex  gap-2">
                <a href="#" className="hover:underline">
                  <FaFacebook />
                </a>
                <a href="#" className="hover:underline">
                  <FaTiktok />
                </a>
                <a href="#" className="hover:underline">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:underline">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          <div className=" md:text-start md:ms-16">
            <h3 className="text-lg font-semibold mb-4">सम्पर्क ठेगाना</h3>
            <p className="text-sm mb-2 ">इमेल: contact@sbnnews.com</p>
            <p className="text-sm mb-2">फोन/मोबाइल : 98********</p>
            <p className="text-sm">ठेगाना: पुतलीसडक, काठमाडौं</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} sbnnews. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
