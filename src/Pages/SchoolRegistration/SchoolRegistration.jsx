/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FormikProvider, useFormik, Form } from 'formik';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import useCommonApi from '../../Components/Hooks/useCommonApi';
import useErrorAutoFocusField from '../../Components/Hooks/useErrorAutoFocusField';
import BasicDetails from './BasicDetails';

import { initialFormValue } from './initialValue';
import { validationFormSchema } from './validationSchema';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import BarLoader from '../../Components/Common/BarLoader';

export default function StudentRegistration() {
  const [isModelOpen, setIsModelOpen] = useState(true);
  const navigate = useNavigate();
  const { api_school_master_registration } = ApiList();
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const [isOpen, setIsOpen] = useState(false);
  const { getPublicMiscellaneous } = useCommonApi();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

  const formik = useFormik({
    initialValues: initialFormValue(),
    validationSchema: validationFormSchema(yup),
    onSubmit: (values) => {
      // form value
      console.log(values);
      const formData = new FormData();
      formData.append('schoolName', values?.schoolName);
      formData.append('schoolCode', values?.schoolCode);
      formData.append('contactPersonName', values?.contactPersonName);
      formData.append('contactPersonMobile', values?.contactPersonMobile);
      formData.append('contactPersonEmail', values?.contactPersonEmail);
      formData.append('userName', values?.userName);
      formData.append('address', values?.schoolAddress);
      formData.append('pincode', values?.pinCode);
      formData.append('password', values?.password);
      formData.append('confirmPassword', values?.confirmPassword);
      formData.append('schoolLogo', values?.schoolLogo);

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit this form?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          setisLoading(true);
          AxiosInterceptors.post(
            api_school_master_registration,
            formData,
            ApiHeader()
          )
            .then(function (response) {
              console.log('Student Reg..', response);
              if (response?.data?.status) {
                localStorage.setItem('school_reg_no', values?.userName);
                navigate('/school-registration-success');
                setisLoading(false);
                Swal.fire({
                  icon: 'success',
                  title: `Added`,
                  text: `Information Added Successfully.`,
                  showConfirmButton: false,
                  timer: 1500
                });
                console.log('==1 response list...', response);
              } else {
                activateBottomErrorCard(true, response?.data?.message);
                setisLoading(false);
              }
              setisLoading(false);
            })
            .catch(function (error) {
              console.log('==2 error list...', error);
              activateBottomErrorCard(
                true,
                response?.data?.message ?? 'Something went wrong'
              );

              setisLoading(false);
            });
          // Swal.fire({
          //   title: 'Submitted!',
          //   text: 'Form submitted successfully.',
          //   icon: 'success',
          //   showConfirmButton: false,
          //   timer: 1500
          // });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelled',
            text: 'Form not submitted :)',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  });

  const { handleSubmit } = formik;

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  React.useEffect(() => {
    const { isValid, submitCount, isSubmitting, errors } = formik;
    AutoFocusErrorField({ isValid, submitCount, isSubmitting, errors });
  }, [formik.errors, formik.submitCount, formik.isSubmitting]);

  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      {/* <Instruction setIsModelOpen={setIsModelOpen} isModelOpen={isModelOpen} /> */}
      <Navbar isModelOpen={isModelOpen} />

      <div className={`w-full col-span-10 2xl:py-3 2xl:px-52 px-6 py-2 mt-24`}>
        <div className="border-[2px] border-gray-200 rounded-md h-[80vh] 2xl:p-6 p-4 overflow-y-auto">
          <div className="">
            {/* Title */}
            <div className="flex w-full justify-between items-center max-[870px]:block">
              <div className="flex flex-col">
                <span className="text-3xl text-center font-semibold text-gray-600 flex flex-start">
                  School Registration Form
                </span>
                <span className="text-sm text-center font-medium text-gray-400">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                  {/* {JSON.stringify(values.sibling)} */}
                </span>
              </div>
            </div>
          </div>

          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <BasicDetails
                formik={formik}
                getPublicMiscellaneous={getPublicMiscellaneous}
                activateBottomErrorCard={activateBottomErrorCard}
                setisLoading={setisLoading}
              />

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* <div>
                  <div className=" text-right col-span-12 mt-10">
                    <button
                      type="button"
                      onClick={() => setIsOpen(true)}
                      className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Preview
                    </button>
                  </div>
                </div> */}
                <div>
                  <div className=" text-right col-span-12 mt-10">
                    <button
                      type="submit"
                      className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}
