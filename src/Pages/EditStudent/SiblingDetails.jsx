/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { MdEditSquare } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import Img11 from '../../assets/image 24.png';
import Nodata from '../../assets/nodata.png';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiHeader2 from '../../Components/ApiList/ApiHeader2';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import { nullToNA } from '../../Components/Common/PowerupFunctions';
import useCommonApi from '../../Components/Hooks/useCommonApi';

export default function SevenForm(props) {
  const { api_getactiveClassData, api_getactiveSectionData } = ApiList();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [ownerRecord, setOwnerRecord] = useState([]);
  const [getClass, setClass] = useState([
    { class_id: '1', class_name: 'test' }
  ]);
  const [getSection, setSection] = useState([
    { section_id: '1', section_name: 'test' }
  ]);
  const [isLoading, setisLoading] = useState(false);

  // get class data
  const getClassFunc = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        console.log('Class Data..12121', response?.data?.data);
        if (response?.data?.status) {
          setClass(response?.data?.data);
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

  // get section data by section id
  const getSectionData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveSectionData, {}, ApiHeader())
      .then(function (response) {
        console.log('section Data..', response?.data);
        if (response?.data?.status) {
          setSection(response?.data?.data);
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
    getClassFunc();
    getSectionData();
  }, []);

  const formik = useFormik({
    initialValues: {
      sibling_name: '',
      sibling_class: '',
      sibling_section: '',
      sibling_admission_no: '',
      roll_no: '',
      sibling_data: []
    },

    onSubmit: (data) => {
      func(data?.sibling_data);

      //   props?.setCounterFun(8);
    }
  });

  const func = (data) => {
    props?.setFormDataFun('sibling_details', data);
    props?.setCounterFun(6);
  };

  const handleAdd = () => {
    if (
      formik.values.sibling_name === '' ||
      formik.values.sibling_class === '' ||
      formik.values.sibling_section === '' ||
      formik.values.sibling_admission_no === '' ||
      formik.values.roll_no === ''
    )
      return;
    formik.setFieldValue('sibling_data', [
      ...formik.values.sibling_data,
      {
        sibling_name: formik.values.sibling_name,
        sibling_class: formik.values.sibling_class,
        sibling_section: formik.values.sibling_section,
        sibling_admission_no: formik.values.sibling_admission_no,
        roll_no: formik.values.roll_no
      }
    ]);
    formik.setFieldValue('sibling_name', '');
    formik.setFieldValue('sibling_class', '');
    formik.setFieldValue('sibling_section', '');
    formik.setFieldValue('sibling_admission_no', '');
    formik.setFieldValue('roll_no', '');
  };

  const handleEdit = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    formik.setFieldValue(
      'sibling_name',
      formik.values.sibling_data[index].sibling_name
    );
    formik.setFieldValue(
      'sibling_class',
      formik.values.sibling_data[index].sibling_class
    );
    formik.setFieldValue(
      'sibling_section',
      formik.values.sibling_data[index].sibling_section
    );
    formik.setFieldValue(
      'sibling_admission_no',
      formik.values.sibling_data[index].sibling_admission_no
    );
    formik.setFieldValue('roll_no', formik.values.sibling_data[index].roll_no);
  };

  const handleback = () => {
    props?.setCounterFun(4);
  };

  const updatedata = () => {
    const data = {
      sibling_name: formik.values.sibling_name,
      sibling_class: formik.values.sibling_class,
      sibling_section: formik.values.sibling_section,
      sibling_admission_no: formik.values.sibling_admission_no,
      roll_no: formik.values.roll_no
    };
    const list = [...formik.values.sibling_data];
    list.splice(editIndex, 1, data);
    formik.setFieldValue('sibling_data', list);
    formik.setFieldValue('sibling_name', '');
    formik.setFieldValue('sibling_class', '');
    formik.setFieldValue('sibling_section', '');
    formik.setFieldValue('sibling_admission_no', '');
    formik.setFieldValue('roll_no', '');
    setIsEdit(false);
  };

  const handleDelete = (index) => {
    const list = [...formik.values.sibling_data];
    list.splice(index, 1);
    formik.setFieldValue('sibling_data', list);
  };

  const handleOnChange = (e) => {};

  return (
    <>
      {/* {isLoading && <BarLoader />} */}

      {/* {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />} */}
      <div className="h-[72vh] lg:h-[82vh] w-[70%] bg-white overflow-scroll  border border-slate-300 rounded-[15px]   max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" ml-[1vh] bg-white  "
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
                />{' '}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Sibling Details
                </span>
              </div>
            </h1>
            <hr className="mx-[40px]" />

            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Name
                  </label>
                  <br />
                  <input
                    className="input"
                    {...formik.getFieldProps('sibling_name')}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Class
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('sibling_class')}
                  >
                    <option value="">Select</option>
                    {getClass?.map((data) => (
                      <option value={data?.id}>{data?.class_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Section
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('sibling_section')}
                  >
                    <option value="">Select</option>
                    {getSection?.map((data) => (
                      <option value={data?.id}>{data?.section_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px]  px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Admission no
                  </label>
                  <br />
                  <input
                    className="input"
                    {...formik.getFieldProps('sibling_admission_no')}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Roll no
                  </label>
                  <br />
                  <input
                    className="input"
                    {...formik.getFieldProps('roll_no')}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                {/* <button
                  type="button"
                  className="w-full lg:w-20 mt-6 ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Small
                </button> */}
                <button
                  type="button"
                  onClick={isEdit ? updatedata : handleAdd}
                  className="block bg-[#fde047] float-right font-bold text-gray-600 border border-[#fde047]   lg:mr-[80px] py-[7px] px-[30px] rounded-[5px] m-[20px] hover:text-[#fde047] hover:border-[#fde047] hover:bg-white"
                >
                  {isEdit ? 'Update Form' : 'Add Form'}
                </button>
              </div>
            </div>
            <div className="w-[90%] mt-[30px] flex mx-auto  mb-[20px]  ">
              <div className="mb-[1vh]  overflow-scroll">
                <table className="justify-center items-center">
                  <thead className=" text-black bg-[#98D4D2] text-[20px]  w-full   arimo border border-gray h-[2vh] ">
                    <tr className="py-2  w-full flex   text-center">
                      <th className="w-[10vh] flex items-center  justify-center">
                        S.No
                      </th>
                      <th className="w-[21vh] flex ">Name</th>
                      <th className="w-[21vh] flex ">Class</th>
                      <th className="w-[21vh] flex ">Section</th>
                      <th className="w-[21vh] flex ">Admission no</th>
                      <th className="w-[21vh] flex ">Roll no</th>
                      <th className="w-[21vh] flex ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik?.values?.sibling_data.length > 0 ? (
                      formik?.values?.sibling_data &&
                      formik?.values?.sibling_data.map((eachValue, index) => {
                        return (
                          <>
                            <tr
                              className="py-2 pl-4 w-full text-[16px] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100"
                              key={index}
                            >
                              <td className="w-[10vh] flex items-start justify-start">
                                {nullToNA(index + 1)}
                              </td>
                              <td className="w-[21vh] flex items-start justify-start">
                                {nullToNA(eachValue.sibling_name)}
                              </td>
                              <td className="w-[21vh] flex items-start justify-start">
                                {nullToNA(
                                  getClass?.find(
                                    (item) =>
                                      item?.id == eachValue?.sibling_class
                                  )?.class_name
                                )}
                              </td>
                              <td className="w-[21vh] flex items-start justify-start">
                                {nullToNA(
                                  getSection?.find(
                                    (item) =>
                                      item?.id == eachValue?.sibling_section
                                  )?.section_name
                                )}
                              </td>
                              <td className="w-[21vh] flex items-start justify-start">
                                {nullToNA(eachValue.sibling_admission_no)}
                              </td>
                              <td className="w-[21vh] flex items-start justify-start">
                                {nullToNA(eachValue.roll_no)}
                              </td>
                              <td className="w-[21vh] flex items-start justify-start">
                                <button
                                  type="button"
                                  className=" text-indigo-600 px-[5px] py-[2px] rounded-[5px]"
                                  onClick={() => handleEdit(index)}
                                >
                                  <MdEditSquare size={20} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(index)}
                                  className="text-red-600 px-[5px] py-[2px] rounded-[5px]"
                                >
                                  {' '}
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
          </div>
          <br />

          <div className="flex items-end justify-end pb-[150px] mr-[70px] max-[425px]:block  max-[425px]:mr-0">
            <button type="button" className="back-btn" onClick={handleback}>
              BACK
            </button>
            <button type="submit" className="next-btn">
              SAVE & NEXT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
