/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EMAIL_REGEX, NO_SPACE_REGEX } from '../../constant/index';
import Rightlogo from '../../assets/logo1.avif';
import ApiList from '../../Components/ApiList/ApiList';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import * as yup from 'yup';
import {
  allowNumberInput,
  allowCharacterInput,
  allowCharacterNumberInput
} from '../../Components/Common/PowerupFunctions';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

export default function LoginAuth() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_registrationData } = ApiList();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    schoolName: yup.string().required('Enter School Name'),
    // schoolCode: yup.string().required("Enter School Code"),
    contactPersonName: yup.string().required('Enter Name'),
    contactPersonEmail: yup
      .string()
      .required('Enter Email')
      .matches(EMAIL_REGEX, 'Please Enter Valid E-mail'),
    contactPersonMobile: yup.string().required('Enter Mobile No.'),
    password: yup
      .string()
      .required('Enter Password')
      .matches(NO_SPACE_REGEX, 'Please Enter Valid E-mail'),
    confirmPassword: yup
      .string()
      .required('Enter Confirm Password')
      .oneOf(
        [yup.ref('password'), null],
        'Password and confirm password did not match'
      )
  });
  const initialValues = {
    schoolName: '',
    schoolCode: '',
    schoolLogo: '',
    schoolAddress: '',
    schoolPincode: '',
    schoolFax: '',
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonMobile: '',
    password: '',
    confirmPassword: ''
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('schoolName', values.schoolName);
      formData.append('schoolCode', values.schoolCode);
      formData.append('schoolLogo', values.schoolLogo);
      formData.append('schoolAddress', values.schoolAddress);
      formData.append('schoolPincode', values.schoolPincode);
      formData.append('schoolFax', values.schoolFax);
      formData.append('contactPersonName', values.contactPersonName);
      formData.append('contactPersonEmail', values.contactPersonEmail);
      formData.append('contactPersonMobile', values.contactPersonMobile);
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
      saveMasterForm(formData);
    },
    validationSchema
  });
  const saveMasterForm = (formData) => {
    setisLoading(true);
    let url;
    let requestBody;
    url = api_registrationData;
    requestBody = formData;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Registration.....', response?.data);
        if (response?.data?.status === true) {
          const data = JSON.stringify(response?.data?.data);
          navigate('/login');
          Swal.fire({
            icon: 'success',
            title: 'Registered',
            text: `Registration Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured in submitting form.');

        setisLoading(false);
      });
  };
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  const handleFileValues = (fileData) => {
    formik.setFieldValue('schoolLogo', fileData);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // { name == 'userName' && formik.setFieldValue("userName", allowCharacterInput(value, formik.values.userName, 20)) }
    // { name == 'schoolName' && formik.setFieldValue("schoolName", allowCharacterInput(value, formik.values.schoolName, 20)) }
    // { name == 'schoolCode' && formik.setFieldValue("schoolCode", allowCharacterNumberInput(value, formik.values.schoolCode, 20)) }
    {
      name == 'contactPersonMobile' &&
        formik.setFieldValue(
          'contactPersonMobile',
          allowNumberInput(value, formik.values.contactPersonMobile, 10)
        );
    }
    if (name == 'schoolLogo') {
      let myfile = e.target.files[0];
      handleFileValues(myfile);
      return;
    }
  };
  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <div className="h-fullmax-[917px]:overflow-auto">
        <div className="h-full lg:w-full max-[425px]:w-full max-[425px]:px-4  flex flex-row items-center justify-center  py-[10%] image">
          <div className="h-auto w-[60%] px-2 bg-[#FFFFFF] border-2  flex items-center justify-center py-1  rounded-[10px] pb-[20px] max-[917px]:w-[90%]">
            <div className="w-full">
              <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                <div className="pt-4 w-full">
                  <h1 className="flex items-center justify-center text-3xl font-bold text-[cornflowerblue] gill">
                    School Registration
                  </h1>
                  <div className="relative border border-gray-300 bg-transparent mt-[2vh]">
                    <h1 className="absolute bg-white mt-[-12px] ml-4">
                      School Details
                    </h1>
                    <div className="w-[100%] mt-[30px] flex mb-[20px]  max-[1200px]:block max-[917px]:w-[100%] max-[917px]:items-start max-[917px]:justify-start">
                      <div className="w-full">
                        <div className="flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            School Name<span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('schoolName')}
                            className="border border-[gainsboro] pl-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.schoolName && formik.errors.schoolName
                            ? formik.errors.schoolName
                            : null}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            School Code
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('schoolCode')}
                            className="border border-[gainsboro] pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.schoolCode && formik.errors.schoolCode
                            ? formik.errors.schoolCode
                            : null}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Logo
                          </label>
                          <input
                            name="schoolLogo"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            value={formik.values.schoolLogo[0]}
                            className=" pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.schoolLogo && formik.errors.schoolLogo
                            ? formik.errors.schoolLogo
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="w-[100%] mt-[30px] flex mb-[20px] px-[10px] max-[1200px]:block max-[917px]:w-[100%] max-[917px]:items-start max-[917px]:justify-start">
                      <div className="w-full">
                        <div className="flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Address
                          </label>
                          <textarea
                            type="text"
                            {...formik.getFieldProps('schoolAddress')}
                            className="border border-[gainsboro] pl-4 rounded-[10px]  w-full ml-[-20px] h-10 flex items-center justify-center max-[917px]:mb-2 max-[917px]:ml-0"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.schoolAddress &&
                          formik.errors.schoolAddress
                            ? formik.errors.schoolAddress
                            : null}
                        </p>
                      </div>

                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start ml-4 justify-start  text-black arial w-[150px]">
                            Pincode
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('schoolPincode')}
                            className="border border-[gainsboro] pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.schoolPincode &&
                          formik.errors.schoolPincode
                            ? formik.errors.schoolPincode
                            : null}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start ml-4 justify-start  text-black arial w-[150px]">
                            Fax No.
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('schoolFax')}
                            className="border border-[gainsboro] pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.schoolFax && formik.errors.schoolFax
                            ? formik.errors.schoolFax
                            : null}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative border border-gray-300 bg-transparent mt-[4vh]">
                    <h1 className="absolute bg-white mt-[-12px] ml-4">
                      Contact Person Details
                    </h1>
                    <div className="w-[100%] mt-[30px] flex mb-[20px] px-[10px] max-[1200px]:block max-[1200px]:w-[100%] max-[917px]:items-start max-[917px]:justify-start">
                      <div className="w-full">
                        <div className="flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Name<span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('contactPersonName')}
                            className="border border-[gainsboro] pl-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.contactPersonName &&
                          formik.errors.contactPersonName
                            ? formik.errors.contactPersonName
                            : null}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Mobile<span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('contactPersonMobile')}
                            className="border border-[gainsboro] pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.contactPersonMobile &&
                          formik.errors.contactPersonMobile
                            ? formik.errors.contactPersonMobile
                            : null}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Email<span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps('contactPersonEmail')}
                            className="border border-[gainsboro] pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.contactPersonEmail &&
                          formik.errors.contactPersonEmail
                            ? formik.errors.contactPersonEmail
                            : null}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative border border-gray-300 bg-transparent mt-[4vh]">
                    <h1 className="absolute bg-white mt-[-12px] ml-4">
                      Password
                    </h1>
                    <div className="w-[100%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[100%] max-[917px]:items-start max-[917px]:justify-start">
                      <div className="w-full">
                        <div className="flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Password<span className="text-red-600">*</span>
                          </label>
                          <input
                            type="password"
                            {...formik.getFieldProps('password')}
                            className="border border-[gainsboro] pl-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : null}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className=" flex items-center justify-center  w-full">
                          <label className="flex items-start justify-start  text-black  ml-4 arial w-[150px]">
                            Confirm Password
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="password"
                            {...formik.getFieldProps('confirmPassword')}
                            className="border border-[gainsboro] pl-4 ml-4 rounded-[10px] h-10 w-full flex items-center justify-center max-[917px]:mb-2"
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : null}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-[cornflowerblue] mr-[5vh] underline arial mt-[2%]">
                    <a href="/csms/login-aadrika" className="mr-4">
                      Aadrika Login
                    </a>
                    <a href="/csms/login-school" className="mr-4">
                      School Login
                    </a>
                    <a href="/csms/login">User Login</a>
                  </div>
                  <div className="mt-[3%] flex items-center justify-center">
                    <button
                      type="submit"
                      className="border border-[cornflowerblue] text-white bg-[cornflowerblue] py-4 px-6 rounded-[5px] h-10 w-auto flex items-center justify-center"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
