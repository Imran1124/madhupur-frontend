/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import { ADDRESS_REGEX, CATEGORY_REGEX } from '../../constant';
import Img12 from '../../assets/image 23.png';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import * as yup from 'yup';
import {
  allowCharacterNumberInput,
  allowCharacterInput,
  allowNumberInput
} from '../../Components/Common/PowerupFunctions';

export default function FifthForm(props) {
  const [nominee_name, setNominee_name] = useState();
  const [bank_name, setBank_name] = useState();
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('employee number')
  );
  const [isLoading, setisLoading] = useState(false);
  const [categoryByNameData, setCategoryByNameData] = useState();
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const { api_getcategorybynameData, api_getActiveBankData } = ApiList();
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
  const getbankUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getActiveBankData, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          setBank_name(response?.data?.data);
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
    getbankUser();
  }, []);
  const initialValues = {
    bank_id: '',
    bank_name: '',
    account_no: '',
    account_type: '',
    ifsc_code: '',
    branch_name: '',
    nominee_name: '',
    nominee_relation: '',
    pan_no: '',
    epf_no: '',
    uan_no: '',
    esi_no: '',
    nps_no: ''
  };
  const validationSchema = yup.object({
    account_type: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    ifsc_code: yup
      .string()
      .matches(ADDRESS_REGEX, 'Please Enter value between A-Z ,a-z to 0-9'),
    branch_name: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    nominee_name: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z')
  });
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      props?.setFormDataFun('account_detail', values);
      props?.setCounterFun(4);
    },
    validationSchema
  });

  const handleback = () => {
    props?.setCounterFun(2);
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == 'bank_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setBank(selectName, selectedValue);
      return;
    }
    {
      name == 'ifsc_code' &&
        formik.setFieldValue(
          'ifsc_code',
          allowCharacterNumberInput(
            value.trim().toUpperCase(),
            formik.values.ifsc_code,
            10
          )
        );
    }
    {
      name == 'pan_no' &&
        formik.setFieldValue(
          'pan_no',
          allowCharacterNumberInput(
            value.toUpperCase(),
            formik.values.pan_no,
            10
          )
        );
    }
    {
      name == 'epf_no' &&
        formik.setFieldValue(
          'epf_no',
          allowCharacterNumberInput(
            value.toUpperCase(),
            formik.values.epf_no,
            12
          )
        );
    }
    {
      name == 'uan_no' &&
        formik.setFieldValue(
          'uan_no',
          allowNumberInput(value, formik.values.uan_no, 12)
        );
    }
    {
      name == 'esi_no' &&
        formik.setFieldValue(
          'esi_no',
          allowCharacterNumberInput(value, formik.values.esi_no, 17)
        );
    }
    {
      name == 'nominee_name' &&
        formik.setFieldValue(
          'nominee_name',
          allowCharacterInput(value, formik.values.nominee_name, 17)
        );
    }
    {
      name == 'account_type' &&
        formik.setFieldValue(
          'account_type',
          allowCharacterInput(value, formik.values.account_type, 17)
        );
    }
  };
  const setBank = (selectName, selectedValue) => {
    formik.setFieldValue('bank_name', selectName);
    formik.setFieldValue('bank_id', selectedValue);
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
                    Bank Details
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
                    Bank Name
                  </label>
                  <br />
                  <select
                    name="bank_id"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.bank_id}
                  >
                    <option value="">Select</option>
                    {bank_name?.map((data) => (
                      <option value={data?.id}>{data?.bank_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Account Number
                  </label>
                  <br />
                  <input
                    name="account_no"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.account_no}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className=" label2">
                    Account Type
                  </label>
                  <input
                    name="account_type"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.account_type}
                  />
                  <p className="text-red-500 text-sm ml-[40px]">
                    {formik.touched.account_type && formik.errors.account_type
                      ? formik.errors.account_type
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className=" label">
                    IFSC Code
                  </label>
                  <br />
                  <input
                    name="ifsc_code"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.ifsc_code}
                  />
                  <p className="text-red-500 text-sm ml-[40px]">
                    {formik.touched.ifsc_code && formik.errors.ifsc_code
                      ? formik.errors.ifsc_code
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className=" label">
                    Branch Name
                  </label>
                  <br />
                  <input
                    name="branch_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.branch_name}
                  />
                  <p className="text-red-500 text-sm ml-[40px]">
                    {formik.touched.branch_name && formik.errors.branch_name
                      ? formik.errors.branch_name
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleCategory" className=" label">
                    Nominee Name
                  </label>
                  <br />
                  <input
                    name="nominee_name"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.nominee_name}
                  />
                  <p className="text-red-500 text-sm ml-[40px]">
                    {formik.touched.nominee_name && formik.errors.nominee_name
                      ? formik.errors.nominee_name
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[32%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="examplePassword" className="label2">
                    Nominee Relation
                  </label>
                  <select
                    className="input"
                    name="nominee_relation"
                    onChange={formik.handleChange}
                    value={formik.values.nominee_relation}
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
            </div>
          </div>
          <div className="mt-[6vh]">
            <div className="mb-[1vh]">
              <h1
                style={{ zIndex: 100 }}
                className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
              >
                <div className="flex">
                  <span className="flex items-center justify-center mt-5 text-[20px]">
                    Payroll
                  </span>
                </div>
              </h1>
              <hr className="mx-[40px]" />
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleSatulations" className=" label">
                      Pan Number
                    </label>
                    <br />
                    <input
                      name="pan_no"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.pan_no}
                    />
                    <p className="text-red-500 text-sm ml-[40px]">
                      {formik.touched.pan_no && formik.errors.pan_no
                        ? formik.errors.pan_no
                        : null}
                    </p>
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className=" label">
                      EPF Number
                    </label>
                    <br />
                    <input
                      name="epf_no"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.epf_no}
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label
                      htmlFor="exampleMiddlename"
                      className="flex items-start justify-start ml-[43px]  text-[1.9vh] text-[#696969]"
                    >
                      Uan Number
                    </label>
                    <input
                      name="uan_no"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.uan_no}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[64%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Esi Number
                    </label>
                    <br />
                    <input
                      name="esi_no"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.esi_no}
                    />
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleGender" className="label">
                      Nps Number
                    </label>
                    <br />
                    <input
                      name="nps_no"
                      className="input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.nps_no}
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end pb-[20px] max-[768px]:block">
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
