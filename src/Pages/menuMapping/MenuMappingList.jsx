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
import { SelectField } from '../../Components/forms';

let Schema = yup.object().shape({
  // menuId: yup.string().required('Class is required'),
  // section_id: yup.string().required('Section is required'),
  // date: yup.string().required('Date is required'),
  menuMap: yup.array().of(
    yup.object().shape({
      // menuMapStatus: yup.string().required('Required field'),

      description: yup.string().when('menuMapStatus', {
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

export default function AddmenuMap() {
  const navigate = useNavigate();
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const {
    api_retrieve_all_student,
    api_getClassData,
    api_getSectionData,
    api_student_menuMap,
    api_section_group_map,
    api_fetch_student_menuMap,
    menu_crud_active_all,
    menu_mapping_retrieve_all_store,
    get_active_role,
    menu_mapping_store
  } = ApiList();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [getMenu, setMenuMaster] = useState([]);
  const [getSection, setSection] = useState([]);
  const [getRole, setRole] = useState([]);

  //
  const getMenuMaster = () => {
    setisLoading(true);
    AxiosInterceptors.post(menu_crud_active_all, {}, ApiHeader())
      .then(function (response) {
        console.log('menu master..', response?.data?.data);
        if (response?.data?.status) {
          setMenuMaster(response?.data?.data);
        } else {
          activateBottomErrorCard(true, response?.data?.message);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  const getRoleMaster = () => {
    setisLoading(true);
    AxiosInterceptors.post(get_active_role, {}, ApiHeader())
      .then(function (response) {
        console.log('role Data..', response?.data?.data);
        if (response?.data?.status) {
          setRole(response?.data?.data);
        } else {
          activateBottomErrorCard(true, response?.data?.message);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  const fetchStudentDetail = () => {
    if (data) {
      const temp = data?.map((item) => {
        return {
          subMenuId: item?.id,
          subMenuName: item?.sub_menu_name,
          orderNo: item?.order_no,
          menuId: item?.menu_id,
          menuName: item?.menu_name
        };
      });
      formik.setFieldValue('menuMap', temp);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      menuName: '',
      menuId: '',
      section_id: '',
      menuMap: [
        {
          menuId: '',
          subMenuId: '',
          isWrite: '0',
          isRead: '0',
          isUpdate: '0',
          isDeactivate: '0'
        }
      ]
    },
    validationSchema: Schema,

    onSubmit: (values) => {
      // confirm alert before submit form data to server side

      const submitFormData = values?.menuMap?.map((item) => {
        return {
          menuId: values?.menuId,
          subMenuId: item?.subMenuId,
          isWrite: item?.isWrite || 0,
          isRead: item?.isRead || 0,
          isUpdate: item?.isUpdate || 0,
          isDeactivate: item?.isDeactivate || 0,
          roleId: values?.roleId
        };
      });

      console.log('values', submitFormData);

      // confirm alert before submit form data to server side
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit menuMap!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          setisLoading(true);
          AxiosInterceptors.post(
            menu_mapping_store,
            {
              menuMap: submitFormData
            },
            ApiHeader()
          )
            .then(function (response) {
              console.log('Class Data..', response);
              if (response?.data?.status == true) {
                Swal.fire(
                  'Submitted!',
                  'menuMap has been submitted.',
                  'success'
                );
                // fetchStudentDetail();

                // getMenuMaster();
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
      menu_mapping_retrieve_all_store,
      {
        menuId: values?.menuId
      },
      ApiHeader()
    )
      .then(function (response) {
        console.log('Student Data..', response?.data?.data);
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
    getMenuMaster();
    getRoleMaster();
  }, []);

  useEffect(() => {
    if (values?.menuId) {
      fetchRowStudentDetails();
    }
  }, [values?.menuId]);

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
        classId: values.menuId
      },
      ApiHeader()
    )
      .then(function (response) {
        console.log('section Data..', response?.data?.data);
        if (response?.data?.status == true) {
          setSection(response?.data?.data);
        } else {
          activateBottomErrorCard(true, response?.data?.message);
          // setSection('');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

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
                      Menu Mapping
                      {/* {JSON.stringify(getClass)}
                      <br />
                      {JSON.stringify(getSection)} */}
                    </span>
                    <span className="text-sm text-center font-medium text-gray-400">
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
                      <SelectField
                        label="Select Menu"
                        name="menuId"
                        formik={formik}
                        selectedText="menuName"
                      >
                        {getMenu?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.menu_name}
                          </option>
                        ))}
                      </SelectField>
                    </div>

                    <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                      <SelectField
                        label="Select Role"
                        name="roleId"
                        formik={formik}
                        selectedText="roleName"
                      >
                        {getRole?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.role_name}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                  </div>
                </div>
              </div>
              {/* table */}
              {values?.menuMap?.length > 0 ? (
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
                                Sub Menu Name
                              </th>

                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Create
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Read
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Update
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  Delete
                                </div>
                              </th>
                              {/* <th
                                scope="col"
                                className="whitespace-nowrap border-r px-4 py-4 dark:border-neutral-500"
                              >
                                All
                              </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {values?.menuMap?.map((item, index) => {
                              return (
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    {item?.subMenuName || 'N/A'}
                                  </td>

                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className={`h-[18px] w-[18px]  `}
                                      type="checkbox"
                                      value={
                                        `menuMap[${index}].isWrite` == '1'
                                          ? '0'
                                          : '1'
                                      } // present
                                      name={`menuMap[${index}].isWrite`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `menuMap[${index}].isWrite`,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className="h-[18px] w-[18px]"
                                      type="checkbox"
                                      value={
                                        `menuMap[${index}].isRead` == '1'
                                          ? '0'
                                          : '1'
                                      } // absent
                                      name={`menuMap[${index}].isRead`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `menuMap[${index}].isRead`,
                                          e.target.value
                                        );
                                      }}
                                      // checked={item?.isRead == '1'}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className="h-[18px] w-[18px]"
                                      type="checkbox"
                                      value={
                                        `menuMap[${index}].isUpdate` == '1'
                                          ? '0'
                                          : '1'
                                      } // leave
                                      name={`menuMap[${index}].isUpdate`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `menuMap[${index}].isUpdate`,
                                          e.target.value
                                        );
                                      }}
                                      // checked={item?.isUpdate == ' 1'}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                    <input
                                      className={`h-[18px] w-[18px]  `}
                                      type="checkbox"
                                      value={
                                        `menuMap[${index}].isDeactivate` == '1'
                                          ? '0'
                                          : '1'
                                      } // present
                                      name={`menuMap[${index}].isDeactivate`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          `menuMap[${index}].isDeactivate`,
                                          e.target.value
                                        );
                                      }}
                                      // checked={item?.isDeactivate == '1'}
                                    />
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
                            className="bg-blue-500 text- text-white px-4 py-2 rounded-md mt-4"
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
