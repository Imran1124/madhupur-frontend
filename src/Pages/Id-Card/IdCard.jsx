import React from 'react';
import logo from '../../assets/school.png';
import student from '../../assets/Img02 6.png';
import { useFormik } from 'formik';
import * as yup from 'yup';
import QR from '../../assets/qr.png';
import ApiList from '../../Components/ApiList/ApiList';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import { useEffect, useState } from 'react';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { nullToNA } from '../../Components/Common/PowerupFunctions';

const IdCard = () => {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [classList, setCLassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [idCardData, setIdCardData] = useState([]);
  const { api_getactiveClassData, api_section_group_map, api_idCardSearch } =
    ApiList();

  const validationSchema = yup.object({
    classId: yup.string().required('Select class'),
    //  sectionId: yup.string().required("Select section"),
    admissionNo: yup.string().required('Please enter admission number')
  });
  const formik = useFormik({
    initialValues: {
      classId: '',
      sectionId: '',
      admissionNo: ''
    },

    onSubmit: (values) => {
      setisLoading(true);
      console.log('at submit ', values);
      AxiosInterceptors.post(
        api_idCardSearch,
        {
          classId: values.classId,
          sectionId: values.sectionId,
          admissionNo: values.admissionNo
        },
        ApiHeader()
      )
        .then(function (response) {
          console.log('view id card search master..', response?.data?.data);
          if (response?.data?.status === true) {
            setIdCardData(response?.data?.data);
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
    },
    validationSchema
  });
  const fetchClassList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setCLassList(response?.data.data);
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
  const fetchSectionList = (values) => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_section_group_map,
      { classId: values },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setSectionList(response?.data.data);
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
    fetchClassList();
  }, []);
  useEffect(() => {
    if (formik.values.classId) {
      fetchSectionList(formik.values.classId);
    }
  }, [formik.values.classId]);
  const handleChange = () => {};
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
      <div className="form-div">
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
          <div className="px-52 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="w-full px-2">
              <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                Class
                <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
              </label>
              <select
                {...formik.getFieldProps('classId')}
                type="number"
                className={`form-control h-10 block bg-white w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                placeholder="Select class"
              >
                <option value="">Select</option>
                {classList?.map((data, index) => (
                  <option value={data?.id}>{data?.class_name}</option>
                ))}
              </select>
              <span className="text-red-600 text-xs">
                {formik.touched.classId && formik.errors.classId
                  ? formik.errors.classId
                  : null}
              </span>
            </div>
            <div className="w-full px-2">
              <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                Admission No
                <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
              </label>
              <input
                {...formik.getFieldProps('admissionNo')}
                type="text"
                className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                placeholder="Enter admission no"
              />
              <span className="text-red-600 text-xs">
                {formik.touched.admissionNo && formik.errors.admissionNo
                  ? formik.errors.admissionNo
                  : null}
              </span>

              {/* <span className="text-red-600 text-xs">
                      {formik.touched.chasisNo && formik.errors.chasisNo
                        ? formik.errors.chasisNo
                        : null}
                    </span> */}
            </div>

            <div className="mt-8">
              <button type="submit" className="save-button">
                Search
              </button>
            </div>
          </div>

          {/* Will appear After Searching */}
          {idCardData.map((data) => {
            return (
              <>
                <div className="h-[65vh] w-[80vw] overflow-y-auto mt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 ml-[12vh] max-[700px]:ml-2 mt-[5vw] max-[1201px]:block">
                    <div className=" h-[100%] w-full  lg:w-[75%]">
                      <div className="bg-[#22d3ee] w-full h-[75px]  rounded-t-[20px]">
                        <div className="flex justify-center items-center w-full">
                          <div className="flex justify-center items-center w-full">
                            <img
                              className="w-[5.5vh] h-[5.5vh]  rounded-full border border-gray-600 mt-2 mr-10 `"
                              src="/assets/schoollogo.jpeg"
                              alt=""
                            />
                            <h1 className=" text-lg font-bold text-white mt-2">
                              SR International School
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div
                        className=" top-0 left-0 w-[100%] h-[86%] border rounded-b-[20px]"
                        style={{
                          background:
                            'linear-gradient(to top left, #cffafe 50%, white 50%)',
                          transform: 'skewY(-0deg)',
                          transformOrigin: 'top left'
                        }}
                      >
                        <div className=" flex flex-col justify-center items-center ">
                          <div className="mt-5 ">
                            <img
                              className="w-20 md:w-32 -mt-8 sm:-mt-10 md:-mt-7 lg:-mt-10 rounded-full border-2 border-white"
                              src={student}
                              alt=""
                            />
                          </div>
                          <div className="mt-3">
                            <h1 className="text-transparent font-semibold text-3xl bg-clip-text bg-gradient-to-b from-[#1e1b4b] to-[#99f6e4]">
                              {nullToNA(data?.full_name)}
                            </h1>
                          </div>
                          <div className=" text-gray-700  text-[1.8vh] font-semibold   flex  flex-col justify-start items-start  ml-4 mt-6">
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] ">
                                Admission no :{' '}
                              </span>
                              {nullToNA(data?.admission_no)}
                            </h1>
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] ">
                                Class :{' '}
                              </span>
                              {nullToNA(data?.class_name)}
                            </h1>
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] ">
                                Section :{' '}
                              </span>
                              {nullToNA(data?.section_name)}
                            </h1>
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] ">
                                Roll no :{' '}
                              </span>
                              {nullToNA(data?.roll_no)}
                            </h1>
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] ">
                                DOB :{' '}
                              </span>
                              {nullToNA(data?.dob)}
                            </h1>
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] font-semibold">
                                Blood :{' '}
                              </span>
                              {nullToNA(data?.blood_group_name)}
                            </h1>
                            <h1>
                              <span className="text-[#0891b2] text-[2vh] font-semibold">
                                Status :{' '}
                              </span>
                              {nullToNA(data?.status)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-4 ">
                          <img
                            src={QR}
                            alt="qrcode"
                            className="w-[20vh] h-[5vh]"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-8 text-sm  text-gray-600 px-12 py-3 ">
                          <div>
                            <h1>
                              Principle<span className="block"> Signature</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              Class Teacher{' '}
                              <span className="block"> Signature</span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[100%] w-full  lg:w-[75%]  text-gray-600 font-semibold max-[1201px]:mt-2 ">
                      <div className="bg-[#22d3ee] w-full h-[75px]  rounded-t-[20px]">
                        <div className="flex justify-center items-center w-full">
                          <div className="flex justify-center items-center w-full">
                            <img
                              className="w-[5.5vh] h-[5.5vh]  rounded-full border border-gray-600 mt-2 mr-10 `"
                              src="/assets/schoollogo.jpeg"
                              alt=""
                            />
                            <h1 className=" text-lg font-bold text-white mt-2">
                              SR International School
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div
                        className=" top-0 left-0 w-[100%] h-[86%] border rounded-b-[20px]"
                        style={{
                          background:
                            'linear-gradient(to top right, #cffafe 50%, white 50%)',
                          transform: 'skewY(-0deg)',
                          transformOrigin: 'top right'
                        }}
                      >
                        <div className="text-lg mt-2 flex items-start justify-start ml-12">
                          <h1>
                            <span className="text-[#0891b2] text-[2vh] font-semibold">
                              Address :
                            </span>{' '}
                            {nullToNA(data?.p_address1)}
                          </h1>
                        </div>
                        <div className="flex gap-y-2 flex-col justify-start items-start text-lg ml-12 mt-2 pb-3">
                          <h1>
                            <span className="text-[#0891b2] text-[2vh] font-semibold">
                              Contact no:
                            </span>
                            {nullToNA(data?.mobile)}
                          </h1>
                          <h1>
                            <span className="text-[#0891b2] text-[2vh] font-semibold">
                              Email:
                            </span>
                            {nullToNA(data?.email)}
                          </h1>
                          <h1>
                            <span className="text-[#0891b2] text-[2vh] font-semibold">
                              Fax no:
                            </span>
                            +21: 12345
                          </h1>
                          <div className="text-[#22d3ee]">
                            <h1 className="flex items-start justify-start">
                              Terms and Condition
                            </h1>
                            <div className="flex items-start justify-start w-full">
                              {' '}
                              <span>●</span>{' '}
                              <p className="w-full text-[1.7vh] flex items-start justify-start text-gray-500 text-left">
                                If This card is found, please report to the
                                office number - 0120-123456
                              </p>
                            </div>
                            <div className="flex items-start justify-start w-full">
                              {' '}
                              <span>●</span>{' '}
                              <p className="w-full text-[1.7vh] flex items-start justify-start text-gray-500 text-left">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Impedit doloremque officia
                                officiis minus repellat tempora sapiente
                                doloribus, est tempore? Et odio libero eligendi
                                neque labore porro error molestiae minus iure!
                              </p>
                            </div>
                          </div>

                          <h1>
                            <span className="text-[#0891b2] text-[2vh] font-semibold">
                              Start Session:
                            </span>{' '}
                            {data?.academic_year}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default IdCard;
