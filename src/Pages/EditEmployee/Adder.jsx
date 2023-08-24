/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Add from "./add";
import Communication from "./communication";
import ThirdForm from "./ThirdForm";
import FifthForm from "./FifthForm";
import ForthForm from "./ForthForm";
import SevenForm from "./SevenForm";
import BarLoader from "../../Components/Common/BarLoader";
import Img14 from "../../assets/image 14.png";
import Img9 from "../../assets/Ellipse 9.png";
import Imgtick from "../../assets/tick.png";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { useParams } from "react-router-dom";

export default function Adder() {
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [getEmployeById, setGetEmployeeById] = useState();
  const { api_getEmployeeDataById } = ApiList();
  const { id } = useParams();
  const getemployeebyidUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getEmployeeDataById, { id: id }, ApiHeader())
      .then(function (response) {
        console.log("Category By Name..", response?.data?.data);
        if (response?.data?.status) {
          setGetEmployeeById(response?.data?.data);
        } else {
          activateBottomErrorCard(true, "Error occured while fetching data.");
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");

        setisLoading(false);
      });
  };
  useEffect(() => {
    getemployeebyidUser(id);
  }, []);
  const [formIndex, setformIndex] = useState(1);
  const [fam_data, setFam_data] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [seconddropdown, setSecondDropdown] = useState(false);
  const [thirddropdown, setThirdDropdown] = useState(false);
  const [forthdropdown, setForthDropdown] = useState(false);
  const [fifthdropdown, setFifthDropdown] = useState(false);
  const [sixthdropdown, setSixthDropdown] = useState(false);
  const [editData, setEditData] = useState();
  useEffect(() => {
    setEditData(getEmployeById);
  }, [getEmployeById]);

  const [allFormData, setallFormData] = useState([]);

  const setCounterFun = (index) => {
    if (index == 1) {
      setformIndex(1);
    }
    if (index == 2) {
      setformIndex(2);
    }
    if (index == 3) {
      setformIndex(3);
    }
    if (index == 4) {
      setformIndex(4);
    }
    if (index == 5) {
      setformIndex(5);
    }
    if (index == 6) {
      setformIndex(6);
    }
    if (index == 7) {
      setformIndex(7);
    }
    if (index == 8) {
      setformIndex(8);
    }
  };

  const setFormDataFun = (key, formData) => {
    setallFormData({ ...allFormData, [key]: formData });
  };

  console.log("allformData", allFormData);
  console.log("family", fam_data);
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <div
        className="w-full bg-white h-[86vh] overflow-auto flex relative max-[1200px]:overflow-hidden"
        // style={{ zIndex: 100 }}
      >
        <div className="bg-[#98D4D2] w-[40%] h-screen px-[10vh]  block relative  max-[1024px]:px-[2vh] max-[600px]:hidden">
          <div className="flex items-center justify-center 10px]">
            <img
              src={Img14}
              alt="adder"
              className="w-[200px] h-[200px] opacity-90"
            />
          </div>
          <div className="bg-white border border-white rounded-[15px] mt-[-10px]">
            <div className="overflow-auto w-[100%] pb-2 h-[64vh]">
              <div className="mx-1">
                <div className={`flex  p-4`}>
                  <span className="flex items-start justify-start">
                    {" "}
                    {allFormData.basic_detail ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>{" "}
                  <span
                    onClick={() => setDropdown(!dropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] mt-[4px] "
                  >
                    <span className="text-gray-500"> Basic Details</span>{" "}
                    {dropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{" "}
                </div>
                {dropdown ? (
                  allFormData.basic_detail ? (
                    <>
                      <div className="block  text-left ml-36 pl-10 text-black">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Salutation :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.salutation}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            First Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.first_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Middle Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.middle_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Last Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.last_name}
                          </label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Gender :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.gender}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Category :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.category}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Dob :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.dob}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Doj :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.doj}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Mobile :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.mobile}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Email :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.email}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Blood Group :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.blood_group}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Department :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.department_name}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Employee Type :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.employee_type_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Marital Status :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.marital_status}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Teaching Title :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.teaching_title_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Image :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.basic_detail.upload_image.name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Aadhar No :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.aadhar_no}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Disability :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.basic_detail.disability}
                          </label>
                        </div>{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="block text-black text-left ml-36 pl-10">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Salutation :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            First Name :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Middle Name :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Last Name :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]"></label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Gender :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Category :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Dob :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Doj :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Mobile :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Email :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Blood Group :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Department :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Employee Type :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Marital Status :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Teaching Title :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Image :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Aadhar No :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Disability :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]"></label>
                        </div>{" "}
                      </div>
                    </>
                  )
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex p-4`}>
                  {" "}
                  <span className="flex items-start justify-start">
                    {" "}
                    {allFormData.communication_detail ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>{" "}
                  <span
                    onClick={() => setSecondDropdown(!seconddropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500">Address Details</span>{" "}
                    {seconddropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>
                </div>
                {seconddropdown ? (
                  allFormData.communication_detail ? (
                    <>
                      <div className="block  text-left ml-36 pl-10 text-black">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Father's Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.fathers_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Mother's Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.communication_detail.mothers_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Father's Qualification :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {
                              allFormData.communication_detail
                                .fathers_qualification
                            }
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Mother's Qualification :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {
                              allFormData.communication_detail
                                .mothers_qualification
                            }
                          </label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Father's Occupation :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {
                              allFormData.communication_detail
                                .fathers_occupation
                            }{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Mother's Occupation :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {
                              allFormData.communication_detail
                                .mothers_occupation
                            }
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent Address 1 :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.p_address1}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Permanent Address 2 :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.p_address2}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Correspondance Address 1 :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.communication_detail.c_address1}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Correspondance Address 2 :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.c_address2}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Permanent Locality :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.communication_detail.p_locality}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Correspondance Locality :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.c_locality}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Permanent Landmark :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.communication_detail.p_landmark}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance Landmark :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.communication_detail.c_landmark}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent District :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.p_district_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance District :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.c_district_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent State :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.p_state_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance State :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.c_state_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent Country :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.p_country_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance Country :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.c_country_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent Pincode :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.p_pincode}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance Pincode :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.communication_detail.c_pincode}
                          </label>
                        </div>{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="block text-black text-left ml-36 pl-10">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Father's Name :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Mother's Name :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Father's Qualification :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Mother's Qualification :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]"></label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Father's Occupation :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Mother's Occupation :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent Address 1 :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Permanent Address 2 :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Correspondance Address 1 :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Correspondance Address 2 :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Permanent Locality :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Correspondance Locality :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Permanent Landmark :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance Landmark :{" "}
                          </label>
                          <label className="text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent District :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance District :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent State :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance State :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent Country :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance Country :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Permanent Pincode :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Correspondance Pincode :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>{" "}
                      </div>
                    </>
                  )
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {" "}
                  <span className="flex items-start justify-start">
                    {" "}
                    {allFormData.account_detail ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setThirdDropdown(!thirddropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Bank Details</span>{" "}
                    {thirddropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{" "}
                </div>
                {thirddropdown ? (
                  allFormData.account_detail ? (
                    <>
                      <div className="block  text-left ml-36 pl-10 text-black">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Bank Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.account_detail.bank_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Account Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.account_detail.account_no}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Account Type :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.account_detail.account_type}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            IFSC Code :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.account_detail.ifsc_code}
                          </label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Branch Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.account_detail.branch_name}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Nominee Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.account_detail.nominee_name}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Nominee Relation :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.account_detail.nominee_relation}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Pan Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.account_detail.pan_no}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            EPF Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.account_detail.epf_no}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Uan Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.account_detail.uan_no}{" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Esi Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                            {allFormData.account_detail.esi_no}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Nps Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {allFormData.account_detail.nps_no}{" "}
                          </label>
                        </div>{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="block text-black text-left ml-36 pl-10">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Bank Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Account Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Account Type :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            IFSC Code :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Branch Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Nominee Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Nominee Relation :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Pan Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            EPF Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Uan Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Esi Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Nps Number :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>{" "}
                      </div>
                    </>
                  )
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {" "}
                  <span className="flex items-start justify-start">
                    {" "}
                    {allFormData.education_detail ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setForthDropdown(!forthdropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Education Details</span>{" "}
                    {forthdropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{" "}
                </div>
                {forthdropdown ? (
                  allFormData.education_detail ? (
                    allFormData.education_detail &&
                    allFormData.education_detail.map((item) => {
                      return (
                        <>
                          <div className="block  text-left ml-36 pl-10 text-black">
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                {" "}
                                Exam Passed :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.exam_passed}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Board/University :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.board}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Passing Year :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.passing_year}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Division :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.div_grade}
                              </label>{" "}
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Marks Obtained :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.marks_obtained}{" "}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Total Marks :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.total_marks}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Percentage :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.percentage}
                              </label>
                            </div>{" "}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="block  text-left ml-36 pl-10 text-black">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Exam Passed :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Board/University :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Passing Year :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Division :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Marks Obtained :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Total Marks :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Percentage :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>{" "}
                      </div>
                    </>
                  )
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {" "}
                  <span className="flex items-start justify-start">
                    {" "}
                    {allFormData.experience_details ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setFifthDropdown(!fifthdropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Experience Details</span>{" "}
                    {fifthdropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{" "}
                </div>
                {fifthdropdown ? (
                  allFormData.experience_details ? (
                    allFormData.experience_details &&
                    allFormData.experience_details.map((item) => {
                      return (
                        <>
                          <div className="block  text-left ml-36 pl-10 text-black">
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                {" "}
                                Name of Organization :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.name_of_org}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Position Head :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.position_head}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Period From :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.period_from}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Period To :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.period_to}
                              </label>{" "}
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                salary :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.salary}{" "}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Pay Grade :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.pay_grade}
                              </label>
                            </div>{" "}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="block  text-left ml-36 pl-10 text-black">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Name of Organization :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Position Head :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Period From :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Period To :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>{" "}
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            salary :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Pay Grade :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>{" "}
                      </div>
                    </>
                  )
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {" "}
                  <span className="flex items-start justify-start">
                    {" "}
                    {fam_data ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setSixthDropdown(!sixthdropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Family Details</span>{" "}
                    {sixthdropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{" "}
                </div>
                {sixthdropdown ? (
                  fam_data ? (
                    fam_data &&
                    fam_data.map((item) => {
                      return (
                        <>
                          <div className="block  text-left ml-36 pl-10 text-black">
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                {" "}
                                Name :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {item?.f_member_name}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Relation :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.f_member_relation}
                              </label>
                            </div>
                            <div>
                              <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                                Date Of Birth :{" "}
                              </label>
                              <label className="font-bold text-[1.8vh] text-[#6b7280]">
                                {" "}
                                {item?.f_member_dob}
                              </label>
                            </div>{" "}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="block  text-left ml-36 pl-10 text-black">
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            {" "}
                            Name :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Relation :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]">
                            {" "}
                          </label>
                        </div>
                        <div>
                          <label className=" ml-[-90px] text-[#4b5563] text-[1.8vh] ">
                            Date Of Birth :{" "}
                          </label>
                          <label className="font-bold text-[1.8vh] text-[#6b7280]"></label>
                        </div>{" "}
                      </div>
                    </>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="flex justify-center text-[3.2vh] text-gray-700 font-bold">
            Employee Registration
          </h1>
          <h2 className="flex justify-center text-[2vh] text-gray-500 font-bold">
            Registration Form: Please provide the following information
          </h2>
        </div>
        <div className="w-full mt-[8vh] ml-[28%] absolute max-[425px]:mt-[30%] max-[600px]:mx-[2%] max-[320px]:mt-[50%]">
          <div
            className={` absolute ${
              formIndex == 1 ? "block" : "hidden"
            } w-full pb-10`}
          >
            <Add
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              editValue={editData?.basic_details}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 2 ? "block" : "hidden"
            } w-full pb-10`}
          >
            <Communication
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              editValue={editData?.basic_details}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 3 ? "block" : "hidden"
            } w-full`}
          >
            <FifthForm
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              editValue={editData?.basic_details}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 4 ? "block" : "hidden"
            } w-full`}
          >
            <ThirdForm
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              editValue={editData?.education_details}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 5 ? "block" : "hidden"
            } w-full`}
          >
            <ForthForm
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              editValue={editData?.experience_details}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 6 ? "block" : "hidden"
            } w-full`}
          >
            <SevenForm
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              allFormData={allFormData}
              setFam_data={setFam_data}
              editValue={editData?.family_details}
              editBasicValue={editData?.basic_details}
            />
          </div>
        </div>
      </div>
    </>
  );
}
