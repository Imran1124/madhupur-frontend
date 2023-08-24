import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function index() {
  const [id, setId] = useState(JSON.parse(sessionStorage.getItem('loginInfo')));
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_aadrikaChangePassword, api_passwordChangeUserData } = ApiList();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    // email: yup.string().required("Enter Email-Id").matches(EMAIL_REGEX, 'Please Enter Valid E-mail'),
    // userName: yup.string().required("Enter UserName"),
    password: yup
      .string()
      .required('Enter Password')
      .matches(NO_SPACE_REGEX, 'Please Enter Valid password')
    // confirmPassword:yup.string().required("Enter Confirm Password").matches(NO_SPACE_REGEX || (password!==confirmPassword), 'Please Enter Valid password'),
  });
  const token = id?.token;
  const name = id?.name;
  const schoolName = id?.schoolName;
  const emailId = id?.email;
  const userNames = id.userName;
  const roleId = id?.roleId;
  const initialValues = {
    email: '',
    password: '',
    userName: ''
    // confirmPassword:"",
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      if (roleId === 1) {
        saveMasterForm(values);
      } else if (roleId === 2) {
        saveSuperAdminMasterForm(values);
      }
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
      // confirmPassword: values?.confirmPassword,
    };

    url = api_aadrikaChangePassword;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Login.....', response?.data);
        if (response?.data?.status === true) {
          navigate('/');
          toast.success('Password changed Successfully');
          // Swal.fire({
          //   icon: "success",
          //   title:`Aadrika`,
          //   text: `Password Changed Successfully.`,
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
  const saveSuperAdminMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      userName: values?.userName,
      password: values?.password
      // confirmPassword: values?.confirmPassword,
    };

    url = api_passwordChangeUserData;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Login.....', response?.data);
        if (response?.data?.status === true) {
          navigate('/');
          toast.success('Password changed Successfully');
          // Swal.fire({
          //   icon: "success",
          //   title:`Super Admin`,
          //   text: `Password Changed Successfully.`,
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
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={formik.handleSubmit}
            >
              <div>
                {name === 'Aadrika' ? (
                  <>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {' '}
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <br />
                    <span className="text-red-600 text-xs">
                      {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null}
                    </span>
                  </>
                ) : (
                  <>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                    />
                    <br />
                    <span className="text-red-600 text-xs">
                      {formik.touched.userName && formik.errors.userName
                        ? formik.errors.userName
                        : null}
                    </span>
                  </>
                )}
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <br />
                <span className="text-red-600 text-xs">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null}
                </span>
              </div>
              {/* <div>
                  <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirmPassword" id="confirmPassword"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={formik.handleChange}
                    value={formik.values.confirmPassword} /><br/>
                    <span className="text-red-600 text-xs">{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}</span>
              </div> */}
              {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div> */}
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
