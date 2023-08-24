/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import { pinRegExp, CATEGORY_REGEX } from '../../constant';
import * as yup from 'yup';
import Img11 from '../../assets/image 20.png';
import Img12 from '../../assets/image 24.png';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import useCommonApi from '../../Components/Hooks/useCommonApi';
import Swal from 'sweetalert2';
import { allowCharacterNumberInput } from '../../Components/Common/PowerupFunctions';

export default function ParentDetails(props) {
  const admissionNumber = localStorage.getItem('admission_no');
  const navigate = useNavigate();
  const { categoryByNameData } = useCommonApi();
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('admission_no')
  );
  const [pickPoint, setPickPoint] = useState([]);
  const [getRoute, setRoute] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const {
    api_getcategorybynameData,
    api_getPickupPointDataActive,
    api_store_student,
    api_getRouteDataActiveAll
  } = ApiList();

  const fun = (submitData) => {
    const data = {
      admissionNo: admissionNumber,
      rollNo: props?.allFormData?.basic_detail.roll_number,
      firstName: props?.allFormData?.basic_detail.first_name,
      middleName: props?.allFormData?.basic_detail.middle_name,
      lastName: props?.allFormData?.basic_detail.last_name,
      classId: props?.allFormData?.basic_detail.class_id,
      className: props?.allFormData?.basic_detail.class_name,
      sectionId: props?.allFormData?.basic_detail.section_id,
      sectionName: props?.allFormData?.basic_detail.section_name,
      Dob: props?.allFormData?.basic_detail.dob,
      admissionDate: props?.allFormData?.basic_detail.admission_date,
      genderId: parseInt(props?.allFormData?.basic_detail?.gender_id),
      genderName: props?.allFormData?.basic_detail?.gender_name,
      bloodGroupId: props?.allFormData?.basic_detail?.blood_group_id,
      bloodGroupName: props?.allFormData?.basic_detail?.blood_group_name,
      Email: props?.allFormData?.basic_detail?.email,
      Mobile: props?.allFormData?.basic_detail?.mobile,
      aadharNo: props?.allFormData?.basic_detail?.aadhar_no,
      disability: props?.allFormData?.basic_detail?.disability_id,
      categoryId: props?.allFormData?.basic_detail?.category_id,
      categoryName: props?.allFormData?.basic_detail?.category_name,
      casteId: props?.allFormData?.basic_detail?.caste_id,
      casteName: props?.allFormData?.basic_detail?.caste_name,
      religionId: props?.allFormData?.basic_detail?.religion_id,
      religionName: props?.allFormData?.basic_detail?.religion_name,
      houseWardId: props?.allFormData?.basic_detail?.ward_id,
      houseWardName: props?.allFormData?.basic_detail?.ward_name,
      lastSchoolName: props?.allFormData?.basic_detail?.last_school_name
    };
    console.log(data);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to submit this information?',
      text: 'You want to submit it!',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.value) {
        saveMasterForm(data);
      }
    });
  };

  const fun1 = (data) => {
    props?.setFormDataFun('transport', data);
    props?.setFam_data(data);
    console.log(props?.allFormData);
    const formData = new FormData();
    formData.append('admissionNo', admissionNumber);
    // formData.append('admissionNo', '7666677');

    // formData.append('busNo', data?.bus_no);
    // formData.append('applicableForm', data?.applicable_form);
    formData.append('firstName', props?.allFormData?.basic_detail?.first_name);
    formData.append(
      'middleName',
      props?.allFormData?.basic_detail?.middle_name
    );
    formData.append('lastName', props?.allFormData?.basic_detail.last_name);
    formData.append('dob', props?.allFormData?.basic_detail?.dob);
    formData.append('classId', props?.allFormData?.basic_detail?.class_id);
    formData.append('className', props?.allFormData?.basic_detail?.class_name);
    formData.append('Dob', props?.allFormData?.basic_detail?.dob);
    formData.append(
      'sectionName',
      props?.allFormData?.basic_detail?.section_name
    );
    formData.append('sectionId', props?.allFormData?.basic_detail?.section_id);
    formData.append(
      'Mobile',
      parseInt(props?.allFormData?.basic_detail?.mobile)
    );
    formData.append(
      'admissionDate',
      props?.allFormData?.basic_detail?.admission_date
    );
    formData.append('genderId', props?.allFormData?.basic_detail?.gender_id);
    formData.append(
      'genderName',
      props?.allFormData?.basic_detail?.gender_name
    );
    formData.append(
      'religionId',
      props?.allFormData?.basic_detail?.religion_id
    );
    formData.append(
      'religionName',
      props?.allFormData?.basic_detail?.religion_name
    );
    formData.append('casteId', props?.allFormData?.basic_detail?.caste_id);
    formData.append('casteName', props?.allFormData?.basic_detail?.caste_name);
    formData.append(
      'categoryId',
      props?.allFormData?.basic_detail?.category_id
    );
    formData.append(
      'categoryName',
      props?.allFormData?.basic_detail?.category_id
    );

    formData.append('rollNo', props?.allFormData?.basic_detail?.roll_number);

    formData.append(
      'bloodGroupId',
      props?.allFormData?.basic_detail?.blood_group_id
    );
    formData.append(
      'bloodGroupName',
      props?.allFormData?.basic_detail?.blood_group_name
    );
    formData.append('houseWardId', props?.allFormData?.basic_detail?.ward_id);
    formData.append(
      'houseWardName',
      props?.allFormData?.basic_detail?.ward_name
    );
    formData.append(
      'disability',
      props?.allFormData?.basic_detail?.disability_id
    );
    formData.append('aadharNo', props?.allFormData?.basic_detail?.aadhar_no);
    formData.append('Email', props?.allFormData?.basic_detail?.email);
    formData.append('Mobile', props?.allFormData?.basic_detail?.mobile);
    // formData.append(
    //   'concession_type_id',
    //   props?.allFormData?.basic_detail?.concession_type_id
    // );

    formData.append(
      'lastSchoolName',
      props?.allFormData?.basic_detail?.last_school_name
    );
    formData.append(
      'lastSchoolAddress',
      props?.allFormData?.basic_detail?.last_school_address
    );

    formData.append(
      'admissionMidSession',
      props?.allFormData?.basic_detail?.admission_mid_session
    );
    // formData.append(
    //   'admissionMonth',
    //   props?.allFormData?.basic_detail?.admission_month_id
    // );
    formData.append(
      'admissionMonth',
      props?.allFormData?.basic_detail?.admission_month
    );
    // props?.allFormData?.basic_detail?.extra_curricular_activity.forEach(
    //   (obj, index) => {
    //     formData.append(`extra_curricular_activity[${index}][id]`, obj?.id);
    //   }
    // );
    formData.append(
      'uploadImage',
      props?.allFormData?.basic_detail?.upload_image
    );

    // parent detail start
    formData.append(
      'fathersName',
      props?.allFormData?.parent_detail?.fathers_name
    );

    formData.append(
      'fathersMobNo',
      props?.allFormData?.parent_detail?.fathers_mobile
    );

    formData.append(
      'fathersEmail',
      props?.allFormData?.parent_detail?.fathers_email
    );

    formData.append(
      'fathersOccupationId',
      props?.allFormData?.parent_detail?.fathers_occupation_id
    );
    formData.append(
      'fathersOccupationName',
      props?.allFormData?.parent_detail?.fathers_occupation_name
    );
    formData.append(
      'fathersQualificationName',
      props?.allFormData?.parent_detail?.fathers_qualification_name
    );
    formData.append(
      'fathersQualificationId',
      props?.allFormData?.parent_detail?.fathers_qualification_id
    );
    formData.append(
      'fathersAadhar',
      props?.allFormData?.parent_detail?.fathers_aadhar_no
    );
    formData.append(
      'fathersAnnualIncome',
      props?.allFormData?.parent_detail?.fathers_annual_income
    );
    formData.append(
      'fathersImage',
      props?.allFormData?.parent_detail?.fathers_image
    );
    // // mothers detail
    // formData.append(
    //   'mothersName',
    //   props?.allFormData?.parent_detail?.mothers_name
    // );
    formData.append(
      'mothersMobNo',
      props?.allFormData?.parent_detail?.mothers_mobile
    );
    formData.append(
      'mothersEmail',
      props?.allFormData?.parent_detail?.mothers_email
    );

    formData.append(
      'mothersQualificationId',
      props?.allFormData?.parent_detail?.mothers_qualification_id
    );
    formData.append(
      'mothersQualificationName',
      props?.allFormData?.parent_detail?.mothers_qualification_name
    );
    formData.append(
      'mothersOccupationId',
      props?.allFormData?.parent_detail?.mothers_occupation_id
    );
    formData.append(
      'mothersOccupationName',
      props?.allFormData?.parent_detail?.mothers_occupation_name
    );
    formData.append(
      'mothersAnnualIncome',
      props?.allFormData?.parent_detail?.mothers_annual_income
    );
    formData.append(
      'mothersAadhar',
      props?.allFormData?.parent_detail?.mothers_aadhar_no
    );

    formData.append(
      'mothersImage',
      props?.allFormData?.parent_detail?.mothers_image
    );
    formData.append(
      'guardianName',
      props?.allFormData?.parent_detail?.guardian_name
    );
    formData.append(
      'guardianMobNo',
      props?.allFormData?.parent_detail?.guardian_mobile
    );
    formData.append(
      'guardianEmail',
      props?.allFormData?.parent_detail?.guardian_email
    );
    formData.append(
      'guardianOccupationId',
      props?.allFormData?.parent_detail?.guardian_occupation_id
    );
    formData.append(
      'guardianOccupationName',
      props?.allFormData?.parent_detail?.guardian_occupation_name
    );
    formData.append(
      'guardianQualificationId',
      props?.allFormData?.parent_detail?.guardian_qualification_id
    );
    formData.append(
      'guardianQualificationName',
      props?.allFormData?.parent_detail?.guardian_qualification_name
    );
    formData.append(
      'guardianAadhar',
      props?.allFormData?.parent_detail?.guardian_aadhar_no
    );
    formData.append(
      'guardianAnnualIncome',
      props?.allFormData?.parent_detail?.guardian_annual_income
    );
    formData.append('relation', props?.allFormData?.parent_detail?.relation);
    // parent detail end

    // address detail start
    formData.append('pAddress1', props?.allFormData?.address?.p_address1 || '');
    formData.append('check', props?.allFormData?.address?.check);
    formData.append('pAddress2', props?.allFormData?.address?.p_address2 || '');
    formData.append('cAddress1', props?.allFormData?.address?.c_address1 || '');
    formData.append('cAddress2', props?.allFormData?.address?.c_address2 || '');
    formData.append('pLocality', props?.allFormData?.address?.p_locality || '');
    formData.append('cLocality', props?.allFormData?.address?.c_locality || '');
    formData.append('pLandmark', props?.allFormData?.address?.p_landmark || '');
    formData.append('cLandmark', props?.allFormData?.address?.c_landmark || '');
    formData.append('pDistrictId', props?.allFormData?.address?.p_district_id);
    formData.append(
      'pDistrictName',
      props?.allFormData?.address?.p_district_name || ''
    );
    formData.append('cDistrictId', props?.allFormData?.address?.c_district_id);
    formData.append(
      'cDistrictName',
      props?.allFormData?.address?.c_district_name || ''
    );
    formData.append('pStateId', props?.allFormData?.address?.p_state_id);
    formData.append(
      'pStateName',
      props?.allFormData?.address?.p_state_name || ''
    );
    formData.append('cStateId', props?.allFormData?.address?.c_state_id);
    formData.append(
      'cStateName',
      props?.allFormData?.address?.c_state_name || ''
    );
    formData.append('pCountryId', props?.allFormData?.address?.p_country_id);
    formData.append(
      'pCountryName',
      props?.allFormData?.address?.p_country_name || ''
    );
    formData.append('cCountryId', props?.allFormData?.address?.c_country_id);
    formData.append(
      'cCountryName',
      props?.allFormData?.address?.c_country_name || ''
    );
    formData.append('pPincode', props?.allFormData?.address?.p_pincode);
    formData.append('cPincode', props?.allFormData?.address?.c_pincode);
    // address detail end

    // bank detail start
    formData.append('accountNo', props?.allFormData?.bank_details?.account_no);
    formData.append('ifscCode', props?.allFormData?.bank_details?.ifsc_code);
    formData.append(
      'branchName',
      props?.allFormData?.bank_details?.branch_name
    );
    formData.append('bankName', props?.allFormData?.bank_details?.bank_name);
    formData.append('bankId', props?.allFormData?.bank_details?.bank_id);
    // bank detail end

    // sibling detail start
    props?.allFormData?.sibling_details?.forEach((obj, index) => {
      formData.append(
        `siblingDetails[${index}][siblingName]`,
        obj?.sibling_name
      );
      formData.append(
        `siblingDetails[${index}][siblingClass]`,
        obj?.sibling_class
      );
      formData.append(
        `siblingDetails[${index}][siblingSection]`,
        obj?.sibling_section
      );
      formData.append(
        `siblingDetails[${index}][siblingAdmissionNo]`,
        obj?.sibling_admission_no
      );
      formData.append(`siblingDetails[${index}][siblingRollNo]`, obj?.roll_no);
    });
    // sibling detail end
    //  pickpoint detail start

    formData.append('pickUpPointId', data?.pick_point_id);
    formData.append('pickPointName', data?.pick_point_name);
    formData.append('routeId', data?.route_id);
    formData.append('routeName', data?.route_name);
    formData.append('isTransport', data?.is_transport);

    // submit console.log
    for (var pair of formData.entries()) {
      console.log(pair[0] + ':' + pair[1]);
    }

    saveMasterForm(formData);
  };

  const saveMasterForm = (formData) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      formData
    };

    url = api_store_student;
    requestBody = formData;

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Add Employee..', response);
        if (response?.data?.status === true) {
          navigate('/view-student-list');
          Swal.fire({
            icon: 'success',
            title: `Added`,
            text: `Information Added Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log('==1 response list...', response);
        } else {
          activateBottomErrorCard(true, 'Error occured in submitting form.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured in submitting form.');

        setisLoading(false);
      });
  };

  const initialValues = {
    is_transport: false,
    route_id: '',
    route_name: '',
    pick_point_id: '',
    pick_point_name: ''
    // bus_no: '',
    // applicable_form: ''
  };
  const validationSchema = yup.object({
    route: yup.string().min(3).max(20).label('Route')
    // bus_no: yup.string().min(4).max(14).label('Bus No'),
    // applicable_form: yup.string().min(4).max(50).label('Applicable form')
  });
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      console.log('values', values);
      fun1(values);
    },
    validationSchema
  });
  const handleback = () => {
    props?.setCounterFun(5);
  };

  const handleOnChange = (e) => {
    let name = e.target.name;

    if (name == 'pick_point_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setPickUpPoint(selectName, selectValue);
    }
    if (name == 'route_id') {
      let selectName = e.target.selectedOptions[0].text;
      let selectValue = e.target.selectedOptions[0].value;
      setRouteData(selectName, selectValue);
    }
  };

  const setPickUpPoint = (selectName, selectedValue) => {
    formik.setFieldValue('pick_point_name', selectName);
    formik.setFieldValue('pick_point_id', selectedValue);
  };

  const setRouteData = (selectName, selectedValue) => {
    formik.setFieldValue('route_name', selectName);
    formik.setFieldValue('route_id', selectedValue);
  };

  const fetchPickPoint = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getPickupPointDataActive, {}, ApiHeader())
      .then(function (response) {
        console.log('view fee master..', response?.data?.data);
        if (response?.data?.status) {
          setPickPoint(response?.data?.data);
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

  const getRouteMaster = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getRouteDataActiveAll, {}, ApiHeader())
      .then(function (response) {
        console.log('section Data..', response?.data?.data);
        if (response?.data?.status) {
          setRoute(response?.data?.data);
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

  useEffect(() => {
    fetchPickPoint();
    getRouteMaster();
  }, []);

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {isLoading && <BarLoader />}
      {/* {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />} */}
      <div className="h-[82vh] w-[70%] bg-white overflow-auto  border border-slate-300 rounded-[15px] max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
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
                    Transport Details
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
              <div className=" flex items-start justify-start text-[#6b7280] text-[2.5vh] font-bold">
                <input
                  id="check"
                  name="is_transport"
                  type="checkbox"
                  className="address"
                  onChange={formik.handleChange}
                  value={formik.values.is_transport}
                />
                <span className="text-slat-500 ml-[10px] mt-[-0.5vh] text-[20px] max-[425px]:text-[2vh]">
                  Note:If you want to use transport facility (Please Tick)
                </span>
              </div>
            </div>

            {formik.values.is_transport ? (
              <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Route
                    </label>
                    <br />
                    <select
                      className="input"
                      {...formik.getFieldProps('route_id')}
                    >
                      <option value="">Select</option>
                      {getRoute?.map((data) => (
                        <option value={data?.id}>{data?.route_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Pick Point
                    </label>
                    <br />
                    <select
                      className="input"
                      {...formik.getFieldProps('pick_point_id')}
                    >
                      <option value="">Select</option>
                      {pickPoint?.map((data) => (
                        <option value={data?.id}>
                          {data?.pickup_point_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Bus no
                    </label>
                    <br />
                    <input
                      {...formik.getFieldProps('bus_no')}
                      className="input"
                      type="text"
                    />
                    <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                      {formik.touched.bus_no && formik.errors.bus_no
                        ? formik.errors.bus_no
                        : null}
                    </p>
                  </div>
                </div> */}
                {/* <div className="w-full mx-[10px]  px-[10px]">
                  <div>
                    <label htmlFor="exampleEmail" className="label">
                      Applicable form
                    </label>
                    <br />
                    <input
                      {...formik.getFieldProps('applicable_form')}
                      className="input"
                      type="text"
                    />
                    <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                      {formik.touched.applicable_form &&
                      formik.errors.applicable_form
                        ? formik.errors.applicable_form
                        : null}
                    </p>
                  </div>
                </div> */}
              </div>
            ) : null}
          </div>

          {/* mothers */}

          {/* Guardian detail */}

          <div className="flex items-end justify-end pb-[20px] max-[768px]:block">
            <button type="button" className="back-btn" onClick={handleback}>
              BACK
            </button>
            <button type="submit" className="next-btn">
              Final Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
