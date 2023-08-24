/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import Select from 'react-select';
// -
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
import useCommonApi from '../../Components/Hooks/useCommonApi';
import useErrorAutoFocusField from '../../Components/Hooks/useErrorAutoFocusField';
import BackendUrl from '../../Components/ApiList/BackendUrl';
// extra curricular activities
const options = [
  { value: 'RED', label: 'Extra curricular activities1' },
  { value: 'GREEN', label: 'Extra curricular activities2' },
  { value: 'BLUE', label: 'Extra curricular activities3' }
];

export default function add(props) {
  const { editLoading } = props;
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const [multiSelect, setMultiSelect] = useState([]);
  const { categoryByNameData } = useCommonApi();
  const [MyFile, setMyFile] = useState();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [bloodgroup, setBloodgroup] = useState();
  const [getClass, setClass] = useState([]);
  const [getSection, setSection] = useState([]);
  const {
    api_getactiveClassData,
    api_getactiveSectionData,
    api_getextracurricular
  } = ApiList();

  // get class data
  const getClassFunc = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        console.log('Class Data..', response?.data?.data);
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

  console.log(props?.editValue?.upload_image);
  // get section data by section id
  const getSectionData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveSectionData, {}, ApiHeader())
      .then(function (response) {
        console.log('section Data..', response?.data?.data);
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

  // const getExtraCurricularData = () => {
  //   setisLoading(true);
  //   AxiosInterceptors.post(api_getextracurricular, {}, ApiHeader())
  //     .then(function (response) {
  //       console.log("extra Data..", response?.data?.data);
  //       if (response?.data?.status) {
  //         response?.data?.data?.map((item) => {
  //           setMultiSelect((prev) => [
  //             ...prev,
  //             { value: item?.id, label: item?.extracurricular_name },
  //           ]);
  //         });
  //         // setMultiSelect(response?.data?.data);
  //       } else {
  //         activateBottomErrorCard(true, "Error occured while fetching data.");
  //       }
  //       setisLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log("==2 error list...", error);
  //       activateBottomErrorCard(true, "Error occured while fetching data.");

  //       setisLoading(false);
  //     });
  // };

  useEffect(() => {
    getClassFunc();
    getSectionData();
    // getExtraCurricularData();
  }, []);
  console.log(props?.editValue);
  const initialValues = {
    first_name: props?.editValue?.first_name || '',
    middle_name: props?.editValue?.middle_name || '',
    last_name: props?.editValue?.last_name || '',
    class_id: props?.editValue?.class_id || '',
    class_name: props?.editValue?.class_name || '',
    section_id: props?.editValue?.section_id || '',
    section_name: props?.editValue?.section_name || '',
    dob: props?.editValue?.dob || '',
    admission_date: props?.editValue?.admission_date || '',
    gender_id: props?.editValue?.gender_id || '',
    gender_name: props?.editValue?.gender_name || '',
    category_id: props?.editValue?.category_id || '',
    category_name: props?.editValue?.category_name || '',
    roll_number: props?.editValue?.roll_no || '',
    disability_id: props?.editValue?.disability || '',
    disability_name: props?.editValue?.disability_name || '',
    religion_id: props?.editValue?.religion_id || '',
    religion_name: props?.editValue?.religion_name || '',
    caste_id: props?.editValue?.caste_id || '',
    caste_name: props?.editValue?.caste_name || '',
    mobile: props?.editValue?.mobile || '',
    email: props?.editValue?.email || '',
    blood_group_id: props?.editValue?.blood_group_id || '',
    blood_group_name: props?.editValue?.blood_group_name || '',
    ward_id: props?.editValue?.house_ward_id || '',
    ward_name: props?.editValue?.house_ward_name || '',
    upload_image: '',
    aadhar_no: props?.editValue?.aadhar_no || '',
    // concession_type_id: '',
    // concession_type_name: '',
    last_school_name: props?.editValue?.last_school_name || '',
    last_school_address: props?.editValue?.last_school_address || '',
    admission_mid_session: props?.editValue?.admission_mid_session || false,
    admission_month_id: props?.editValue?.admission_month_id || '',
    admission_month: props?.editValue?.admission_month || ''
    // extra_curricular_activity: []
  };

  const validationSchema = yup.object({
    first_name: yup
      .string()
      .required()
      .matches(
        CATEGORY_REGEX,
        'First name must match the following (A-Z / a-z)'
      )
      .min(3)
      .max(50)
      .label('First name'),
    middle_name: yup
      .string()
      .matches(
        CATEGORY_REGEX,
        'Middle name must match the following (A-Z / a-z)'
      )
      .min(3)
      .max(50)
      .label('Middle name'),
    last_name: yup
      .string()
      .required()
      .matches(CATEGORY_REGEX, 'Last name must match the following (A-Z / a-z)')
      .min(3)
      .max(50)
      .label('Last name'),
    class_id: yup.string().required('Select class'),
    section_id: yup.string().when('class_id', {
      is: (val) => val == 13 || val == 14 || val == 15 || val == 16,
      then: (validationSchema) => validationSchema.notRequired(),
      otherwise: (validationSchema) =>
        validationSchema.required('Select section')
    }),
    dob: yup
      .date()
      .required('Date of birth is required')
      .max(moment().subtract(2, 'years'), 'Age should be greater than 3 years')
      .label('Date of birth'),
    // admission date should be greater than 2 years from dob
    admission_date: yup
      .date()
      .required('Admission date is required')
      .min(yup.ref('dob'), 'Admission date should be greater than DOB'),
    //
    gender_id: yup.string().required('Select gender'),
    category_id: yup.string().required('Select category'),
    roll_number: yup.string().required('Enter roll number').min(1).max(8),
    disability_id: yup.string().required('Select special ability'),
    caste_id: yup.string().required('Select caste'),
    mobile: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Enter valid mobile no.')
      .label('Mobile no'),
    aadhar_no: yup.string().matches(aadharRegExp, 'Enter valid Aadhar no.'),
    email: yup.string().matches(EMAIL_REGEX, 'Email is inValid'),

    blood_group_id: yup.string().required('Select blood group'),
    religion_id: yup.string().required('Select religion'),
    ward_id: yup.string().required('Select ward'),
    last_school_name: yup.string().min(3).max(50).label('Last school name'),
    last_school_address: yup
      .string()
      .min(3)
      .max(50)
      .label('Last school address')
    // if admission_mid_session is true then admission_month_id is required?
    // admission_mid_session: yup.boolean(),
    // admission_month_id: yup.string().when('admission_mid_session', {
    //   is: (admission_mid_session) => admission_mid_session == true,
    //   then: yup.string().required('Field is required')
    // })
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    onSubmit: (values) => {
      console.log(values);
      // const convertToKeyPair = formik.values.extra_curricular_activity.map(
      //   (obj) => {
      //     return {
      //       id: obj.label,
      //       name: obj.value,
      //     };
      //   }
      // );
      // props?.setFormDataFun("basic_detail", {
      //   // ...values,
      //   // extra_curricular_activity: convertToKeyPair,
      // });
      props?.setFormDataFun('basic_detail', values), props?.setCounterFun(2);
    },
    validationSchema
  });

  const handleOnChange = (e) => {
    let name = e.target.name;

    if (name === 'class_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setClassId(selectName, selectValue);
    }

    if (name === 'section_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setSectionId(selectName, selectValue);
    }

    if (name === 'religion_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setReligion(selectName, selectValue);
    }
    if (name === 'caste_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setCaste(selectName, selectValue);
    }
    if (name === 'disability_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setDisability(selectName, selectValue);
    }

    if (name === 'gender_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setGender(selectName, selectValue);
    }
    if (name == 'mobile') {
      let selectMobile = e.target.value;
      selectMobileNumber(selectMobile);
    }
    if (name == 'aadhar_no') {
      let selectAadhar = e.target.value;
      selectAadharNumber(selectAadhar);
    }

    if (name == 'blood_group_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setBloodGroup(selectName, selectedValue);
      return;
    }
    if (name == 'category_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setCategory(selectName, selectedValue);
      return;
    }
    if (name == 'ward_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setWard(selectName, selectedValue);
      return;
    }

    if (name === 'admission_month_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setAdmissionMonth(selectName, selectedValue);
      return;
    }
  };

  const setClassId = (selectName, selectedValue) => {
    formik.setFieldValue('class_name', selectName);
    formik.setFieldValue('class_id', selectedValue);
  };

  const setSectionId = (selectName, selectedValue) => {
    formik.setFieldValue('section_name', selectName);
    formik.setFieldValue('section_id', selectedValue);
  };

  const setReligion = (selectName, selectedValue) => {
    formik.setFieldValue('religion_name', selectName);
    formik.setFieldValue('religion_id', selectedValue);
  };

  const setCaste = (selectName, selectedValue) => {
    formik.setFieldValue('caste_name', selectName);
    formik.setFieldValue('caste_id', selectedValue);
  };

  const setDisability = (selectName, selectedValue) => {
    formik.setFieldValue('disability_name', selectName);
    formik.setFieldValue('disability_id', selectedValue);
  };
  const setCategory = (selectName, selectedValue) => {
    formik.setFieldValue('category_name', selectName);
    formik.setFieldValue('category_id', selectedValue);
  };
  const setGender = (selectName, selectedValue) => {
    formik.setFieldValue('gender_name', selectName);
    formik.setFieldValue('gender_id', selectedValue);
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
  const setBloodGroup = (selectName, selectedValue) => {
    formik.setFieldValue('blood_group_name', selectName);
    formik.setFieldValue('blood_group_id', selectedValue);
  };

  const setWard = (selectName, selectedValue) => {
    formik.setFieldValue('ward_name', selectName);
    formik.setFieldValue('ward_id', selectedValue);
  };

  const setAdmissionMonth = (selectName, selectedValue) => {
    formik.setFieldValue('admission_month', selectName);
    formik.setFieldValue('admission_month_id', selectedValue);
  };

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  React.useEffect(() => {
    const { isValid, submitCount, isSubmitting, errors } = formik;
    AutoFocusErrorField({ isValid, submitCount, isSubmitting, errors });
  }, [formik.errors, formik.submitCount, formik.isSubmitting]);
  //
  return (
    <>
      {' '}
      {editLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <div className="h-[90vh] w-[71%] bg-white overflow-y-auto   border border-slate-300 rounded-[15px] max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" ml-[1vh] overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]  ">
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
                  Basic Details
                </span>
              </div>
            </h1>
            <hr className="lg:mx-[40px] mx-auto" />

            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('first_name')}
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
                    className="input"
                    type="text"
                    {...formik.getFieldProps('middle_name')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.middle_name && formik.errors.middle_name
                      ? formik.errors.middle_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('last_name')}
                  />

                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.last_name && formik.errors.last_name
                      ? formik.errors.last_name
                      : null}
                  </p>
                </div>
              </div>
            </div>
            {/* basic detail row 1  */}
            <div className="w-[95%] mb-[2vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleClass" className="label">
                    Class <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="class_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.class_id}
                  >
                    <option value="">Select</option>
                    {getClass?.map((data) => (
                      <option
                        selected={data?.id == formik.values.class_id}
                        value={data?.id}
                      >
                        {data?.class_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.class_id && formik.errors.class_id
                      ? formik.errors.class_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSection" className="label">
                    Section <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="section_id"
                    className="input"
                    {...formik.getFieldProps('section_id')}
                    disabled={
                      formik.values.class_id == 13 ||
                      formik?.values?.class_id == 14 ||
                      formik?.values?.class_id == 15 ||
                      formik?.values?.class_id == 16
                    }
                  >
                    <option value="">Select</option>
                    {getSection?.map((data) => (
                      <option value={data?.id}>{data?.section_name}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.section_id && formik.errors.section_id
                      ? formik.errors.section_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleDob" className="label2">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    className="input"
                    {...formik.getFieldProps('dob')}
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
              <div className="w-full mx-[10px] px-[10px] ">
                <div>
                  <label htmlFor="exampleDob" className="label2">
                    Admission Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    className="input"
                    {...formik.getFieldProps('admission_date')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.admission_date &&
                    formik.errors.admission_date
                      ? formik.errors.admission_date
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px] px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="gender_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.gender_id}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.gender?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.gender_id && formik.errors.gender_id
                      ? formik.errors.gender_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="category_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.category_id}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.category?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.category_id && formik.errors.category_id
                      ? formik.errors.category_id
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Roll number <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    {...formik.getFieldProps('roll_number')}
                  />

                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.roll_number && formik.errors.roll_number
                      ? formik.errors.roll_number
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
                    className="input"
                    {...formik.getFieldProps('disability_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.disability?.map((data) => (
                      <option value={data?.subCatName}>
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.disability_id && formik.errors.disability_id
                      ? formik.errors.disability_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Religion <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="religion_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.religion_id}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.religion?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.religion_id && formik.errors.religion_id
                      ? formik.errors.religion_id
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start ">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Caste <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('caste_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.caste?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.caste_id && formik.errors.caste_id
                      ? formik.errors.caste_id
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
                    className="input"
                    type="number"
                    maxLength={10}
                    {...formik.getFieldProps('mobile')}
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
                    className="input"
                    type="email"
                    {...formik.getFieldProps('email')}
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
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Aadhaar Number
                  </label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    maxLength={12}
                    {...formik.getFieldProps('aadhar_no')}
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
                    Blood Group <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    name="blood_group_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.blood_group_id}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.blood_group?.map((data) => (
                      <option value={data?.id}>{data?.subCatName}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.blood_group_id &&
                    formik.errors.blood_group_id
                      ? formik.errors.blood_group_id
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px] mr-[20px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Ward/House <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('ward_id')}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.houseward?.map((data) => (
                      <option
                        value={data?.id}
                        selected={data?.id == formik.values.ward_id}
                      >
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.ward_id && formik.errors.ward_id
                      ? formik.errors.ward_id
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              {/* <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className="label">
                    Concession type
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps("concession_type_id")}
                  >
                    <option value="">Select</option>
                    {[
                      { id: 1, name: "concession1" },
                      { id: 2, name: "concession1" },
                    ]?.map((data) => (
                      <option value={data?.id}>{data?.name}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.concession_type_id &&
                    formik.errors.concession_type_id
                      ? formik.errors.concession_type_id
                      : null}
                  </p>
                </div>
              </div> */}
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Last school name
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('last_school_name')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.last_school_name &&
                    formik.errors.last_school_name
                      ? formik.errors.last_school_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Last school address
                  </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    {...formik.getFieldProps('last_school_address')}
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.last_school_address &&
                    formik.errors.last_school_address
                      ? formik.errors.last_school_address
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px] mr-[20px]">
                  <div>
                    <label
                      htmlFor="exampleCategory"
                      className="flex items-start justify-start ml-[43px] mb-[-15px]  text-[1.9vh] text-[#696969]"
                    >
                      Upload Image
                    </label>
                    <br />
                    <div className="flex px-10">
                      <img
                        src={`${BackendUrl}/${props?.editValue?.upload_image}`}
                        className="h-10 w-20 "
                      />
                      <input
                        name="upload_image"
                        type="file"
                        // accept="image/jpg,image/jpeg,image/png"
                        accept=".jpg,.jpeg,.png"
                        className="input2"
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'upload_image',
                            e.target.files[0]
                          );
                        }}
                        // value={formik?.values?.upload_image[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[95%] mb-[2.5vh] flex my-[10px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div className="w-full mx-[10px] ">
                  <div>
                    <br />
                    <div className="flex items-center justify-center gap-2 ml-[5vh]">
                      <input
                        type="checkbox"
                        className="h-[20px] w-[20px] flex justify-end"
                        name="admission_mid_session"
                        onChange={formik.handleChange}
                        checked={formik.values.admission_mid_session}
                        value={formik.values.admission_mid_session}
                      />
                      <label className=" text-[16px] text-[#696969] w-full flex justify-start ">
                        Admission mid session
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {formik.values.admission_mid_session ? (
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleCategory" className="label">
                      Admission month
                    </label>
                    <br />
                    <select
                      className="input"
                      {...formik.getFieldProps('admission_month_id')}
                    >
                      <option value="">Select</option>
                      {[
                        { id: 1, name: 'jan' },
                        { id: 2, name: 'feb' }
                      ]?.map((data) => (
                        <option
                          value={data?.id}
                          selected={formik.values.admission_month == data?.id}
                        >
                          {data?.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                      {formik.touched.admission_month_id &&
                      formik.errors.admission_month_id
                        ? formik.errors.admission_month_id
                        : null}
                    </p>
                  </div>
                </div>
              ) : null}
              {/* <div className="w-full mx-[10px]  px-[10px]">
                <label htmlFor="exampleEmail" className="label">
                  Extra curricular activity
                </label>
                <br />
                <Select
                  components={{
                    IndicatorsContainer: () => null,
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#f8fafc",
                      textAlign: "left",
                      height: 35,
                      minHeight: 35,
                      borderRadius: 10,
                      borderColor: "#e4e4e4",
                      boxShadow: "none",
                      marginLeft: "40px",
                      width: "100%",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      // hide scrollbar
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      marginLeft: "40px",
                      borderRadius: 10,
                      boxShadow: "none",
                      border: "1px solid #e4e4e4",
                    }),

                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#e4e4e4",
                      color: "#4a4a4a",
                      borderRadius: 8,

                      marginRight: 5,
                    }),
                  }}
                  id="extra_curricular_activity"
                  name="extra_curricular_activity"
                  options={multiSelect}
                  controlShouldRenderValue
                  isMulti
                  onChange={(e) => {
                    console.log(e);
                    formik.setFieldValue("extra_curricular_activity", e);
                  }}
                  value={formik.values.extra_curricular_activity}
                />
              </div>
               */}
            </div>
          </div>
          <div className="flex item-center justify-center lg:items-end lg:justify-end pb-[150px] mr-[30px]">
            <button type="submit" className="next-btn">
              SAVE & NEXT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
