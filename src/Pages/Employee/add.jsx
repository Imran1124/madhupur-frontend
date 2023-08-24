/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { useFormik } from 'formik';
import { disabilities } from '../../constant';
import * as yup from 'yup';
import { phoneRegExp, aadharRegExp } from '../../constant';
import BarLoader from '../../Components/Common/BarLoader';
import { useNavigate } from 'react-router';
import { CATEGORY_REGEX, EMAIL_REGEX } from '../../constant';
import moment from 'moment';
import Img11 from '../../assets/image 11.png';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';

export default function add(props) {
  const [MyFile, setMyFile] = useState();
  const navigate = useNavigate();
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('employee number')
  );
  const [handleDate, sethandleDate] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [categoryByNameData, setCategoryByNameData] = useState();
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [salutationvalue, setSalutationvalue] = useState();
  const [bloodgroup, setBloodgroup] = useState();
  const [gendervalue, setGendervalue] = useState();
  const [martial, setMartial] = useState();
  const [aadharExist, setAadharExist] = useState('');
  const [categoryes, setCategory] = useState();
  const [department_name, setDepartment_name] = useState();
  const [employment_name, setEmployment_name] = useState();
  const [teaching_type, setTeaching_type] = useState();
  const {
    api_getcategorybynameData,
    api_getActivedepartmentData,
    api_get_active_employmenttypeData,
    api_get_active_teachingtitleData,
    api_aadharcheck
  } = ApiList();
  useEffect(() => {
    getcategorybynameUser();
    getdepartmentUser();
    getemploymenttypeUser();
    getteachingtitleUser();
  }, []);
  const getcategorybynameUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getcategorybynameData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          setCategoryByNameData(response?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  const getdepartmentUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getActivedepartmentData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setDepartment_name(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  const getemploymenttypeUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_get_active_employmenttypeData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setEmployment_name(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  const getteachingtitleUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_get_active_teachingtitleData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setTeaching_type(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  localStorage.getItem('employee number');
  const initialValues = {
    salutation: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    category: '',
    dob: '',
    doj: '',
    mobile: '',
    email: '',
    blood_group: '',
    department_id: '',
    department_name: '',
    employee_type_id: '',
    employee_type_name: '',
    marital_status: '',
    teaching_title_id: '',
    teaching_title_name: '',
    upload_image: '',
    aadhar_no: '',
    disability: ''
  };

  const validationSchema = yup.object({
    salutation: yup.string().required('Select salutation'),
    first_name: yup
      .string()
      .required('Enter first name')
      .matches(CATEGORY_REGEX, 'Enter first name in alphabets (A-Z / a-z) '),
    middle_name: yup
      .string()
      .matches(CATEGORY_REGEX, 'Enter middle name in alphabets (A-Z / a-z)'),
    last_name: yup
      .string()
      .required('Enter last name')
      .matches(CATEGORY_REGEX, 'Enter last name in alphabets (A-Z / a-z)'),
    gender: yup.string().required('Select gender'),
    category: yup.string().required('Select category'),
    mobile: yup
      .string()
      .required('Enter mobile number')
      .matches(phoneRegExp, 'Enter valid mobile no.'),
    aadhar_no: yup
      .string()
      .required('Aadhar Number is required')
      .matches(
        aadharExist || aadharRegExp,
        'Employee Aadhar either Already Existing or not Valid'
      ),
    email: yup.string().matches(EMAIL_REGEX, 'Email is inValid'),
    dob: yup
      .string()
      .required('Select dob')
      .test(
        'dob',
        'Date of birth is not valid. Age should be greater than 18 years',
        (value) => {
          return moment().diff(moment(value), 'years') >= 18;
        }
      ),
    doj: yup.string().required('Select doj'),
    blood_group: yup.string().required('Select blood group'),
    department_id: yup.string().required('Select department'),
    employee_type_id: yup.string().required('Select blood group'),
    marital_status: yup.string().required('Select marital status'),
    teaching_title_id: yup.string().required('Select teaching title'),
    disability: yup.string().required('Select special ability')
  });
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      console.log(values);
      props?.setFormDataFun('basic_detail', values);
      props?.setCounterFun(2);
    },
    validationSchema
  });
  // const handleback = () => {
  //   navigate("/employee/number");
  // };
  useEffect(() => {
    aadharCheck(formik.values.aadhar_no);
  }, [formik.values.aadhar_no]);
  const aadharCheck = (value) => {
    setisLoading(true);
    AxiosInterceptors.post(api_aadharcheck, { aadharNo: value }, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setAadharExist(response?.data?.message);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    if (name == 'mobile') {
      let selectMobile = e.target.value;
      selectMobileNumber(selectMobile);
    }

    if (name == 'aadhar_no') {
      let selectAadhar = e.target.value;
      selectAadharNumber(selectAadhar);
    }
    if (name == 'department_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setDepartmentValue(selectName, selectedValue);
      return;
    }
    if (name == 'employee_type_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setEmploymentValue(selectName, selectedValue);
      return;
    }
    if (name == 'teaching_title_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setTeachingValue(selectName, selectedValue);
      return;
    }
  };
  const setTeachingValue = (selectName, selectedValue) => {
    formik.setFieldValue('teaching_title_name', selectName);
    formik.setFieldValue('teaching_title_id', selectedValue);
  };
  const setEmploymentValue = (selectName, selectedValue) => {
    formik.setFieldValue('employee_type_name', selectName);
    formik.setFieldValue('employee_type_id', selectedValue);
  };
  const setDepartmentValue = (selectName, selectedValue) => {
    formik.setFieldValue('department_name', selectName);
    formik.setFieldValue('department_id', selectedValue);
  };
  const selectAadharNumber = (selectAadhar) => {
    if (selectAadhar > 12) {
      formik.setFieldValue('aadhar_no', selectAadhar.slice(0, 12));
    }
  };

  const selectMobileNumber = (selectMobile) => {
    if (selectMobile.length > 10) {
      formik.setFieldValue('mobile', selectMobile.slice(0, 10));
    }
  };

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {' '}
      {isLoading && <BarLoader />}
      {/* {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />} */}
      <div className="h-[82vh] w-[71%] bg-white overflow-y-auto   border border-slate-300 rounded-[15px] max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" ml-[1vh]   overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]  ">
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
                    Basic Details
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
                  <label htmlFor="exampleSatulations" className="label">
                    Select Salutation <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    type="select"
                    name="salutation"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.salutation}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.salutation?.map((data) => {
                      return (
                        <option value={data?.subCatName}>
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.salutation && formik.errors.salutation
                      ? formik.errors.salutation
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    name="first_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />

                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.first_name && formik.errors.first_name
                      ? formik.errors.first_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className=" label2">
                    Middle Name
                  </label>
                  <input
                    name="middle_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.middle_name}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.middle_name && formik.errors.middle_name
                      ? formik.errors.middle_name
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className=" label">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    name="last_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.last_name && formik.errors.last_name
                      ? formik.errors.last_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="examplePassword" className="label2">
                    Mobile number <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="mobile"
                    className="input"
                    type="number"
                    maxLength={10}
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.mobile && formik.errors.mobile
                      ? formik.errors.mobile
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Email Id
                  </label>
                  <br />
                  <input
                    name="email"
                    className="input"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px] px-[10px] ">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="gender"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.gender?.map((data) => {
                      return (
                        <option value={data?.subCatName}>
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.gender && formik.errors.gender
                      ? formik.errors.gender
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px] px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="category"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.category?.map((data) => (
                      <option value={data?.subCatName}>
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.category && formik.errors.category
                      ? formik.errors.category
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="examplePassword" className="label2">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    className="input"
                    name="dob"
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.dob && formik.errors.dob
                      ? formik.errors.dob
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="examplePassword" className="label2">
                    Date of Joining <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    className="input"
                    name="doj"
                    min={formik.values.dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={formik.handleChange}
                    value={formik.values.doj}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.doj && formik.errors.doj
                      ? formik.errors.doj
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Blood Group <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="blood_group"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.blood_group}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.blood_group?.map((data) => {
                      return (
                        <option value={data?.subCatName}>
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.blood_group && formik.errors.blood_group
                      ? formik.errors.blood_group
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Department <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="department_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.department_id}
                  >
                    <option value="">Select</option>
                    {department_name?.map((data) => (
                      <option value={data?.id}>{data?.department_name}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.department_id && formik.errors.department_id
                      ? formik.errors.department_id
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start ">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Employement Type <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="employee_type_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.employee_type_id}
                  >
                    <option value="">Select</option>
                    {employment_name?.map((data) => (
                      <option value={data?.id}>{data?.emp_type_name}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.employee_type_id &&
                    formik.errors.employee_type_id
                      ? formik.errors.employee_type_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Martial Status <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="marital_status"
                    className="input"
                    type="select"
                    onChange={formik.handleChange}
                    value={formik.values.marital_status}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.marital_status?.map((data) => (
                      <option value={data?.subCatName}>
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.marital_status &&
                    formik.errors.marital_status
                      ? formik.errors.marital_status
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Teaching Title <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="teaching_title_id"
                    className="input"
                    type="select"
                    onChange={formik.handleChange}
                    value={formik.values.teaching_title_id}
                  >
                    <option value="">Select</option>
                    {teaching_type?.map((data) => (
                      <option value={data?.id}>
                        {data?.teaching_title_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.teaching_title_id &&
                    formik.errors.teaching_title_id
                      ? formik.errors.teaching_title_id
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Aadhaar Number<span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    name="aadhar_no"
                    className="input"
                    type="number"
                    maxLength={12}
                    onChange={formik.handleChange}
                    value={formik.values.aadhar_no}
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.aadhar_no && formik.errors.aadhar_no
                      ? formik.errors.aadhar_no
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Special Ability <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="disability"
                    className="input"
                    type="select"
                    onChange={formik.handleChange}
                    value={formik.values.disability}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.disability?.map((data) => {
                      return (
                        <option value={data?.subCatName}>
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.disability && formik.errors.disability
                      ? formik.errors.disability
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px] mr-[20px]">
                <div>
                  <label
                    htmlFor="exampleCategory"
                    className="flex items-start justify-start ml-[43px] mb-[-15px]  text-[1.9vh] text-[#696969]"
                  >
                    Upload Image
                  </label>
                  <br />
                  <div className="block justify-start">
                    <label
                      htmlFor="upload_image"
                      className="form-control ml-[36px] mt-[-10px] rounded-[10px] h-10 block w-full border border-gray-200 px-3 py-2 2xl:py-1.5  2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      Choose File
                    </label>
                    <input
                      name="upload_image"
                      type="file"
                      id="upload_image"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only input2"
                      // value={formik.values.upload_image[0]}
                      onChange={(e) => {
                        formik.setFieldValue('upload_image', e.target.files[0]);
                      }}
                    />
                    {formik.values.upload_image
                      ? formik.values.upload_image?.name
                      : 'No file selected'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end pb-[20px] mr-[30px]">
            <button type="submit" className="next-btn">
              SAVE & NEXT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
