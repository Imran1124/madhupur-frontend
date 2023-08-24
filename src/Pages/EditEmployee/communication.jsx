/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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
import { allowCharacterInput } from '../../Components/Common/PowerupFunctions';

export default function Communication(props) {
  const initialValues = {
    fathers_name: props?.editValue?.fathers_name,
    mothers_name: props?.editValue?.mothers_name,
    fathers_qualification: props?.editValue?.fathers_qualification_name,
    mothers_qualification: props?.editValue?.mothers_qualification_name,
    fathers_occupation: props?.editValue?.fathers_occupation_name,
    mothers_occupation: props?.editValue?.mothers_occupation_name,
    p_address1: props?.editValue?.p_address1,
    check: false,
    p_address2: props?.editValue?.p_address2,
    c_address1: props?.editValue?.c_address1,
    c_address2: props?.editValue?.c_address2,
    p_locality: props?.editValue?.p_locality,
    c_locality: props?.editValue?.c_locality,
    p_landmark: props?.editValue?.p_landmark,
    c_landmark: props?.editValue?.c_landmark,
    p_district_id: props?.editValue?.p_district_id,
    p_district_name: props?.editValue?.p_district_name,
    c_district_id: props?.editValue?.c_district_id,
    c_district_name: props?.editValue?.c_district_name,
    p_state_id: props?.editValue?.p_state_id,
    p_state_name: props?.editValue?.p_state_name,
    c_state_id: props?.editValue?.c_state_id,
    c_state_name: props?.editValue?.c_state_name,
    p_country_id: props?.editValue?.p_country_id,
    p_country_name: props?.editValue?.p_country_name,
    c_country_id: props?.editValue?.c_country_id,
    c_country_name: props?.editValue?.c_country_name,
    p_pincode: props?.editValue?.p_pincode,
    c_pincode: props?.editValue?.c_pincode
  };
  const [country_data, setCountry_data] = useState();
  const [state_data, setState_data] = useState();
  const [district_data, setDistrict_data] = useState();
  const [c_country_data, setC_country_data] = useState();
  const [c_state_data, setC_state_data] = useState();
  const [c_district_data, setC_district_data] = useState();
  const [qualifications, setQualification] = useState();
  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [categoryByNameData, setCategoryByNameData] = useState();
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const {
    api_getcategorybynameData,
    api_getactiveCountryData,
    api_getStateDataActiveall,
    api_getDistrictDataActiveAll
  } = ApiList();
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
  const getcountryUser = (setState) => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveCountryData, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          // setCountry_data(response?.data?.data);
          setState(response?.data?.data);
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
  const getstateUser = (setState, getByCId) => {
    setisLoading(true);
    AxiosInterceptors.post(api_getStateDataActiveall, {}, ApiHeader())
      .then(function (response) {
        console.log('State Data..', response?.data?.data);
        if (response?.data?.status) {
          // setState_data(
          //   response?.data?.data.filter((item) => item.country_id == getByCId)
          // );
          setState(
            response?.data?.data.filter((item) => item.country_id == getByCId)
          );
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
  const getdistrictUser = (setState, getStateId) => {
    setisLoading(true);
    AxiosInterceptors.post(api_getDistrictDataActiveAll, {}, ApiHeader())
      .then(function (response) {
        console.log('District Data..', response?.data?.data);
        if (response?.data?.status) {
          // setDistrict_data(
          //   response?.data?.data.filter((item) => item.state_id == getStateId)
          // );
          setState(
            response?.data?.data.filter((item) => item.state_id == getStateId)
          );
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
    getcountryUser(setCountry_data);
    getcountryUser(setC_country_data);
    getcategorybynameUser();
  }, []);
  const fun = (data) => {
    let address;
    if (formik.values.check) {
      address = {
        fathers_name: data.fathers_name,
        mothers_name: data.mothers_name,
        fathers_qualification: data.fathers_qualification,
        mothers_qualification: data.mothers_qualification,
        fathers_occupation: data.fathers_occupation,
        mothers_occupation: data.mothers_occupation,
        p_address1: data.p_address1,
        check: data.check,
        p_address2: data.p_address2,
        c_address1: data.p_address1,
        c_address2: data.p_address2,
        p_locality: data.p_locality,
        c_locality: data.p_locality,
        p_landmark: data.p_landmark,
        c_landmark: data.p_landmark,
        p_district_id: data.p_district_id,
        p_district_name: data.p_district_name,
        c_district_id: data.p_district_id,
        c_district_name: data.p_district_name,
        p_state_id: data.p_state_id,
        p_state_name: data.p_state_name,
        c_state_id: data.p_state_id,
        c_state_name: data.p_state_name,
        p_country_id: data.p_country_id,
        p_country_name: data.p_country_name,
        c_country_id: data.p_country_id,
        c_country_name: data.p_country_name,
        p_pincode: data.p_pincode,
        c_pincode: data.p_pincode
      };
    } else {
      address = {
        fathers_name: data.fathers_name,
        mothers_name: data.mothers_name,
        fathers_qualification: data.fathers_qualification,
        mothers_qualification: data.mothers_qualification,
        fathers_occupation: data.fathers_occupation,
        mothers_occupation: data.mothers_occupation,
        p_address1: data.p_address1,
        check: data.check,
        p_address2: data.p_address2,
        c_address1: data.c_address1,
        c_address2: data.c_address2,
        p_locality: data.p_locality,
        c_locality: data.c_locality,
        p_landmark: data.p_landmark,
        c_landmark: data.c_landmark,
        p_district_id: data.p_district_id,
        p_district_name: data.p_district_name,
        c_district_id: data.c_district_id,
        c_district_name: data.c_district_name,
        p_state_id: data.p_state_id,
        p_state_name: data.p_state_name,
        c_state_id: data.c_state_id,
        c_state_name: data.c_state_name,
        p_country_id: data.p_country_id,
        p_country_name: data.p_country_name,
        c_country_id: data.c_country_id,
        c_country_name: data.c_country_name,
        p_pincode: data.p_pincode,
        c_pincode: data.c_pincode
      };
    }
    props?.setFormDataFun('communication_detail', address);
    props?.setCounterFun(3);
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      fun(values);
    }
  });
  const handleback = () => {
    props?.setCounterFun(1);
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == 'p_district_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setPDistrict(selectName, selectedValue);
      return;
    }
    if (name == 'c_district_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setCDistrict(selectName, selectedValue);
      return;
    }
    if (name == 'p_state_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setPState(selectName, selectedValue);
      return;
    }
    if (name == 'c_state_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setCState(selectName, selectedValue);
      return;
    }
    if (name == 'p_country_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setPCountry(selectName, selectedValue);
      return;
    }
    if (name == 'c_country_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setCCountry(selectName, selectedValue);
      return;
    }
    if (name == 'p_pincode') {
      let selectPpin = e.target.value;
      selectPpincode(selectPpin);
    }
    if (name == 'c_pincode') {
      let selectCpin = e.target.value;
      selectCpincode(selectCpin);
    }
    {
      name == 'fathers_name' &&
        formik.setFieldValue(
          'fathers_name',
          allowCharacterInput(value, formik.values.fathers_name, 30)
        );
    }
    {
      name == 'mothers_name' &&
        formik.setFieldValue(
          'mothers_name',
          allowCharacterInput(value, formik.values.mothers_name, 30)
        );
    }
  };
  const selectPpincode = (selectPpin) => {
    if (selectPpin > 6) {
      formik.setFieldValue('p_pincode', selectPpin.slice(0, 6));
    }
  };
  const selectCpincode = (selectCpin) => {
    if (selectCpin > 6) {
      formik.setFieldValue('c_pincode', selectCpin.slice(0, 6));
    }
  };
  const setPCountry = (selectName, selectedValue) => {
    formik.setFieldValue('p_country_name', selectName);
    formik.setFieldValue('p_country_id', selectedValue);
  };
  const setCCountry = (selectName, selectedValue) => {
    formik.setFieldValue('c_country_name', selectName);
    formik.setFieldValue('c_country_id', selectedValue);
  };
  const setPState = (selectName, selectedValue) => {
    formik.setFieldValue('p_state_name', selectName);
    formik.setFieldValue('p_state_id', selectedValue);
  };
  const setCState = (selectName, selectedValue) => {
    formik.setFieldValue('c_state_name', selectName);
    formik.setFieldValue('c_state_id', selectedValue);
  };

  const setPDistrict = (selectName, selectedValue) => {
    formik.setFieldValue('p_district_name', selectName);
    formik.setFieldValue('p_district_id', selectedValue);
  };
  const setCDistrict = (selectName, selectedValue) => {
    formik.setFieldValue('c_district_name', selectName);
    formik.setFieldValue('c_district_id', selectedValue);
  };
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  useEffect(() => {
    if (formik.values.p_country_id) {
      getstateUser(setState_data, formik.values.p_country_id);
    }
    if (formik.values.c_country_id) {
      getstateUser(setC_state_data, formik.values.c_country_id);
    }
    if (formik.values.p_state_id) {
      getdistrictUser(setDistrict_data, formik.values.p_state_id);
    }
    if (formik.values.c_state_id) {
      getdistrictUser(setC_district_data, formik.values.c_state_id);
    }
  }, [
    formik.values.p_country_id,
    formik.values.c_country_id,
    formik.values.p_state_id,
    formik.values.c_state_id
  ]);
  const mapFormikInitialValue = Object.keys(initialValues)
    .map((item) => {
      return item.split('p_').slice(1).join('');
    })
    .filter((ele) => ele != '');

  const sameAsPermanentAddress = () => {
    switch (formik.values.check) {
      case true:
        mapFormikInitialValue.map((item) => {
          formik.setFieldValue(`c_${item}`, formik.values[`p_${item}`]);
          formik.setFieldTouched(`c_${item}`, false);
        });
        break;
      case false:
        mapFormikInitialValue.map((item) => {
          formik.setFieldValue(`c_${item}`, '');
          formik.setFieldTouched(`c_${item}`, false);
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    sameAsPermanentAddress();
  }, [formik?.values?.check]);

  useEffect(() => {
    if (formik.values.check) {
      sameAsPermanentAddress();
    }
  }, [
    formik?.values?.p_address1,
    formik?.values?.p_address2,
    formik?.values?.p_locality,
    formik?.values?.p_landmark,
    formik?.values?.p_pincode,
    formik?.values?.p_state_id,
    formik?.values?.p_district_id,
    formik?.values?.p_country_id,
    formik?.values?.p_state_name,
    formik?.values?.p_district_name,
    formik?.values?.p_country_name
  ]);
  return (
    <>
      {' '}
      {isLoading && <BarLoader />}
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
                    Parent Details
                  </span>
                </div>
                <div className="text-[20px] flex items-center justify-end mt-2 w-full mr-4">
                  <span className="bg-yellow-300 p-2">
                    Employee No:{props?.editValue?.emp_no}
                  </span>
                </div>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Father's Name
                  </label>
                  <br />
                  <input
                    name="fathers_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fathers_name}
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
                    Mother's Name
                  </label>
                  <br />
                  <input
                    name="mothers_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.mothers_name}
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
                    Father's Qualification
                  </label>
                  <br />
                  <select
                    name="fathers_qualification"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.fathers_qualification}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.fathers_qualification?.map((data) => {
                      console.log(data);
                      return (
                        <option
                          selected={
                            data?.subCatName ===
                            formik.values.fathers_qualification
                          }
                          value={data?.subCatName}
                        >
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Mother's Qualification
                  </label>
                  <br />
                  <select
                    name="mothers_qualification"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.mothers_qualification}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.mothers_qualification?.map((data) => {
                      console.log(data);
                      return (
                        <option
                          selected={
                            data?.subCatName ===
                            formik.values.mothers_qualification
                          }
                          value={data?.subCatName}
                        >
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Father's Occupation
                  </label>
                  <br />
                  <select
                    name="fathers_occupation"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.fathers_occupation}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.fathers_occupation?.map((data) => {
                      console.log(data);
                      return (
                        <option
                          selected={
                            data?.subCatName ===
                            formik.values.fathers_occupation
                          }
                          value={data?.subCatName}
                        >
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Mother's Occupation
                  </label>
                  <br />
                  <select
                    name="mothers_occupation"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.mothers_occupation}
                  >
                    <option value="">Select</option>
                    {categoryByNameData?.mothers_occupation?.map((data) => {
                      console.log(data);
                      return (
                        <option
                          selected={
                            data?.subCatName ===
                            formik.values.mothers_occupation
                          }
                          value={data?.subCatName}
                        >
                          {data?.subCatName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-[3vh]">
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
                    Address Detail
                  </span>
                </div>
              </h1>
              <hr className="mx-[40px]" />
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label
                      htmlFor="exampleEmail"
                      className=" flex items-start justify-start text-[#6b7280] text-[20px] font-bold ml-[4vh]"
                    >
                      Parmanent Address
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Address 1
                    </label>
                    <br />
                    <input
                      name="p_address1"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.p_address1}
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleAddress" className="label2">
                      Address 2
                    </label>
                    <input
                      className="input"
                      name="p_address2"
                      onChange={formik.handleChange}
                      value={formik.values.p_address2}
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Locality
                    </label>
                    <br />
                    <input
                      name="p_locality"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.p_locality}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Landmark
                    </label>
                    <br />
                    <input
                      name="p_landmark"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.p_landmark}
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Country
                    </label>
                    <br />
                    <select
                      name="p_country_id"
                      className="input"
                      onChange={formik.handleChange}
                      value={formik.values.p_country_id}
                    >
                      <option value="">Select</option>
                      {country_data?.map((data) => (
                        <option
                          selected={data?.id === formik.values.p_country_id}
                          value={data?.id}
                        >
                          {data?.country_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      State
                    </label>
                    <br />
                    <select
                      name="p_state_id"
                      className="input"
                      onChange={formik.handleChange}
                      value={formik.values.p_state_id}
                    >
                      <option value="">Select</option>
                      {state_data?.map((data) => (
                        <option
                          selected={data?.id === formik.values.p_state_id}
                          value={data?.id}
                        >
                          {data?.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-[64%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      District
                    </label>
                    <br />
                    <select
                      name="p_district_id"
                      className="input"
                      onChange={formik.handleChange}
                      value={formik.values.p_district_id}
                    >
                      <option value="">Select</option>
                      {district_data?.map((data) => (
                        <option
                          selected={data?.id === formik.values.p_district_id}
                          value={data?.id}
                        >
                          {data?.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Pincode
                    </label>
                    <br />
                    <input
                      name="p_pincode"
                      className="input"
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      onChange={formik.handleChange}
                      value={formik.values.p_pincode}
                    />
                    <p className="text-red-500 text-sm ml-[40px]">
                      {formik.touched.p_pincode && formik.errors.p_pincode
                        ? formik.errors.p_pincode
                        : null}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className=" flex items-start justify-start text-[#6b7280] text-[2.5vh] font-bold">
                  <input
                    id="check"
                    name="check"
                    type="checkbox"
                    className="address"
                    onChange={formik.handleChange}
                    value={formik.values.check}
                  />
                  <span className="text-slat-500 text-[20px] ml-[10px] mt-[-0.5vh]">
                    Note:if correspondance address is same as permanent
                    address(Please Tick)
                  </span>
                </div>
              </div>

              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Address 1
                    </label>
                    <br />
                    <input
                      name="c_address1"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_address1
                          : formik.values.c_address1
                      }
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleAddress" className="label">
                      Address 2
                    </label>
                    <br />
                    <input
                      className="input"
                      name="c_address2"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_address2
                          : formik.values.c_address2
                      }
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Locality
                    </label>
                    <br />
                    <input
                      name="c_locality"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_locality
                          : formik.values.c_locality
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Landmark
                    </label>
                    <br />
                    <input
                      name="c_landmark"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_landmark
                          : formik.values.c_landmark
                      }
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Country
                    </label>
                    <br />
                    <select
                      name="c_country_id"
                      className="input"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_country_id
                          : formik.values.c_country_id
                      }
                    >
                      <option value="">Select</option>
                      {c_country_data?.map((data) => (
                        <option
                          selected={data?.id === formik.values.c_country_id}
                          value={data?.id}
                        >
                          {data?.country_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      State
                    </label>
                    <br />
                    <select
                      name="c_state_id"
                      className="input"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_state_id
                          : formik.values.c_state_id
                      }
                    >
                      <option value="">Select</option>
                      {c_state_data?.map((data) => (
                        <option
                          selected={data?.id === formik.values.c_state_id}
                          value={data?.id}
                        >
                          {data?.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-[64%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      District
                    </label>
                    <br />
                    <select
                      name="c_district_id"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_district_id
                          : formik.values.c_district_id
                      }
                    >
                      <option value="">Select</option>
                      {c_district_data?.map((data) => (
                        <option
                          selected={data?.id === formik.values.c_district_id}
                          value={data?.id}
                        >
                          {data?.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Pincode
                    </label>
                    <br />
                    <input
                      name="c_pincode"
                      className="input"
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      onChange={formik.handleChange}
                      value={
                        formik.values.check
                          ? formik.values.p_pincode
                          : formik.values.c_pincode
                      }
                    />
                    <p className="text-red-500 text-sm ml-[40px]">
                      {formik.touched.c_pincode && formik.errors.c_pincode
                        ? formik.errors.c_pincode
                        : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end pb-[20px]  max-[768px]:block">
            <button type="button" className="back-btn" onClick={handleback}>
              BACK
            </button>
            <button type="submit" className="next-btn">
              SAVE & NEXT
            </button>
          </div>

          {/* <div className="block mb-5">
          <h1 className="text-gray-500">Note :   {" "}(<span className="text-red-600">*</span>) marks is mandatory.</h1></div> */}
        </form>
      </div>
    </>
  );
}
