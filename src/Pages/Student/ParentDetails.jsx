/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import { pinRegExp, CATEGORY_REGEX } from '../../constant';
import * as yup from 'yup';
import Img11 from '../../assets/image 20.png';
import Img12 from '../../assets/image 24.png';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import useCommonApi from '../../Components/Hooks/useCommonApi';

export default function ParentDetails(props) {
  const { categoryByNameData } = useCommonApi();
  const [country_data, setCountry_data] = useState();
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('admission_no')
  );
  const [state_data, setState_data] = useState();
  const [district_data, setDistrict_data] = useState();
  const [qualifications, setQualification] = useState();
  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const {
    api_getcategorybynameData,
    api_getCountryData,
    api_getStateData,
    api_getDistrictData
  } = ApiList();

  useEffect(() => {}, []);

  const fun = (data) => {
    props?.setFormDataFun('parent_detail', data);
    props?.setCounterFun(3);
  };

  const initialValues = {
    fathers_name: '',
    mothers_name: '',
    fathers_mobile: '',
    mothers_mobile: '',
    fathers_email: '',
    mothers_email: '',
    fathers_qualification_id: '',
    fathers_qualification_name: '',
    mothers_qualification_id: '',
    mothers_qualification_name: '',
    fathers_occupation_id: '',
    fathers_occupation_name: '',
    mothers_occupation_id: '',
    mothers_occupation_name: '',
    fathers_annual_income: '',
    mothers_annual_income: '',
    fathers_aadhar_no: '',
    mothers_aadhar_no: '',
    fathers_image: '',
    mothers_image: '',
    guardian_name: '',
    guardian_mobile: '',
    guardian_email: '',
    guardian_occupation_id: '',
    guardian_occupation_name: '',
    guardian_qualification_id: '',
    guardian_qualification_name: '',
    guardian_aadhar_no: '',
    guardian_annual_income: '',
    relation: ''
  };
  const validationSchema = yup.object({
    fathers_name: yup
      .string()

      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    mothers_name: yup
      .string()

      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    fathers_mobile: yup
      .number()

      .min(1000000000, 'Please Enter 10 digit Mobile Number'),
    fathers_email: yup.string().email('Invalid Email'),
    // fathers_occupation_id: yup
    //   .string()
    //   .required('Please Select Fathers Occupation'),
    fathers_annual_income: yup
      .number()
      .min(5000, 'Please Enter Valid Income')
      .max(20000000000, 'Please Enter Valid Income'),
    mothers_mobile: yup
      .number()
      .min(100000000, 'Please Enter 10 digit Mobile Number'),
    mothers_email: yup.string().email('Invalid Email'),
    // mothers_occupation_id: yup
    //   .string()
    //   .required('Please Select Mothers Occupation'),
    mothers_annual_income: yup
      .number()
      .min(5000, 'Please Enter Valid Income')
      .max(20000000000, 'Please Enter Valid Income'),
    fathers_aadhar_no: yup
      .number()
      .min(100000000000, 'Please Enter 12 digit Aadhar Number'),

    mothers_aadhar_no: yup
      .number()
      .min(100000000000, 'Please Enter 12 digit Aadhar Number'),
    guardian_name: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    guardian_mobile: yup
      .number()
      .min(1000000000, 'Please Enter 10 digit Mobile Number')
      .max(1000000000, 'Please Enter 10 digit Mobile Number'),
    guardian_email: yup.string().email('Invalid Email'),

    guardian_annual_income: yup
      .number()
      .min(5000, 'Please Enter Valid Income')
      .max(2000000000, 'Please Enter Valid Income'),
    guardian_aadhar_no: yup
      .number()
      .min(100000000000, 'Please Enter 12 digit Aadhar Number'),
    guardian_mobile: yup
      .number()
      .min(1000000000, 'Please Enter 10 digit Mobile Number')
  });
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      console.log(values);
      fun(values);
    },
    validationSchema
  });
  const handleback = () => {
    props?.setCounterFun(1);
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    if (name == 'fathers_qualification_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setFatherQualification(selectName, selectValue);
      return;
    }
    if (name == 'mothers_qualification_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setMotherQualification(selectName, selectValue);
      return;
    }
    if (name == 'fathers_occupation_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setFatherOccupation(selectName, selectValue);
      return;
    }
    if (name == 'mothers_occupation_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setMotherOccupation(selectName, selectValue);
      return;
    }
    if (name == 'guardian_occupation_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setGuardianOccupation(selectName, selectValue);
      return;
    }
    if (name == 'guardian_qualification_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setGuardianQualification(selectName, selectValue);
      return;
    }
  };

  const setFatherQualification = (selectName, selectValue) => {
    formik.setFieldValue('fathers_qualification_name', selectName);
    formik.setFieldValue('fathers_qualification_id', selectValue);
  };
  const setMotherQualification = (selectName, selectValue) => {
    formik.setFieldValue('mothers_qualification_name', selectName);
    formik.setFieldValue('mothers_qualification_id', selectValue);
  };

  const setFatherOccupation = (selectName, selectValue) => {
    formik.setFieldValue('fathers_occupation_name', selectName);
    formik.setFieldValue('fathers_occupation_id', selectValue);
  };

  const setMotherOccupation = (selectName, selectValue) => {
    formik.setFieldValue('mothers_occupation_name', selectName);
    formik.setFieldValue('mothers_occupation_id', selectValue);
  };

  const setGuardianQualification = (selectName, selectValue) => {
    formik.setFieldValue('guardian_qualification_name', selectName);
    formik.setFieldValue('guardian_qualification_id', selectValue);
  };
  const setGuardianOccupation = (selectName, selectValue) => {
    formik.setFieldValue('guardian_occupation_name', selectName);
    formik.setFieldValue('guardian_occupation_id', selectValue);
  };

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {/* {isLoading && <BarLoader />} */}
      {/* {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />} */}
      <div className="h-[82vh] w-[70%] bg-white overflow-auto  border border-slate-300 rounded-[15px] max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
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
              <div className="flex w-full max-[833px]:block">
                <div className="flex justify-start items-center w-full">
                  <img
                    src={Img12}
                    alt="Basic"
                    className="mr-5 w-10 h-10 opacity-80"
                  />{' '}
                  <span className="flex items-center justify-center mt-2 text-[22px]">
                    Father Details
                  </span>
                </div>
                <div className="text-[20px] flex items-center justify-end mt-2 w-full mr-4">
                  <span className="bg-yellow-300 p-2">
                    Admission No:{localValue}
                  </span>
                </div>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Name
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('fathers_name')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.fathers_name && formik.errors.fathers_name
                      ? formik.errors.fathers_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Mobile
                  </label>
                  <br />
                  <input
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 10);
                    }}
                    className="input"
                    type="number"
                    {...formik.getFieldProps('fathers_mobile')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.fathers_mobile &&
                    formik.errors.fathers_mobile
                      ? formik.errors.fathers_mobile
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Qualification{' '}
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('fathers_qualification_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.fathers_qualification?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Occupation
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('fathers_occupation_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.fathers_occupation?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.fathers_occupation_id &&
                    formik.errors.fathers_occupation_id
                      ? formik.errors.fathers_occupation_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Email
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('fathers_email')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.fathers_email && formik.errors.fathers_email
                      ? formik.errors.fathers_email
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Annual income
                  </label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    {...formik.getFieldProps('fathers_annual_income')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.fathers_annual_income &&
                    formik.errors.fathers_annual_income
                      ? formik.errors.fathers_annual_income
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Aadhar No
                  </label>
                  <br />
                  <input
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 12);
                    }}
                    className="input"
                    type="number"
                    {...formik.getFieldProps('fathers_aadhar_no')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.fathers_aadhar_no &&
                    formik.errors.fathers_aadhar_no
                      ? formik.errors.fathers_aadhar_no
                      : null}
                  </p>
                </div>
              </div>
              {/* <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label
                    htmlFor="exampleCategory"
                    className="flex items-start justify-start ml-[43px] mb-[-15px]  text-[1.9vh] text-[#696969]"
                  >
                    Image
                  </label>
                  <br />
                  <div className="block justify-start">
                    <label
                      htmlFor="fathers_image"
                      className="form-control ml-[36px] mt-[-10px]  rounded-[10px] h-10 block w-full border border-gray-200 px-3 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      Choose File
                    </label>
                    <input
                      name="fathers_image"
                      type="file"
                      id="fathers_image"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only input2"
                      onChange={(e) => {
                        formik.setFieldValue(
                          'fathers_image',
                          e.target.files[0]
                        );
                      }}
                      // value={formik.values.fathers_image[0]}
                    />
                    {formik.values.fathers_image
                      ? formik.values.fathers_image?.name
                      : 'No file selected'}
                  </div>
                </div>
              </div> */}
              <div className="w-full mx-[10px]  px-[10px]" />
            </div>
          </div>

          {/* mothers */}
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
            >
              <div className="flex">
                <img
                  src={Img12}
                  alt="Basic"
                  className="mr-5 w-10 h-10 opacity-80"
                />{' '}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Mother's Details
                </span>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Name
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('mothers_name')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mothers_name && formik.errors.mothers_name
                      ? formik.errors.mothers_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Mobile
                  </label>
                  <br />
                  <input
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 10);
                    }}
                    className="input"
                    type="number"
                    {...formik.getFieldProps('mothers_mobile')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mothers_mobile &&
                    formik.errors.mothers_mobile
                      ? formik.errors.mothers_mobile
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Qualification
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('mothers_qualification_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.mothers_qualification?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Occupation
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('mothers_occupation_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.mothers_occupation?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mothers_occupation_id &&
                    formik.errors.mothers_occupation_id
                      ? formik.errors.mothers_occupation_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Email
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('mothers_email')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mothers_email && formik.errors.mothers_email
                      ? formik.errors.mothers_email
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Annual income
                  </label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    {...formik.getFieldProps('mothers_annual_income')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mothers_annual_income &&
                    formik.errors.mothers_annual_income
                      ? formik.errors.mothers_annual_income
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Aadhar No
                  </label>
                  <br />
                  <input
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 12);
                    }}
                    className="input"
                    type="number"
                    {...formik.getFieldProps('mothers_aadhar_no')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mothers_aadhar_no &&
                    formik.errors.mothers_aadhar_no
                      ? formik.errors.mothers_aadhar_no
                      : null}
                  </p>
                </div>
              </div>
              {/* <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label
                    htmlFor="exampleCategory"
                    className="flex items-start justify-start ml-[43px] mb-[-15px]  text-[1.9vh] text-[#696969]"
                  >
                    Image
                  </label>
                  <br />
                  <div className="block justify-start">
                    <label
                      htmlFor="mothers_image"
                      className="form-control ml-[36px] mt-[-10px]  rounded-[10px] h-10 block w-full border border-gray-200 px-3 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      Choose File
                    </label>
                    <input
                      name="mothers_image"
                      type="file"
                      id="mothers_image"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only input2"
                      onChange={(e) => {
                        formik.setFieldValue(
                          'mothers_image',
                          e.target.files[0]
                        );
                      }}
                      // value={formik.values.fathers_image[0]}
                    />
                    {formik.values.mothers_image
                      ? formik.values.mothers_image?.name
                      : 'No file selected'}
                  </div>
                </div>
              </div> */}
              <div className="w-full mx-[10px]  px-[10px]" />
            </div>
          </div>

          {/* Guardian detail */}
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
            >
              <div className="flex">
                <img
                  src={Img12}
                  alt="Basic"
                  className="mr-5 w-10 h-10 opacity-80"
                />{' '}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Guardian's Details
                </span>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Name
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('guardian_name')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.guardian_name && formik.errors.guardian_name
                      ? formik.errors.guardian_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Mobile
                  </label>
                  <br />
                  <input
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 10);
                    }}
                    className="input"
                    type="number"
                    {...formik.getFieldProps('guardian_mobile')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.guardian_mobile &&
                    formik.errors.guardian_mobile
                      ? formik.errors.guardian_mobile
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Qualification
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('guardian_qualification_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.fathers_qualification?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Occupation
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('guardian_occupation_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.fathers_occupation?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Email
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('guardian_email')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.guardian_email &&
                    formik.errors.guardian_email
                      ? formik.errors.guardian_email
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Annual income
                  </label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    {...formik.getFieldProps('guardian_annual_income')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.guardian_annual_income &&
                    formik.errors.guardian_annual_income
                      ? formik.errors.guardian_annual_income
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Aadhar No
                  </label>
                  <br />
                  <input
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 12);
                    }}
                    className="input"
                    type="number"
                    {...formik.getFieldProps('guardian_aadhar_no')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.guardian_aadhar_no &&
                    formik.errors.guardian_aadhar_no
                      ? formik.errors.guardian_aadhar_no
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Relation
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('relation')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.nominee_relation?.map((data) => (
                      <option value={data?.subCatName}>
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]" />
            </div>
          </div>

          <div className="flex items-end justify-end pb-[150px] max-[768px]:block">
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
