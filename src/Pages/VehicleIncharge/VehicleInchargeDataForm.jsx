/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { allowCharacterInput } from '../../Components/Common/PowerupFunctions';
import ApiList from '../../Components/ApiList/ApiList';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import Tabs from '../Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { ADDRESS_REGEX } from '../../constant';
import { phoneRegExp } from '../../constant';
import { aadharRegExp } from '../../constant';
import { EMAIL_REGEX } from '../../constant';
import { CATEGORY_REGEX } from '../../constant';
import { FaFilePdf } from "react-icons/fa";
import BackendUrl from '../../Components/ApiList/BackendUrl';

function vehicleInchargeDataForm() {
  const [MyFile, setMyFile] = useState();
  const[cAadhar,setCAddhar]=useState("")
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [countryList, setcountryList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const {
    api_getVehicle_inchargeData,
    api_editVehicle_inchargeData,
    api_postVehicle_inchargeData,
    api_getVehicle_inchargeDataById,
    api_getStateDataActiveall,
    api_getactiveCountryData,
    api_getDistrictDataActiveAll
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    countryId: yup.string().required('Select Country.'),
    stateId: yup.string().required('Select State.'),
    cityId: yup.string().required('Select city.'),
    inchargeName: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z')
      .required('Vehical incharge name is required feild'),
    mobile: yup
      .string()
      .matches(phoneRegExp, 'Please Enter valid mobile no')
      .required('mobile no is required feild'),
    email: yup
      .string()
      .matches(EMAIL_REGEX, 'Please Enter Valid Email')
      .required('Email is required feild'),
    address: yup
      .string()
      .matches(ADDRESS_REGEX, 'Please Enter Valid Address')
      .required('Address is required feild'),
    aadharNo: yup
      .string()
      .matches(aadharRegExp, 'Please Enter Valid Aadhar no')
      .required('Aadhar is required feild')
  });

  const formik = useFormik({
    initialValues: {
      countryId: '',
      stateId: '',
      cityId: '',
      inchargeName: '',
      mobile: '',
      email: '',
      address: '',
      aadharNo: '',
      aadharDoc: ''
    },

    onSubmit: async (values, resetForm) => {
      console.log('at submit ', values);
      const formdata = new FormData();
      formdata.append('aadharDoc', values.aadharDoc);
      formdata.append('inchargeName', values.inchargeName);
      formdata.append('mobile', values.mobile);
      formdata.append('email', values.email);
      formdata.append('address', values.address);
      formdata.append('aadharNo', values.aadharNo);
      formdata.append('countryId', values.countryId);
      formdata.append('stateId', values.stateId);
      formdata.append('cityId', values.cityId);

      // for (const value of formdata.values()) {
      //   console.log(value);
      // }
      saveMasterForm(formdata);
    },
    validationSchema
  });

  // FUNCTION TO SAVE MASTER DATA
  const saveMasterForm = (formdata) => {
    setisLoading(true);
    let url;
    let requestBody;
    if (id !== undefined) {
      url = api_editVehicle_inchargeData;
      requestBody = formdata;
      requestBody.id = formdata.append('id', id);
    } else {
      url = api_postVehicle_inchargeData;
      requestBody = formdata;
    }
    console.log(requestBody);

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('vehicle incharge master..', response?.data?.data);
        if (response?.data?.status === true) {
          navigate('/vehicleincharge');
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

  // FUNCTION TO FECTH DATA TO EDIT
  const fetchEditData = () => {
    setisLoading(true);
    let requestBody = {
      id: id
    };
    AxiosInterceptors.post(
      api_getVehicle_inchargeDataById,
      requestBody,
      ApiHeader()
    )
      .then(function (response) {
        console.log('fetch edit data response..', response?.data?.data);
        if (response?.data?.status) {
          stateEditData(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('= edit data error...', error);
        seterroState(true);
        setisLoading(false);
      });
  };

  // FUNCTION TO FEED EDIT DATA
  const stateEditData = (data) => {
    console.log('existing property details in prop address...', data);
    formik.setFieldValue('id', data?.id);
    formik.setFieldValue('countryId', data?.country_id);
    formik.setFieldValue('stateId', data?.state_id);
    formik.setFieldValue('cityId', data?.city_id);
    formik.setFieldValue('inchargeName', data?.incharge_name);
    formik.setFieldValue('mobile', data?.mobile);
    formik.setFieldValue('email', data?.email);
    formik.setFieldValue('address', data?.address);
    formik.setFieldValue('aadharNo', data?.aadhar_no);
    // formik.setFieldValue(
    //   'aadharDoc',
    //   new File(
    //     [`${BackendUrl}/${data?.aadhar_doc}`],
    //     `${BackendUrl}/${data?.aadhar_doc}`,
    //     {
    //       type: 'application/pdf'
    //     }
    //   )
    // );
    setCAddhar(data?.aadhar_doc);
  };
  const vehicleinchargeTypeList = () => {
    AxiosInterceptors.post(api_getVehicle_inchargeData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setDriverList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    vehicleinchargeTypeList();
    fetchcountryHeadTypeList();
    fetchStateHeadTypeList();
    fetchDistrictHeadTypeList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  const fetchcountryHeadTypeList = () => {
    AxiosInterceptors.post(api_getactiveCountryData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setcountryList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };

  const fetchStateHeadTypeList = (data) => {
    setisLoading(true);
    AxiosInterceptors.post(api_getStateDataActiveall, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          const array = response?.data?.data;
          const newArray = array.filter(
            (obj) => obj.country_id === parseInt(data)
          );
          setstateList(newArray);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };
  const fetchDistrictHeadTypeList = (data) => {
    setisLoading(true);
    AxiosInterceptors.post(api_getDistrictDataActiveAll, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          const array = response?.data?.data;
          const newArray = array.filter(
            (obj) => obj.state_id === parseInt(data)
          );
          setDistrictList(newArray);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };

  useEffect(() => {
    fetchStateHeadTypeList(formik.values.countryId);
  }, [formik.values.countryId]);

  useEffect(() => {
    fetchDistrictHeadTypeList(formik.values.stateId);
  }, [formik.values.stateId]);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == 'inchargeName' &&
        formik.setFieldValue(
          'inchargeName',
          allowCharacterInput(value, formik.values.inchargeName, 50)
        );
    }

    // if (name == "upload_image") {
    //     let myfile = e.target.files[0];
    //     handleFileValues(myfile);
    //     return;
    // }
    if (name == 'mobile') {
      let selectMobile = e.target.value;
      selectMobileNumber(selectMobile);
    }
    if (name == 'aadharNo') {
      let selectAadhar = e.target.value;
      selectAadharNumber(selectAadhar);
    }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  // const handleFileValues = (fileData) => {
  //     setMyFile(fileData);
  //     formik.setFieldValue("upload_image", fileData);
  // };
  const selectAadharNumber = (selectAadhar) => {
    if (selectAadhar > 12) {
      formik.setFieldValue('aadharNo', selectAadhar.slice(0, 12));
    }
  };

  const selectMobileNumber = (selectMobile) => {
    if (selectMobile.length > 10) {
      formik.setFieldValue('mobile', selectMobile.slice(0, 10));
    }
  };

  return (
    <>
      <div className={`main-div`}>
        <div className="main-inner-div">
          {isLoading && <BarLoader />}
          {erroState && (
            <BottomErrorCard
              activateBottomErrorCard={activateBottomErrorCard}
              errorTitle={erroMessage}
            />
          )}

          <div className="main-sub-div">
            <div className="main-sub-inner-div">
              <div className="text-div">
                <div className="big-text">Vehicle Incharge Master Form</div>
                <div className="small-text">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            <div className="tab-div">
              <div className="add-button-master-div">
                <button
                  onClick={() => navigate('/vehicleincharge-form')}
                  type="submit"
                  className=" add-button-master"
                >
                  Add{' '}
                </button>
              </div>
            </div>
          </div>

          {id !== undefined ? (
            ''
          ) : (
            <Tabs
              listRoute={'/vehicleincharge'}
              formRoute={'/vehicleincharge-form'}
            />
          )}
          <div className="mt-6 border-b">
            <span className="text-lg font-noarml text-gray-500">
              Details of Vehicle Incharge
            </span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Incharge Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('inchargeName')}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter incharge name"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.inchargeName && formik.errors.inchargeName
                        ? formik.errors.inchargeName
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Email
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('email')}
                      type="email"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter  email"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Mobile No.
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('mobile')}
                      type="number"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter mobile no"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.mobile && formik.errors.mobile
                        ? formik.errors.mobile
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Address
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('address')}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter address"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.address && formik.errors.address
                        ? formik.errors.address
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Aadhar No.
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('aadharNo')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter aadhar no."
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.aadharNo && formik.errors.aadharNo
                        ? formik.errors.aadharNo
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Country
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('countryId')}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select country"
                    >
                      <option value="">Select</option>
                      {countryList?.map((data, index) => (
                        <option value={data?.id}>{data?.country_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600 text-xs">
                      {formik.touched.countryId && formik.errors.countryId
                        ? formik.errors.countryId
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      State
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('stateId')}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select state"
                    >
                      <option value="">Select</option>
                      {stateList?.map((data, index) => (
                        <option value={data?.id}>{data?.state_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.stateId && formik.errors.stateId
                        ? formik.errors.stateId
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      City
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('cityId')}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select city"
                    >
                      <option value="">Select</option>
                      {districtList?.map((data, index) => (
                        <option value={data?.id}>{data?.city_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600 text-xs">
                      {formik.touched.cityId && formik.errors.cityId
                        ? formik.errors.cityId
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Upload Aadhar
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <div className="block justify-start">
                      <label
                        htmlFor="aadharDoc"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>
                      <input
                        className="sr-only form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                        name="aadharDoc"
                        id="aadharDoc"
                        type="file"
                        accept=".pdf"
                        size={
                          // minimum size 2 mb
                          2 * 1024 * 1024
                        }
                        onChange={(e) => {
                          formik.setFieldValue('aadharDoc', e.target.files[0]);
                        }}
                      />
                      {formik.values.aadharDoc && id !== undefined
                        ? `${formik.values.aadharDoc?.name}`.slice(
                            `${formik.values.aadharDoc?.name}`.lastIndexOf(
                              '-'
                            ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                '/'
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                '\\'
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                '.'
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                ' '
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                ','
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                '?'
                              ) + 1,
                            `${formik.values.aadharDoc?.name}`.length
                          )
                        : formik.values.aadharDoc && id === undefined
                        ? formik.values.aadharDoc?.name
                        ?? formik.values.aadharDoc?.name
                        : cAadhar 
                        ? (<a
                          href={`${BackendUrl}/api/${cAadhar}`}
                          target="_blank"
                          className="text-xl text-red-700 flex items-center justify-center"
                        >
                         {cAadhar ? ( <FaFilePdf className="text-red bg-red w-8 h-8 mt-4" />) : ""}
                        </a>)
                        : 'No file selected'}
                    </div>
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="">
                    <button
                      onClick={() => navigate('/vehicleincharge')}
                      type="button"
                      className=" deactivate-button-master bg-red-500 text-white py-2"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="submit-button-div">
                    <button
                      type="submit"
                      className="save-button"
                    >
                      {id !== undefined ? 'Update' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default vehicleInchargeDataForm;
