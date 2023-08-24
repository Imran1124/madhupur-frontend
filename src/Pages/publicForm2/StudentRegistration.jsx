/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
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
import ParentDetails from './ParentDetails';
import AddressDetails from './AddressDetails';
import BankDetails from './BankDetails';
import SiblingDetails from './SiblingDetails';
import Transport from './Transport';
import { validationFormSchema } from './validationSchema';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
// import LoadingScreen from '../../Components/loader/LoadingScreen';
import Instruction from './Instruction';
import BarLoader from '../../Components/Common/BarLoader';

export default function StudentRegistration({
  data,
  next,
  isModelOpen,
  setIsModelOpen,
  isEdit,
  page
}) {
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const { getPublicMiscellaneous } = useCommonApi();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const refStuReg = useRef(null);
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationFormSchema(yup),
    onSubmit: (values) => {
      // form value
      console.log(values);
      next(values, false);
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

  useEffect(() => {
    refStuReg.current.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  return (
    <>
      {isLoading && <BarLoader />}
      {/* {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )} */}
      <div ref={refStuReg} />
      <Instruction setIsModelOpen={setIsModelOpen} isModelOpen={isModelOpen} />
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <BasicDetails
            formik={formik}
            getPublicMiscellaneous={getPublicMiscellaneous}
            activateBottomErrorCard={activateBottomErrorCard}
            setisLoading={setisLoading}
            isEdit={isEdit}
          />
          <ParentDetails
            formik={formik}
            getPublicMiscellaneous={getPublicMiscellaneous}
            activateBottomErrorCard={activateBottomErrorCard}
            setisLoading={setisLoading}
            isEdit={isEdit}
          />
          <AddressDetails
            formik={formik}
            getPublicMiscellaneous={getPublicMiscellaneous}
            activateBottomErrorCard={activateBottomErrorCard}
            setisLoading={setisLoading}
            isEdit={isEdit}
          />
          {/* <BankDetails
                formik={formik}
                getPublicMiscellaneous={getPublicMiscellaneous}
                activateBottomErrorCard={activateBottomErrorCard}
                setisLoading={setisLoading}
              /> */}
          <SiblingDetails
            formik={formik}
            getPublicMiscellaneous={getPublicMiscellaneous}
            activateBottomErrorCard={activateBottomErrorCard}
            setisLoading={setisLoading}
            isEdit={isEdit}
          />
          <Transport
            formik={formik}
            getPublicMiscellaneous={getPublicMiscellaneous}
            activateBottomErrorCard={activateBottomErrorCard}
            setisLoading={setisLoading}
            isEdit={isEdit}
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
                  Next
                </button>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}
