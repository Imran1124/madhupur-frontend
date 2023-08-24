import React, { useState } from 'react';
import { useFormik, FormikProvider, Form } from 'formik';
import { HiUserGroup } from 'react-icons/hi';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Img11 from '../../assets/image 11.png';
import Img12 from '../../assets/image 24.png';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';

export default function PreviewModal({ data, next, prev, page }) {
  const { api_public_registration } = ApiList();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const navigate = useNavigate();
  // prev file from initialvalue upload_image name?
  const basicDetail = [
    {
      label: 'First Name',
      value: data?.first_name || 'NA'
    },
    {
      label: 'Middle Name',
      value: data?.middle_name || 'NA'
    },
    {
      label: 'Last Name',
      value: data?.last_name || 'NA'
    },
    {
      label: 'Class',
      value: data?.class_name || 'NA'
    },
    {
      label: 'Date of Birth',
      value: data?.dob || 'NA'
    },
    {
      label: 'Gender',
      value: data?.gender_name || 'NA'
    },
    {
      label: 'Category',
      value: data?.category_name || 'NA'
    },
    {
      label: 'Disability',
      value: data?.disability_name || 'NA'
    },
    {
      label: 'Religion',
      value: data?.religion_name || 'NA'
    },
    {
      label: 'Caste',
      value: data?.caste_name || 'NA'
    },
    {
      label: 'Mobile Number',
      value: data?.mobile || 'NA'
    },
    {
      label: 'Blood Group',
      value: data?.blood_group_name || 'NA'
    },
    {
      label: 'Email',
      value: data?.email || 'NA'
    },
    {
      label: 'Aadhar Number',
      value: data?.aadhar_no || 'NA'
    },
    {
      label: 'Ward/House Number',
      value: data?.ward_name || 'NA'
    },
    {
      label: 'Admission Month',
      value: data?.admission_month || 'NA'
    }
  ];

  const fatherDetails = [
    {
      label: 'Father Name',
      value: data?.fathers_name || 'NA'
    },
    {
      label: 'Father Occupation',
      value: data?.fathers_occupation_name || 'NA'
    },
    {
      label: 'Father Qualification',
      value: data?.fathers_qualification_name || 'NA'
    },
    {
      label: 'Father Mobile Number',
      value: data?.fathers_mobile || 'NA'
    },
    {
      label: 'Father Email',
      value: data?.fathers_email || 'NA'
    },
    {
      label: 'Father Income',
      value: data?.fathers_annual_income || 'NA'
    },
    {
      label: 'Father Aadhar Number',
      value: data?.fathers_aadhar_no || 'NA'
    }
  ];

  const motherDetails = [
    {
      label: 'Father Name',
      value: data?.mothers_name || 'NA'
    },
    {
      label: 'Father Occupation',
      value: data?.mothers_occupation_name || 'NA'
    },
    {
      label: 'Father Qualification',
      value: data?.mothers_qualification_name || 'NA'
    },
    {
      label: 'Father Mobile Number',
      value: data?.mothers_mobile || 'NA'
    },
    {
      label: 'Father Email',
      value: data?.mothers_email || 'NA'
    },
    {
      label: 'Father Income',
      value: data?.mothers_annual_income || 'NA'
    },
    {
      label: 'Father Aadhar Number',
      value: data?.mothers_aadhar_no || 'NA'
    }
  ];

  const guardianDetails = [
    {
      label: 'Guardian Name',
      value: data?.guardian_name || 'NA'
    },
    {
      label: 'Guardian Occupation',
      value: data?.guardian_occupation_name || 'NA'
    },
    {
      label: 'Guardian Qualification',
      value: data?.guardian_qualification_name || 'NA'
    },
    {
      label: 'Guardian Mobile Number',
      value: data?.guardian_mobile || 'NA'
    },
    {
      label: 'Guardian Email',
      value: data?.guardian_email || 'NA'
    },
    {
      label: 'Guardian Income',
      value: data?.guardian_annual_income || 'NA'
    },
    {
      label: 'Guardian Aadhar Number',
      value: data?.guardian_aadhar_no || 'NA'
    },
    {
      label: 'Relation',
      value: data?.relation_name || 'NA'
    }
  ];

  const pAddressDetails = [
    {
      label: 'Address Line 1',
      value: data?.p_address1 || 'NA'
    },
    {
      label: 'Address Line 2',
      value: data?.p_address2 || 'NA'
    },
    {
      label: 'Locality',
      value: data?.p_locality || 'NA'
    },
    {
      label: 'Landmark',
      value: data?.p_landmark || 'NA'
    },
    {
      label: 'City',
      value: data?.p_district_name || 'NA'
    },
    {
      label: 'State',
      value: data?.p_state_name || 'NA'
    },
    {
      label: 'Country',
      value: data?.p_country_name || 'NA'
    },
    {
      label: 'Pincode',
      value: data?.p_pincode || 'NA'
    }
  ];

  const cAddressDetails = [
    {
      label: 'Address Line 1',
      value: data?.c_address1 || 'NA'
    },
    {
      label: 'Address Line 2',
      value: data?.c_address2 || 'NA'
    },
    {
      label: 'Locality',
      value: data?.c_locality || 'NA'
    },
    {
      label: 'Landmark',
      value: data?.c_landmark || 'NA'
    },
    {
      label: 'City',
      value: data?.c_district_name || 'NA'
    },
    {
      label: 'State',
      value: data?.c_state_name || 'NA'
    },
    {
      label: 'Country',
      value: data?.c_country_name || 'NA'
    },
    {
      label: 'Pincode',
      value: data?.c_pincode || 'NA'
    }
  ];

  const siblingData = data?.siblingDetails?.map((item) => {
    return [
      {
        label: 'Sibling Name',
        value: item?.siblingName || 'NA'
      },
      {
        label: 'Sibling Class',
        value: item?.siblingClass || 'NA'
      },
      {
        label: 'Sibling Section',
        value: item?.siblingSection || 'NA'
      },
      {
        label: 'Sibling Roll Number',
        value: item?.siblingRollNo || 'NA'
      },
      {
        label: 'Admission Number',
        value: item?.siblingAdmissionNo || 'NA'
      }
    ];
  });

  const Transport = [
    {
      label: 'Route',
      value: data?.route_name || 'NA'
    },
    {
      label: 'Pickup Point',
      value: data?.pickup_point_name || 'NA'
    }
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    onSubmit: async (values) => {
      // form value
      // console.log(values);
      // const formData = new FormData();
      // // formData.append('admissionNo', admissionNumber);
      // // formData.append('admissionNo', '7666677');
      // // formData.append('busNo', data?.bus_no);
      // // formData.append('applicableForm', data?.applicable_form);
      // formData.append('firstName', values?.first_name);
      // formData.append('middleName', values?.middle_name);
      // formData.append('lastName', values.last_name);
      // formData.append('dob', values?.dob);
      // formData.append('classId', values?.class_id);
      // formData.append('className', values?.class_name);
      // formData.append('Dob', values?.dob);
      // // formData.append('sectionName', values?.section_name);
      // // formData.append('sectionId', values?.section_id);
      // formData.append('Mobile', parseInt(values?.mobile));
      // // formData.append('admissionDate', values?.admission_date);
      // formData.append('genderId', values?.gender_id);
      // formData.append('genderName', values?.gender_name);
      // formData.append('religionId', values?.religion_id);
      // formData.append('religionName', values?.religion_name);
      // formData.append('casteId', values?.caste_id);
      // formData.append('casteName', values?.caste_name);
      // formData.append('categoryId', values?.category_id);
      // formData.append('categoryName', values?.category_id);
      // // formData.append('rollNo', values?.roll_number);
      // formData.append('bloodGroupId', values?.blood_group_id);
      // formData.append('bloodGroupName', values?.blood_group_name);
      // formData.append('houseWardId', values?.ward_id);
      // formData.append('houseWardName', values?.ward_name);
      // formData.append('disability', values?.disability_id);
      // formData.append('aadharNo', values?.aadhar_no);
      // formData.append('Email', values?.email);
      // formData.append('Mobile', values?.mobile);
      // // formData.append(
      // //   'concession_type_id',
      // //   values?.concession_type_id
      // // );
      // // formData.append('lastSchoolName', values?.last_school_name);
      // // formData.append('lastSchoolAddress', values?.last_school_address);
      // // formData.append('admissionMidSession', values?.admission_mid_session);
      // // formData.append(
      // //   'admissionMonth',
      // //   values?.admission_month_id
      // // );
      // formData.append('admissionMonth', values?.admission_month);
      // // values?.extra_curricular_activity.forEach(
      // //   (obj, index) => {
      // //     formData.append(`extra_curricular_activity[${index}][id]`, obj?.id);
      // //   }
      // // );
      // formData.append('uploadImage', values?.upload_image);
      // // parent detail start
      // formData.append('fathersName', values?.fathers_name);
      // formData.append('fathersMobNo', values?.fathers_mobile);
      // formData.append('fathersEmail', values?.fathers_email);
      // formData.append('fathersOccupationId', values?.fathers_occupation_id);
      // formData.append('fathersOccupationName', values?.fathers_occupation_name);
      // formData.append(
      //   'fathersQualificationName',
      //   values?.fathers_qualification_name
      // );
      // formData.append(
      //   'fathersQualificationId',
      //   values?.fathers_qualification_id
      // );
      // formData.append('fathersAadhar', values?.fathers_aadhar_no);
      // formData.append('fathersAnnualIncome', values?.fathers_annual_income);
      // formData.append('fathersImage', values?.fathers_image);
      // // mothers detail
      // formData.append('mothersName', values?.mothers_name);
      // formData.append('mothersMobNo', values?.mothers_mobile);
      // formData.append('mothersEmail', values?.mothers_email);
      // formData.append(
      //   'mothersQualificationId',
      //   values?.mothers_qualification_id
      // );
      // formData.append(
      //   'mothersQualificationName',
      //   values?.mothers_qualification_name
      // );
      // formData.append('mothersOccupationId', values?.mothers_occupation_id);
      // formData.append('mothersOccupationName', values?.mothers_occupation_name);
      // formData.append('mothersAnnualIncome', values?.mothers_annual_income);
      // formData.append('mothersAadhar', values?.mothers_aadhar_no);
      // formData.append('mothersImage', values?.mothers_image);
      // formData.append('guardianName', values?.guardian_name);
      // formData.append('guardianMobNo', values?.guardian_mobile);
      // formData.append('guardianEmail', values?.guardian_email);
      // formData.append('guardianOccupationId', values?.guardian_occupation_id);
      // formData.append(
      //   'guardianOccupationName',
      //   values?.guardian_occupation_name
      // );
      // formData.append(
      //   'guardianQualificationId',
      //   values?.guardian_qualification_id
      // );
      // formData.append(
      //   'guardianQualificationName',
      //   values?.guardian_qualification_name
      // );
      // formData.append('guardianAadhar', values?.guardian_aadhar_no);
      // formData.append('guardianAnnualIncome', values?.guardian_annual_income);
      // formData.append('relation', values?.relation_id);
      // // parent detail end
      // // address detail start
      // formData.append('pAddress1', values?.p_address1);
      // formData.append('check', values?.check);
      // formData.append('pAddress2', values?.p_address2);
      // formData.append('cAddress1', values?.c_address1);
      // formData.append('cAddress2', values?.c_address2);
      // formData.append('pLocality', values?.p_locality);
      // formData.append('cLocality', values?.c_locality);
      // formData.append('pLandmark', values?.p_landmark);
      // formData.append('cLandmark', values?.c_landmark);
      // formData.append('pDistrictId', values?.p_district_id);
      // formData.append('pDistrictName', values?.p_district_name);
      // formData.append('cDistrictId', values?.c_district_id);
      // formData.append('cDistrictName', values?.c_district_name);
      // formData.append('pStateId', values?.p_state_id);
      // formData.append('pStateName', values?.p_state_name);
      // formData.append('cStateId', values?.c_state_id);
      // formData.append('cStateName', values?.c_state_name);
      // formData.append('pCountryId', values?.p_country_id);
      // formData.append('pCountryName', values?.p_country_name);
      // formData.append('cCountryId', values?.c_country_id);
      // formData.append('cCountryName', values?.c_country_name);
      // formData.append('pPincode', values?.p_pincode);
      // formData.append('cPincode', values?.c_pincode);
      // // address detail end
      // // bank detail start
      // // formData.append('accountNo', values?.account_no);
      // // formData.append('ifscCode', values?.ifsc_code);
      // // formData.append('branchName', values?.branch_name);
      // // formData.append('bankName', values?.bank_name);
      // // formData.append('bankId', values?.bank_id);
      // // bank detail end
      // // sibling detail start
      // values?.siblingDetails?.forEach((obj, index) => {
      //   formData.append(
      //     `siblingDetails[${index}][siblingName]`,
      //     obj?.siblingName
      //   );
      //   formData.append(
      //     `siblingDetails[${index}][siblingClass]`,
      //     obj?.siblingClassId
      //   );
      //   formData.append(
      //     `siblingDetails[${index}][siblingSection]`,
      //     obj?.siblingSectionId
      //   );
      //   formData.append(
      //     `siblingDetails[${index}][siblingAdmissionNo]`,
      //     obj?.siblingAdmissionNo
      //   );
      //   formData.append(
      //     `siblingDetails[${index}][siblingRollNo]`,
      //     obj?.siblingRollNo
      //   );
      // });
      // formData.append('pickUpPointId', values?.pickup_point_id);
      // formData.append('pickPointName', values?.pickup_point_name);
      // formData.append('routeId', values?.route_id);
      // formData.append('routeName', values?.route_name);
      // formData.append('isTransport', values?.is_transport);
      // // end form value
      // // for (var pair of formData.entries()) {
      // //   console.log(pair[0] + ':' + pair[1]);
      // // }
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: 'You want to submit this form?',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes, submit it!',
      //   cancelButtonText: 'No, cancel!',
      //   reverseButtons: true
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     setisLoading(true);
      //     AxiosInterceptors.post(api_public_registration, formData, ApiHeader())
      //       .then(function (response) {
      //         console.log('Student Reg..', response);
      //         if (response?.data?.status) {
      //           localStorage.setItem(
      //             'admission_no',
      //             response?.data?.data?.basicDetails?.admission_no
      //           );
      //           navigate('/public-student-registration-submitted');
      //           setisLoading(false);
      //           Swal.fire({
      //             icon: 'success',
      //             title: `Added`,
      //             text: `Information Added Successfully.`,
      //             showConfirmButton: false,
      //             timer: 1500
      //           });
      //           console.log('==1 response list...', response);
      //         } else {
      //           activateBottomErrorCard(true, response?.data?.message);
      //           setisLoading(false);
      //         }
      //         setisLoading(false);
      //       })
      //       .catch(function (error) {
      //         console.log('==2 error list...', error);
      //         activateBottomErrorCard(
      //           true,
      //           response?.data?.message ?? 'Something went wrong'
      //         );
      //         setisLoading(false);
      //       });
      //     // Swal.fire({
      //     //   title: 'Submitted!',
      //     //   text: 'Form submitted successfully.',
      //     //   icon: 'success',
      //     //   showConfirmButton: false,
      //     //   timer: 1500
      //     // });
      //   } else if (result.dismiss === Swal.DismissReason.cancel) {
      //     Swal.fire({
      //       title: 'Cancelled',
      //       text: 'Form not submitted :)',
      //       icon: 'error',
      //       showConfirmButton: false,
      //       timer: 1500
      //     });
      //   }
      // });
      next(values, false);
    }
  });
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [page]);

  //  page render then page scroll to top

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
        <Form onSubmit={formik?.handleSubmit}>
          <div className="mt-8">
            <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
              <div className="flex">
                <img
                  src={Img11}
                  alt="Basic"
                  className="mr-3 w-10 h-10 opacity-80"
                />{' '}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Basic Details
                </span>
              </div>
            </h1>
            {/* <hr className="mx-auto" /> */}
          </div>
          {/* view design in tailwind css with bordered */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 text-start border p-2">
            {basicDetail.map((item) => (
              <>
                <div className="p-1  lg:border-none lg:col-span-1">
                  <h1 className="text-[#6b7280]">{item?.label} :</h1>
                </div>
                <div className="p-1 lg:col-span-3 ">{item?.value}</div>
              </>
            ))}
            <div className="p-4">
              <div>
                {data?.getObjectURL && (
                  <img
                    src={data?.getObjectURL}
                    alt="img"
                    className="w-32 h-32 rounded"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
              <div className="flex justify-between items-center">
                <div>
                  <img
                    src={Img12}
                    alt="Basic"
                    className="mr-3 w-10 h-10 opacity-80"
                  />{' '}
                  <span className="flex items-center justify-center mt-2 text-[22px]">
                    Parent Details
                  </span>
                </div>
              </div>
            </h1>
            {/* <hr className="mx-auto" /> */}
            <div className="border p-2">
              <div className=" mt-6 sm:mx-0 lg:mx-4">
                <h1 className="font-semibold text-gray-600 text-start">
                  Father's Details: (1)
                </h1>
                <hr />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2">
                {fatherDetails.map((item) => (
                  <>
                    <div className="p-1  lg:border-none lg:col-span-1">
                      <h1 className="text-[#6b7280]">{item?.label} :</h1>
                    </div>
                    <div className="p-1 lg:col-span-3 ">{item?.value}</div>
                  </>
                ))}
              </div>
              <div className=" mt-6 sm:mx-0 lg:mx-4">
                <h1 className="font-semibold text-gray-600 text-start">
                  Mother's Details: (2)
                </h1>
                <hr />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2">
                {motherDetails.map((item) => (
                  <>
                    <div className="p-1  lg:border-none lg:col-span-1">
                      <h1 className="text-[#6b7280]">{item?.label} :</h1>
                    </div>
                    <div className="p-1 lg:col-span-3 ">{item?.value}</div>
                  </>
                ))}
              </div>
              <div className=" mt-6 sm:mx-0 lg:mx-4">
                <h1 className="font-semibold text-gray-600 text-start">
                  Guardian's Details: (3)
                </h1>
                <hr />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2">
                {guardianDetails.map((item) => (
                  <>
                    <div className="p-1  lg:border-none lg:col-span-1">
                      <h1 className="text-[#6b7280]">{item?.label} :</h1>
                    </div>
                    <div className="p-1 lg:col-span-3 ">{item?.value}</div>
                  </>
                ))}
              </div>
            </div>
          </div>
          {/* address */}
          <div className="mt-8">
            <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
              <div className="flex justify-between items-center">
                <div>
                  <img
                    src={Img12}
                    alt="Basic"
                    className="mr-3 w-10 h-10 opacity-80"
                  />{' '}
                  <span className="flex items-center justify-center mt-2 text-[22px]">
                    Address
                  </span>
                </div>
              </div>
            </h1>
            {/* <hr className="mx-auto" /> */}
            <div className="border p-2">
              <div className=" mt-6 sm:mx-0 lg:mx-4">
                <h1 className="font-semibold text-gray-600 text-start">
                  Permanent Address:
                </h1>
                <hr />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2">
                {pAddressDetails.map((item) => (
                  <>
                    <div className="p-1  lg:border-none lg:col-span-1">
                      <h1 className="text-[#6b7280]">{item?.label} :</h1>
                    </div>
                    <div className="p-1 lg:col-span-3 ">{item?.value}</div>
                  </>
                ))}
              </div>
              <div className=" mt-6 sm:mx-0 lg:mx-4">
                <h1 className="font-semibold text-gray-600 text-start">
                  Communication Address:
                </h1>
                <hr />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2">
                {cAddressDetails.map((item) => (
                  <>
                    <div className="p-1  lg:border-none lg:col-span-1">
                      <h1 className="text-[#6b7280]">{item?.label} :</h1>
                    </div>
                    <div className="p-1 lg:col-span-3 ">{item?.value}</div>
                  </>
                ))}
              </div>
            </div>
            {/* sibling */}
          </div>
          <div className="mt-8">
            <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
              <div className="flex">
                <HiUserGroup className="inline-block w-10 h-10 text-blue-400 mr-2" />
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Sibling Details
                </span>
              </div>
            </h1>

            <div>
              {siblingData?.map((item) => (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2 mt-2">
                  {item?.map((item1) => {
                    return (
                      <>
                        <div className="p-1  lg:border-none lg:col-span-1">
                          <h1 className="text-[#6b7280]">{item1?.label} :</h1>
                        </div>
                        <div className="p-1 lg:col-span-3 ">{item1?.value}</div>
                      </>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* transport */}
          <div className="mt-8">
            <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
              <div className="flex">
                <HiUserGroup className="inline-block w-10 h-10 text-blue-400 mr-2" />
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Transport Details
                </span>
              </div>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0  text-start  border p-2">
              {Transport.map((item) => (
                <>
                  <div className="p-1  lg:border-none lg:col-span-1">
                    <h1 className="text-[#6b7280]">{item?.label} :</h1>
                  </div>
                  <div className="p-1 lg:col-span-3 ">{item?.value}</div>
                </>
              ))}
            </div>
          </div>
          <div className="mt-8">
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
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}
