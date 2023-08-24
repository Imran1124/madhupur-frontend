import React from 'react';
import schoollogo from './img/schoollogo.jpeg';
import Banner from './img/baneer.png';
import StudentPic from './img/studentpic.png';
import Pencil from './img/pencil.png';
import FirstBackground from './img/4.png';
import SecondBackground from './img/38.png';
import FirstPng from './img/1.png';
import SecondPng from './img/2.png';
import ThirdPng from './img/3.png';
import FourthPng from './img/5.png';
import FifthPng from './img/6.png';
import SixthPng from './img/7.png';
import tweleve from './img/12.jpg';
import Fourteen from './img/14.jpg';
import Sixteen from './img/16.jpg';
import nineteen from './img/19.jpg';
import Twenty from './img/20.jpg';
import Twentyone from './img/21.jpg';
import Twentyfive from './img/25.jpg';
import Bi from './img/bi.png';
import Ci from './img/ci.png';
import Di from './img/di.png';
import Ei from './img/ei.png';
import Ti from './img/ti.png';
import Zi from './img/zi.png';
import whatsapp from '../../assets/WhatsApp.webp';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import insta from '../../assets/insta.png';
import { MdWifiCalling3, MdEmail, MdLocationPin } from 'react-icons/md';
import { BsFillCaretDownFill } from 'react-icons/bs';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full bg-white flex">
          <div className="px-[20vh] w-full flex">
            <img
              src={schoollogo}
              alt="school"
              className="h-[120px] w-[120px]"
            />
            <div className="block h-auto w-full ml-6">
              <div className="flex items-center justify-start mt-6">
                <h1 className="flex text-gray-600 my-2 text-[1.8vh]">
                  <span className="mr-3 mt-1 flex text-gray-600">
                    <MdWifiCalling3 size={20} />
                  </span>
                  6207244672, 8271771202{' '}
                </h1>
                <h1 className="flex text-gray-600 my-2 text-[1.8vh] ml-10">
                  <span className="mr-3 mt-1 flex text-gray-600">
                    <MdEmail size={20} />
                  </span>
                  s.r.internationalschoolpipra@gmail.com{' '}
                </h1>
                <h1 className="flex text-gray-600 my-2 text-[1.8vh] ml-10">
                  <span className="mr-3 mt-1 flex text-gray-600">
                    <MdLocationPin size={20} />
                  </span>
                  Pipra, Ranga Sirsa, Madhupur, Deoghar, Jharkhand{' '}
                </h1>
              </div>
              <div className="bg-gray-600 h-[2px] w-full "></div>
              <div>
                <h1 className="text-gray-600 text-[1.8vh] mt-2 flex justify-start">
                  Admission is Open 2022-2023. Join SR E-learning online classes
                  . Vacancy for teacher Stay home ,{' '}
                  <span className="text-teal-400">
                    stay safe . ---- Show more
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-1 px-4 bg-[#0c4a6e] text-white flex">
          <span className="flex items-center justify-center w-full">
            <span>Home</span>
            <span className="ml-5 flex">
              SR ELearning{' '}
              <span className="mt-1 ml-1">
                <BsFillCaretDownFill size={18} />
              </span>
            </span>
            <span className="ml-5">Gallery & Events</span>
            <span className="ml-5">Blogs</span>
            <span className="ml-5">About Us</span>
            <span className="ml-5">Contact Us</span>
          </span>
          <span className="flex items-center justify-center w-full">
            {/* <span className="bg-[#0284c7] py-1 px-6 rounded-[20px] ml-10">
              Student Login
            </span>
            <span className="bg-[#0284c7] py-1 px-6 rounded-[20px] ml-5">
              Teacher Login
            </span> */}
            <Link
              to="/login-school"
              className="bg-red-400 py-1 px-6 rounded-[20px] ml-5"
            >
              ERP Login
            </Link>
          </span>
        </div>
        <div className="w-full">
          <img src={Banner} alt="bannner" className="w-full h-[70vh]" />
        </div>
        <div className="h-[65vh] w-full flex  justify-center">
          <div className="w-full flex items-center justify-end mt-[10vh]">
            <img
              src={StudentPic}
              alt="studentPic"
              className="h-[60vh] w-[80vh]"
            />
          </div>
          <div className="w-full flex items-start justify-start mt-[10vh]">
            <div className="block w-full pr-20 ">
              <h1 className="text-red-500 text-[3.5vh] text-left">
                Welcome To
              </h1>
              <h2 className="text-[4vh] font-semibold text-[#f59e0b] text-left">
                SR INTERNATIONAL SCHOOl
              </h2>
              <hr className="border-2 border-dashed border-gray-300 w-[70%] mt-2 " />
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                We here at SR international school which is away from the hustle
                and bustle of the city, in complete picturesque environment,
                provide a clean and conducive atmosphere for children to learn.
                The infrastructure with all modern amenities, offers the
                students a very comfortable environment to grow and learn with
                cultural activity and yoga training. We are the best English
                medium school in Madhupur and Deoghar.
              </p>
              <hr className="border-2 border-dashed border-gray-300 w-[70%] mt-[8vh] " />
              <p className="text-[2.2vh] mt-4 text-gray-500 text-left w-[70%] pr-4">
                Education is the manifestation of perfection already in man.
              </p>

              <p className="text-gray-500 mt-[3vh] text[1.8vh] text-left flex items-center justify-start">
                <span className="ml-6">~ Swami Vivekananda</span>{' '}
                <img src={Pencil} alt="pencil" className="w-[100px] h-[60px]" />{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <img
            src={FirstBackground}
            alt="firstbackground"
            className="h-[10vh] w-full"
          />
          <div className="bg-[#F3A624] w-full h-[auto]">
            <div className="flex items-center justify-center">
              <div className="block w-full text-white mt-4">
                <h1 className="text-white text-[6vh] flex justify-center font-semibold">
                  School Facilities
                </h1>
                <hr className="border-2 border-dashed border-white flex justify-center mx-[30%] mt-2" />
                <h1 className="text-white text-[2.8vh] flex justify-center mt-4">
                  Everyday Care for your Children
                </h1>

                <div className="w-full flex px-[2%] my-4 flex-wrap">
                  <div className="flex w-full mx-6 flex-wrap">
                    <span className="block w-[25vh] mx-6">
                      {' '}
                      <img
                        src={FirstPng}
                        alt="firstpng"
                        className="rounded-[10px] bg-white h-[25vh]"
                      />{' '}
                      <span>
                        <h1 className="w-auto text-white text-[2.4vh] font-semibold mt-4 flex-wrap">
                          Clean Playgrounds
                        </h1>
                      </span>
                    </span>
                    <span className="block w-[25vh] mx-6">
                      {' '}
                      <img
                        src={SecondPng}
                        alt="firstpng"
                        className="rounded-[10px] bg-white h-[25vh]"
                      />{' '}
                      <span>
                        <h1 className="w-auto text-white text-[2.4vh] font-semibold mt-4 flex-wrap">
                          Private School with Bus Tracking
                        </h1>
                      </span>
                    </span>
                    <span className="block w-[25vh] mx-6">
                      {' '}
                      <img
                        src={ThirdPng}
                        alt="firstpng"
                        className="rounded-[10px] bg-white h-[25vh]"
                      />{' '}
                      <span>
                        <h1 className="w-auto text-white text-[2.4vh] font-semibold mt-4 flex-wrap">
                          CCTV Cameras
                        </h1>
                      </span>
                    </span>
                    <span className="block w-[25vh] mx-6">
                      {' '}
                      <img
                        src={FourthPng}
                        alt="firstpng"
                        className="rounded-[10px] bg-white h-[25vh]"
                      />{' '}
                      <span>
                        <h1 className="w-auto text-white text-[2.4vh] font-semibold mt-4 flex-wrap">
                          Smart Classes
                        </h1>
                      </span>
                    </span>
                    <span className="block w-[25vh] mx-6">
                      {' '}
                      <img
                        src={FifthPng}
                        alt="firstpng"
                        className="rounded-[10px] bg-white h-[25vh]"
                      />{' '}
                      <span>
                        <h1 className="w-auto text-white text-[2.4vh] font-semibold mt-4 flex-wrap">
                          Hostel Facilities
                        </h1>
                      </span>
                    </span>
                    <span className="block w-[25vh] ml-6">
                      {' '}
                      <img
                        src={SixthPng}
                        alt="firstpng"
                        className="rounded-[10px] bg-white h-[25vh]"
                      />{' '}
                      <span>
                        <h1 className="w-auto text-white text-[2.4vh] font-semibold mt-4 flex-wrap">
                          Yoga Training
                        </h1>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={SecondBackground}
            alt="firstbackground"
            className="h-[10vh] w-full"
          />
        </div>
        <div className="w-full bg-[#d1fae5] h-auto flex items-center justify-center px-[15vh] py-[5vh] flex-wrap">
          <div className="w-[40vh] h-[45vh]  mx-10 rounded-[30px] bg-white">
            <img
              src={tweleve}
              alt="tweleve"
              className="rounded-t-[30px] p-4 w-auto"
            />
            <span className="block">
              <h1 className="text-[#f59e0b] font-bold text-[3vh] flex items-center justify-center">
                Learning{' '}
              </h1>
              <h1 className="text-[#f59e0b] font-bold text-[3vh] flex items-center justify-center">
                Environment
              </h1>
              <p className="text-[2vh] text-gray-500 w-full items-center justify-center text-left px-8">
                The state of the art infrastructure, in the ever prevailing
                functional discipline imparts mental peace for children's growth
              </p>
            </span>
          </div>
          <div className="w-[40vh] h-[45vh]  mx-10 rounded-[30px] bg-white">
            <img
              src={Fourteen}
              alt="tweleve"
              className="rounded-t-[30px] p-4 w-auto"
            />
            <span className="block">
              <h1 className="text-[#f59e0b] font-bold text-[3vh] flex items-center justify-center">
                Proffessional
              </h1>
              <h1 className="text-[#f59e0b] font-bold text-[3vh] flex items-center justify-center">
                Teacher
              </h1>
              <p className="text-[2vh] text-gray-500 w-full items-center justify-center text-left px-8">
                Our students learn from the experienced, dedicated and
                tremendously talented faculty
              </p>
            </span>
          </div>
          <div className="w-[40vh] h-[45vh]  mx-10 rounded-[30px] bg-white">
            <img
              src={Sixteen}
              alt="tweleve"
              className="rounded-t-[30px] p-4 w-auto"
            />
            <span className="block">
              <h1 className="text-[#f59e0b] font-bold text-[3vh] flex items-center justify-center">
                Programs For{' '}
              </h1>
              <h1 className="text-[#f59e0b] font-bold text-[3vh] flex items-center justify-center">
                Everyone
              </h1>
              <p className="text-[2vh] text-gray-500 w-full items-center justify-center text-left px-8">
                There is a wide range of extra- curricular activities on daily
                basis. Music, drama, sports, art and various other club
                activities
              </p>
            </span>
          </div>
        </div>
        <div className="w-full  bg-[#f8fafc] h-auto">
          <div className="w-full flex items-center justify-center pt-10">
            <span className="block w-full px-[15vh]">
              <h1 className="text-[#f59e0b] text-[3vh] font-bold">
                CLASSES FROM READY TO FLY
              </h1>
              <hr className="border-2 border-dashed border-gray-400 w-full my-2" />
            </span>
          </div>
          <div className="flex items-center justify-center flex-wrap  mt-[5vh] mfimage">
            <div className="block">
              <div className="flex items-center justify-center">
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#dcfce7] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    Junior Scholar
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 2+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#fef2f2] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    Ready To Fly (RTF)
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 4+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#dcfce7] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    UKG
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 5+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#fef2f2] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 1
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 6+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#dcfce7] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 2
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 7+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#fef2f2] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 3
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 8+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img src={Di} alt="di" className="h-[83vh] w-[30vh]" />
            </div>
            <div className="block">
              <div className="flex items-center justify-center">
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#fef2f2] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 4
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 9+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#dcfce7] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 5
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 10+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#dcfce7] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 6
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 11+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#fef2f2] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 7
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 12+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <div className="rounded-r-[30px] w-[30vh] h-[26vh] bg-[#dcfce7] mx-6 mb-6 shadow-lg border border-gray-400">
                  <h1 className="w-full flex  justify-center text-red-700 text-[2.8vh] font-bold my-4">
                    STD 8
                  </h1>
                  <h1>Age Group :</h1>
                  <h1>between 13+ Year</h1>
                  <hr className="border border-dashed border-gray-500 mx-[10vh] my-4" />
                  <h1>Starts 7th April, 2022</h1>
                  <button className="px-[6vh] py-2 text-white bg-indigo-500 my-2 rounded-[50px]">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#68B9D8] h-auto">
            <div className="w-full flex items-center justify-center pt-10">
              <span className="block w-full px-[15vh]">
                <h1 className="text-white text-[4vh] font-bold">
                  TOP MANAGEMENT
                </h1>
                <hr className="border-2 border-dashed border-white w-full my-2" />
              </span>
            </div>
            <div className="flex px-[20vh] pb-10">
              <div className="block mt-4 mx-[10vh]">
                <img
                  src={nineteen}
                  alt=""
                  className="rounded-[50%] border-4 border-white w-[30vh] h-[30vh]"
                />
                <h1 className="text-[4vh] text-white flex items-center justify-center font-bold">
                  Abishek Singh
                </h1>
                <h2 className="flex items-center justify-center text-white text-[3vh]">
                  Chairman
                </h2>
              </div>
              <div className="block mt-4 mx-[10vh]">
                <img
                  src={Twenty}
                  alt=""
                  className="rounded-[50%] border-4 border-white w-[30vh] h-[30vh]"
                />
                <h1 className="text-[4vh] text-white flex items-center justify-center font-bold">
                  Anup Kumar Singh
                </h1>
                <h2 className="flex items-center justify-center text-white text-[3vh]">
                  Vice Chairman
                </h2>
              </div>
              <div className="block mt-4 mx-[10vh]">
                <img
                  src={Twentyone}
                  alt=""
                  className="rounded-[50%] border-4 border-white w-[30vh] h-[30vh]"
                />
                <h1 className="text-[4vh] text-white flex items-center justify-center font-bold">
                  Abhilasha Rani
                </h1>
                <h2 className="flex items-center justify-center text-white text-[3vh]">
                  Director
                </h2>
              </div>
            </div>
          </div>
          {/* <div className='w-full'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.915609199743!2d85.35708487610678!3d23.355071778942165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e22eeaaaaaab%3A0x607eb447fcdddced!2sAadrika%20Enterprises!5e0!3m2!1sen!2sin!4v1691149894751!5m2!1sen!2sin" style={{height: "1200", width:"100%",border:"0"}} ></iframe>
                </div> */}
        </div>
        <div className="h-[65vh] w-full flex px-[15vh] justify-center">
          <div className="w-full flex items-start justify-center mt-[10vh]">
            <div className="block w-full pr-20 ">
              <h1 className=" text-[3.5vh] text-left">
                We Give Our Children a
              </h1>
              <h2 className="text-[4vh] font-semibold text-red-500 text-left">
                Learning environment contribute
              </h2>
              <h2 className="text-[4vh] font-semibold text-red-500 text-left">
                to their Success
              </h2>
              <hr className="border-4  border-red-500 w-[30%] mt-2 " />
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>Top Primary school in Deoghar.
              </p>
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>We Provide Quality Education.
              </p>
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>Healthy Foof for Children.
              </p>
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>Smaller Classes and individual attention .
              </p>
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>Friendly and positive learning environment.
              </p>
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>Character Build-up and comprehensive Reporting.
              </p>
              <p className="mt-4 text-left text-gray-600 w-[70%] text-[1.9vh]">
                {' '}
                <span>●</span>Arrangemnet of Summer camp and special event..
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-start mt-[5vh]">
            <img src={Ei} alt="studentPic" className="h-[50vh] w-[80vh]" />
          </div>
        </div>
        <div className="w-full h-[40vh]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3638.6487980497063!2d86.73642957612822!3d24.219076778353593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f131c23e270561%3A0x4842a281c5354468!2sS.R.%20INTERNATIONAL%20SCHOOL!5e0!3m2!1sen!2sin!4v1691151700529!5m2!1sen!2sin"
            style={{ width: '100%', height: '100%' }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="bg-[#358E9D] h-[60vh] w-full px-[15vh]">
          <div className="flex items-center justify-center w-full pt-10">
            <div className="block w-full">
              <p className="text-white text-[2.5vh] px-4 my-6 text-left">
                SR international school believes in making leaders. Every
                student has some talent in him/her and we nurture them to become
                a good human being and lead successful life
              </p>
              <h1 className="text-white flex text-[2.1vh] mt-[5vh]">
                <span className="mr-6">
                  <MdWifiCalling3 size={30} className="text-white" />
                </span>
                6207244672, 8271771202
              </h1>
              <h1 className="text-white flex text-[2.1vh] mt-4">
                <span className="mr-6">
                  <MdEmail size={30} className="text-white" />
                </span>
                s.r.internationalschoolpipra@gmail.com
              </h1>
              <h1 className="text-white flex text-[2.1vh] mt-4">
                <span className="mr-6">
                  <MdLocationPin size={30} className="text-white" />
                </span>
                Pipra, Ranga Sirsa, Madhupur, Deoghar, Jharkhand
              </h1>
            </div>
            <div className="block w-full">
              <img src={Zi} alt="" />
            </div>
            <div className=" w-full">
              <div className="flex item-center justify-center ">
                <IoIosArrowDropleftCircle
                  size={30}
                  className="flex item-center justify-center mr-2 h-[40vh]"
                />{' '}
                <div className="rounded-[30px] bg-[#3f3f46] w-[40vh] h-[40vh]">
                  <img
                    src={Twentyfive}
                    alt=""
                    className="px-5 py-10 h-[38vh]"
                  />
                </div>
                <IoIosArrowDroprightCircle
                  size={30}
                  className="flex item-center justify-center ml-2  h-[40vh]"
                />
              </div>
            </div>
          </div>
          <div className="flex item-center justify-center mt-5">
            <img src={Ti} alt="ti" />
          </div>
        </div>
        <div className="w-full py-1 px-4 bg-[#0c4a6e] text-white flex">
          <span className="flex items-center justify-center w-full  text-[2vh]">
            <span>Copyright © 2019 All Rights Reserved.</span>
          </span>
          <span className="flex items-center justify-center w-full  text-[2vh]">
            <img src={twitter} alt="twitter" className="w-6 h-6  mr-2" />
            <img src={facebook} alt="facebook" className="w-6 h-6  mr-2" />
            <img src={insta} alt="insta" className="w-6 h-6  mr-2" />
          </span>
          <span className="flex items-center justify-center w-full text-[2vh]">
            <span className="mr-2">Terms & Conditions</span> |
            <span className="mx-2">Privacy Security Policy</span> |
            <span className="ml-2">Sitemap</span>
          </span>
        </div>
      </div>
    </div>
  );
}
