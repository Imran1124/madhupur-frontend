/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { MdEditSquare } from 'react-icons/md';
import * as yup from 'yup';
import { nullToNA } from '../../Components/Common/PowerupFunctions';
import Img11 from '../../assets/image 21.png';
import Nodata from '../../assets/nodata.png';
import {
  allowCharacterInput,
  allowNumberInput
} from '../../Components/Common/PowerupFunctions';

export default function ThirdForm(props) {
  const [ownerRecord, setOwnerRecord] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [MyFile, setMyFile] = useState(false);
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('employee number')
  );
  const [qualifications, setQualification] = useState();
  const [div, setDiv] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [categoryByNameData, setCategoryByNameData] = useState();
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const { api_getcategorybynameData } = ApiList();
  const getcategorybynameUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getcategorybynameData, {}, ApiHeader())
      .then(function (response) {
        console.log('Category By Name..', response?.data?.data);
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

  const updatedata = () => {
    let tempData = [...ownerRecord];
    tempData[editIndex] = formik.values;
    setOwnerRecord(tempData);
    formik.resetForm();
    setMyFile(false);
  };
  const adddata = () => {
    const isFound = ownerRecord.some((element) => {
      return element.exam_passed === formik.values.exam_passed;
    });

    if (isFound) {
      activateBottomErrorCard(
        true,
        `${formik.values.exam_passed} already exist first delete and re-enter`
      );
      formik.resetForm();
    } else if (
      formik.values.exam_passed !== '' ||
      formik.values.board !== '' ||
      formik.values.passing_year !== '' ||
      formik.values.div_grade !== '' ||
      formik.values.marks_obtained !== '' ||
      formik.values.total_marks !== '' ||
      formik.values.percentage !== '' ||
      formik.values.upload_edu_doc !== ''
    ) {
      setOwnerRecord([...ownerRecord, formik.values]);
      formik.resetForm();
    } else {
      // toast.warning("Fill Fields");
    }
  };

  const validationSchema = yup.object({
    board: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    passing_year: yup.string().matches(yearExp, 'Atleast 4 digit')
  });

  const formik = useFormik({
    initialValues: {
      exam_passed: '',
      board: '',
      passing_year: '',
      div_grade: '',
      marks_obtained: '',
      total_marks: '',
      percentage: '',
      upload_edu_doc: ''
    },

    onSubmit: () => {
      MyFile ? updatedata() : adddata();
    },
    validationSchema
  });

  const nextFun = () => {
    props?.setFormDataFun('education_detail', ownerRecord);
    props?.setCounterFun(5);
  };

  const handleback = () => {
    props?.setCounterFun(3);
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
    {
      name == 'percentage' &&
        formik.setFieldValue(
          'percentage',
          allowNumberInput(value, formik.values.percentage, 5)
        );
    }
  };

  const removesrow = (index) => {
    setOwnerRecord((current) =>
      current.filter((record) => {
        if (current.indexOf(record) == index) {
        } else {
          return record;
        }
      })
    );
  };
  const handlerow = (index, eachValue) => {
    formik.setFieldValue('exam_passed', eachValue.exam_passed);
    formik.setFieldValue('board', eachValue.board);
    formik.setFieldValue('passing_year', eachValue.passing_year);
    formik.setFieldValue('div_grade', eachValue.div_grade);
    formik.setFieldValue('marks_obtained', eachValue.marks_obtained);
    formik.setFieldValue('total_marks', eachValue.total_marks);
    formik.setFieldValue('percentage', eachValue.percentage);
    formik.setFieldValue('upload_edu_doc', eachValue.upload_edu_doc);
  };
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {isLoading && <BarLoader />}
      {/* {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />} */}
      <div className="h-[82vh] w-[70%] bg-white overflow-auto  border border-slate-300 rounded-[15px]  max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh] ">
        <form
          className=" mx-[1vh]   overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
            >
              <div className="flex w-full max-[833px]:block">
                <div className="flex justify-start items-center w-full">
                  <img
                    src={Img11}
                    alt="Basic"
                    className="mr-5 w-10 h-10 opacity-80"
                  />{' '}
                  <span className="flex items-center justify-center mt-2 text-[22px]">
                    Education Detail
                  </span>
                </div>
                <div className="text-[20px] flex items-center justify-end mt-2 w-full mr-4">
                  <span className="bg-yellow-300 p-2">
                    Employee No:{localValue}
                  </span>
                </div>
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
                    name="exam_passed"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.exam_passed}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.exam_passed?.map((data) => (
                      <option value={data?.subCatName}>
                        {data?.subCatName}
                      </option>
                    ))}
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
                    {formik.touched.board_uni_inst && formik.errors.board
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
                    name="div_grade"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.div_grade}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.div_grade?.map((data) => (
                      <option value={data?.subCatName}>
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
                  {formik.values.upload_edu_doc
                        ? formik.values.upload_edu_doc?.name
                        : "No file selected"}
                </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              // onClick={MyFile ? updatedata() : adddata()}
              // onClick={() => {
              //   MyFile ? updatedata() : adddata();
              // }}
              className="text-[20px] bg-[#fde047] float-right font-bold text-gray-600 border border-[#fde047]  py-[7px] px-[30px] mr-[70px] rounded-[5px] m-[20px] hover:text-[#fde047] hover:border-[#fde047] hover:bg-white"
            >
              {MyFile ? 'Update Form' : 'Add Form'}
            </button>
          </div>
          <br />
          <div className="mb-[1vh]  ">
            <div className="w-full mt-[10px] flex mb-[10px] px-[5px] max-[768px]:pl-1 max-[768px]:pr-2 overflow-auto max-[768px]:w-[750px]">
              <table className="w-full justify-center items-center rounded-[15px] ">
                <thead className=" text-black bg-[#98D4D2] text-[17px]  w-full   arimo border border-gray h-[2vh] ">
                  <tr className="py-2 pl-4 w-full flex items-start justify-start text-center">
                    <th className="w-full flex items-start justify-start">
                      S.No
                    </th>
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
                  {ownerRecord.length > 0 ? (
                    ownerRecord &&
                    ownerRecord.map((eachValue, index) => {
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
                              {nullToNA(eachValue.exam_passed)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.board)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.passing_year)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.div_grade)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.marks_obtained)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {eachValue.total_marks}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.percentage)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.upload_edu_doc?.name)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              <button
                                type="button"
                                onClick={() => {
                                  setMyFile(true);
                                  setEditIndex(index);
                                  handlerow(index, eachValue);
                                }}
                                className=" text-indigo-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <MdEditSquare size={20} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removesrow(index)}
                                className=" text-red-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <RiDeleteBinFill size={20} />
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
          <div className="flex items-end justify-end pb-[20px] mr-[70px] max-[768px]:block  max-[768px]:mr-0">
            <button type="button" className="back-btn" onClick={handleback}>
              BACK
            </button>
            <button onClick={() => nextFun()} className="next-btn">
              SAVE & NEXT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
