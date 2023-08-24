import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import { nullToNA } from '../../Components/Common/PowerupFunctions';
import useSetTitle from '../../Components/Hooks/useSetTitle';
import ListTable from '../../Components/ListTable/ListTable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiPlus } from 'react-icons/hi';
import GlobalFilter from '../../Components/ListTable/GlobalFilter';
import DeleteView from '../../Components/Common/DeleteView';
import { allowCharacterInput } from '../../Components/Common/PowerupFunctions';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import { useFormik, FieldArray, FormikProvider, Form, getIn } from 'formik';
import { BsFiletypePdf, BsFiletypeCsv } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { CSVDownload } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';
import Pagination from '../../Components/Common/Pagination';
import TabulationHeader from '../../Components/Common/TabulationHeader';

const DemoSubjectData = () => {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [blockToast, setBlockToast] = useState(false);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [csvdata, setCsvdata] = useState([]);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const [classList, setCLassList] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [enable, setenable] = useState(false);
  const [searchTableData, setSearchTableData] = useState();
  const {
    api_postSubjectGroupData,
    api_deleteSubjectGroupData,
    api_searchSubjectGroupData,
    api_getactiveClassData,
    api_editSubjectGroupData,
    api_section_group_map,
    api_getSubjectGroupData
  } = ApiList();
  const navigate = useNavigate();

  useSetTitle('Class Master');
  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: 'hello' }
  ];

  const formik = useFormik({
    initialValues: {
      classId: '',
      sectionData: [],
      subject: [
        {
          subjectName: ''
        }
      ]
    },

    onSubmit: (values, resetForm) => {
      console.log('at submit ', values, sectionData);

      let arr = [];
      const mapSection = sectionData.map((e) => {
        return values.subject.map((item) => {
          return arr.push({ ...item, ...e, classId: formik.values.classId });
        });
      });
      const sendData = arr.map((i) => {
        return {
          subjectName: i.subjectName,
          section: i.section_name,
          sectionId: i.id,
          classId: parseInt(i.classId)
        };
      });
      console.log('kdsjfhsadjfhasd', sendData, arr);
      saveMasterForm(sendData);
      // formik.resetForm();
    }
  });
  console.log(formik.values.classId, formik.values.sectionData);
  const lastpost = number * postperpage;
  const currentpost = readymadeListData;
  console.log(readymadeListData);
  // const npages = Math.ceil(readymadeListData?.length );
  const pageNumber = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= lastdata; i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setPostperpage(parseInt(pageNumber));
    setBlockToast(true);
  };
  const prevPage = (number) => {
    setNumber(number - 1);
  };
  const nextPage = (number) => {
    setNumber(number + 1);
  };

  useEffect(() => {
    if (number && blockToast) {
      fetchMasterList();
    }
  }, [number, blockToast]);
  useEffect(() => {
    if (postperpage && blockToast) {
      fetchMasterList();
    }
  }, [postperpage, blockToast]);

  const saveMasterForm = (values) => {
    console.log(values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      subjectGroupMap: values
    };
    if (currentId !== null) {
      url = api_editSubjectGroupData;
      requestBody = requestBodyBase;
      requestBody.id = currentId;
    } else if (values?.bankName !== '' && currentId == null) {
      url = api_postSubjectGroupData;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('bank master..', response?.data?.data);
        if (response?.data?.status === true) {
          // Swal.fire({
          //   icon: "success",
          //   title: `Section`,
          //   text: currentId!==null ? "Data Updated Successfully!" : "Data Added Successfully",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          toast.success(
            currentId !== null
              ? 'Data Updated Successfully!'
              : 'Data Added Successfully'
          );
          fetchMasterList();
          setcurrentId(null);
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        // activateBottomErrorCard(true, "Error occured in submitting form.");
        toast.warning('Error occured in submitting form.');

        setisLoading(false);
      });
  };
  const getData = (data) => {
    let tempArray = [];
    for (let i = 0; i < data.length; i++) {
      tempArray.push({
        section_name: data[i].section_name,
        sectionName: data[i].sectionName
      });
    }
    setSectionData(tempArray);
  };
  useState(() => {
    getData([formik.values.sectionData]);
  }, [formik.values.sectionData]);
  const COLUMNS = [
    {
      Header: 'Sl No.',
      Cell: ({ cell }) => <span>{nullToNA(cell.row.index + 1)}</span>
    },
    {
      Header: 'Class',
      accessor: 'class_name'
    },
    // {
    //   Header: 'Section',
    //   accessor: 'section_name'
    // },
    {
      Header: 'Subject',
      accessor: 'subject_name'
    },
    {
      Header: 'Status',
      Cell: ({ cell }) => (
        <span
          className={
            cell.row.original?.status === 'Active'
              ? 'text-[green]'
              : 'text-[red]'
          }
        >
          {nullToNA(cell.row.original?.status)}
        </span>
      )
    },
    {
      Header: 'Created Date',
      accessor: 'date'
    },
    {
      Header: 'Created Time',
      accessor: 'time'
    },

    {
      Header: 'Action',
      Cell: ({ cell }) => (
        <div className="flex">
          {/* <button
            onClick={() => navigate(`/section-form/${cell.row.original?.id}`)}
            className={`edit-button-master`}
          >
            Edit
          </button> */}
          <button
            onClick={() => {
              setcurrentId(cell.row.original?.id);
              setDeleteStatus(
                cell.row.original?.status === 'Active' ? 'deactive' : 'active'
              );
              setdeleteStatus(true);
            }}
            className={`${
              cell.row.original?.status == 'Active'
                ? 'deactivate-button-master'
                : 'deactivate-second-button-master'
            }`}
          >
            {cell.row.original?.status === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      )
    }
  ];

  // FUNCTION TO SAVE MASTER DATA
  const deleteItem = () => {
    setisLoading(true);
    setdeleteStatus(false);
    let requestBody = {
      id: currentId,
      status: deletestatus
    };

    AxiosInterceptors.post(api_deleteSubjectGroupData, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          fetchMasterList();
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured in deletion.1');
        setisLoading(false);
      });
  };

  const fetchMasterList = (values = null) => {
    console.log(values);
    let url;
    let requestBody;

    if (values === null) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getSubjectGroupData;
    } else {
      requestBody = {
        search: values
      };
      url = api_searchSubjectGroupData;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          if (
            response?.data?.data?.total === 0 ||
            response?.data?.data?.data.length === 0
          ) {
            toast.error(`Data not Found`);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            setBlockToast(false);
          } else {
            console.log('class section map data', response?.data?.data?.data);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            setBlockToast(false);
          }
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.2');

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
          activateBottomErrorCard(true, 'Error occured while fetching data.3');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.4');
        setisLoading(false);
      });
  };
  const fetchSectionList = (value) => {
    // setisLoading(true);
    // AxiosInterceptors.post(
    //   api_section_group_map,
    //   { classId: value },
    //   ApiHeader()
    // )
    //   .then(function (response) {
    //     if (response?.data?.status === true) {
    //       console.log(response?.data);
    //       formik.setFieldValue(
    //         'sectionData',
    //         response?.data?.data?.map((data) => {
    //           return { ...data, sectionName: true };
    //         })
    //       );
    //     } else {
    //       activateBottomErrorCard(true, 'Error occured while fetching data.5');
    //     }
    //     setisLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.log('==2 error list...', error);
    //     activateBottomErrorCard(true, 'Error occured while fetching data.6');
    //     setisLoading(false);
    //   });
  };

  useEffect(() => {
    if (formik.values.classId != '')
      fetchSectionList(parseInt(formik.values.classId));
  }, [formik.values.classId]);

  useEffect(() => {
    fetchMasterList();
    fetchClassList();
  }, []);
  const handleChange = (e) => {
    let name = e.target.name;
  };
  const dataValue = (e, index) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == `subject.${index}.subjectName` &&
        formik.setFieldValue(
          `subject.${index}.subjectName`,
          allowCharacterInput(
            value,
            formik.values.subject[index].subjectName,
            50
          )
        );
    }
  };
  useEffect(() => {
    const modifiedArray = readymadeListData.map((obj) => {
      const { id, ...filteredObj } = obj;
      return filteredObj;
    });
    console.log(modifiedArray);
    setCsvdata(modifiedArray);
  }, [readymadeListData]);

  const column = [
    { title: 'Class', feild: 'class_name' },
    { title: 'Section', feild: 'section_name' },
    { title: 'Subject', feild: 'subject_name' },
    { title: 'Created Date  ', feild: 'date' },
    { title: 'Created Time ', feild: 'time' },
    { title: 'Status', feild: 'status' }
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text('Subject Map Details', 10, 10);
    doc.autoTable({
      theme: 'grid',
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: readymadeListData
    }),
      doc.save('SubjectMap.pdf');
  };
  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD

  return (
    <>
      <div className="w-full h-[76vh] lg:h-auto overflow-auto ">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">
            Subject Master Form
          </h1>
          <h1 className="common-header-smalltext">
            Unlock Your Potential. Join Our Journey Of Education And Excellence
          </h1>
        </div>
        <div className=" mt-3 ml-3 mr-3 ">
          <div className="flex h-auto  items-start justify-start w-full">
            <div className="grid grid-cols-12 w-full  ml-3 mr-3">
              <div className="col-span-12 lg:col-span-5 w-full flex justify-center">
                <div className="mt-5 border border-teal-300 w-full  rounded-md relative">
                  <div className="bg-white px-3 ">
                    {' '}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-[#0F766E] ml-9">
                      Add
                    </h1>
                  </div>
                  <div className="w-full mb-6 mt-[4vh] pb-10  ">
                    <FormikProvider value={formik}>
                      <Form
                        onSubmit={formik.handleSubmit}
                        onChange={handleChange}
                      >
                        <div className="grid grid-cols-12">
                          <div className=" col-span-12 lg:col-span-3">
                            <label
                              className="  text-teal-900 text-sm w-[10vw]   font-semibold"
                              htmlFor=""
                            >
                              Class Name
                              <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-9">
                            <select
                              {...formik.getFieldProps('classId')}
                              className="common-input-css"
                              type="text"
                              placeholder="Enter class"
                            >
                              <option value="">Select</option>
                              {classList?.map((data, index) => (
                                <option value={data?.id}>
                                  {data?.class_name}
                                </option>
                              ))}
                            </select>
                            <span className="text-red-600  text-xs">
                              {formik.touched.classId && formik.errors.classId
                                ? formik.errors.classId
                                : null}
                            </span>
                          </div>
                        </div>

                        {/* {formik.values.sectionData.length > 0 && (
                          <div className="col-span-12 mt-4">
                            <div className="overflow-x-auto pt-4 ">
                              <div className="w-[95%] ml-5 flex items-center  justify-center border border-teal-300 ">
                                <div className="w-full   relative">
                                  <div className="absolute">
                                    {' '}
                                    <h1 className=" bg-white text-teal-900 text-sm font-semibold items-start justify-start px-2 mt-[-10px] ml-7 ">
                                      {' '}
                                      Section{' '}
                                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                        *
                                      </small>
                                    </h1>
                                  </div>
                                  <div className="w-full h-[10vh] flex items-center justify-start">
                                    {formik.values.sectionData &&
                                      formik.values.sectionData.map(
                                        (data, index) => {
                                          return (
                                            <div className="mx-10">
                                              <input
                                                name="sectionName"
                                                value={data?.section_name}
                                                checked={
                                                  formik.values.sectionData[
                                                    index
                                                  ].sectionName === true
                                                }
                                                onChange={() =>
                                                  formik.setFieldValue(
                                                    `sectionData.${index}.sectionName`,
                                                    !data?.sectionName
                                                  )
                                                }
                                                type="checkbox"
                                                className="text-slat-500  ml-[10px]  text-teal-900 w-5 h-5 font-bold mt-2   "
                                              />{' '}
                                              <span className="ml-2 -mt-6">
                                                {data.section_name}
                                              </span>
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )} */}

                        {
                          <>
                            {/* <h1 className=" bg-white text-gray-600 text-sm font-semibold items-start justify-start mt-5 px-2  ml-7 ">
                              subject
                              <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                                *
                              </small>
                            </h1> */}
                            <div className="w-[95%] ml-5 flex items-center mt-8 justify-center border border-teal-300  h-[34vh] overflow-auto">
                              <div className="w-full  relative">
                                <div className="h-[32vh] overflow-auto">
                                  {' '}
                                  <div className="w-full ">
                                    <FieldArray name="subject">
                                      {(arrayHelpers) => (
                                        <>
                                          {formik?.values.subject.length > 0 &&
                                            formik?.values.subject.map(
                                              (items, index) => {
                                                return (
                                                  <React.Fragment key={index}>
                                                    <div className="w-full h-auto overflow-auto flex items-center justify-center">
                                                      <div className="flex mt-[4vh] max-[700px]:block">
                                                        <TextField
                                                          formik={formik}
                                                          label={`Subject Name`}
                                                          name={`subject.${index}.subjectName`}
                                                          isDynamic
                                                          placeholder="Enter subject name"
                                                          onChange={(event) =>
                                                            dataValue(
                                                              event,
                                                              index
                                                            )
                                                          }
                                                        />

                                                        <div className=" px-2">
                                                          <label className="block text-sm font-medium text-gray-700">
                                                            Add & Remove Subject
                                                          </label>
                                                          {index > 0 && (
                                                            <button
                                                              className="mt-1"
                                                              type="button"
                                                              onClick={() =>
                                                                arrayHelpers.remove(
                                                                  index
                                                                )
                                                              }
                                                            >
                                                              <CiSquareRemove className="inline-block w-9 h-9 text-red-600" />
                                                            </button>
                                                          )}
                                                          |
                                                          <button
                                                            type="button"
                                                            className="mt-1"
                                                            onClick={() => {
                                                              if (
                                                                items.subjectName ===
                                                                ''
                                                              ) {
                                                                return activateBottomErrorCard(
                                                                  true,
                                                                  `fill the subject name`
                                                                );
                                                              }
                                                              arrayHelpers.push(
                                                                {
                                                                  subjectName:
                                                                    ''
                                                                }
                                                              );
                                                            }}
                                                          >
                                                            <CiSquarePlus className="inline-block w-9 h-9 text-blue-600" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </React.Fragment>
                                                );
                                              }
                                            )}
                                          {/* button */}
                                        </>
                                      )}
                                    </FieldArray>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        }

                        <div className="mt-3">
                          <button type="submit" className="save-button">
                            Save
                          </button>
                        </div>
                      </Form>
                    </FormikProvider>
                    <div className="mandatorytext">
                      <h1>
                        Note : (*) is a mandatory field, Section Name must be
                        character (A-Z,a-z){' '}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-12 lg:col-span-7 w-full lg:ml-2 ">
                <div className="mt-5 border border-teal-300   rounded-md relative">
                  <div className="bg-white px-3 ">
                    {' '}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-gray-500 ml-9">
                      View List
                    </h1>
                  </div>
                  <div className="mt-5  ">
                    <TabulationHeader
                      generatePdf={generatePdf}
                      enable={enable}
                      setenable={setenable}
                      csvdata={csvdata}
                      readymadeListData={readymadeListData}
                      fetchMasterList={fetchMasterList}
                      setSearchTableData={setSearchTableData}
                      searchTableData={searchTableData}
                    />
                  </div>

                  <div className={`-mt-5 main-div`}>
                    <div className=" rounded-md h-[80vh] 2xl:p-6 p-4 overflow-y-auto">
                      {isLoading && <BarLoader />}

                      {erroState && (
                        <BottomErrorCard
                          activateBottomErrorCard={activateBottomErrorCard}
                          errorTitle={erroMessage}
                        />
                      )}
                      {erroState && (
                        <div className="alert-msg" role="alert">
                          <strong className="sorry-msg">Sorry! </strong>
                          <span className="some-error-msg">
                            Some error occured while fetching list. Please try
                            again later
                          </span>
                          <span className="absolute-span"></span>
                        </div>
                      )}

                      {deleteStatus && (
                        <DeleteView
                          setdeleteStatus={setdeleteStatus}
                          deleteItem={deleteItem}
                          deactivate={deletestatus}
                        />
                      )}
                      <div className="h-[55vh] overflow-auto">
                        {readymadeListStatus && data?.length != 0 && (
                          <>
                            <ListTable
                              filter={false}
                              exportStatus={false}
                              assessmentType={false}
                              columns={COLUMNS}
                              dataList={currentpost}
                              pageNumber={lastdata}
                            />
                            <Pagination
                              ChangePage={ChangePage}
                              number={number}
                              lastPage={lastPage}
                              nextPage={nextPage}
                              prevPage={prevPage}
                              postperpage={postperpage}
                              blockToast={blockToast}
                              setBlockToast={setBlockToast}
                            />
                          </>
                        )}
                      </div>
                      {readymadeListStatus && data?.length == 0 && (
                        <div className="data-not-found">Data Not Found</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoSubjectData;
