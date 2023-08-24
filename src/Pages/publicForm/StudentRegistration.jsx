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
import ParentDetails from './ParentDetails';
import AddressDetails from './AddressDetails';
import BankDetails from './BankDetails';
import SiblingDetails from './SiblingDetails';
import Transport from './Transport';
import { initialFormValue } from './initialValue';
import { validationFormSchema } from './validationSchema';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import BarLoader from '../../Components/Common/BarLoader';
import Instruction from './Instruction';
import Payment from './payment/Payment';

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const [isModelOpen, setIsModelOpen] = useState(true);
  const navigate = useNavigate();
  const { api_public_registration } = ApiList();
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
      // formData.append('admissionNo', admissionNumber);
      // formData.append('admissionNo', '7666677');

      // formData.append('busNo', data?.bus_no);
      // formData.append('applicableForm', data?.applicable_form);
      formData.append('firstName', values?.first_name);
      formData.append('middleName', values?.middle_name);
      formData.append('lastName', values.last_name);
      formData.append('dob', values?.dob);
      formData.append('classId', values?.class_id);
      formData.append('className', values?.class_name);
      formData.append('Dob', values?.dob);
      // formData.append('sectionName', values?.section_name);
      // formData.append('sectionId', values?.section_id);
      formData.append('Mobile', parseInt(values?.mobile));
      // formData.append('admissionDate', values?.admission_date);
      formData.append('genderId', values?.gender_id);
      formData.append('genderName', values?.gender_name);
      formData.append('religionId', values?.religion_id);
      formData.append('religionName', values?.religion_name);
      formData.append('casteId', values?.caste_id);
      formData.append('casteName', values?.caste_name);
      formData.append('categoryId', values?.category_id);
      formData.append('categoryName', values?.category_id);

      // formData.append('rollNo', values?.roll_number);

      formData.append('bloodGroupId', values?.blood_group_id);
      formData.append('bloodGroupName', values?.blood_group_name);
      formData.append('houseWardId', values?.ward_id);
      formData.append('houseWardName', values?.ward_name);
      formData.append('disability', values?.disability_id);
      formData.append('aadharNo', values?.aadhar_no);
      formData.append('Email', values?.email);
      formData.append('Mobile', values?.mobile);
      // formData.append(
      //   'concession_type_id',
      //   values?.concession_type_id
      // );

      // formData.append('lastSchoolName', values?.last_school_name);
      // formData.append('lastSchoolAddress', values?.last_school_address);

      // formData.append('admissionMidSession', values?.admission_mid_session);
      // formData.append(
      //   'admissionMonth',
      //   values?.admission_month_id
      // );
      formData.append('admissionMonth', values?.admission_month);
      // values?.extra_curricular_activity.forEach(
      //   (obj, index) => {
      //     formData.append(`extra_curricular_activity[${index}][id]`, obj?.id);
      //   }
      // );
      formData.append('uploadImage', values?.upload_image);

      // parent detail start
      formData.append('fathersName', values?.fathers_name);

      formData.append('fathersMobNo', values?.fathers_mobile);

      formData.append('fathersEmail', values?.fathers_email);

      formData.append('fathersOccupationId', values?.fathers_occupation_id);
      formData.append('fathersOccupationName', values?.fathers_occupation_name);
      formData.append(
        'fathersQualificationName',
        values?.fathers_qualification_name
      );
      formData.append(
        'fathersQualificationId',
        values?.fathers_qualification_id
      );
      formData.append('fathersAadhar', values?.fathers_aadhar_no);
      formData.append('fathersAnnualIncome', values?.fathers_annual_income);
      formData.append('fathersImage', values?.fathers_image);
      // mothers detail
      formData.append('mothersName', values?.mothers_name);
      formData.append('mothersMobNo', values?.mothers_mobile);
      formData.append('mothersEmail', values?.mothers_email);

      formData.append(
        'mothersQualificationId',
        values?.mothers_qualification_id
      );
      formData.append(
        'mothersQualificationName',
        values?.mothers_qualification_name
      );
      formData.append('mothersOccupationId', values?.mothers_occupation_id);
      formData.append('mothersOccupationName', values?.mothers_occupation_name);
      formData.append('mothersAnnualIncome', values?.mothers_annual_income);
      formData.append('mothersAadhar', values?.mothers_aadhar_no);

      formData.append('mothersImage', values?.mothers_image);
      formData.append('guardianName', values?.guardian_name);
      formData.append('guardianMobNo', values?.guardian_mobile);
      formData.append('guardianEmail', values?.guardian_email);
      formData.append('guardianOccupationId', values?.guardian_occupation_id);
      formData.append(
        'guardianOccupationName',
        values?.guardian_occupation_name
      );
      formData.append(
        'guardianQualificationId',
        values?.guardian_qualification_id
      );
      formData.append(
        'guardianQualificationName',
        values?.guardian_qualification_name
      );
      formData.append('guardianAadhar', values?.guardian_aadhar_no);
      formData.append('guardianAnnualIncome', values?.guardian_annual_income);
      formData.append('relation', values?.relation_id);
      // parent detail end

      // address detail start
      formData.append('pAddress1', values?.p_address1);
      formData.append('check', values?.check);
      formData.append('pAddress2', values?.p_address2);
      formData.append('cAddress1', values?.c_address1);
      formData.append('cAddress2', values?.c_address2);
      formData.append('pLocality', values?.p_locality);
      formData.append('cLocality', values?.c_locality);
      formData.append('pLandmark', values?.p_landmark);
      formData.append('cLandmark', values?.c_landmark);
      formData.append('pDistrictId', values?.p_district_id);
      formData.append('pDistrictName', values?.p_district_name);
      formData.append('cDistrictId', values?.c_district_id);
      formData.append('cDistrictName', values?.c_district_name);
      formData.append('pStateId', values?.p_state_id);
      formData.append('pStateName', values?.p_state_name);
      formData.append('cStateId', values?.c_state_id);
      formData.append('cStateName', values?.c_state_name);
      formData.append('pCountryId', values?.p_country_id);
      formData.append('pCountryName', values?.p_country_name);
      formData.append('cCountryId', values?.c_country_id);
      formData.append('cCountryName', values?.c_country_name);
      formData.append('pPincode', values?.p_pincode);
      formData.append('cPincode', values?.c_pincode);
      // address detail end

      // bank detail start
      // formData.append('accountNo', values?.account_no);
      // formData.append('ifscCode', values?.ifsc_code);
      // formData.append('branchName', values?.branch_name);
      // formData.append('bankName', values?.bank_name);
      // formData.append('bankId', values?.bank_id);
      // bank detail end

      // sibling detail start
      values?.siblingDetails?.forEach((obj, index) => {
        formData.append(
          `siblingDetails[${index}][siblingName]`,
          obj?.siblingName
        );
        formData.append(
          `siblingDetails[${index}][siblingClass]`,
          obj?.siblingClassId
        );
        formData.append(
          `siblingDetails[${index}][siblingSection]`,
          obj?.siblingSectionId
        );
        formData.append(
          `siblingDetails[${index}][siblingAdmissionNo]`,
          obj?.siblingAdmissionNo
        );
        formData.append(
          `siblingDetails[${index}][siblingRollNo]`,
          obj?.siblingRollNo
        );
      });

      formData.append('pickUpPointId', values?.pickup_point_id);
      formData.append('pickPointName', values?.pickup_point_name);
      formData.append('routeId', values?.route_id);
      formData.append('routeName', values?.route_name);
      formData.append('isTransport', values?.is_transport);
      // end form value
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ':' + pair[1]);
      // }

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
          AxiosInterceptors.post(api_public_registration, formData, ApiHeader())
            .then(function (response) {
              console.log('Student Reg..', response);
              if (response?.data?.status) {
                localStorage.setItem(
                  'admission_no',
                  response?.data?.data?.basicDetails?.admission_no
                );
                navigate('/public-student-registration-submitted');
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
      <Instruction setIsModelOpen={setIsModelOpen} isModelOpen={isModelOpen} />
      <Navbar isModelOpen={isModelOpen} />

      <div className={`w-full col-span-10 2xl:py-3 2xl:px-24 px-6 py-2 mt-20`}>
        <div className="border-[2px] border-gray-200 rounded-md h-[90vh] 2xl:p-6 p-4 overflow-y-auto">
          <div className="">
            {/* Title */}
            <div className="flex w-full justify-between items-center max-[870px]:block">
              <div className="flex flex-col">
                <span className="text-3xl text-center font-semibold text-gray-600 flex flex-start">
                  Student Registration Form
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
              {step === 1 && (
                <>
                  <BasicDetails
                    formik={formik}
                    getPublicMiscellaneous={getPublicMiscellaneous}
                    activateBottomErrorCard={activateBottomErrorCard}
                    setisLoading={setisLoading}
                  />
                  <ParentDetails
                    formik={formik}
                    getPublicMiscellaneous={getPublicMiscellaneous}
                    activateBottomErrorCard={activateBottomErrorCard}
                    setisLoading={setisLoading}
                  />
                  <AddressDetails
                    formik={formik}
                    getPublicMiscellaneous={getPublicMiscellaneous}
                    activateBottomErrorCard={activateBottomErrorCard}
                    setisLoading={setisLoading}
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
                  />
                  <Transport
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
                </>
              )}

              {step === 2 && (
                <>
                  {' '}
                  <Payment />
                </>
              )}
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}
