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
import Img12 from '../../assets/image 23.png';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import useCommonApi from '../../Components/Hooks/useCommonApi';
import {
  allowCharacterNumberInput,
  allowNumberInput
} from '../../Components/Common/PowerupFunctions';

export default function ParentDetails(props) {
  const [country_data, setCountry_data] = useState();
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('admission_no')
  );
  const [state_data, setState_data] = useState();
  const [district_data, setDistrict_data] = useState();
  const [qualifications, setQualification] = useState();
  const [male, setMale] = useState();
  const [banks_name, setBanks_name] = useState([]);
  const [female, setFemale] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const { api_getActiveBankData } = ApiList();

  useEffect(() => {
    getbankUser();
  }, []);
  const getbankUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getActiveBankData, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          setBanks_name(response?.data?.data);
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
  const fun = (data) => {
    props?.setFormDataFun('bank_details', data);
    props?.setCounterFun(5);
  };

  const initialValues = {
    account_no: '',
    ifsc_code: '',
    branch_name: '',
    bank_name: '',
    bank_id: ''
  };
  const validationSchema = yup.object({
    account_no: yup.string(),
    branch_name: yup.string(),
    bank_name: yup.string(),
    bank_id: yup.string()
  });
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      fun(values);
    },
    validationSchema
  });
  const handleback = () => {
    props?.setCounterFun(3);
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == 'bank_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      bankValueset(selectName, selectValue);
      return;
    }
    if (name == 'mothers_qualification_id') {
      let selectName = e.target.selectedOptions[0].text;
      formik.setFieldValue('mothers_qualification_name', selectName);
      return;
    }
    if (name == 'fathers_occupation_id') {
      let selectName = e.target.selectedOptions[0].text;
      formik.setFieldValue('fathers_occupation_name', selectName);
      return;
    }
    if (name == 'mothers_occupation_id') {
      let selectName = e.target.selectedOptions[0].text;
      formik.setFieldValue('mothers_occupation_name', selectName);
      return;
    }
    if (name == 'guardian_occupation_id') {
      let selectName = e.target.selectedOptions[0].text;
      formik.setFieldValue('guardian_occupation_name', selectName);
      return;
    }
    if (name == 'guardian_qualification_id') {
      let selectName = e.target.selectedOptions[0].text;
      formik.setFieldValue('guardian_qualification_name', selectName);
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
      name == 'account_no' &&
        formik.setFieldValue(
          'account_no',
          allowNumberInput(value.trim(), formik.values.account_no, 20)
        );
    }
  };
  const bankValueset = (selectName, selectValue) => {
    formik.setFieldValue('bank_name', selectName);
    formik.setFieldValue('bank_id', selectValue);
  };

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {/* {isLoading && <BarLoader />} */}
      {/* {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />} */}
      <div className="h-[82vh] w-[70%] bg-white overflow-auto  border border-slate-300 rounded-[15px] max-[600px]:w-[95%] max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
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
                    Account no
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps('account_no')}
                    className="input"
                    type="number"
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.account_no && formik.errors.account_no
                      ? formik.errors.account_no
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Bank Name
                  </label>
                  <br />
                  <select
                    className="input"
                    {...formik.getFieldProps('bank_id')}
                  >
                    <option value="">Select</option>
                    {banks_name?.map((data) => (
                      <option value={data?.id}>{data?.bank_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    IFSC code
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps('ifsc_code')}
                    className="input"
                    type="text"
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.ifsc_code && formik.errors.ifsc_code
                      ? formik.errors.ifsc_code
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Branch name
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps('branch_name')}
                    className="input"
                    type="text"
                  />
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.branch_name && formik.errors.branch_name
                      ? formik.errors.branch_name
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* mothers */}

          {/* Guardian detail */}

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
