/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, NO_SPACE_REGEX } from '../../../constant/index';
import Rightlogo from '../../../assets/logo1.avif';
import ApiList from '../../../Components/ApiList/ApiList';
import ApiHeader from '../../../Components/ApiList/ApiHeader';
import BarLoader from '../../../Components/Common/BarLoader';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../../Components/Common/AxiosInterceptors';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function LoginAuth() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_aadrikaUserData } = ApiList();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Enter Email-Id')
      .matches(EMAIL_REGEX, 'Please Enter Valid E-mail'),
    password: yup
      .string()
      .required('Enter Password')
      .matches(NO_SPACE_REGEX, 'Please Enter Valid Password')
  });
  const initialValues = {
    email: '',
    password: ''
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      saveMasterForm(values);
    },
    validationSchema
  });
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      email: values.email,
      password: values?.password
    };

    url = api_aadrikaUserData;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Login.....', response?.data);
        if (response?.data?.status === true) {
          const data = JSON.stringify(response?.data?.data);
          sessionStorage.setItem('loginInfo', data);
          navigate('/');
          toast.success('Login Successfully');
          window.location.reload();
          // Swal.fire({
          //   icon: "success",
          //   title:`Aadrika`,
          //   text: `Aadrika Login Successfully.`,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        } else {
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        toast.warning('Error occured in submitting form.');

        setisLoading(false);
      });
  };
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {isLoading && <BarLoader />}
      <div className="h-full">
        <div className="h-full lg:w-full max-[425px]:w-full max-[425px]:px-4  flex flex-row items-center justify-center  py-[13%] image">
          <div className="block">
            <div className="h-auto w-auto bg-[#FFFFFF] border-2 max-[425px]:w-full max-[425px]:pl-4 max-[375px]:pr-8 max-[375px]:pl-8 flex items-center justify-center py-1 pr-20  rounded-[10px] pb-[20px]">
              <div className="w-full h-full max-[425px]:hidden">
                <div className="text-[cornflowerblue] flex flex-row items-start justify-start ml-5 w-full">
                  <a href="/csms/landing-csms">
                    <span className="flex">
                      <BiArrowBack title="Back to Home" className="mt-1 ml-2" />
                      Go to Home
                    </span>
                  </a>
                </div>
                <img src={Rightlogo} alt="user" className="image2" />
              </div>
              <div className="max-[425px]:w-full ml-4">
                <form onSubmit={formik.handleSubmit}>
                  <div className="pt-4">
                    <div className="text-[cornflowerblue] flex items-start justify-start w-full  min-[425px]:hidden">
                      <a href="/csms/landing-csms">
                        <span className="flex ml-[-3vh] max-[375px]:m-[0vh]">
                          <BiArrowBack title="Back to Home" className="mt-1 " />
                          Go to Home
                        </span>
                      </a>
                    </div>
                    <h1 className="flex items-center justify-center text-4xl font-bold text-[cornflowerblue] gill">
                      Aadrika
                    </h1>
                    <div className="my-[10%]">
                      <label className="flex items-start justify-start text-xl text-[cornflowerblue] font-bold ml-2 arial">
                        User Name
                      </label>
                      <br />
                      <div class="relative">
                        <input
                          name="email"
                          placeholder="Email"
                          type={userVisible ? 'text' : 'password'}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          className="border-b-2 border-[gainsboro] h-10 w-full pl-4"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                          {userVisible ? (
                            <AiFillEye
                              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
                              onClick={() => setUserVisible(!userVisible)}
                            />
                          ) : (
                            <AiFillEyeInvisible
                              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
                              onClick={() => setUserVisible(!userVisible)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="my-[10%]">
                      <label className="flex items-start justify-start text-xl text-[cornflowerblue] font-bold ml-2 arial">
                        Password
                      </label>
                      <br />
                      <div class="relative">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          name="password"
                          placeholder="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          className="border-b-2 border-[gainsboro] h-10 w-full pl-4"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                          {passwordVisible ? (
                            <AiFillEye
                              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          ) : (
                            <AiFillEyeInvisible
                              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex items-end justify-end text-[cornflowerblue] underline arial mt-1">
                      <a href="/login">User Login</a>
                    </div>
                    <div className="flex items-end justify-end text-[cornflowerblue] underline arial mt-2">
                      <a href="/registration">School Registration</a>
                    </div> */}
                    <div className="mx-[10%]">
                      <button
                        type="submit"
                        className="bg-[cornflowerblue] text-white flex items-center justify-center text-xl font-bold mt-4 mx-24 px-3 py-3 rounded-lg gill"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
