import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import { TextField } from '../../../Components/forms';
import useErrorAutoFocusField from '../../../Components/Hooks/useErrorAutoFocusField';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import ApiHeader from '../../../Components/ApiList/ApiHeader';
import ApiList from '../../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../../Components/Common/AxiosInterceptors';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BarLoader from '../../../Components/Common/BarLoader';

export default function Payment({ data, next, prev, page }) {
  const { api_public_registration } = ApiList();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const navigate = useNavigate();
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      fullName: '',
      amount: 100,
      paymentEmail: data?.email || '',
      paymentPhone: data?.mobile || ''
    },
    validationSchema: yup.object({
      fullName: yup.string().required('Required'),
      paymentEmail: yup
        .string()
        .email('Invalid email address')
        .required('Required')
    }),
    onSubmit: (values) => {
      // form value
      // form value
      console.log(values);
      const formData = new FormData();
      // formData.append('admissionNo', admissionNumber);
      // formData.append('admissionNo', '7666677');
      // formData.append('busNo', data?.bus_no);
      // formData.append('applicableForm', data?.applicable_form);
      formData.append('schoolId', values?.schoolId);
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
      formData.append('pLocality', values?.p_locality || '');
      formData.append('cLocality', values?.c_locality || '');
      formData.append('pLandmark', values?.p_landmark || '');
      formData.append('cLandmark', values?.c_landmark || '');
      formData.append('pDistrictId', values?.p_district_id);
      // formData.append('pDistrictName', values?.p_district_name);
      formData.append('cDistrictId', values?.c_district_id);
      // formData.append('cDistrictName', values?.c_district_name);
      formData.append('pStateId', values?.p_state_id);
      // formData.append('pStateName', values?.p_state_name);
      formData.append('cStateId', values?.c_state_id);
      // formData.append('cStateName', values?.c_state_name);
      formData.append('pCountryId', values?.p_country_id);
      // formData.append('pCountryName', values?.p_country_name);
      formData.append('cCountryId', values?.c_country_id);
      // formData.append('cCountryName', values?.c_country_name);
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

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div>
            <div>
              <div className=" mt-24 px-5 ">
                <div
                  className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
                  style={{ maxWidth: 600 }}
                >
                  <div className="w-full pt-1 pb-5">
                    <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                      <img
                        src="/e-scuola-logo-1.1.png"
                        className="h-24 w-24 rounded"
                      />
                      <i className="mdi mdi-credit-card-outline text-3xl" />
                    </div>
                  </div>
                  <div className="mb-10">
                    <h1 className="text-center font-bold text-xl uppercase">
                      Secure payment info
                    </h1>
                  </div>
                  <div className="mb-3 flex -mx-2">
                    <div className="px-2">
                      <label
                        htmlFor="type1"
                        className="flex items-center cursor-pointer"
                      >
                        <img
                          src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                          className="h-8 ml-3"
                        />
                      </label>
                    </div>
                    <div className="px-2">
                      <label
                        htmlFor="type2"
                        className="flex items-center cursor-pointer"
                      >
                        <img
                          src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                          className="h-8 ml-3"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-start">
                    <div>
                      <TextField
                        label="Full name"
                        placeholder="Full name"
                        formik={formik}
                        name="fullName"
                        isRequiredLabel
                      />
                    </div>
                    <div>
                      <TextField
                        label="Email"
                        placeholder="Email"
                        formik={formik}
                        name="paymentEmail"
                        isRequiredLabel
                      />
                    </div>
                    <div>
                      <TextField
                        label="Mobile"
                        placeholder="Mobile"
                        formik={formik}
                        name="paymentPhone"
                      />
                    </div>
                    <div>
                      <TextField
                        label="Amount"
                        placeholder="Amount"
                        formik={formik}
                        name="amount"
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                      />
                    </div>
                  </div>
                  <div className="mt-8 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-2  ">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-green-500  font-medium leading-tight  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out text-white px-4 py-2 rounded text-xs mt-4 ml-4"
                          onClick={() => {
                            prev(data);
                          }}
                        >
                          Back
                        </button>

                        <button
                          type="submit"
                          className="bg-indigo-500  font-medium leading-tight  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out text-white px-4 py-2 rounded text-xs mt-4 ml-4"
                        >
                          Pay Now ₹ 100
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div>
              <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                <i className="mdi mdi-lock-outline mr-1" /> PAY NOW
              </button>
            </div> */}
                </div>
              </div>
              {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}
