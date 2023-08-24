/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import { CATEGORY_REGEX, yearExp } from '../../constant';
import { RiDeleteBinFill } from 'react-icons/ri';
import * as yup from 'yup';
import { MdEditSquare } from 'react-icons/md';
import { nullToNA } from '../../Components/Common/PowerupFunctions';
import Img11 from '../../assets/image 21.png';
import Nodata from '../../assets/nodata.png';
import {
  allowCharacterInput,
  allowNumberInput
} from '../../Components/Common/PowerupFunctions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackendUrl from '../../Components/ApiList/BackendUrl';
import { FaFilePdf } from "react-icons/fa";

export default function ForthForm(props) {
  console.log(props)
const [isLoading, setisLoading] = useState(false);
const [erroState, seterroState] = useState(false);
const [currentId, setcurrentId] = useState(null);
const[editadta,setEditdata]=useState("")
const { api_showByExperienceId,api_delteByExperienceId,api_postByExperienceId,api_editByExperienceId } = ApiList();


const formik = useFormik({
  enableReinitialize: true,
  initialValues: {
    name_of_org: "",
    position_head: "",
    period_from: "",
    period_to: "",
    salary: "",
    pay_grade: "",
    upload_exp_letter_docs: "",
  },
 
  onSubmit: (values) => {
    console.log("hello",values)
    saveMasterForm(values);
    formik.resetForm()
  }
});
const saveMasterForm = (values) => {
  const formdata = new FormData();
  formdata.append('empNo', props?.editValue?.emp_no)
  formdata.append('nameOfOrg', values.name_of_org);
  formdata.append('positionHead', values.position_head);
  formdata.append('periodFrom', values.period_from);
  formdata.append('periodTo', values.period_to);
  formdata.append('salary', values.salary);
  formdata.append('payGrade', values.pay_grade);
  formdata.append(
    `uploadExpLetterDocs`,
    values?.upload_exp_letter_docs 
  );
  console.log(values);
  setisLoading(true);
  let url;
  let requestBody;
  let requestBodyBase =formdata
  if (currentId !== null) {
    url = api_editByExperienceId;
    requestBody = requestBodyBase;
    requestBody.id = formdata.append('id', currentId);
  } else if (
    values?.exam_passed_name !== '' &&
    currentId == null
  ) {
    url = api_postByExperienceId;
    requestBody = requestBodyBase;
  }

  AxiosInterceptors.post(url, requestBody, ApiHeader())
    .then(function (response) {
      console.log('bank master..', response?.data?.data);
      if (response?.data?.status === true) {
        // Swal.fire({
        //   icon: "success",
        //   title: `Section`,
        //   text: currentId!==null ? "Data Updated Successfully!" : "Data Added Successfully",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        toast.success(
          currentId !== null
            ? 'Data Updated Successfully!'
            : 'Data Added Successfully'
        );
        props?.getemployeeExperienceById(props?.id)
        setcurrentId(null);
      } else {
        // activateBottomErrorCard(true, `${response?.data?.message}`);
        toast.error(`${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log('==2 error list...', error);
      // activateBottomErrorCard(true, "Error occured in submitting form.");
      toast.warning('Error occured in submitting form.');
      setisLoading(false);
    });
};

const handleOnChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      
      {
        name == "salary" &&
          formik.setFieldValue(
            "salary",
            allowNumberInput(value, formik.values.salary, 30)
          );
      }
      {
        name == "name_of_org" &&
          formik.setFieldValue(
            "name_of_org",
            allowCharacterInput(value, formik.values.name_of_org, 30)
          );
      }
      {
        name == "position_head" &&
          formik.setFieldValue(
            "position_head",
            allowCharacterInput(value, formik.values.position_head, 30)
          );
      }
    };
const fetchEditData = (getid) => {
  setisLoading(true);
  let requestBody = {
    id: getid
  };
  AxiosInterceptors.post(api_showByExperienceId, requestBody, ApiHeader())
    .then(function (response) {
      console.log('fetch edit data response..', response?.data?.data);
      if (response?.data?.status) {
        sectionEditData(response?.data?.data);
      } else {
        // activateBottomErrorCard(true, `${response?.data?.message}`);
        toast.error(`${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log('= edit data error...', error);
      seterroState(true);
      setisLoading(false);
    });
};

//Fetch Edit Data
const sectionEditData = (data) => {
  console.log('existing property details in prop address...', data);
  formik.setFieldValue('id', data?.id);
  formik.setFieldValue("name_of_org", data?.name_of_org);
      formik.setFieldValue("position_head", data?.position_head);
      formik.setFieldValue("period_from", data?.period_from);
      formik.setFieldValue("period_to", data?.period_to);
      formik.setFieldValue("salary", data?.salary);
      formik.setFieldValue("pay_grade", data?.pay_grade);
      formik.setFieldValue(
        "upload_exp_letter_docs",
        ""
      );
  setEditdata(data?.upload_exp_letter_docs);      
};
const handleDelete=(getid)=>{
  setisLoading(true);
  let requestBody = {
    id: getid
  };
  AxiosInterceptors.post(api_delteByExperienceId, requestBody, ApiHeader())
  .then(function (response) {
    console.log('fetch edit data response..', response?.data?.data);
    if (response?.data?.status) {
      props?.getemployeeExperienceById(props?.id)
    } else {
      // activateBottomErrorCard(true, `${response?.data?.message}`);
      toast.error(`${response?.data?.message}`);
    }
    setisLoading(false);
  })
  .catch(function (error) {
    console.log('= edit data error...', error);
    seterroState(true);
    setisLoading(false);
  });
}
  
  return (
    <>
      {isLoading && <BarLoader />}
      <div className="h-[70vh] w-[90%] bg-white overflow-auto  border border-slate-300 rounded-[15px]  max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" ml-[1vh]   overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
            >
              <div className="flex">
                <img
                  src={Img11}
                  alt="Basic"
                  className="mr-5 w-10 h-10 opacity-80"
                />{" "}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Experience Detail
                </span>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Name of Organization
                  </label>
                  <br />
                  <input
                    name="name_of_org"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.name_of_org}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Position Head
                  </label>
                  <br />
                  <input
                    name="position_head"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.position_head}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className="label2">
                    Period From
                  </label>
                  <input
                    name="period_from"
                    className="input"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={formik.handleChange}
                    value={formik.values.period_from}
                  />
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className="label2">
                    Period To
                  </label>
                  <input
                    name="period_to"
                    className="input"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={formik.handleChange}
                    value={formik.values.period_to}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    salary
                  </label>
                  <br />
                  <input
                    name="salary"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.salary}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Pay Grade
                  </label>
                  <br />
                  <input
                    name="pay_grade"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.pay_grade}
                  />
                </div>
              </div>
            </div>

            <div className="w-[33%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Upload Document
                  </label>
                  <br />
                  <div className="block justify-start">
                      <label
                        htmlFor="upload_exp_letter_docs"
                        className="form-control ml-10 h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>
                  <input
                    name="upload_exp_letter_docs"
                    className="sr-only input2"
                    type="file"
                    id="upload_exp_letter_docs"
                    accept=".pdf"
                    // value={formik.values.upload_exp_letter_docs[0]}
                    onChange={(e) => {
                      formik.setFieldValue("upload_exp_letter_docs", e.target.files[0]);
                    }}
                  />
                         {formik.values.upload_exp_letter_docs && currentId !== null
                        ? `${formik.values.upload_exp_letter_docs?.name}`.slice(
                            `${formik.values.upload_exp_letter_docs?.name}`.lastIndexOf(
                              '-'
                            ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '/'
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '\\'
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '.'
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                ' '
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                ','
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '?'
                              ) + 1,
                            `${formik.values.eventDocs?.name}`.length
                          )
                        : formik.values.upload_exp_letter_docs && currentId === null
                        ? formik.values.upload_exp_letter_docs?.name
                        : editadta
                        ? (<a
                          href={`${BackendUrl}/${editadta}`}
                          target="_blank"
                          className="text-xl text-red-700 flex items-center justify-center"
                        >
                         {editadta && currentId!==null ? ( <FaFilePdf className="text-red bg-red w-8 h-8 mt-4" />) : ""}
                        </a>)
                        :  'No file selected'}
                </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="next-btn">
               {currentId!==null ? 'Update Form' : 'Add Form'}
            </button>
          </div>

          <div className="mb-[1vh] ">
            <div className="w-[99%] mt-[10px] flex mb-[10px] p-[10px]  max-[768px]:pl-1 max-[768px]:pr-2 overflow-auto  max-[768px]:w-[750px]">
              <table className="w-full justify-center items-center ">
                <thead className="  text-black bg-[#98D4D2] text-[17px]  w-full   arimo border border-gray h-[2vh] ">
                  <tr className="py-2 pl-4  w-full flex items-start justify-start text-center">
                    <th className="w-full flex items-center justify-center">
                      S.No
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Name of Organization
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Position Head
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Period From
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Period To
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Salary
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Pay Grade
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Document
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {props?.readymadeListData ? (
                    props?.readymadeListData &&
                    props?.readymadeListData.map((eachValue, index) => {
                      return (
                        <>
                          <tr
                            className="py-2 pl-4 w-full text-[16px] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100"
                            key={index}
                          >
                            <td className="w-full flex items-center justify-center">
                              {nullToNA(index + 1)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.name_of_org)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.position_head)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.period_from)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.period_to)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.salary)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.pay_grade)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                            <a
                            href={`${BackendUrl}/${eachValue.upload_exp_letter}`}
                              target="_blank"
                            className="text-xl text-red-700 "
                            >
                           {eachValue.upload_exp_letter ? (
                             <FaFilePdf className="text-red bg-red w-8 h-8" />
                             ) : (
                              ""
                              )}
                                 </a>
                            </td>
                            <td className="w-full flex items-start justify-start">
                              <button
                                type="button"
                                onClick={() => {
                                  setcurrentId(eachValue?.id);
                                  fetchEditData(eachValue?.id);
                                }}
                                className=" text-indigo-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <MdEditSquare size={30} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(eachValue?.id)}
                                className=" text-red-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <RiDeleteBinFill size={30} />
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="flex items-center justify-center opacity-[0.5] py-2 pl-4 w-full text-[16px]  verdana h-auto">
                        <img
                          src={Nodata}
                          alt="nodata"
                          className="w-[200px] h-[200px]"
                        />
                      </div>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          
        </form>
      </div>
    </>
  );
}
