import { useState, useEffect } from 'react';
import ApiHeader from '../../../Components/ApiList/ApiHeader';
import ApiList from '../../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../../Components/Common/AxiosInterceptors';
import BarLoader from '../../../Components/Common/BarLoader';
import { nullToNA } from '../../../Components/Common/PowerupFunctions';
import useSetTitle from '../../../Components/Hooks/useSetTitle';
import ListTable from '../../../Components/ListTable/ListTable';
import { HiPlus } from 'react-icons/hi';
import GlobalFilter from '../../../Components/ListTable/GlobalFilter';
import DeleteView from '../../../Components/Common/DeleteView';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import { allowCharacterInput } from '../../../Components/Common/PowerupFunctions';
import { useFormik } from 'formik';
import { CSVDownload } from 'react-csv';
import { AiFillFilePdf, AiFillFileExcel } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { BsFiletypePdf, BsFiletypeCsv } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DemoSchoolMapData = () => {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [enable, setenable] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const [schoolList, setSchoolList] = useState([]);
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [searchTableData, setSearchTableData] = useState();
  const {
    api_schoollistactiveall,
    api_searchSectionGroupData,
    api_schoolistData,
    api_schoollistdeleteData,
    api_roleUpdateApi,
    api_getSectionGroupDataByID,
    api_editSectionGroupData
  } = ApiList();

  useSetTitle('Role Map');

  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: 'hello' },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: 'hello' }
  ];
  const validationSchema = yup.object({
    id: yup.string().required('Select School')
  });

  const formik = useFormik({
    initialValues: {
      // search: "",
      id: '',
      roleId: 2,
      roleName: 'Super Admin'
    },

    onSubmit: (values, resetForm) => {
      console.log('at submit ', values);
      saveMasterForm(values);
      formik.resetForm();
    },
    validationSchema
  });
  const fetchMasterList = (values) => {
    console.log(values);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_schoolistData;
    } else {
      requestBody = {
        search: values
      };
      url = api_searchSectionGroupData;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          console.log('section group data', response?.data?.data?.data);
          setreadymadeListData(response?.data?.data?.data);
          setlastPage(response?.data?.data?.last_page);
          setlastData(response?.data?.data?.total);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  //pagination
  console.log(lastdata);
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
  };
  const prevPage = (number) => {
    setNumber(number - 1);
  };
  const nextPage = (number) => {
    setNumber(number + 1);
  };
  useEffect(() => {
    fetchMasterList();
  }, [number]);
  useEffect(() => {
    fetchMasterList();
  }, [postperpage]);
  const COLUMNS = [
    {
      Header: 'Sl No.',
      Cell: ({ cell }) => <span>{nullToNA(cell.row.index + 1)}</span>
    },
    {
      Header: 'School Code',
      accessor: 'school_code'
    },
    {
      Header: 'School Name',
      accessor: 'school_name'
    },
    // {
    //   Header: "Name",
    //   accessor: "name",
    // },
    {
      Header: 'Role Name',
      accessor: 'role_name'
    },
    {
      Header: 'Mobile No',
      accessor: 'mobile'
    },
    // {
    //   Header: "Email",
    //   accessor: "email",
    // },

    // {
    //   Header: "Address",
    //   accessor: "address",
    // },
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
      Header: 'Created Date & Time',
      Cell: ({ cell }) => (
        <span>
          {nullToNA(cell.row.original?.date)} |{' '}
          {nullToNA(cell.row.original?.time)}
        </span>
      )
    }

    // {
    //   Header: "Action",
    //   Cell: ({ cell }) => (
    //     <div className="flex">
    //       {/* <button
    //         // onClick={() =>
    //         //   navigate(`/department-form/${cell.row.original?.id}`)
    //         // }
    //         className={`edit-button-master`}
    //       >
    //         Edit
    //       </button> */}
    //       <button
    //         onClick={() => {
    //           setcurrentId(cell.row.original?.id);
    //           setDeleteStatus(
    //             cell.row.original?.status === "Active" ? "deactive" : "active"
    //           );
    //           setdeleteStatus(true);
    //         }}
    //         className={`${
    //           cell.row.original?.status == "Active"
    //             ? "deactivate-button-master"
    //             : "deactivate-second-button-master"
    //         }`}
    //       >
    //         {cell.row.original?.status === "Active" ? "Deactivate" : "Activate"}
    //       </button>

    //     </div>
    //   ),
    // },
  ];
  console.log(number);
  //Edit data
  const fetchEditData = (getid) => {
    setisLoading(true);
    let requestBody = {
      id: getid
    };
    AxiosInterceptors.post(
      api_getSectionGroupDataByID,
      requestBody,
      ApiHeader()
    )
      .then(function (response) {
        console.log('fetch edit data response..', response?.data?.data);
        if (response?.data?.status) {
          sectionEditData(response?.data?.data);
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
  //Fetch Edit Data
  const sectionEditData = (data) => {
    console.log('existing property details in prop address...', data);
    formik.setFieldValue('id', data?.id);
    formik.setFieldValue('roleId', data?.role_id);
  };
  console.log(currentId);
  // post  data
  const saveMasterForm = (values) => {
    console.log(values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      id: parseInt(values.id),
      roleId: values.roleId
    };
    if (currentId !== null) {
      url = api_editSectionGroupData;
      requestBody = requestBodyBase;
      requestBody.id = currentId;
    } else if (values?.id !== '' && currentId == null) {
      url = api_roleUpdateApi;
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
  // Delete data
  const deleteItem = () => {
    setisLoading(true);
    setdeleteStatus(false);

    let requestBody = {
      id: currentId,
      status: deletestatus
    };

    AxiosInterceptors.post(api_schoollistdeleteData, requestBody, ApiHeader())
      .then(function (response) {
        console.log('delete response..', response?.data?.data);
        if (response?.data?.status === true) {
          fetchMasterList();
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==delete error...', error);
        activateBottomErrorCard(true, 'Error occured in deletion.');
        setisLoading(false);
      });
  };

  const fetchClassList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_schoollistactiveall, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setSchoolList(response?.data.data);
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
    fetchMasterList();
    fetchClassList();
  }, []);
  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == 'sectionName' &&
        formik.setFieldValue(
          'sectionName',
          allowCharacterInput(
            value.toUpperCase().trim(),
            formik.values.sectionName,
            1
          )
        );
    }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  const column = [
    { title: 'School', feild: 'school_name' },
    { title: 'Role', feild: 'role_name' },
    { title: 'Created Date  ', feild: 'date' },
    { title: 'Created Time ', feild: 'time' },
    { title: 'Status', feild: 'status' }
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text('Role Map Details', 10, 10);
    doc.autoTable({
      theme: 'grid',
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: readymadeListData
    }),
      doc.save('rolemap.pdf');
  };
  return (
    <>
      <div className="w-full h-[76vh] lg:h-auto overflow-auto ">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">
            Role Map Form
          </h1>
          <h1 className="text-gray-600 text-sm">
            Unlock Your Potential. Join Our Journey Of Education And Excellence
          </h1>
        </div>
        <div className=" mt-1 ml-3 mr-3 ">
          <div className="flex h-auto  items-start justify-start w-full">
            <div className="grid grid-cols-12 w-full  ml-3 mr-3 ">
              <div className="col-span-12  lg:col-span-4 w-full flex justify-center">
                <div className="mt-8 border w-full  rounded-md relative">
                  <div className="bg-white px-3 ">
                    {' '}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-gray-500 ml-9">
                      Add
                    </h1>
                  </div>
                  <div className="w-full mb-6 mt-[14vh] pb-10  ">
                    <form
                      onSubmit={formik.handleSubmit}
                      onChange={handleChange}
                    >
                      <div className="grid grid-cols-12">
                        <div className=" col-span-12 lg:col-span-2">
                          <label
                            className=" flex items-start justify-start ml-2 text-gray-800 text-md w-[20vh]   font-bold"
                            htmlFor=""
                          >
                            School Name
                            <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-10">
                          <select
                            {...formik.getFieldProps('id')}
                            className=" h-10 w-[90%] lg:w-[60%] px-7 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                            type="text"
                            placeholder="Enter school"
                          >
                            <option value="">Select</option>
                            {schoolList?.map((data, index) => (
                              <option value={data?.id}>
                                {data?.school_name}
                              </option>
                            ))}
                          </select>
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.id && formik.errors.id
                              ? formik.errors.id
                              : null}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-6">
                        <div className=" col-span-12 lg:col-span-2">
                          <label
                            className=" flex items-start justify-start ml-2 text-gray-800 text-md w-[20vh]    font-bold"
                            htmlFor=""
                          >
                            Role Name
                            <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-10 hidden">
                          <input
                            {...formik.getFieldProps('roleId')}
                            className="h-10  w-[90%] lg:w-[60%] px-7 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                            type="text"
                            disabled
                            placeholder="Enter role"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.roleId && formik.errors.roleId
                              ? formik.errors.roleId
                              : null}
                          </span>
                        </div>
                        <div className="col-span-12 lg:col-span-10">
                          <input
                            {...formik.getFieldProps('roleName')}
                            className="h-10  w-[90%] lg:w-[60%] px-7 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                            type="text"
                            disabled
                            placeholder="Enter role"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.roleId && formik.errors.roleId
                              ? formik.errors.roleId
                              : null}
                          </span>
                        </div>
                      </div>

                      <div className="mt-7">
                        <button
                          type="submit"
                          className="px-9 py-2.5 bg-[#6AB783] text-white font-medium text-sm leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          {currentId !== null ? 'Update' : 'Save'}
                        </button>
                      </div>
                    </form>
                    <div className="flex justify-center items lg:ml-16 mt-11 text-[1.5vh]">
                      <h1 className="text-red-600">
                        Note : (*) is a mandatory field{' '}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-12 md:col-span-12 lg:col-span-8 w-full lg:ml-2 ">
                <div className="mt-8 border   rounded-md relative">
                  <div className="bg-white px-3 ">
                    {' '}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-gray-500 ml-9">
                      View List
                    </h1>
                  </div>
                  <div className="mt-5  ">
                    <div className="flex flex-wrap justify-between">
                      <div className="ml-9 text-3xl gap-x-3 flex">
                        <div className="text-red-700 cursor-pointer">
                          <BsFiletypePdf onClick={generatePdf} />
                        </div>
                        <div className="text-green-700 cursor-pointer">
                          <BsFiletypeCsv onClick={() => setenable(!enable)} />
                        </div>
                        {enable && (
                          <CSVDownload
                            data={readymadeListData}
                            target="_blank"
                          />
                        )}
                      </div>
                      <div className=" mr-9 justify-start  max-[870px]:block max-[870px]:mt-2">
                        <div className="main-sub-inner-div"></div>
                        <div className="tab-div">
                          <div className="global-filter-div">
                            <form onSubmit={formik.handleSubmit}>
                              <div className="global-filter flex">
                                <input
                                  type="search"
                                  placeholder="Search..."
                                  name="search"
                                  onChange={(e) => {
                                    setSearchTableData(e.target.value);
                                  }}
                                  className="bg-[#F2F4F4] h-10 pl-4 w-[90%] "
                                />
                                <button
                                  className="bg-[#3b82f6] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
                                  type="search"
                                  onClick={() =>
                                    fetchMasterList(searchTableData)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="h-5 w-5 "
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>{' '}
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <div className="h-[57vh] overflow-auto max-[1004px]:h-full">
                        {readymadeListStatus && data?.length != 0 && (
                          <ListTable
                            filter={false}
                            exportStatus={false}
                            assessmentType={false}
                            columns={COLUMNS}
                            dataList={currentpost}
                            pageNumber={lastdata}
                          />
                        )}
                        <div className="mt-3 grid grid-cols-12 mr-3">
                          <div className="col-span-2">
                            {' '}
                            <select
                              className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              value={postperpage}
                              onChange={(e) => ChangePage(e.target.value)}
                            >
                              {[5, 10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                  show {pageSize}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-4 text-center col-start-5">
                            {' '}
                            <span>
                              Page {''}
                              <strong>
                                {number} of {lastPage}
                              </strong>
                              {''}
                            </span>
                          </div>

                          <div className="col-span-4 text-right">
                            {/* <button
                className="cursor-pointer hover:bg-sky-300 p-2 hover:text-white"
                onClick={() => gotoPage(0)}
                // disabled={!canPreviousPage}
              >
                <AiOutlineDoubleLeft />{" "}
              </button> */}
                            <button
                              className={
                                (number === 1 ? 'opacity-50' : 'opacity-100') +
                                ' text-xl hover:bg-sky-300 hover:text-white'
                              }
                              onClick={() => prevPage(number)}
                              disabled={number === 1}
                            >
                              ⬅️
                            </button>
                            <button
                              className={
                                (number === lastPage
                                  ? 'opacity-50'
                                  : 'opacity-100') +
                                ' text-xl hover:bg-sky-300 hover:text-white'
                              }
                              onClick={() => nextPage(number)}
                              disabled={number === lastPage}
                            >
                              ➡️
                            </button>
                            {/* <button
                className="cursor-pointer hover:bg-sky-300 p-2 hover:text-white"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {" "}
                <AiOutlineDoubleRight />
              </button> */}
                          </div>
                        </div>
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

export default DemoSchoolMapData;
