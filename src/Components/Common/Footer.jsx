/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unknown-property */
import React from "react";
import whatsapp from "../../assets/WhatsApp.webp";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
import insta from "../../assets/insta.png";

const Footer = ({ isOpen }) => {
  return (
    <>
      <div className={isOpen ? "content2" : "content"}>
        <footer
          className="overflow-hidden  shadow-gray-500  bg-white py-1 px-6 border-t border-t-[gainsboro] w-auto max-[425px]:px-2"
          style={{ zIndex: 9999 }}
        >
          <div className="flex max-[740px]:block">
            <div class=" flex items-center justify-center shadow-gray-500 text-[#0F766E] mx-auto max-w-screen-xl relative p-4 md:flex md:items-center md:justify-center">
              <span class="text-xl sm:text-center ">
                © 2023{" "}
                <a
                  href="https://aadrikaenterprises.com/"
                  target="_blank"
                  class="hover:underline hover:decoration-indigo-500"
                >
                  Aadrika Enterprises™
                </a>
                . All Rights Reserved.
              </span>
            </div>
            <div className="flex items-center justify-end  ">
              <img
                src={whatsapp}
                alt="whatsapp"
                className="w-[3.3vh] h-[3.3vh] mr-2 mt-[-2px]"
              />
              <img src={twitter} alt="twitter" className="w-6 h-6  mr-2" />
              <img src={facebook} alt="facebook" className="w-6 h-6  mr-2" />
              <img src={insta} alt="insta" className="w-6 h-6  mr-2" />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
