import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

export default function Hero() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="mt-[70px]">
          <div
            className="w-full bg-inherit h-[42rem]
            "
            style={{
              backgroundImage: 'url("/images/StMarysBanner_01.jpg")'
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                {/* <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                  E-SOULA <span className="text-blue-400">School</span>{' '}
                  Management ERP
                </h1> */}
                <button
                  onClick={() => navigate('/public-student-registration')}
                  className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  Student Registration
                </button>
                {'     '}
                <button
                  onClick={() => navigate('/school-registration')}
                  className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-yellow-600 rounded-md lg:w-auto hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500"
                >
                  School Registration
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[70px]">
          <div
            className="w-full  bg-inherit h-[42rem] "
            style={{
              backgroundImage: 'url("/images/StMaryBanner_02.jpg")'
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                  E-SOULA <span className="text-blue-400">School</span>{' '}
                  Management ERP
                </h1>
                <button
                  onClick={() => navigate('/public-student-registration')}
                  className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  Student Registration
                </button>
                {'     '}
                <button
                  onClick={() => navigate('/school-registration')}
                  className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-yellow-600 rounded-md lg:w-auto hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500"
                >
                  School Registration
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[70px]">
          <div
            className="w-full bg-inherit h-[42rem] "
            style={{
              backgroundImage: 'url("/images/StMaryBanner_03.jpg")'
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                  E-SOULA <span className="text-blue-400">School</span>{' '}
                  Management ERP
                </h1>
                <button
                  onClick={() => navigate('/public-student-registration')}
                  className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  Student Registration
                </button>
                {'     '}
                <button
                  onClick={() => navigate('/school-registration')}
                  className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-yellow-600 rounded-md lg:w-auto hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500"
                >
                  School Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
