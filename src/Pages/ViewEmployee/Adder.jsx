/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getemployeebyidUser } from "../../store/actions";
// import GlobalLoader from "../../components/Common/Loader";
import Img11 from "../../assets/Rectangle 114.png";
import Img12 from "../../assets/image 12.png";
import Img20 from "../../assets/image 20.png";
import Img24 from "../../assets/image 24.png";
import Img23 from "../../assets/image 23.png";
import Img21 from "../../assets/image 21.png";
import Img22 from "../../assets/image 22.png";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import { useParams } from "react-router-dom";
import BackendUrl from "../../Components/ApiList/BackendUrl";

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
  const [editData, setEditData] = useState();
  useEffect(() => {
    setEditData(getEmployeById);
  }, [getEmployeById]);

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
console.log("Hello moto",editData?.basic_details)
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
                          Salutation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.salutation_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          First Name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.first_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Middle Name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.middle_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Last Name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.last_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mobile No.
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.mobile)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          E-mail
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.email)}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Gender
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.gender_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Caste Category
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.category_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Date of birth
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.dob)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Date of joining
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.doj)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Blood group
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.blood_group_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Department
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.department_name)}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Employment type
                        </label>

                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.emp_type_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Marital status
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.marital_status_name
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Teaching title
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.teaching_title_name
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Aadhar No.
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.aadhar_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Special Ability
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.disability)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Uploaded Image
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          <img
                            src={`${BackendUrl}/${editData?.basic_details?.upload_image}`}
                            alt="image"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
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
                          {nullToNA(editData?.basic_details?.p_address1)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Address 2
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_address2)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Locality
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_locality)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Landmark
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_landmark)}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          City
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_district_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          State
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_state_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Country
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_country_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Pincode
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.p_pincode)}
                        </label>
                      </div>
                    </div>
                  </div>
                  {editData?.c_address1 ? (
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
                              {nullToNA(editData?.basic_details?.c_address1)}
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
                              {nullToNA(editData?.basic_details?.c_address2)}
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
                              {nullToNA(editData?.basic_details?.c_locality)}
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
                              {nullToNA(editData?.basic_details?.c_landmark)}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]   max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                        <div className="w-full mx-[10px]  px-[10px]">
                          <div>
                            <label htmlFor="exampleEmail" className="label3">
                              City
                            </label>
                            <label
                              htmlFor="exampleSatulations"
                              className="label4"
                            >
                              {nullToNA(
                                editData?.basic_details?.c_district_name
                              )}
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
                              {nullToNA(editData?.basic_details?.c_state_name)}
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
                              {nullToNA(
                                editData?.basic_details?.c_country_name
                              )}
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
                              {nullToNA(editData?.basic_details?.c_pincode)}
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
                          {nullToNA(editData?.basic_details?.fathers_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.mothers_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Father's qualification
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.fathers_qualification_name
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's qualification
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.mothers_qualification_name
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Father's occupation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.fathers_occupation_name
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Mother's occupation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.mothers_occupation_name
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
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
                          {nullToNA(editData?.basic_details?.bank_name)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          Account number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.account_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Account type
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.account_type)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          IFSC code
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.ifsc_code)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Branch name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.branch_name)}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Nominee name
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.nominee_name)}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          Nominee Relation
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(
                            editData?.basic_details?.nominee_relation_name
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h1
                  style={{ zIndex: 100 }}
                  className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
                >
                  <div className="flex">
                    <span className="flex text-slate-600 items-center justify-center text-[22px]">
                      PAYROLL
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px] max-[917px]:block ">
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleSatulations" className="label3">
                          Pan number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.pan_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          EPF number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.epf_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          UAN number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.uan_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleEmail" className="label3">
                          ESI number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.esi_no)}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mx-[10px]  px-[10px]">
                      <div>
                        <label htmlFor="exampleMiddlename" className=" label3">
                          NPS number
                        </label>
                        <label htmlFor="exampleSatulations" className="label4">
                          {nullToNA(editData?.basic_details?.nps_no)}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      EDUCATION DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px] max-[1200px]:w-[1200px] max-[1200px]:overflow-auto ">
                    <div className="bg-[#E6ECFF] flex w-full py-3 mx-4">
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label
                            htmlFor="exampleSatulations"
                            className="label3"
                          >
                            Degree name
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Board
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label
                            htmlFor="exampleMiddlename"
                            className=" label3"
                          >
                            Passing year
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Division
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Marks obtained
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Total Marks
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Percentage
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {editData?.education_details &&
                    editData?.education_details.map((eachValue) => {
                      return (
                        <>
                          <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]  max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.exam_passed_name)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.board_uni_inst)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.passing_year)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.div_grade_name)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.marks_obtained)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.total_marks)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.percentage)}
                                </label>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
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
                      EXPERIENCE DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]  max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="bg-[#E6ECFF] flex w-full py-3 mx-4">
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label
                            htmlFor="exampleSatulations"
                            className="label3"
                          >
                            Name of organization
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Position head
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label
                            htmlFor="exampleMiddlename"
                            className=" label3"
                          >
                            Period From
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Period to
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Salary
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {editData?.experience_details &&
                    editData?.experience_details.map((eachValue) => {
                      return (
                        <>
                          <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]  max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.name_of_org)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.position_head)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.period_from)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.period_to)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue.salary)}
                                </label>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
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
                      FAMILY DETAILS
                    </span>
                  </div>
                </h1>
                <hr className="mx-[40px]" />
                <div className="mt-1">
                  <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]  max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                    <div className="bg-[#E6ECFF] flex w-full py-3 mx-4">
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label
                            htmlFor="exampleSatulations"
                            className="label3"
                          >
                            Family Name
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label htmlFor="exampleEmail" className="label3">
                            Relation
                          </label>
                        </div>
                      </div>
                      <div className="w-full mx-[10px]  px-[10px]">
                        <div>
                          <label
                            htmlFor="exampleMiddlename"
                            className=" label3"
                          >
                            Date Of birth
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {editData?.family_details &&
                    editData?.family_details.map((eachValue) => {
                      return (
                        <>
                          <div className="w-[100%] mt-[30px] flex mb-[20px] px-[50px]  max-[1200px]:w-[1200px] max-[1200px]:overflow-auto  ">
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue?.f_member_name)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue?.f_member_relation_name)}
                                </label>
                              </div>
                            </div>
                            <div className="w-full mx-[10px]  px-[10px]">
                              <div>
                                <label
                                  htmlFor="exampleSatulations"
                                  className="label4"
                                >
                                  {nullToNA(eachValue?.f_member_dob)}
                                </label>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
