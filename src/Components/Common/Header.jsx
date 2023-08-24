/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { BsEnvelope } from 'react-icons/bs';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlineLock } from 'react-icons/ai';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import {
  RiNotificationLine,
  RiUserSharedLine,
  RiLogoutBoxLine
} from 'react-icons/ri';
import Imgnone from '../../assets/imagenone.png';
import Imglogo from '../../assets/LOGO.png';
import Img23 from '../../assets/image23.png';
import ApiList from '../../Components/ApiList/ApiList';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';

export default function Header() {
  const [id, setId] = useState(JSON.parse(sessionStorage.getItem('loginInfo')));
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_aadrikaUserDataLogout, api_logoutSuperAdmin } = ApiList();
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const token = id?.token;
  const name = id?.name;
  const email = id?.email;
  const userName = id.userName ? id.userName : '';
  const roleId = id.roleId;
  console.log(token, email);
  const confirmationtoogle = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.value) {
        if (roleId == 1) {
          saveMasterForm(token, email);
          sessionStorage.clear();
          navigate('/login');
        } else if (roleId == 2) {
          saveSuperAdminMasterForm(token, userName);
          sessionStorage.clear();
          navigate('/login');
        } else {
          sessionStorage.clear();
          navigate('/login');

          Swal.fire({
            icon: 'success',
            title: 'Logout!',
            text: `Logout Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  };
  const saveMasterForm = (token, email) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      email: email,
      token: token
    };

    url = api_aadrikaUserDataLogout;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          sessionStorage.clear();
          navigate('/login-aadrika');

          Swal.fire({
            icon: 'success',
            title: 'Logout!',
            text: `Logout Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured in submitting form.');

        setisLoading(false);
      });
  };
  const saveSuperAdminMasterForm = (token, userName) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      userName: userName,
      token: token
    };

    url = api_logoutSuperAdmin;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          sessionStorage.clear();
          navigate('/login-school');

          Swal.fire({
            icon: 'success',
            title: 'Logout!',
            text: `Logout Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured in submitting form.');

        setisLoading(false);
      });
  };
  const resettoogle = () => {
    navigate('/password-reset');
  };
  const passwordtoogle = () => {
    navigate('/profile-form');
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmationDropdownopen, setConfirmationDropdownopen] =
    useState(false);
  return (
    <Navbar
      className="overflow-hidden bg-white py-2 px-6 border border-[gainsboro] w-auto max-[425px]:px-2"
      style={{ zIndex: 9999 }}
    >
      <NavbarBrand className="flex items-start justify-start float-left ">
        {/* <input
          type="search"
          placeholder="Search..."
          className="bg-[#F2F4F4] h-10 pl-4 "
          name="hearder_search"
        />
        <button className="bg-indigo-600 w-16 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5 "
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
        </button> */}
        {/* <img src={Imgnone} alt="piclogo" className="w-14 h-14 mr-4 ml-4" /> */}
        {/* <img src={Imglogo} alt="piclogo" className=" mt-4 ml-4" /> */}
        <h1 className="text-[4vh] font-serif text-[#0F766E] font-bold tracking-wider  ">
          Welcome {JSON.parse(sessionStorage.getItem('loginInfo'))?.name} !
        </h1>
      </NavbarBrand>
      {/* <NavbarBrand className="flex mt-[-25px] mb-[-30px] ml-[20%] float-left max-[900px]:hidden max-[1024px]:mb-[2vh] max-[768px]:hidden text-[#6b7280]">
        <h1 className="text-[6vh] font-serif font-bold">School Management System</h1>
      </NavbarBrand> */}
      <Nav className="ml-auto flex items-end justify-end float-right  max-[500px]:float-left max-[500px]:ml-4 ">
        {/* <FiSettings size={25} className="mr-6 mb-2 text-[#4d606e]" />{" "} */}
        {/* <a className="flex relative" href="#contact">
          <BsEnvelope size={25} className="mr-6 mb-2 text-[#4d606e]" />
          <span class="bg-pink-600 text-white  rounded-[50%] absolute text-[12px] px-[4px] mt-[-10px] ml-4">
            1
          </span>{" "}
        </a> */}

        {/* Notification bell */}
        <div className="text-[5.8vh] text-[#5c94d8] cursor-pointer  px-4">
          <FiSettings size={29} className="mr-4 mb-2 text-[#0F766E]" />
          {/* <span className="bg-red-500 text-white rounded-[50%] px-2 absolute -mt-[6vh] ml-[1.6vh]  font-bold text-[2vh] ">
            3
          </span> */}
        </div>
        {/* <a className="flex relative" href="#contact">
          {' '}
          <img src={Img23} className="w-10 h-10 mr-6 mb-2" />{' '}
          <span className="bg-pink-600 text-white  rounded-[50%] absolute text-[12px] px-[4px] mt-[-2px] ml-5">
            3
          </span>
        </a> */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="bg-transparent flex items-center justify-center">
            <a className="flex relative" href="#">
              <img
                src="/assets/schoollogo.jpeg"
                alt="Generic placeholder image"
                className="rounded-full border border-[#0F766E] w-12 h-12"
              />
              <span className="text-green-600 absolute ml-8 mt-6 text-2xl">
                ●
              </span>
            </a>
            {/* <a className="text-1 text-slate-700 ml-2 georgia" href="#contact">
              {JSON.parse(sessionStorage.getItem("loginInfo"))?.email}
            </a> */}
          </DropdownToggle>
          {dropdownOpen ? (
            <DropdownMenu style={{ zIndex: 10000 }}>
              <DropdownItem className="flex items-center justify-center absolute ml-[-23vh]">
                <div
                  className=" relative bg-white w-full border border-[#0F766E] h-auto max-[500px]:h-auto max-[500px]:ml-[2vh] rounded-[8px]"
                  style={{ zIndex: 10000 }}
                >
                  <div className="flex items-center justify-center w-full h-[15vh] max-[500px]:block max-[500px]:h-[25vh]  max-[500px]:ml-[1vh] max-[500px]:mb-[-5px]">
                    <div className="h-[80px] w-[80px] rounded max-[500px]:ml-12">
                      <img
                        src="/assets/schoollogo.jpeg"
                        alt="Generic placeholder image"
                        className="w-auto h-auto px-1 py-1 rounded-[50%]"
                      />
                    </div>
                    <div className="block w-[150px] h-auto max-[425px]:ml-12">
                      <a
                        href="#"
                        className="text-[15px] text-[#0F766E] font-bold gill hover:text-blue-800"
                      >
                        {JSON.parse(sessionStorage.getItem('loginInfo'))?.name}
                      </a>
                      <br></br>
                      <a
                        href="#"
                        className="mr-1 text-1 text-[#6D6A6D] georgia"
                      >
                        {JSON.parse(sessionStorage.getItem('loginInfo'))?.email}
                      </a>
                    </div>
                  </div>
                  <hr className="text-[#6D6A6D]" />
                  <div className="w-full block ">
                    {roleId === 1 ? null : (
                      <div
                        className="w-full flex  text-[#6D6A6D] georgia hover:text-blue-800"
                        onClick={() => navigate('/profile')}
                      >
                        {' '}
                        {/* <span className=" mx-4 my-2 ">
                          <RiUserSharedLine size={18} />
                        </span>
                        <span className=" mx-6 my-2 text-[#0F766E]">
                          Profile{' '}
                        </span> */}
                      </div>
                    )}
                    {/* <div
                      className="w-full flex text-[#6D6A6D] georgia hover:text-blue-800"
                      onClick={resettoogle}
                    >
                      {' '}
                      <span className=" mx-4 my-2">
                        <AiOutlineLock size={18} />
                      </span>
                      <span className=" mx-6 my-2 text-[#0F766E]">
                        Reset Password{' '}
                      </span>
                    </div> */}
                    <div
                      className="w-full flex text-[#6D6A6D] georgia hover:text-blue-800"
                      onClick={() => {
                        confirmationtoogle();
                      }}
                    >
                      {' '}
                      <span className=" mx-4 my-2">
                        <RiLogoutBoxLine size={18} />
                      </span>{' '}
                      <span className=" mx-6 my-2 text-[#0F766E]">Logout</span>
                    </div>
                  </div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          ) : (
            ''
          )}
        </Dropdown>
        {/* {confirmationDropdownopen && (
            <Modal isOpen={confirmationDropdownopen}
            toggle={confirmationtoogle} />
          )} */}
      </Nav>
    </Navbar>
  );
}
