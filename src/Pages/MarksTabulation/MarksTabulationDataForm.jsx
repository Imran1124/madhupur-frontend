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
import Nodata from '../../assets/nodata.png';

function MarksTabulationDataForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setCLassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [termList, setTermList] = useState([]);
  const [marksEntry, setMarksEntry] = useState([]);
  const [totalmarksadd, setTotalMarksadd] = useState();
  const [indexValue, setindexValue] = useState();
  const [totalfullmarks, setTotalfullmarks] = useState();
  const {
    api_getActiveExamTermData,
    api_getactiveClassData,
    api_finance_year,
    api_section_group_map,
    api_markstabulationCrudStore,
    api_getMarksEntryData,
    api_marksEntrySection,
    api_subject_map
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    classId: yup.string().required('Select Class'),
    // sectionId: yup.string().required('Select Section'),
    termId: yup.string().required('Select Term'),
    admissionNo: yup.string().required('Enter admission no')
  });

  const formik = useFormik({
    initialValues: {
      classId: '',
      sectionId: '',
      termId: '',
      admissionNo: '',
      isMainSubject: true,
      isOptionalSubject: false,
      fullMarks: '',
      passMarks: '',
      // obtMarks: 0,

      totalMarks: 0,
      totalObtainedMarks: 0,
      percentage: 0,
      marks: []
    },

    onSubmit: (values, resetForm) => {
      console.log('at submit ', values);
      saveMasterForm(values);
    },
    validationSchema
  });

  // FUNCTION TO SAVE MASTER DATA
  const saveMasterForm = (values) => {
    console.log('wow', values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      admissionNo: values?.admissionNo,
      tabulation: values.marks.map((eachdata) => {
        return {
          fy: eachdata?.fy_name,
          admissionNo: eachdata?.admissionNo,
          termId: eachdata?.termId,
          classId: eachdata?.classId,
          sectionId: eachdata?.sectionId,
          marksEntryId: eachdata?.marks_entry_id,
          obtainedMarks: eachdata?.obtMarks
        };
      })
    };

    url = api_markstabulationCrudStore;
    requestBody = requestBodyBase;

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('view discount group master..', response?.data?.data);
        if (response?.data?.status) {
          navigate('/marks-tabulation');
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
  const fetchSectionList = (value) => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_marksEntrySection,
      { classId: value },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data.data?.subject);
          formik.setFieldValue(
            'marks',
            response?.data?.data.map((data) => {
              return {
                ...data,
                obtMarks: 0,
                classId: formik.values.classId,
                sectionId: formik.values.sectionId,
                termId: formik.values.termId,
                admissionNo: formik.values.admissionNo
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
        setisLoading(false);
      });
  };
  const fetchTermList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getActiveExamTermData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setTermList(response?.data.data);
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
  console.log(formik.values.fy);
  const MarksEntryList = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_marksEntrySection,
      { classId: formik.values.classId, sectionId: formik.values.sectionId },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data);
          formik.setFieldValue(
            'marks',
            response?.data?.data.map((data) => {
              return {
                ...data,
                obtMarks: 0,
                classId: formik.values.classId,
                sectionId: formik.values.sectionId,
                termId: formik.values.termId,
                admissionNo: formik.values.admissionNo
              };
            })
          );
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
  const fulladdtotalmarks = () => {
    let totalmarks = formik.values.marks.reduce((acc, crr) => {
      return acc + crr?.full_marks;
    }, 0);

    setTotalMarksadd(totalmarks);
  };
  const fulladdmarks = () => {
    let totalmarks = formik.values.marks.reduce((acc, crr) => {
      return parseInt(acc) + parseInt(crr?.obtMarks);
    }, 0);
    console.log(totalmarks);
    setTotalfullmarks(totalmarks);
  };

  const dataValue = (e, index) => {
    formik.setFieldValue(`marks.${index}.obtMarks`, e);
    console.log(index, e, `marks.${index}.obtMarks`);
    setindexValue(index);
  };
  console.log(formik.values.marks);
  useEffect(() => {
    fulladdmarks();
  }, [formik.values.marks]);

  useEffect(() => {
    fulladdtotalmarks();
  }, [formik.values.marks]);
  useEffect(() => {
    formik.setFieldValue('totalMarks', totalmarksadd);
  }, [totalmarksadd]);

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    fetchFinanceList();
    fetchClassList();

    fetchTermList();
  }, []);
  useEffect(() => {
    if (formik.values.classId) {
      fetchSectionList(formik.values.classId);
    }
  }, [formik.values.classId]);
  useEffect(() => {
    if (formik.values.classId && formik.values.sectionId) {
      MarksEntryList();
    }
  }, [formik.values.classId, formik.values.sectionId]);
  // useEffect(() => {
  //   let pair =
  //     parseFloat(formik.values.obtMarks) ;

  //   formik.setFieldValue("totalObtainedMarks", pair);
  // }, [
  //   formik.values.obtMarks,

  // ]);
  useEffect(() => {
    let pair2 = ((totalfullmarks / formik.values.totalMarks) * 100).toFixed(2);
    formik.setFieldValue('percentage', pair2);
  }, [totalfullmarks, formik.values.totalMarks]);

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
                <div className="big-text">Marks Tabulation Master Form</div>
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
                    onClick={() => navigate('/marks-tabulation-form')}
                    type="submit"
                    className=" add-button-master bg-[#0F766E] hover:[#0F766E]"
                  >
                    Add{' '}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <Tabs
            listRoute={'/marks-tabulation'}
            formRoute={'/marks-tabulation-form'}
          />
          <div className="details-div">
            <span className="detailes text-[#0F766E]">
              Marks Tabulation Form
            </span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Financial Year
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('fy')}
                      type="number"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select class"
                    >
                      {financeYearList?.map((data, index) => {
                        return <option value={data?.fy}>{data?.fy}</option>;
                      })}
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.fy && formik.errors.fy
                        ? formik.errors.fy
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Term
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('termId')}
                      type="text"
                      className={`form-control bg-white h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select Discount Group"
                    >
                      <option value="">Select</option>
                      {termList?.map((data, index) => (
                        <option value={data?.id}>{data?.term_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.termId && formik.errors.termId
                        ? formik.errors.termId
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
                      className={`form-control bg-white h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
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

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Admission no
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
                  </div>

                  {/* <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Section
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('sectionId')}
                      type="text"
                      className={`form-control bg-white h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select Discount Group"
                    >
                      <option value="">Select</option>
                      {sectionList?.map((data, index) => (
                        <option value={data?.id}>{data?.section_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.sectionId && formik.errors.sectionId
                        ? formik.errors.sectionId
                        : null}
                    </span>
                  </div> */}
                </div>

                {formik.values.classId != '' && (
                  <div className="col-span-12 mt-4 ">
                    <div className="overflow-x-auto shadow-lg border">
                      <table className="min-w-full divide-y divide-gray-200 max-[820px]:w-[820px]">
                        <thead className="bg-[#E7EFFC] ">
                          <tr>
                            <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                              Subject
                            </th>
                            <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                              Full Marks
                            </th>
                            <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                              Passing Marks
                            </th>
                            <th className="px-6 py-3  text-sm font-bold   tracking-wider">
                              Obtained Marks
                            </th>
                          </tr>
                        </thead>
                        {formik.values.marks.map((data, index) => {
                          return (
                            <tbody className=" divide-y divide-gray-200 ">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {data?.subject_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {data?.full_marks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {data?.pass_marks}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                  <input
                                    {...formik.getFieldProps(
                                      `marks.${index}.obtMarks`
                                    )}
                                    // name={`marksEntry${index}.obtMarks`}
                                    // values={formik.values.marksEntry[index].obtMarks}
                                    onChange={(e) =>
                                      dataValue(e.target.value, index)
                                    }
                                    onKeyDown={(evt) =>
                                      ['e', 'E', '+', '-'].includes(evt.key) &&
                                      evt.preventDefault()
                                    }
                                    className="  text-center form-control h-10  w-1/2 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    type="number"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                    {/* {formik.values.marks &&
                      formik.values.marks.map((data, index) => {
                        return ( */}
                    <div className="mt-9">
                      {' '}
                      <div className="flex justify-start">
                        <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                          <div className="form-group mb-6 col-span-5 md:pr-4 flex justify-start max-[464px]:col-span-6">
                            <label className="form-check-label text-gray-800 ml-2 w-full">
                              {' '}
                              <span className="inline text-gray-700">
                                Total Marks
                                <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                  *
                                </small>
                              </span>
                            </label>
                          </div>{' '}
                          <div className="form-group mb-6 col-span-2 md:pr-4 flex max-[464px]:col-span-6">
                            <input
                              {...formik.getFieldProps('totalMarks')}
                              type="number"
                              disabled
                              className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                              placeholder="0"
                            />
                            <span className="text-red-600 absolute text-xs">
                              {formik.touched.totalMarks &&
                              formik.errors.totalMarks
                                ? formik.errors.totalMarks
                                : null}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                          <div className="form-group mb-6 col-span-5 md:pr-4 flex justify-start max-[464px]:col-span-6">
                            <label className="form-check-label text-gray-800 ml-2 w-full">
                              {' '}
                              <span className="inline text-gray-700">
                                Obtained marks
                                <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                  *
                                </small>
                              </span>
                            </label>
                          </div>{' '}
                          <div className="form-group mb-6 col-span-2 md:pr-4 flex max-[464px]:col-span-6">
                            <input
                              {...formik.getFieldProps('totalObtainedMarks')}
                              type="number"
                              disabled
                              value={totalfullmarks}
                              className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                              placeholder="0"
                            />
                            <span className="text-red-600 absolute text-xs">
                              {formik.touched.feeAmount &&
                              formik.errors.feeAmount
                                ? formik.errors.feeAmount
                                : null}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                          <div className="form-group mb-6 col-span-5 md:pr-4 flex justify-start max-[464px]:col-span-6">
                            <label className="form-check-label text-gray-800 ml-2 w-full">
                              {' '}
                              <span className="inline text-gray-700">
                                Percentage
                                <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                  *
                                </small>
                              </span>
                            </label>
                          </div>{' '}
                          <div className="form-group mb-6 col-span-2 md:pr-4 flex max-[464px]:col-span-6">
                            <input
                              {...formik.getFieldProps('percentage')}
                              type="number"
                              disabled
                              className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                              placeholder="0"
                            />
                            <span className="text-red-600 absolute text-xs">
                              {formik.touched.feeAmount &&
                              formik.errors.feeAmount
                                ? formik.errors.feeAmount
                                : null}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* );
                      })} */}
                  </div>
                )}

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate('/marks-tabulation')}
                      type="button"
                      className="deactivate-button-master bg-red-500 text-white py-3"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="submit-button-div">
                    <button type="submit" className="save-button">
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

export default MarksTabulationDataForm;
