/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { allowNumberInput } from '../../../../Components/Common/PowerupFunctions';
import ApiList from '../../../../Components/ApiList/ApiList';
import ApiHeader from '../../../../Components/ApiList/ApiHeader';
import BarLoader from '../../../../Components/Common/BarLoader';
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard';
import Tabs from '../Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors';
import { TextField } from '../../../../Components/forms';

function ClassFeeMasterNewForm() {
  const [headList, setheadList] = useState([]);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setCLassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [marksEntry, setMarksEntry] = useState([]);
  console.log(headList);
  const {
    api_getactiveSubjectData,
    api_getactiveClassData,
    api_finance_year,
    api_mapsectionData,
    api_getMarksEntryByID,
    api_postMarksEntryData,
    api_editMarksEntryData,
    api_getMarksEntryData,
    api_fetcActiveHeadList
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    classId: yup.string().required('Select Class')
    // sectionData: yup.array().required("Select Section"),
    // subjectId: yup.string().required("Select Subject"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      classId: '',
      sectionData: [],
      tableValue: []
    },
    validationSchema,
    onSubmit: (values, resetForm) => {
      console.log('at submit ', values);

      // const submitDataForm = values?.marksEntries?.map((item) => {
      //   return {
      //     classId: values?.classId,
      //     sectionId: item?.sectionId,
      //     subjectId: item?.subjectId,
      //     isMainSubject: item?.mainoptional == "main" ? 1 : 0,
      //     isOptionalSubject: item?.mainoptional == "main" ? 0 : 1,
      //     fullMarks: item?.fullMarks,
      //     passMarks: item?.passMarks,
      //   };
      // });
      // const submitDataForm1 = {
      //   marksEntries: [...submitDataForm],
      // };
      // console.log("submitDataForm", submitDataForm1);
      // saveMasterForm(submitDataForm1);
    }
  });

  // FUNCTION TO SAVE MASTER DATA
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      marksEntries: values.marksEntries
    };
    if (id !== undefined) {
      url = api_editMarksEntryData;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postMarksEntryData;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('view discount group master..', response?.data?.data);
        if (response?.data?.status) {
          navigate('/classfee-master-new');
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
    AxiosInterceptors.post(api_getMarksEntryByID, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetch edit data response..', response?.data?.data);
        if (response?.data?.status) {
          DiscountGroupEdit(response?.data?.data);
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
  // const DiscountGroupEdit = (data) => {
  //   console.log("existing property details in prop address...", data);
  //   formik.setFieldValue("id", data?.id);
  //   formik.setFieldValue("classId", data?.class_id);
  //   formik.setFieldValue("sectionId", data?.section_id);
  //   formik.setFieldValue("subjectId", data?.subject_id);
  //   formik.setFieldValue("isMainSubject", data?.is_main_subject);
  //   formik.setFieldValue("isOptionalSubject", data?.is_optional_subject);
  //   formik.setFieldValue("fullMarks", data?.full_marks);
  //   formik.setFieldValue("passMarks", data?.pass_marks);
  // };
  const fetchFeeHeadList = () => {
    AxiosInterceptors.post(api_fetcActiveHeadList, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          formik?.setFieldValue(
            'tableValue',
            response?.data?.data?.map((item) => {
              return {
                ...item,
                submitApril: 0,
                submitMay: 0,
                submitJune: 0,
                submitJuly: 0,
                submitAug: 0,
                submitSep: 0,
                submitOct: 0,
                submitNov: 0,
                submitDec: 0,
                submitJan: 0,
                submitFeb: 0,
                submitMar: 0,
                discount: 0,
                submitTotal: 0
              };
            })
          );
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };
  const fetchFinanceList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_finance_year, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setfinanceYearList(response?.data);
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
  const fetchClassList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          console.log(response?.data);
          setCLassList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
        setisLoading(false);
      });
  };
  const fetchSectionList = (value) => {
    setisLoading(true);
    AxiosInterceptors.post(api_mapsectionData, { classId: value }, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          console.log(response?.data);
          formik.setFieldValue(
            'sectionData',
            response?.data?.data?.section.map((data) => {
              return { sectionName: data?.sectionData, value: true };
            })
          );
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

  console.log(formik.values.sectionData);
  useEffect(() => {
    if (formik.values.classId != '') {
      fetchSectionList(parseInt(formik.values.classId));
    }
  }, [formik.values.classId]);

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    fetchFeeHeadList();
    fetchFinanceList();
    fetchClassList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == 'fullMarks' &&
        formik.setFieldValue(
          'fullMarks',
          allowNumberInput(value.trim(), formik.values.fullMarks, 3)
        );
    }
    {
      name == 'passMarks' &&
        formik.setFieldValue(
          'passMarks',
          allowNumberInput(value.trim(), formik.values.passMarks, 3)
        );
    }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  const call = React.useCallback(
    (monthValue) => {
      const total = formik.values.tableValue.reduce(
        (acc, curr) => acc + curr[monthValue],
        0
      );
      return total;
    },
    [formik.values.tableValue]
  );

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION?

  useEffect(() => {
    // calculate discount and total in tableValue
    const getTableVal = formik.values.tableValue.map((item) => {
      const submitTotal =
        item.submitApril +
        item.submitMay +
        item.submitJune +
        item.submitJuly +
        item.submitAug +
        item.submitSep +
        item.submitOct +
        item.submitNov +
        item.submitDec +
        item.submitJan +
        item.submitFeb +
        item.submitMar;
      const discount = item.discount;
      return {
        ...item,
        discount,
        submitTotal,
        total: (submitTotal * discount) / 100
      };
    });
    formik.setFieldValue('tableValue', getTableVal);

    // calculate total in tableValue
  }, [
    call('submitApril'),
    call('submitMay'),
    call('submitJune'),
    call('submitJuly'),
    call('submitAug'),
    call('submitSep'),
    call('submitOct'),
    call('submitNov'),
    call('submitDec'),
    call('submitJan'),
    call('submitFeb'),
    call('submitMar')
  ]);

  //

  return (
    <>
      <div className={`main-div`}>
        <div className="border-[2px] border-gray-200 rounded-md h-[80vh] 2xl:p-6 p-4 overflow-y-auto">
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
                <div className="big-text">Class Fee Master Form</div>
                <div className="small-text">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            {id === undefined ? (
              <div className="tab-div">
                <div className="add-button-master-div">
                  <button
                    onClick={() => navigate('/classfee-master-new-form')}
                    type="submit"
                    className=" add-button-master"
                  >
                    Add{' '}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <Tabs
            listRoute={'/classfee-master-new'}
            formRoute={'/classfee-master-new-form'}
          />
          <div className="details-div">
            <span className="detailes">Details of Class Fee Master</span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Financial Year
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik?.getFieldProps('fy')}
                      type="number"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select class"
                    >
                      {financeYearList?.map((data, index) => (
                        <option value={data?.fy}>{data?.fy}</option>
                      ))}
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.fy && formik.errors.fy
                        ? formik.errors.fy
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Session Start
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('monthName')}
                      disabled
                      type="text"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder:text-gray-500 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="April"
                    />
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Class
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('classId')}
                      type="number"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select Class"
                    >
                      <option value="">Select</option>
                      {classList?.map((data, index) => (
                        <option value={data?.id}>{data?.class_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.classId && formik.errors.classId
                        ? formik.errors.classId
                        : null}
                    </span>
                  </div>
                </div>
                {formik.values.classId && (
                  <div className="col-span-12 mt-4">
                    <div className=" pt-4 ">
                      <div className="w-full flex items-center  justify-center border border-gray-300 ">
                        <div className="w-full h-[15vh] md:h-[8vh] flex relative">
                          <div className="absolute">
                            {' '}
                            <h1 className=" bg-white items-start justify-start px-2 mt-[-10px] ml-2 ">
                              {' '}
                              Section{' '}
                              <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                *
                              </small>
                            </h1>
                          </div>
                          <div className="mt-3 ml-5">
                            {formik.values.sectionData?.length == 0 ? (
                              <>
                                <div className="  ml-[10px]  text-[#6b7280]   flex justify-center text-xl items-center font-bold mt-2">
                                  No existing section for selected class !!!!{' '}
                                </div>
                              </>
                            ) : null}
                            {formik.values.sectionData &&
                              formik.values.sectionData.map((data, index) => {
                                return (
                                  <>
                                    <input
                                      name="value"
                                      value={data?.sectionName}
                                      checked={
                                        formik.values.sectionData[index]
                                          .value === true
                                      }
                                      onChange={() =>
                                        formik.setFieldValue(
                                          `sectionData.${index}.value`,
                                          !data?.value
                                        )
                                      }
                                      type="checkbox"
                                      className="text-slat-500  ml-[8vh]  text-[#6b7280] w-5 h-5 font-bold mt-2   "
                                    />{' '}
                                    <span className="ml-2 -mt-6">
                                      {data.sectionName}
                                    </span>
                                  </>
                                );
                              })}
                            <span className="text-red-600  text-xs">
                              {formik.touched.sectionData &&
                              formik.errors.sectionData
                                ? formik.errors.sectionData
                                : null}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {formik.values.classId && (
                  <div className="col-span-12 mt-4">
                    <div className=" pt-4 ">
                      <div className="w-full h-[15vh] md:h-[8vh] flex relative">
                        <div className="absolute">
                          {' '}
                          <h1 className=" bg-white items-start justify-start px-2 mt-[-10px] ml-2 ">
                            {' '}
                            Fee Head{' '}
                            <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                              *
                            </small>
                          </h1>
                        </div>
                        <div className="mt-6">
                          <div className="overflow-x-auto">
                            <table className="table-auto ">
                              <thead>
                                <tr>
                                  <th className="border w-[5vw] px-4 py-2">
                                    Sl.no
                                  </th>
                                  <th className="border  px-4 w-[8vw] py-2">
                                    Fee Head Name
                                  </th>
                                  <th className="border px-4 py-2">April</th>
                                  <th className="border px-4 py-2">May</th>
                                  <th className="border px-4 py-2">June</th>
                                  <th className="border px-4 py-2">July</th>
                                  <th className="border px-4 py-2">August</th>
                                  <th className="border px-4 py-2">
                                    September
                                  </th>
                                  <th className="border px-4 py-2">October</th>
                                  <th className="border px-4 py-2">November</th>
                                  <th className="border px-4 py-2">December</th>
                                  <th className="border px-4 py-2">January</th>
                                  <th className="border px-4 py-2">Feburary</th>

                                  <th className="border px-4 py-2">March</th>
                                  <th className="border w-[8vw] py-2">
                                    Discount%
                                  </th>
                                </tr>
                              </thead>
                              {formik.values.tableValue.map((data, index) => {
                                console.log(formik.values.tableValue);
                                return (
                                  <>
                                    <tbody>
                                      <tr>
                                        <td className="border px-4 py-2">
                                          {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                          {data?.fee_head}
                                        </td>

                                        <td className="border py-2">
                                          {/* April Fee */}
                                          {/* <TextField 
                                            formik={formik} 
                                            name={`tableValue.${index}.submitApril`} 
                                            disabled={data.fhtid == 5 || data.fhtid == 4}
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(evt.key) &&
                                              evt.preventDefault()
                                            }
                                          
                                            
                                            /> */}
                                          <input
                                            disabled={
                                              data.fhtid == 5 || data.fhtid == 4
                                            }
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitApril`
                                            )}
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            placeholder="0"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* May Fee */}
                                          <input
                                            disabled={
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4 ||
                                              data.fhtid == 5
                                            }
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitMay`
                                            )}
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* June Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitJune`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border  py-2">
                                          {/* July Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitJuly`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* August Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitAug`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border  py-2">
                                          {/* September Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitSep`
                                            )}
                                            disabled={
                                              data.fhtid == 1 || data.fhtid == 3
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* October Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitOct`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* November Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitNov`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* December Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitDec`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border py-2 ">
                                          {/* January Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitJan`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border  py-2">
                                          {/* Feburary Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitFeb`
                                            )}
                                            disabled={
                                              data.fhtid == 5 ||
                                              data.fhtid == 1 ||
                                              data.fhtid == 3 ||
                                              data.fhtid == 4
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border  py-2">
                                          {/* March Fee */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.submitMar`
                                            )}
                                            disabled={
                                              data.fhtid == 1 || data.fhtid == 3
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        <td className="border  py-2">
                                          {/* Discount */}
                                          <input
                                            {...formik.getFieldProps(
                                              `tableValue.${index}.discount`
                                            )}
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                        {/*  */}
                                        <td className="border  py-2">
                                          {/* Discount */}
                                          <input
                                            value={
                                              data?.submitTotal -
                                              (data?.submitTotal *
                                                data?.discount) /
                                                100
                                            }
                                            className=" form-control w-[80%] block mx-4 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md "
                                            type="number"
                                            onKeyDown={(evt) =>
                                              ['e', 'E', '+', '-'].includes(
                                                evt.key
                                              ) && evt.preventDefault()
                                            }
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                );
                              })}
                            </table>
                            <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                              <div className="form-group mb-6 col-span-5 md:pr-4 flex justify-start max-[464px]:col-span-6">
                                <label className="form-check-label text-gray-800 ml-2 w-full">
                                  {' '}
                                  <span className="inline text-gray-700">
                                    Total Amount
                                    <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                      *
                                    </small>
                                  </span>
                                </label>
                              </div>{' '}
                              <div className="form-group mb-6 col-span-2 md:pr-4 flex max-[464px]:col-span-6">
                                <input
                                  // {...formik.getFieldProps('feeAmount')}
                                  type="number"
                                  onKeyDown={(evt) =>
                                    ['e', 'E', '+', '-'].includes(evt.key) &&
                                    evt.preventDefault()
                                  }
                                  disabled
                                  className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                                />
                                {/* <span className="text-red-600 absolute text-xs">
                      {formik.touched.feeAmount && formik.errors.feeAmount
                        ? formik.errors.feeAmount
                        : null}
                    </span> */}
                              </div>
                              <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                                <div className="form-group mb-6 col-span-5 md:pr-4 flex justify-start max-[464px]:col-span-6">
                                  <label className="form-check-label text-gray-800 ml-2 w-full">
                                    {' '}
                                    <span className="inline text-gray-700">
                                      Net Fee Amount
                                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                        *
                                      </small>
                                    </span>
                                  </label>
                                </div>{' '}
                                <div className="form-group mb-6 col-span-2 md:pr-4 flex max-[464px]:col-span-6">
                                  <input
                                    // {...formik.getFieldProps('feeAmount')}
                                    type="number"
                                    onKeyDown={(evt) =>
                                      ['e', 'E', '+', '-'].includes(evt.key) &&
                                      evt.preventDefault()
                                    }
                                    disabled
                                    className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                                  />
                                  {/* <span className="text-red-600 absolute text-xs">
                      {formik.touched.feeAmount && formik.errors.feeAmount
                        ? formik.errors.feeAmount
                        : null}
                    </span> */}
                                </div>
                              </div>
                            </div>

                            <div className="cancel-button-div mb-8">
                              <div className="    ">
                                <button
                                  onClick={() =>
                                    navigate('/classfee-master-new')
                                  }
                                  type="button"
                                  className="cancel-button"
                                >
                                  Back to List
                                </button>
                              </div>
                              <div className="submit-button-div">
                                <button
                                  type="submit"
                                  className=" cypress_next2_button submit-button"
                                >
                                  Submit
                                </button>
                                <input
                                  type="text"
                                  name="tableValue"
                                  value={call('submitApril')}
                                />

                                <input
                                  type="text"
                                  name="tableValue"
                                  value={call('submitMay')}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Corresponding  address */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassFeeMasterNewForm;
