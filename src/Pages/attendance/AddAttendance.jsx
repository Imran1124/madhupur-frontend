import React, { useEffect, useState } from 'react';
import { useFormik, FormikProvider, Form, getIn } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import ApiList from '../../Components/ApiList/ApiList';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import moment from 'moment';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import BarLoader from '../../Components/Common/BarLoader';
import { useNavigate } from 'react-router-dom';
import useErrorAutoFocusField from '../../Components/Hooks/useErrorAutoFocusField';

let Schema = yup.object().shape({
  // class_id: yup.string().required('Class is required'),
  // section_id: yup.string().required('Section is required'),
  // date: yup.string().required('Date is required'),
  attendance: yup.array().of(
    yup.object().shape({
      // attendanceStatus: yup.string().required('Required field'),

      description: yup.string().when('attendanceStatus', {
        is: (val) => val == '2',
        then: (schema) =>
          schema
            .required('Description is required')
            .min(3, 'Must be at least 3 characters')
            .max(100, 'Must be at most 100 characters'),
        otherwise: (schema) => schema.notRequired()
      })
    })
  )
});

export default function AddAttendance() {
  const navigate = useNavigate();
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const {
    api_retrieve_all_student,
    api_getactiveClassData,
    api_getSectionData,
    api_student_attendance,
    api_section_group_map,
    api_fetch_student_attendance
  } = ApiList();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [getClass, setClass] = useState([]);
  const [getSection, setSection] = useState([]);

  //
  const getClassFunc = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        console.log('Class Data..312312', response?.data?.data);
        if (response?.data?.status) {
          setClass(response?.data?.data);
        } else {
          activateBottomErrorCard(true, response?.data?.message);
          setSection([]);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
        setSection([]);
        setisLoading(false);
      });
  };

  const fetchStudentDetail = () => {
    if (data) {
      const temp = data?.map((item) => {
        return {
          studentId: item?.id,
          admissionNo: item?.admission_no,
          classId: item?.class_id,
          sectionId: item?.section_id,
          rollNo: item?.roll_no,
          fullName: item?.full_name,
          className: item?.class_name,
          sectionName: item?.section_name,
          attendanceStatus: '1',
          description: '',
          date: moment().format('YYYY-MM-DD'),
          isCheck: false
        };
      });
      formik.setFieldValue('attendance', temp);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      class_id: '',
      section_id: '',
      attendance: [
        {
          studentId: '',
          admissionNo: '',
          classId: '',
          sectionId: '',
          rollNo: '',
          fullName: '',
          className: '',
          sectionName: '',
          attendanceStatus: '',
          description: '',
          date: ''
        }
      ]
    },
    validationSchema: Schema,

    onSubmit: (values) => {
      // confirm alert before submit form data to server side
      console.log('values', values);

      const isAttendanceStatusIsEmpty = values?.attendance?.some(
        (item) => item?.attendanceStatus == ''
      );
      if (isAttendanceStatusIsEmpty) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select attendance present, absent or leave for all students!'
        });
        return;
      }

      const mappedData = values?.attendance.map((item) => {
        return {
          studentId: item?.studentId,
          admissionNo: item?.admissionNo,
          classId: values?.class_id,
          sectionId: values?.section_id,
          attendanceStatus: parseInt(item?.attendanceStatus),
          description: item?.description,
          attendanceDate: item?.date
        };
      });

      const reqBody = {
        attendance: mappedData,
        classId: parseInt(values?.class_id),
        sectionId: parseInt(values?.section_id),
        attendanceDate: moment().format('YYYY-MM-DD')
      };

      // confirm alert before submit form data to server side
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit attendance!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          setisLoading(true);
          AxiosInterceptors.post(
            api_student_attendance,
            { ...reqBody },
            ApiHeader()
          )
            .then(function (response) {
              console.log('Class Data..', response);
              if (response?.data?.status == true) {
                Swal.fire(
                  'Submitted!',
                  'Attendance has been submitted.',
                  'success'
                );
                // fetchStudentDetail();

                // getClassFunc();
                formik.resetForm();
              } else {
                activateBottomErrorCard(true, response?.data?.message);
              }
              setisLoading(false);
            })
            .catch(function (error) {
              console.log('==2 error list...', error);
              activateBottomErrorCard(
                true,
                'Error occured while fetching data.'
              );

              setisLoading(false);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire('Cancelled', 'Your form data is safe :)', 'error');
        }
      });
    }
  });

  const {
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    errors,
    touched,
    isValid,
    isSubmitting,
    submitCount
  } = formik;

  const fetchRowStudentDetails = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_fetch_student_attendance,
      {
        classId: values?.class_id,
        id: values?.section_id
      },
      ApiHeader()
    )
      .then(function (response) {
        console.log('Student Data..Atten', response?.data?.data);
        if (response?.data?.status) {
          setData(response?.data?.data);
        } else {
          setData([]);
          // activateBottomErrorCard(true, 'Error occured while fetching data.');
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
    getClassFunc();
  }, []);

  useEffect(() => {
    if (values?.class_id) {
      fetchRowStudentDetails();
    }
  }, [values?.class_id]);

  useEffect(() => {
    if (data) {
      fetchStudentDetail();
    }
  }, [data]);

  // getSections

  // console.log('Data', data);

  const SectionFunc1 = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_section_group_map,
      {
        classId: values.class_id
      },
      ApiHeader()
    )
      .then(function (response) {
        console.log('section Data..213123', response?.data?.data);
        if (response?.data?.status == true) {
          setSection(response?.data?.data);
        } else {
          activateBottomErrorCard(true, response?.data?.message);
          setSection([]);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  // you have not acc

  // useEffect(() => {
  //   setFieldValue('section_id', '');
  //   if (values.class_id) {
  //     SectionFunc1();
  //     setData([]);
  //   } else {
  //     setSection([]);
  //     setData([]);
  //   }
  // }, [values?.class_id]);

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  React.useEffect(() => {
    AutoFocusErrorField({ isValid, submitCount, isSubmitting, errors });
  }, [errors, submitCount, isSubmitting]);

  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <FormikProvider value={values}>
        <Form onSubmit={handleSubmit}>
          <div className={`w-full col-span-10 2xl:py-3 2xl:px-6 px-6 py-2`}>
            <div className="border-[2px] border-gray-200 rounded-md h-[82vh] 2xl:p-6 p-4 overflow-y-auto">
              <div className="">
                {/* {JSON.stringify(data)} */}
                {/* {JSON.stringify(getState?.section_id)} */}
                <div className="flex w-full justify-between items-center max-[870px]:block">
                  <div className="flex flex-col">
                    <span className="text-3xl text-center font-semibold text-gray-600 flex flex-start">
                      Add Attendance
                      {/* {JSON.stringify(getClass)}
                      <br />
                      {JSON.stringify(getSection)} */}
                    </span>
                    <span className="text-sm text-center font-medium text-teal-600">
                      Unlock Your Potential. Join Our Journey Of Education And
                      Excellence
                    </span>
                  </div>
                  <div className="flex gap-6 mt-4 md:mt-0 flex-col lg:flex-row">
                    <input
                      disabled
                      type="text"
                      className={`mt-7 h-8 w-full lg:w-40 form-control block  px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                      value={Date().toLocaleString().slice(0, 15)}
                    />

                    <div className="form-group  md:col-span-2 mb-6 md:px-4">
                      <label
                        className={
                          'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'
                        }
                      >
                        Class
                        <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                          *
                        </small>
                      </label>
                      <select
                        className={
                          'form-control block w-full lg:w-40 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer'
                        }
                        {...getFieldProps('class_id')}
                      >
                        <option value="">Select</option>
                        {getClass?.map((data) => (
                          <option
                            // selected={data?.id == values.class_id}
                            value={data?.id}
                          >
                            {data?.class_name}
                          </option>
                        ))}
                      </select>
                      <span className="text-red-600 text-xs">
                        {touched.class_id && errors.class_id
                          ? errors.class_id
                          : null}
                      </span>
                    </div>

                    {/* <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                      <label
                        className={
                          'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'
                        }
                      >
                        Sections
                        <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                          *
                        </small>
                      </label>
                      <select
                        {...getFieldProps('section_id')}
                        className={
                          'form-control block w-full lg:w-40 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer'
                        }
                      >
                        <option value="">Select</option>
                        {getSection?.map((data) => (
                          <option value={data?.id}>{data?.section_name}</option>
                        ))}
                      </select>
                      <span className="text-red-600 text-xs">
                        {touched.section_id && errors.section_id
                          ? errors.section_id
                          : null}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* table */}
              {values?.attendance?.length > 0 ? (
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"
                              >
                                sl.no
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                Admission no
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                Class
                              </th>
                              {/* <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                Section
                              </th> */}
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                Roll No
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                Full name
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Present
                                  <input
                                    type="checkbox"
                                    className="h-[18px] w-[18px]"
                                    onChange={(e) => {
                                      const temp = values?.attendance?.map(
                                        (item) => {
                                          return {
                                            ...item,
                                            attendanceStatus: e.target.checked
                                              ? '1' //present
                                              : ''
                                          };
                                        }
                                      );
                                      setFieldValue('attendance', temp);
                                    }}
                                    checked={
                                      values?.attendance?.filter(
                                        (item) => item?.attendanceStatus == '1' //present
                                      ).length === values?.attendance?.length
                                    }
                                  />
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Absent
                                  <input
                                    type="checkbox"
                                    className="h-[18px] w-[18px]"
                                    onChange={(e) => {
                                      const temp = values?.attendance?.map(
                                        (item) => {
                                          return {
                                            ...item,
                                            attendanceStatus: e.target.checked
                                              ? '0' //absent
                                              : ''
                                          };
                                        }
                                      );
                                      setFieldValue('attendance', temp);
                                    }}
                                    checked={
                                      values?.attendance?.filter(
                                        (item) => item?.attendanceStatus == '0' //absent
                                      ).length === values?.attendance?.length
                                    }
                                  />
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Leave
                                  <input
                                    type="checkbox"
                                    className="h-[18px] w-[18px]"
                                    onChange={(e) => {
                                      const temp = values?.attendance?.map(
                                        (item) => {
                                          return {
                                            ...item,
                                            attendanceStatus: e.target.checked
                                              ? '2'
                                              : ''
                                          };
                                        }
                                      );
                                      setFieldValue('attendance', temp);
                                    }}
                                    checked={
                                      values?.attendance?.filter(
                                        (item) => item?.attendanceStatus === '2' //leave
                                      ).length === values?.attendance?.length
                                    }
                                  />
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-4 py-4 dark:border-neutral-500"
                              >
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {values?.attendance?.map((item, index) => {
                              return (
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    {item?.admissionNo || 'N/A'}
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    {item?.className}
                                  </td>
                                  {/* <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    {item?.sectionName}
                                  </td> */}
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    {item?.rollNo}
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    {item?.fullName}
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className={`h-[18px] w-[18px]  `}
                                      type="checkbox"
                                      value={'1'} // present
                                      name={`attendance[${index}].attendanceStatus`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `attendance[${index}].attendanceStatus`,
                                          e.target.value
                                        );
                                      }}
                                      checked={item?.attendanceStatus == '1'}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className="h-[18px] w-[18px]"
                                      type="checkbox"
                                      value={'0'} // absent
                                      name={`attendance[${index}].attendanceStatus`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `attendance[${index}].attendanceStatus`,
                                          e.target.value
                                        );
                                      }}
                                      checked={item?.attendanceStatus == '0'}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className="h-[18px] w-[18px]"
                                      type="checkbox"
                                      value={'2'} // leave
                                      name={`attendance[${index}].attendanceStatus`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `attendance[${index}].attendanceStatus`,
                                          e.target.value
                                        );
                                      }}
                                      checked={item?.attendanceStatus == '2'}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap border-r px-4 py-4 dark:border-neutral-500">
                                    <input
                                      disabled={
                                        item?.attendanceStatus == '1' ||
                                        item?.attendanceStatus == '0'
                                      }
                                      type="text"
                                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid ${
                                        getIn(
                                          touched,
                                          `attendance[${index}].description`
                                        ) &&
                                        getIn(
                                          errors,
                                          `attendance[${index}].description`
                                        )
                                          ? 'border-red-300 bg-red-50'
                                          : 'border-gray-300 bg-white'
                                      } rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 `}
                                      name={`attendance[${index}].description`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `attendance[${index}].description`,
                                          e.target.value
                                        );
                                        if (
                                          `attendance[${index}].attendanceStatus` ==
                                            '1' ||
                                          `attendance[${index}].attendanceStatus` ==
                                            '0'
                                        ) {
                                          formik.setTouched({
                                            [`attendance[${index}].description`]: true
                                          });
                                        }
                                      }}
                                      value={item?.description}
                                    />
                                    <h1 className="text-red-500 text-[11px]">
                                      {getIn(
                                        touched,
                                        `attendance[${index}].description`
                                      ) &&
                                        getIn(
                                          errors,
                                          `attendance[${index}].description`
                                        )}
                                    </h1>
                                  </td>
                                </tr>
                              );
                            })}

                            {/* <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          2
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Jacob
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Thornton
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Thornton2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">@fat</td>
                      </tr> */}
                          </tbody>
                        </table>
                        <div className="flex justify-end w-full gap-4 mt-4">
                          <button
                            type="submit"
                            className="bg-[#0F766E] text- text-white px-4 py-2 rounded-md mt-4"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <h1 className="text-gray-600 text-center mt-56 text-2xl">
                  No Data Found! please select class and section
                </h1>
              )}

              {/* table */}
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}
