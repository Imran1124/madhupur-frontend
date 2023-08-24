/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
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

export default function ThirdForm(props) {
  const [isLoading, setisLoading] = useState(false);
  const [categoryByNameData, setCategoryByNameData] = useState();
  const [erroState, seterroState] = useState(false);
  const [currentId, setcurrentId] = useState(null);
  const[editadta,setEditdata]=useState("")
  const { api_getcategorybynameData,api_showByEducationId,api_delteByEducationId,api_postByEducationId,api_editByEducationId } = ApiList();
  const getcategorybynameUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getcategorybynameData, {}, ApiHeader())
      .then(function (response) {
        console.log('Category By Name..', response?.data);
        if (response?.data) {
          setCategoryByNameData(response?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  useEffect(() => {
    getcategorybynameUser();
  }, []);  


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      exam_passed_name: '',
      board: '',
      passing_year: '',
      div_grade: '',
      marks_obtained: '',
      total_marks: '',
      percentage: '',
      upload_edu_doc: ''
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
    formdata.append('examPassed', values.exam_passed_name);
    formdata.append('board', values.board);
    formdata.append('passingYear', values.passing_year);
    formdata.append('divGrade', values.div_grade);
    formdata.append('marksObtained', values.marks_obtained);
    formdata.append('totalMarks', values.total_marks);
    formdata.append('percentage', values.percentage);
    formdata.append(
      `uploadEduDoc`,
      values?.upload_edu_doc 
    );
    console.log(values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase =formdata
    if (currentId !== null) {
      url = api_editByEducationId;
      requestBody = requestBodyBase;
      requestBody.id = formdata.append('id', currentId);
    } else if (
      values?.exam_passed_name !== '' &&
      currentId == null
    ) {
      url = api_postByEducationId;
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
          props?.getemployeeEducationById(props?.id)
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
      name == 'passing_year' &&
        formik.setFieldValue(
          'passing_year',
          allowNumberInput(value, formik.values.passing_year, 4)
        );
    }
    {
      name == 'board' &&
        formik.setFieldValue(
          'board',
          allowCharacterInput(value, formik.values.board, 20)
        );
    }
  };
  const fetchEditData = (getid) => {
    setisLoading(true);
    let requestBody = {
      id: getid
    };
    AxiosInterceptors.post(api_showByEducationId, requestBody, ApiHeader())
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
    formik.setFieldValue('exam_passed_name', data?.exam_passed_name);
    formik.setFieldValue('board', data?.board_uni_inst);
    formik.setFieldValue('passing_year', data?.passing_year);
    formik.setFieldValue('div_grade', data?.div_grade_name);
    formik.setFieldValue('marks_obtained', data?.marks_obtained);
    formik.setFieldValue('total_marks', data?.total_marks);
    formik.setFieldValue('percentage', data?.percentage);
    formik.setFieldValue(
      'upload_edu_doc',""
    );
    setEditdata(data?.upload_edu_doc);      
  };
  const handleDelete=(getid)=>{
    setisLoading(true);
    let requestBody = {
      id: getid
    };
    AxiosInterceptors.post(api_delteByEducationId, requestBody, ApiHeader())
    .then(function (response) {
      console.log('fetch edit data response..', response?.data?.data);
      if (response?.data?.status) {
        props?.getemployeeEducationById(props?.id)
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
  console.log("existing property details in prop address...",editadta)
  return (
    <>
      {isLoading && <BarLoader />}
     <div className="h-[70vh] w-[90%] bg-white overflow-auto  border border-slate-300 rounded-[15px]  max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" mx-[1vh]   overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full"
            >
              <div className="flex">
                <img
                  src={Img11}
                  alt="Basic"
                  className="mr-5 w-10 h-10 opacity-80"
                />{' '}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Education Detail
                </span>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Degree Name
                  </label>
                  <br />
                  <select
                    name="exam_passed_name"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.exam_passed_name}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.exam_passed?.map((data) => {
                      console.log(data) 
                      return(
                      <option
                        selected={
                          data?.subCatName === formik.values.exam_passed_name
                        }
                        value={data?.subCatName}
                      >
                        {data?.subCatName}
                      </option>
                    )})}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Board/University
                  </label>
                  <br />
                  <input
                    name="board"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.board}
                  />
                  <p className="text-red-500 text-sm ml-[40px]">
                    {formik.touched.board && formik.errors.board
                      ? formik.errors.board
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className="label2">
                    Passing Year
                  </label>
                  <input
                    name="passing_year"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.passing_year}
                  />
                  <p className="text-red-500 text-sm ml-[40px]">
                    {formik.touched.passing_year && formik.errors.passing_year
                      ? formik.errors.passing_year
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Division
                  </label>
                  <br />
                  <select
                    name="div_grade_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.div_grade}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.div_grade?.map((data) => (
                      <option
                        selected={data?.subCatName === formik.values.div_grade}
                        value={data?.subCatName}
                      >
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[20px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Marks Obtained
                  </label>
                  <br />
                  <input
                    name="marks_obtained"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.marks_obtained}
                  />
                </div>
              </div>
              <div className="w-full mx-[20px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Total Marks
                  </label>
                  <br />
                  <input
                    name="total_marks"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.total_marks}
                  />
                </div>
              </div>
            </div>

            <div className="w-[64%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Percentage
                  </label>
                  <br />
                  <input
                    name="percentage"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.percentage}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Upload Document
                  </label>
                  <br />
                  <div className="block justify-start">
                      <label
                        htmlFor="upload_edu_doc"
                        className="form-control ml-10 h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>

                  <input
                    name="upload_edu_doc"
                    className="sr-only input2"
                    type="file"
                    id="upload_edu_doc"
                    accept=".pdf"
                    // value={formik.values.upload_edu_doc[0]}
                    onChange={(e) => {
                      formik.setFieldValue("upload_edu_doc", e.target.files[0]);
                    }}
                  />
                        {formik.values.upload_edu_doc && currentId !== null
                        ? `${formik.values.upload_edu_doc?.name}`.slice(
                            `${formik.values.upload_edu_doc?.name}`.lastIndexOf(
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
                        : formik.values.upload_edu_doc && currentId === null
                        ? formik.values.upload_edu_doc?.name
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
              className="next-btn"
            >
              {currentId!==null ? 'Update Form' : 'Add Form'}
            </button>
          </div>
          <br />
          <div className="mb-[1vh]  ">
            <div className="w-[100%] mt-[10px] flex mb-[10px] px-[5px]  max-[768px]:pl-1 max-[768px]:pr-2 overflow-auto  max-[768px]:w-[750px]">
              <table className="w-full justify-center items-center rounded-[15px] ">
                <thead className=" text-black bg-[#98D4D2] text-[17px]  w-full   arimo border border-gray h-[2vh] ">
                  <tr className="py-2 pl-4 w-full flex items-start justify-start text-center">
                    <th className="w-full flex start justify-start">S.No</th>
                    <th className="w-full flex items-start justify-start">
                      Degree Name
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Board
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Passing Year
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Division
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Marks Obtained
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Total Marks
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Percentage
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
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(index + 1)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.exam_passed_name)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.board_uni_inst)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.passing_year)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.div_grade_name)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.marks_obtained)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.total_marks)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.percentage)}
                            </td>
                            
                            <td className="w-full flex items-start justify-start">
                            <a
                            href={`${BackendUrl}/${eachValue.upload_edu_doc}`}
                              target="_blank"
                            className="text-xl text-red-700 "
                            >
                           {eachValue.upload_edu_doc ? (
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
