import React, { useState, useEffect, useRef } from 'react';
import schoollogo from './img/Logo.png';
import schoolbottomlogo from './img/Logo_bottom.png';
import s1login from './img/s1.png';
import t1login from './img/t1.png';
import Schoolpic from './img/01.jpg';
import a1 from './img/a1.png';
import picon from './img/picon.png';
import p2icon from './img/p2icon.png';
import p3icon from './img/p3icon.png';
import p4icon from './img/p4.png';
import teacher1 from './img/teacher1.png';
import teacher2 from './img/teacher2.png';
import bg1 from './img/f1.jpg';
import boyf from './img/boyf.png';
import Photo from './img/Photo.png';
import { AiOutlineBars } from 'react-icons/ai';
import Coursels from '../../Components/Common/Imageslider/Carousel';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import moment from 'moment';

export default function index() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const { api_getActiveEventData } = ApiList();
  const marqueeSpeed = 11;
  const marqueeRef = useRef();

  const handleMouseEnter = () => {
    marqueeRef.current.stop();
  };

  const handleMouseLeave = () => {
    marqueeRef.current.start();
  };
  useEffect(() => {
    fetchMasterList();
  }, []);
  const fetchMasterList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getActiveEventData, {}, ApiHeader())
      .then(function (response) {
        console.log('view news master..', response?.data?.data);
        if (response?.data?.status) {
          setreadymadeListData(response?.data?.data);
        } else {
          console.log(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);

        setisLoading(false);
      });
  };
  console.log('hello', readymadeListData);
  return (
    <div className="h-[100vh] overflow-auto">
      <div className="h-auto w-full px-[20vh] pt-[15px] pb-[5px] imagelandingpage max-[1449px]:px-[5vh] max-[1125px]:px-[1vh]  ">
        <div className="block">
          <div className="flex w-full items-center justify-between  max-[1035px]:block ">
            <div className="text-left flex items-start justify-start">
              <img src={schoollogo} alt="school" className="h-[60px]" />
            </div>
            <div className="text-right flex items-end justify-end max-[1449px]:mt-4 max-[739px]:flex-wrap max-[739px]:text-left max-[739px]:justify-start">
              {/* <div className="mx-2 flex max-[739px]:my-2">
                <span className="rounded-l-[15px] bg-[yellow] ">
                  <img
                    src={s1login}
                    alt="logo"
                    className="p-2 w-[40px] h-[40px]"
                  />
                </span>
                <a
                  target="_blank"
                  href="/csms/login"
                  className="bg-[#1e40af] py-2 px-4 rounded-r-[15px] flex items-center justify-center text-white hover:bg-white hover:border hover:border-[#1e40af] hover:text-[#1e40af]"
                >
                  Student Login
                </a>
              </div>
              <div className="mx-2 flex  max-[739px]:my-2">
                <span className="rounded-l-[15px] bg-[yellow]">
                  <img
                    src={t1login}
                    alt="logo"
                    className="p-2 w-[40px] h-[40px]"
                  />
                </span>
                <a
                  target="_blank"
                  href="/csms/emp-admin-auth"
                  className="bg-[#1e40af] py-2 px-4 rounded-r-[15px] flex items-center justify-center text-white hover:bg-white  hover:border hover:border-[#1e40af] hover:text-[#1e40af]"
                >
                  Teacher Login
                </a>
              </div>
              <div className="mx-2 flex   max-[739px]:my-2">
                <span className="rounded-l-[15px] bg-[yellow]">
                  <img
                    src={s1login}
                    alt="logo"
                    className="p-2 w-[40px] h-[40px]"
                  />
                </span>
                <a
                  target="_blank"
                  href="/csms/public-student-registration"
                  className="bg-[#1e40af] py-2 px-4 rounded-r-[15px] flex items-center justify-center text-white hover:bg-white hover:border hover:border-[#1e40af] hover:text-[#1e40af]"
                >
                  New Registration
                </a>
              </div> */}
              <div className="mx-2 flex  max-[739px]:my-2">
                <span className="rounded-l-[15px] bg-[yellow]">
                  <img
                    src={t1login}
                    alt="logo"
                    className="p-2 w-[40px] h-[40px]"
                  />
                </span>
                <a
                  target="_blank"
                  href="/csms/login-school"
                  className="bg-[#1e40af] py-2 px-4 rounded-r-[15px] flex items-center justify-center text-white hover:bg-white hover:border hover:border-[#1e40af] hover:text-[#1e40af]"
                >
                  ERP Login
                </a>
              </div>
            </div>
          </div>
          <div className="w-full my-[3vh] block ">
            <div className="flex items-center justify-between max-[934px]:hidden">
              <div className="bg-yellow-400 w-[20%] h-[40px] flex items-center justify-center text-[2vh] max-[934px]:h-[auto]">
                <marquee direction="left">
                  तमसो मा ज्योतिर्गमय: असतो मा साद गमय, तमसो मा ज्योतिर् गमय,
                  मृत्योर मा अमृतम् गमय
                </marquee>
              </div>
              <div className="bg-gray-700 w-[80%] h-[40px] flex items-center justify-end text-white text-[2vh] max-[934px]:h-[auto] ">
                <div className="flex">
                  <a href="/csms/landing-csms" className="ml-6 ">
                    {' '}
                    <span className="text-white hover:text-[yellow]">
                      Home
                    </span>{' '}
                    |
                  </a>
                  <div className="ml-6 ">
                    {' '}
                    <span className="text-white hover:text-[yellow]">
                      About Us
                    </span>{' '}
                    |
                  </div>
                  <div className="ml-6 ">
                    {' '}
                    <span className="text-white hover:text-[yellow]">
                      Classes
                    </span>{' '}
                    |
                  </div>
                  <div className="ml-6 ">
                    {' '}
                    <span className="text-white hover:text-[yellow]">
                      Activities
                    </span>{' '}
                    |
                  </div>
                  <div className="ml-6 mr-6 ">
                    {' '}
                    <span className="text-white hover:text-[yellow]">
                      Gallery
                    </span>{' '}
                    |
                  </div>
                  {/* <div className="mr-6 ">
                    {' '}
                    <a
                      href="/csms/school-registration"
                      target="_blank"
                      className="text-white hover:text-[yellow]"
                    >
                      School registration
                    </a>{' '}
                  </div> */}
                </div>
              </div>
            </div>
            <div className="min-[934px]:hidden block">
              <div className="flex w-full">
                <div className="w-full bg-yellow-400 flex items-center justify-center">
                  <marquee direction="left">
                    तमसो मा ज्योतिर्गमय: असतो मा साद गमय, तमसो मा ज्योतिर् गमय,
                    मृत्योर मा अमृतम् गमय
                  </marquee>
                </div>
                <div className=" w-full flex items-end justify-end py-1 pr-2 bg-gray-600">
                  <AiOutlineBars
                    size={25}
                    className="text-white"
                    onClick={() => setHide(!hide)}
                  />
                </div>
              </div>
              <div className="flex justify-end items-end">
                {hide ? (
                  <div className="bg-white block text-left w-[25vh]">
                    <div className="ml-6"> Home</div>
                    <div className="ml-6"> About Us</div>
                    <div className="ml-6"> Classes</div>
                    <div className="ml-6"> Activities</div>
                    <div className="ml-6"> Gallery</div>
                    <div className="ml-6"> Contact Us </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="bg-white w-full h-auto p-2 rounded-b-[20px]">
              <Coursels className="rounded-b-[20px] h-full" />
            </div>
            <div className="flex ">
              <div className="flex">
                <div className="text-[2vh] py-2 px-6 text-white bg-[red] font-bold flex items-center justify-center">
                  Notice
                </div>
                <div className="arrow-right "></div>
              </div>
              <div className="flex items-center justify-center ml-5 text-[2vh] max-[600px]:block w-full">
                <marquee direction="left" className="max-[844px]:mt-5">
                  Admission Open for the session 2023 - 24.Please book your
                  admission seat.
                </marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full px-[20vh] py-[15px] bg-white flex max-[987px]:block max-[844px]:px-[2vh]">
        <div className="w-full py-[4vh] px-[2vh] flex items-center justify-center">
          <img src={a1} alt="a1" className="w-[40vh] h-[40vh]" />
        </div>
        <div className="w-full py-[4vh] flex items-start justify-start">
          <div className="block">
            <h1 className="text-[3vh] text-gray-700 text-left max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
              Intro about
            </h1>
            <h2 className="text-[3vh] text-[#f59e0b] font-bold text-left max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
              St. Mary's School
            </h2>
            <div className="  max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
              {' '}
              <div className="w-[6.5vh] bg-[#f59e0b] font-bold h-[5px]"></div>
            </div>
            <div>
              <p className="text-left py-[2vh] text-gray-600 max-[844px]:px-2">
                It is known fact that children do their most important learning
                before the age of six. Up to this age, for kids each morning is
                the dawn of another amazing adventure. Considering this fact,
                our focus is only on developing academic skills, but also
                intellectual, emotional, linguistic, physical, social and moral
                skills that will ensure all-round development of children.
              </p>
              <p className="text-left py-[2vh] text-gray-600">
                We believe that children are active learners, who learn best
                from interacting with nature other children and adults in
                child-centered activities. Global Kids provides caring and
                trustworthy environment in which children can flourish as
                individual.
              </p>
              <div className="my-[2vh] text-left max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
                <button className="flex items-center justify-center px-8 py-1 bg-[#f59e0b] text-white font-bold rounded-[30px] hover:bg-white hover:text-[#f59e0b] border border-[#f59e0b]">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full px-[20vh] py-[10vh]  imagesecondlandingpage block bg-cover h-[42rem] max-[1732px]:h-[auto] max-[1490px]:px-[10vh] max-[1240px]:px-[2vh]">
        <div className="flex  items-center justify-center max-[1732px]:flex-wrap">
          <div className="bg-[#4c1d95] h-[42vh] py-[5vh] mx-10 w-[40vh] relative block rounded-[20px] hover:bg-[#3DCFD3] max-[1732px]:mb-[2vh] max-[844px]:mx-2">
            <div className="flex items-center justify-center absolute mt-[-7vh] w-full ">
              <img src={picon} alt="picon" className="w-[60px] h-[60px] " />
            </div>
            <div className="block w-full mt-3 mx-2">
              <h1 className="text-[yellow] font-bold text-[3vh] flex items-center justify-center">
                Play Group
              </h1>
              <div className="w-full flex items-center justify-center">
                <div className=" bg-[yellow] h-[5px] w-[15%]"></div>
              </div>
              <p className="text-white px-[25%]">
                We are the mont prominent name in Hay Satool in Play Group we
                encourage and support child's self-initiated malvation so that
                they loom while doing or playing.
              </p>
            </div>
          </div>
          <div className="bg-[#1d4ed8] h-[42vh] py-[5vh] mx-10 w-[40vh] relative block rounded-[20px] hover:bg-[#3DCFD3] max-[1732px]:mb-[2vh] max-[844px]:mx-2">
            <div className="flex items-center justify-center absolute mt-[-7vh] w-full ">
              <img src={p3icon} alt="picon" className="w-[60px] h-[60px] " />
            </div>
            <div className="block w-full mt-3 mx-2">
              <h1 className="text-[yellow] font-bold text-[3vh] flex items-center justify-center">
                Nursery
              </h1>
              <div className="w-full flex items-center justify-center">
                <div className=" bg-[yellow] h-[5px] w-[15%]"></div>
              </div>
              <p className="text-white px-[25%]">
                We are the mont prominent name in Hay Satool in Play Group we
                encourage and support child's self-initiated malvation so that
                they loom while doing or playing.
              </p>
            </div>
          </div>
          <div className="bg-[#4c1d95] h-[42vh] py-[5vh] mx-10 w-[40vh] relative block rounded-[20px] hover:bg-[#3DCFD3] max-[1732px]:mt-[2vh] max-[844px]:mx-2">
            <div className="flex items-center justify-center absolute mt-[-7vh] w-full ">
              <img src={p2icon} alt="picon" className="w-[60px] h-[60px] " />
            </div>
            <div className="block w-full mt-3 mx-2">
              <h1 className="text-[yellow] font-bold text-[3vh] flex items-center justify-center">
                LKG/UKG
              </h1>
              <div className="w-full flex items-center justify-center">
                <div className=" bg-[yellow] h-[5px] w-[15%]"></div>
              </div>
              <p className="text-white px-[25%]">
                In St. Mary's school, we encourage children to look for peer
                realationships,play,share, contribute and interact with others.
              </p>
            </div>
          </div>
          <div className="bg-[#1d4ed8] h-[42vh] py-[5vh] mx-10 w-[40vh] relative block rounded-[20px] hover:bg-[#3DCFD3] max-[1732px]:mt-[2vh] max-[844px]:mx-2">
            <div className="flex items-center justify-center absolute mt-[-7vh] w-full ">
              <img src={p4icon} alt="picon" className="w-[60px] h-[60px] " />
            </div>
            <div className="block w-full mt-3 mx-2">
              <h1 className="text-[yellow] font-bold text-[3vh] flex items-center justify-center">
                Classes : I to V
              </h1>
              <div className="w-full flex items-center justify-center">
                <div className=" bg-[yellow] h-[5px] w-[15%]"></div>
              </div>
              <p className="text-white px-[25%]">
                AT ST. More Suhool oners and genter approach for children who
                need an extra your to grow before entering a full day format
                school.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="imagefifthlandingpage w-full px-[20vh] py-[10vh] bg-cover h-auto max-[1732px]:h-[auto] max-[1490px]:px-[10vh] max-[1240px]:px-[2vh]">
        <div className="flex  items-center justify-center max-[1732px]:flex-wrap">
          <div className="w-[70%] border-8 mx-4 rounded-[20px] h-auto border-gray-300 bg-gradient-to-b from-[#71B653] to-[#16a34a]">
            <h1 className="bg-[#71B653] text-[4vh] font-bold mt-[-3vh] ml-[3vh]  w-[25vh] text-white">
              Gallery
            </h1>
            <div className=" w-full px-[8vh] py-6">
              <div className="flex flex-wrap">
                <div className="mx-[10px]">
                  <img
                    src={Photo}
                    alt="pic"
                    className="w-[250px] h-[250px] rounded-none"
                  />
                </div>
                <div className="mx-[10px]">
                  <img
                    src={Photo}
                    alt="pic"
                    className="w-[250px] h-[250px] rounded-none"
                  />
                </div>
                <div className="mx-[10px]">
                  <img
                    src={Photo}
                    alt="pic"
                    className="w-[250px] h-[250px] rounded-none"
                  />
                </div>
              </div>
              <button className="w-full mt-4  h-[5vh] bg-[#b45309] text-white flex items-center justify-center font-bold">
                All Photos
              </button>
            </div>
          </div>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-[30%]  border-8 mx-4 pt-15 rounded-[20px] h-auto border-gray-300 bg-gradient-to-b from-[#71B653] to-[#16a34a]"
          >
            <h1 className="bg-[#71B653] text-[4vh] font-bold mt-[-3vh] ml-[3vh]  w-[25vh] text-white">
              News Event
            </h1>

            <marquee
              ref={marqueeRef}
              direction="up"
              behavior="scroll"
              scrollamount={marqueeSpeed}
              className=" py-[4vh]"
            >
              <div className="h-auto overflow-auto px-[2vh] py-[4vh]">
                {readymadeListData?.map((data) => {
                  return (
                    <>
                      <div className="text-white bg-[#b45309] w-[20vh] font-bold flex items-center justify-center px-[1vh] py-[1vh]">
                        {data?.date}
                      </div>
                      <div className="bg-[#b45309] h-[5px] w-full"></div>
                      <div className="flex justify-end w-full text-white text-[2.5vh]">
                        {data?.event_name.toUpperCase()}
                      </div>
                    </>
                  );
                })}
              </div>
            </marquee>
          </div>
        </div>
      </div>
      {/* <div className=" w-full px-[2vh] block  imageforthlandingpage  bg-cover h-[42rem] max-[1732px]:h-[auto] max-[1490px]:px-[10vh] max-[1240px]:px-[2vh]">
        <h1 className="flex items start justify-center white text-[5vh] font-bold text-white my-[4vh]">
          News/Event
        </h1>

        <div className="newsEvent">
          {readymadeListData?.map((data) => {
            return (
              <div className="flex items-center justify-center  h-[20vh]  mx-10 w-[50vh] my-2 relative   max-[1732px]:mb-[2vh] max-[844px]:mx-2 bg-white">
                <div className="bg-black text-white h-[20vh] flex items-center justify-center">
                  <div className="block px-[2vh] text-[3vh] font-bold text-white ">
                    <h1>{data?.date}</h1>
                  </div>
                </div>

                <div className="ml-2 flex items-center justify-center w-full">
                  <div className="block">
                    <h1 className="font-bold">
                      {data?.event_name.toUpperCase()}
                    </h1>
                    <p className="text-[2vh]  text-gray-500 ">
                      {data?.description}
                    </p>
                    <div className="mt-[4vh]">
                      <button className="bg-white text-[#f59e0b] border border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[white] rounded-[20px] px-[25px] py-[5px]">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      <div className="h-auto w-full px-[20vh] py-[15px] bg-[yellow] flex max-[11960px]:px-[10vh] max-[844px]:px-[2vh]">
        <div className="flex items-center justify-center py-[5vh] w-full max-[1452px]:flex-wrap">
          <div className="bg-white h-[auto]   w-full flex  relative rounded-[15px] mx-[10vh] max-[1452px]:mb-[1vh] max-[844px]:mx-2">
            <div className="w-[30%] bg-[#312e81] py-[5vh] rounded-l-[15px] flex items-center justify-start   max-[900px]:hidden ">
              <div className="flex items-center justify-start  ml-[-8vh] h-full">
                <img src={teacher1} alt="picon" className="h-[15vh] w-[20vh]" />
              </div>
            </div>
            <div className="flex items-start justify-start w-[70%] mt-3 ml-4  max-[900px]:justify-center max-[900px]:items-center max-[900px]:w-full">
              <div className="block text-left ">
                <h1 className="text-[#312e81] text-[3vh] font-bold max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
                  Parent Thoughts
                </h1>
                <div className="max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
                  <div className="bg-[#312e81] h-[5px] w-[6vh]"></div>
                </div>
                <div className="pr-4 max-[900px]:pr-0 max-[844px]:p-2">
                  <p>
                    We would like to thank each and every staff member and the
                    management of Global Kids, Anta for their dedicated effort
                    in nurturing every child, building a strong foundation in
                    their learning and social skills.
                  </p>
                  <br />
                  <h1 className="font-bold">Pankaj Singhdev</h1>
                  <h2> Ranchi (Jharkhand)</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#312e81] h-[auto]   w-full flex  relative rounded-[15px] mx-[10vh]  max-[844px]:mx-2">
            <div className="w-[30%] bg-[#312e81] py-[5vh] rounded-l-[15px] flex items-center justify-start max-[1452px]:mt-[1vh]  max-[900px]:hidden ">
              <div className="flex items-center justify-start  ml-[-8vh] h-full ">
                <img src={teacher2} alt="picon" className="h-[15vh] w-[20vh]" />
              </div>
            </div>
            <div className="flex items-start justify-start w-[70%] mt-3 ml-4 max-[900px]:justify-center max-[900px]:items-center max-[900px]:w-full">
              <div className="block text-left">
                <h1 className="text-[yellow] text-[3vh] font-bold  max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
                  Principal Desk
                </h1>
                <div className="max-[844px]:flex max-[844px]:items-center max-[844px]:justify-center">
                  <div className="bg-[yellow] h-[5px] w-[6vh]"></div>
                </div>
                <div className="text-white pr-4 max-[900px]:pr-0 max-[844px]:p-2">
                  <p>
                    Our mission is to help each child to realize the breath of
                    his; the unlimited power of his mind & imagination and
                    strength of his spirit to ensure his all round development.
                    We want to enable each child to cope with the ever-growing
                    challenges of life through continuous learning.
                  </p>
                  <p>
                    We are poised to fulfill our part of social responsibility
                    with a future focused approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full bg-cover h-[35rem] max-[844px]:h-auto"
        style={{
          backgroundImage: `url(${bg1})`
        }}
      >
        <div className="w-full flex h-auto ">
          <div className="w-[80%] px-[5vh] py-[5vh]">
            <div className="block">
              <div className="flex w-full items-center justify-start ">
                <div className="text-left flex items-start justify-start">
                  <img
                    src={schoolbottomlogo}
                    alt="school_bottom"
                    className="h-[40px] "
                  />
                </div>
              </div>
              <div className="w-full bg-gray-500 h-[5px] mt-4"></div>
              <div className="w-full flex max-[844px]:flex-wrap">
                <div className="w-[70vh] block text-white text-[2vh] text-left mt-4">
                  <h1>Address:</h1>
                  <h2>88Q8+H27, South Office Para, Shyamali Colony</h2>
                  <h3>Doranda, Ranchi, Jharkhand 834002</h3>
                  <br />
                  <h3>Call Us : 0651 241 1515</h3>
                </div>
                <div className="w-[50vh] block text-left mt-4 text-white text-[2vh]">
                  <div className="w-[60%]">
                    <span className="mr-2"> ●</span>
                    <span>Home</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[1vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>About Us</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Classes</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Activities</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Gallery</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[50%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Contact Us</span>
                  </div>
                </div>
                <div className="w-[50vh] block text-left mt-4 text-white text-[2vh]">
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Student Login</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Teacher Login</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>Admission</span>
                    <div className="bg-gray-500 w-auto h-[2px] mt-[2vh]"></div>
                  </div>
                  <div className="w-[60%] mt-[1vh]">
                    <span className="mr-2"> ●</span>
                    <span>ERP Login</span>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="w-[40vh]">
            <div className="flex items-end justify-end w-full ">
              <h1 className="text-white text-[2vh] font-bold">
                BEST EDUCATION FOR YOUR CHILD
              </h1>

              <img
                src={boyf}
                alt="climb"
                className="h-[50vh] max-[844px]:h-[80vh] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
