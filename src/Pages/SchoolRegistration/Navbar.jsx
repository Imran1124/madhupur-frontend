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
// // import {isLogedout} from '../components/Headers';
// import { logoutUser } from "../store/actions";
import { AiOutlineLock } from 'react-icons/ai';
import {
  RiNotificationLine,
  RiUserSharedLine,
  RiLogoutBoxLine
} from 'react-icons/ri';
// import { useDispatch, useSelector } from "react-redux";
import Imgnone from '../../assets/imagenone.png';
import Imglogo from '../../assets/LOGO.png';
import Img23 from '../../assets/image23.png';
import { BiArrowBack } from 'react-icons/bi';

export default function Header({ isModelOpen }) {
  // const dispatch = useDispatch();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    setId(JSON.parse(sessionStorage.getItem('loginInfo')));
  }, []);
  const token = id?.token;

  const confirmationtoogle = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.value) {
        // dispatch(logoutUser(token));
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
    <>
      <Navbar
        className={`fixed
         overflow-hidden z-50 bg-white py-2 px-6 border border-[gainsboro] w-full max-[425px]:px-2`}
        // style={{ zIndex: 9999 }}
      >
        <NavbarBrand
          className="flex cursor-pointer items-start justify-start float-left "
          onClick={() => {
            navigate('/home');
          }}
        >
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
          <img
            src="/e-scuola-logo-1.1.png"
            alt="logo"
            className="w-14 h-14 rounded-full"
          />
          <img src={Imglogo} alt="piclogo" className=" mt-4 ml-4" />
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
          {/* <a className="flex relative" href="#contact">
          {' '}
          <img src={Img23} className="w-10 h-10 mr-6 mb-2" />{' '}
          <span className="bg-pink-600 text-white  rounded-[50%] absolute text-[12px] px-[4px] mt-[-2px] ml-5">
            3
          </span>
        </a> */}
          <div className="text-[cornflowerblue] flex flex-row items-center mt-4 justify-start w-full ml-5 ">
            <a href="/csms/home">
              <span className="flex ">
                <BiArrowBack title="Back to Home" className="mt-1 ml-2" />
                Go to Home
              </span>
            </a>
          </div>
          {/* <a
          className="flex relative cypress_next1_button px-6 py-2.5 mt-3 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
          href="/csms/home"
        >
          {' '}
          Admin Login
        </a> */}
        </Nav>
      </Navbar>
    </>
  );
}
