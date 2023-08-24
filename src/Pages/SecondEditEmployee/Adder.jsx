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
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [experiencereadymadeListData, setexperiencereadymadeListData] = useState([]);
  const [familyreadymadeListData, setfamilyreadymadeListData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [getEmployeById, setGetEmployeeById] = useState();
  const { api_getEmployeeDataById,api_retrieveEducationData,api_retrieveExperienceData,api_retrieveFamilyData } = ApiList();
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
  const getemployeeEducationById = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_retrieveEducationData, { empId: id }, ApiHeader())
      .then(function (response) {
        console.log("Education By Name..", response?.data?.data);
        if (response?.data?.status) {
          setreadymadeListData(response?.data?.data);
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
  const getemployeeExperience = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_retrieveExperienceData, { empId: id }, ApiHeader())
      .then(function (response) {
        console.log("Experience By Name..", response?.data?.data);
        if (response?.data?.status) {
          setexperiencereadymadeListData(response?.data?.data);
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
  const getemployeeFamily = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_retrieveFamilyData, { empId: id }, ApiHeader())
      .then(function (response) {
        console.log("Education By Name..", response?.data?.data);
        if (response?.data?.status) {
          setfamilyreadymadeListData(response?.data?.data);
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
  console.log(readymadeListData,experiencereadymadeListData)
  useEffect(() => {
    getemployeebyidUser(id);
    getemployeeEducationById(id)
    getemployeeExperience(id)
    getemployeeFamily(id)
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
        className="w-full bg-white h-[86vh] block relative max-[1200px]:overflow-hidden"
        // style={{ zIndex: 100 }}
      >
        <div className="w-full">
          <h1 className="flex justify-center text-[3.2vh] text-gray-700 font-bold">
            Employee Registration
          </h1>
          <h2 className="flex justify-center text-[2vh] text-gray-500 font-bold">
            Registration Form: Please provide the following information
          </h2>
        </div>
        <div className=" flex items-center justify-center flex-wrap">
          <button className={formIndex==1 ? "bg-[#0F766E] text-white border-[#0F766E] border px-8 py-2 rounded-lg m-5" : "bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg  m-5"}  onClick={()=>setformIndex(1)}>BASIC DETAILS</button>
          <button className={formIndex==2 ? "bg-[#0F766E] text-white border-[#0F766E] border px-8 py-2 rounded-lg m-5" : "bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg  m-5"} onClick={()=>setformIndex(2)}>ADDRESS DETAILS</button>
          <button className={formIndex==3 ? "bg-[#0F766E] text-white border-[#0F766E] border px-8 py-2 rounded-lg m-5" : "bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg  m-5"} onClick={()=>setformIndex(3)}>BANK DETAILS</button>
          <button className={formIndex==4 ? "bg-[#0F766E] text-white border-[#0F766E] border px-8 py-2 rounded-lg m-5" : "bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg  m-5"} onClick={()=>setformIndex(4)}>EDUCATION DETAILS</button>
          <button className={formIndex==5 ? "bg-[#0F766E] text-white border-[#0F766E] border px-8 py-2 rounded-lg m-5" : "bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg  m-5"} onClick={()=>setformIndex(5)}>EXPERIENCE DETAILS</button>
          <button className={formIndex==6 ? "bg-[#0F766E] text-white border-[#0F766E] border px-8 py-2 rounded-lg m-5" : "bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg  m-5"} onClick={()=>setformIndex(6)}>FAMILY DETAILS</button>
        </div>
        
        <div className="w-full mx-[5%] mb-[3%]  absolute">
          <div
            className={` absolute ${
              formIndex == 1 ? "block" : "hidden"
            } w-full pb-10`}
          >
            <Add
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              editValue={editData?.basic_details}
              getemployeebyidUser={getemployeebyidUser}
              id={id}
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
              getemployeebyidUser={getemployeebyidUser}
              id={id}
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
              getemployeebyidUser={getemployeebyidUser}
              id={id}
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
              readymadeListData={readymadeListData}
              setreadymadeListData={setreadymadeListData}
              getemployeeEducationById={getemployeeEducationById}
              id={id}
              editValue={editData?.basic_details}
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
              readymadeListData={experiencereadymadeListData}
              setreadymadeListData={setexperiencereadymadeListData}
              editValue={editData?.basic_details}
              getemployeeExperienceById={getemployeeExperience}
              id={id}
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
              readymadeListData={familyreadymadeListData}
              setreadymadeListData={setfamilyreadymadeListData}
              editValue={editData?.basic_details}
              getemployeeFamilyById={getemployeeFamily}
              id={id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
