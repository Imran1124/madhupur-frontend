/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { allowNumberInput } from '../../Components/Common/PowerupFunctions';
import ApiList from '../../Components/ApiList/ApiList';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import Tabs from '../Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';

function MarksEntryDataDemoForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setCLassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [marksEntry, setMarksEntry] = useState([]);
  const {
    api_getactiveSubjectData,
    api_getactiveClassData,
    api_finance_year,
    api_mapsectionData,
    api_getMarksEntryByID,
    api_postMarksEntryData,
    api_editMarksEntryData,
    api_getMarksEntryData
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    classId: yup.string().required('Select Class')
    // sectionData: yup.string().required("Select Section"),
    // subjectId: yup.string().required("Select Subject"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      classId: '',
      sectionData: [],
      marksEntries: []
    },

    onSubmit: (values, resetForm) => {
      console.log('at submit ', values);

      const submitDataForm = values?.marksEntries?.map((item) => {
        return {
          classId: values?.classId,
          sectionId: item?.sectionId,
          subjectId: item?.subjectId,
          isMainSubject: item?.mainoptional == 'main' ? 1 : 0,
          isOptionalSubject: item?.mainoptional == 'main' ? 0 : 1,
          fullMarks: item?.fullMarks,
          passMarks: item?.passMarks
        };
      });
      const submitDataForm1 = {
        marksEntries: [...submitDataForm]
      };
      console.log('submitDataForm', submitDataForm1);
      saveMasterForm(submitDataForm1);
    },
    validationSchema
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
          navigate('/marks-entry-demo');
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
  const fetchSubjectList = (value) => {
    setisLoading(true);
    AxiosInterceptors.post(api_mapsectionData, { classId: value }, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          console.log(response?.data?.data);
          console.log(response?.data?.data);
          // const arr=response?.data?.data?.subject;
          // let pp = arr.filter( (ele, ind) => ind === arr.findIndex( elem => elem.subject_name === ele.subject_name))
          formik.setFieldValue(
            'marksEntries',
            response?.data?.data?.subject.map((data) => {
              return {
                className: data?.class_name,
                sectionName: data?.section_name,
                classId: data?.class_id,
                sectionId: data?.section_group_map_id,
                subjectId: data?.id,
                subjectName: data?.subject_name,
                fullMarks: 100,
                passMarks: 30,
                mainoptional: false,
                optData: 0
              };
            })
          );
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching datas.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching dataes.');
        setisLoading(false);
      });
  };
  console.log(formik.values.sectionData);
  useEffect(() => {
    if (formik.values.classId != '') {
      fetchSectionList(parseInt(formik.values.classId));
    }
  }, [formik.values.classId]);

  useEffect(() => {
    if (formik.values.classId != '') {
      fetchSubjectList(parseInt(formik.values.classId));
    }
  }, [formik.values.classId, formik.values.sectionData.length >= 0]);

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
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
  console.log(formik.values.sectionData);

  useEffect(() => {
    formik.values.marksEntries.map((data, index) => {
      if (data?.mainoptional == 'main') {
        formik.setFieldValue(`marksEntries.${index}.optData`, 0);
      } else {
        formik.setFieldValue(`marksEntries.${index}.optData`, 1);
      }
    });
  }, [formik?.values?.marksEntries]);

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
                <div className="big-text">Marks Entry Master Form</div>
                <div className="common-header-smalltext">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            {id === undefined ? (
              <div className="tab-div">
                <div className="add-button-master-div">
                  <button
                    onClick={() => navigate('/marks-entry-demo-form')}
                    type="submit"
                    className=" add-button-master bg-[#0F766E] hover:bg-[#0F766E]"
                  >
                    Add{' '}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <Tabs
            listRoute={'/marks-entry-demo'}
            formRoute={'/marks-entry-demo-form'}
          />
          <div className="details-div">
            <span className="detailes text-[#0F766E]">Marks Entry Form</span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Academic Year
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
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
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
                {/* {formik.values.classId && (
                  <div className="col-span-12 mt-4">
                    <div className=" pt-4 ">
                      <div className="w-full flex items-center  justify-center border border-teal-300 ">
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
                                      disabled
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

                {formik.values.sectionData?.length !== 0 && (
                  <div className="col-span-12 mt-4">
                    <div className="overflow-x-auto pt-4 ">
                      <div className="w-full flex items-center  justify-center border border-teal-300 p-4">
                        <div className="w-full block">
                          <div className="w-full items-start justify-start bg-white px-2 relative">
                            <h1 className="absolute bg-white items-start justify-start px-2 mt-[-25px] ">
                              {' '}
                              Subject{' '}
                              <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                *
                              </small>
                            </h1>
                          </div>
                          <div>
                            <table className="min-w-full divide-y divide-gray-200 max-[820px]:w-[820px]">
                              <thead className="bg-[#E7EFFC] ">
                                <tr>
                                  <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Class Name
                                  </th>
                                  {/* <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Section Name
                                  </th> */}
                                  <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Subject Name
                                  </th>
                                  <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Full Marks
                                  </th>
                                  <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Passing Marks
                                  </th>
                                  <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Main
                                  </th>
                                  <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                                    Optional
                                  </th>
                                </tr>
                              </thead>
                              <tbody className=" divide-y divide-gray-200 ">
                                {formik.values.marksEntries &&
                                  formik.values.marksEntries.map(
                                    (eachData, index) => {
                                      return (
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            {eachData?.className}
                                          </td>
                                          {/* <td className="px-6 py-4 whitespace-nowrap">
                                            {eachData?.sectionName}
                                          </td> */}
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            {eachData?.subjectName}
                                          </td>
                                          {/* <td className="px-6 py-4 whitespace-nowrap">{data?.full_marks}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data?.pass_marks}</td> */}
                                          <td className="px-6 py-3 whitespace-nowrap">
                                            <input
                                              {...formik.getFieldProps(
                                                `marksEntries.${index}.fullMarks`
                                              )}
                                              type="number"
                                              onChange={(e) =>
                                                formik.setFieldValue(
                                                  `marksEntries.${index}.fullMarks`,
                                                  e.target.value
                                                )
                                              }
                                              onKeyDown={(evt) =>
                                                ['e', 'E', '+', '-'].includes(
                                                  evt.key
                                                ) && evt.preventDefault()
                                              }
                                              className="  text-center form-control h-10  w-1/2 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                            />
                                          </td>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                            <input
                                              {...formik.getFieldProps(
                                                `marksEntries.${index}.passMarks`
                                              )}
                                              type="number"
                                              onChange={(e) =>
                                                formik.setFieldValue(
                                                  `marksEntries.${index}.passMarks`,
                                                  e.target.value
                                                )
                                              }
                                              onKeyDown={(evt) =>
                                                ['e', 'E', '+', '-'].includes(
                                                  evt.key
                                                ) && evt.preventDefault()
                                              }
                                              className="text-center form-control h-10  w-1/2 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                            />
                                          </td>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                            <input
                                              {...formik.getFieldProps(
                                                `marksEntries.${index}.mainoptional`
                                              )}
                                              type="checkbox"
                                              value={'main'}
                                              onChange={(e) =>
                                                formik.setFieldValue(
                                                  `marksEntries.${index}.mainoptional`,
                                                  e.target.value
                                                )
                                              }
                                              onKeyDown={(evt) =>
                                                ['e', 'E', '+', '-'].includes(
                                                  evt.key
                                                ) && evt.preventDefault()
                                              }
                                              checked={
                                                eachData?.mainoptional == 'main'
                                              }
                                              className="text-center form-control  h-5  w-5 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                            />
                                          </td>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                            <input
                                              {...formik.getFieldProps(
                                                `marksEntries.${index}.mainoptional`
                                              )}
                                              type="checkbox"
                                              value={'optional'}
                                              onChange={(e) =>
                                                formik.setFieldValue(
                                                  `marksEntries.${index}.mainoptional`,
                                                  e.target.value
                                                )
                                              }
                                              onKeyDown={(evt) =>
                                                ['e', 'E', '+', '-'].includes(
                                                  evt.key
                                                ) && evt.preventDefault()
                                              }
                                              checked={
                                                eachData?.mainoptional ==
                                                'optional'
                                              }
                                              className="text-center form-control h-5 w-5 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                            />
                                            <input
                                              type="hidden"
                                              name={`marksEntries.${index}.optData`}
                                              value={
                                                eachData?.mainoptional ==
                                                'optional'
                                                  ? 0
                                                  : 1
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate('/marks-entry-demo')}
                      type="button"
                      className="deactivate-button-master py-2 bg-red-500 text-white"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="submit-button-div">
                    <button type="submit" className=" save-button">
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

export default MarksEntryDataDemoForm;
