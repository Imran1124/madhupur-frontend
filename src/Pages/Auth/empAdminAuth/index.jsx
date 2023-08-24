/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { BiArrowBack } from 'react-icons/bi';
import LoginForm from './LoginForm';

export default function LoginAuth() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_loginData } = ApiList();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Enter Email-Id')
      .matches(EMAIL_REGEX, 'Please Enter Valid E-mail'),
    password: yup
      .string()
      .required('Enter Password')
      .matches(NO_SPACE_REGEX, 'Please Enter Valid E-mail')
  });
  const initialValues = {
    userType: 'admin',
    email: '',
    password: ''
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      saveMasterForm(values);
      console.log('values', values);
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

    url = api_loginData;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Login.....', response?.data);
        if (response?.data?.status === true) {
          const data = JSON.stringify(response?.data?.data);
          sessionStorage.setItem('loginInfo', data);
          navigate('/');
          Swal.fire({
            icon: 'success',
            title: `User`,
            text: `User Login Successfully.`,
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
  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <div className="h-full">
        <div className="h-full lg:w-full max-[425px]:w-full max-[425px]:px-4  flex flex-row items-center justify-center  py-[13%] image">
          <LoginForm formik={formik} />
        </div>
      </div>
    </>
  );
}
