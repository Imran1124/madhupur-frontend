/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchStudentById } from "../../store/actions";
// import GlobalLoader from "../../components/Common/Loader";
import Img11 from "../../assets/Rectangle 114.png";
import Img12 from "../../assets/image 12.png";
import Img20 from "../../assets/image 20.png";
import Img24 from "../../assets/image 24.png";
import Img23 from "../../assets/image 23.png";
import Img21 from "../../assets/images.png";
import Img22 from "../../assets/image 22.png";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import { useParams } from "react-router-dom";
import BackendUrl from "../../Components/ApiList/BackendUrl";

export default function ViewStudentDetails() {
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [getStudentById, setStudentById] = useState({});
  const { api_masters_student_crud_show } = ApiList();
  const [valueid, setValueid] = useState(localStorage.getItem("EMP_NO"));
  const { id } = useParams();
  const fetchStudentById = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_masters_student_crud_show,
      { id: id },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Category By Name..", response?.data);
        if (response?.data?.status) {
          setStudentById(response?.data?.data);
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
    fetchStudentById(id);
  }, [id]);
  const [editData, setEditData] = useState();

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
        className="w-full bg-white h-[82vh] overflow-auto flex relative"
        // style={{ zIndex: 100 }}
      >
        <div className="w-full bg-white mx-[10px]  mt-[2vh] rounded-[25px] border border-gray-200 h-auto">
          <div>
            <div className="flex items-center justify-center">
              <span className="bg-[#E6ECFF] text-[2vh] text-black px-[30px] py-[20px] mt-[60px] rounded-l-5xl absolute">
                Review Application
              </span>
              <span className="relative ml-[300px]">
                <img src={Img11} alt="review" className="w-[130px] h-[130px]" />
              </span>
            </div>
            <div className="h-[75vh] overflow-auto">
              <div className="mt-5">
                <h1
                  style={{ zIndex: 100 }}
                  className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                >
                  <div className="flex">
                    <img
                      src={Img12}
                      alt="Basic"
                      className="mr-5 w-10 h-10 opacity-80"
                    />{" "}
                    <span className="flex text-slate-600 items-center justify-center text-[22px]">
                      BASIC DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          First name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.first_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Middle name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.middle_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Last name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.last_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Class.
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.class_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Section.
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.section_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Date of birth
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.dob)}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Admission date
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.admission_date)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Gender
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.gender_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Category
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.category_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Roll no
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.roll_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Disability
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.disability)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Religion
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.religion_name)}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Caste
                        </label>

                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.caste_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mobile no
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mobile)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Email
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.email)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Aadhar No.
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.aadhar_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Blood group
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.blood_group_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Ward/House
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.house_ward_name)}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Concession type
                        </label>

                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.concession_type_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Last school name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.last_school_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Last school address
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.last_school_address)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Admission month
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.admission_month)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Uploaded Image
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          <img src={`${BackendUrl}/${getStudentById?.upload_image}`} alt="image" />
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                  </div>
                  {/*  */}
                </div>
              </div>
              <div className="mt-5">
                <h1
                  style={{ zIndex: 100 }}
                  className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                >
                  <div className="flex">
                    <img
                      src={Img24}
                      alt="Basic"
                      className="mr-5 w-10 h-10 opacity-80"
                    />{" "}
                    <span className="flex text-slate-600 items-center justify-center text-[22px]">
                      PARENT DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Father's name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Father's mobile
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_mobile)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Father's qualification
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_qualification_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Father's occupation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_occupation_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Father's aadhar no
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_aadhar_no)}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Father's Email
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_email)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Father's annual income
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.fathers_annual_income)}
                        </label>
                      </div>
                    </div>

                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Father's Image
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          <img
                            src={`${BackendUrl}/api/${getStudentById?.fathers_image}`}
                            alt="image"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                  </div>
                  {/*  */}
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Mother's name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's mobile
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_mobile)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Mother's qualification
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_qualification_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Mother's occupation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_occupation_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's aadhar no
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_aadhar_no)}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's Email
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_email)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Mother's annual income
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.mothers_annual_income)}
                        </label>
                      </div>
                    </div>

                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's Image
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          <img
                            src={`${BackendUrl}/api/${getStudentById?.mothers_image}`}
                            alt="image"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                  </div>
                  {/*  */}
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Guardian's name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Guardian's mobile
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_mobile)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Guardian's qualification
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            getStudentById?.guardian_qualification_name
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Guardian's occupation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_occupation_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Guardian's aadhar no
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_aadhar_no)}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Guardian's Email
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_email)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Guardian's annual income
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_annual_income)}
                        </label>
                      </div>
                    </div>

                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Relation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.guardian_relation_name)}
                           
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                    <div className="w-full mx-[10px]  px-[10px]"></div>
                  </div>
                  {/*  */}
                </div>
              </div>

              <div className="mt-5">
                <h1
                  style={{ zIndex: 100 }}
                  className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                >
                  <div className="flex">
                    <img
                      src={Img20}
                      alt="Address"
                      className="mr-5 w-10 h-10 opacity-80"
                    />{" "}
                    <span className="flex text-slate-600 items-center justify-center text-[22px]">
                      ADDRESS DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[20px] flex  px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Peramanent
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] mt-[10px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Address 1
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_address1)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Address 2
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_address2)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Locality
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_locality)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Landmark
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_landmark)}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          District
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_district_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          State
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_state_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Country
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_country_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Pincode
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.p_pincode)}
                        </label>
                      </div>
                    </div>
                  </div>
                  {getStudentById?.c_address1 ? (
                    <>
                      <div className="w-[100%] mt-[20px] flex  px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label
                              htmlFor="exampleMiddlename"
                              className=" label3"
                            >
                              Correspondance
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] mt-[10px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label
                              htmlFor="exampleMiddlename"
                              className=" label3"
                            >
                              Address 1
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_address1)}
                            </label>
                          </div>
                        </div>
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              Address 2
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_address2)}
                            </label>
                          </div>
                        </div>
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              Locality
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_locality)}
                            </label>
                          </div>
                        </div>
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              Landmark
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_landmark)}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              District
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_district_name)}
                            </label>
                          </div>
                        </div>
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              State
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_state_name)}
                            </label>
                          </div>
                        </div>
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              Country
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_country_name)}
                            </label>
                          </div>
                        </div>
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              Pincode
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(getStudentById?.c_pincode)}
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <h1
                  style={{ zIndex: 100 }}
                  className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                >
                  <div className="flex">
                    <img
                      src={Img23}
                      alt="Basic"
                      className="mr-5 w-10 h-10 opacity-80"
                    />{" "}
                    <span className="flex text-slate-600 items-center justify-center text-[22px]">
                      BANK DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Bank name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.bank_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Account number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.account_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          IFSC code
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.ifsc_code)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Branch name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.branch_name)}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {getStudentById?.siblings_details?.length > 0 ? (
                <div className="mt-5">
                  <h1
                    style={{ zIndex: 100 }}
                    className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                  >
                    <div className="flex">
                      <img
                        src={Img21}
                        alt="Basic"
                        className="mr-5 w-10 h-10 opacity-80"
                      />{" "}
                      <span className="flex text-slate-600 items-center justify-center text-[22px]">
                        SIBLING DETAILS
                      </span>
                    </div>
                  </h1>
                  <hr className="mx-[40px]" />

                  <div className="mt-1">
                    {getStudentById?.sibling_details &&
                      getStudentById?.sibling_details.map((eachValue) => {
                        return (
                          <>
                            <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]  max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                              <div className="w-full mx-[10px]  px-[10px]">
                                <div>
                                  <label
                                    htmlFor="exampleSatulations"
                                    className="label4"
                                  >
                                    {nullToNA(eachValue.sibling_name)}
                                  </label>
                                </div>
                              </div>
                              <div className="w-full mx-[10px]  px-[10px]">
                                <div>
                                  <label
                                    htmlFor="exampleSatulations"
                                    className="label4"
                                  >
                                    {nullToNA(eachValue.sibling_class)}
                                  </label>
                                </div>
                              </div>
                              <div className="w-full mx-[10px]  px-[10px]">
                                <div>
                                  <label
                                    htmlFor="exampleSatulations"
                                    className="label4"
                                  >
                                    {nullToNA(eachValue.sibling_section)}
                                  </label>
                                </div>
                              </div>
                              <div className="w-full mx-[10px]  px-[10px]">
                                <div>
                                  <label
                                    htmlFor="exampleSatulations"
                                    className="label4"
                                  >
                                    {nullToNA(eachValue.admission_no)}
                                  </label>
                                </div>
                              </div>
                              <div className="w-full mx-[10px]  px-[10px]">
                                <div>
                                  <label
                                    htmlFor="exampleSatulations"
                                    className="label4"
                                  >
                                    {nullToNA(eachValue.roll_no)}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              ) : null}

              <div className="mt-5">
                <h1
                  style={{ zIndex: 100 }}
                  className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                >
                  <div className="flex">
                    <img
                      src={Img22}
                      alt="Basic"
                      className="mr-5 w-10 h-10 opacity-80"
                    />{" "}
                    <span className="flex text-slate-600 items-center justify-center text-[22px]">
                      TRANSPORT DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Route
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.route_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Pick point
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.pick_point_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Bus no
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.bus_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Applicable from
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(getStudentById?.applicable_from)}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
