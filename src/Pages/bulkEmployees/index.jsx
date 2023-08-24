/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { useFormik } from 'formik';
import BarLoader from '../../Components/Common/BarLoader';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { nullToNA } from '../../Components/Common/PowerupFunctions';
import Delete from '../../assets/delete.png';
import Eye from '../../assets/image 40.png';
import Edit from '../../assets/edit.png';
import Line from '../../assets/image 37.png';
import Table from '../../assets/image 43.png';
import Card from '../../assets/image 44.png';
import Pdf from '../../assets/image 45.png';
import Excel from '../../assets/image 46.png';
import Right from '../../assets/right.png';
import Left from '../../assets/left.png';
import Pagination from '../../Components/Common/Pagination';

export default function index() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [enable, setenable] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [apidata, setApidata] = useState();
  const [table, setTable] = useState(true);
  const [readymadeListData, setreadymadeListData] = useState([]);

  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [search, setsearch] = useState();

  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [confirmationDropdownopen, setConfirmationDropdownopen] =
    useState(false);
  const confirmationtoogle = () =>
    setConfirmationDropdownopen(!confirmationDropdownopen);
  const navigate = useNavigate();
  const {
    api_bulkdataaddemployee,
    api_deleteEmployeeData,
    api_getEmployeeData,
    api_searchEmployeeData
  } = ApiList();
  const initialValues = {
    uploadCSV: ''
  };
  const validationSchema = yup.object({
    uploadCSV: yup.string().required('Select CSV File')
  });
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('uploadCSV', values.uploadCSV);
      saveMasterForm(formData);
    },
    validationSchema
  });

  // eslint-disable-next-line no-shadow
  // const ChangePage = (pageNumber) => {
  //   setNumber(pageNumber);
  // };

  const saveMasterForm = (formData) => {
    setisLoading(true);
    let url;
    let requestBody;
    url = api_bulkdataaddemployee;
    requestBody = formData;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('Registration.....', response?.data);
        if (response?.data) {
          Swal.fire({
            icon: 'success',
            title: `Employee`,
            text: `Csv Data Added Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/bulk-employees');
          getemployeeUser();
        } else {
          activateBottomErrorCard(true, `${response?.data?.response}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured in submitting form.');

        setisLoading(false);
      });
  };
  const handleFileValues = (fileData) => {
    formik.setFieldValue('uploadCSV', fileData);
  };
  const handleOnChange = (e) => {
    let name = e.target.name;

    if (name == 'uploadCSV') {
      let myfile = e.target.files[0];
      handleFileValues(myfile);
      return;
    }
  };
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const getemployeeUser = (values = null) => {
    setisLoading(true);
    let url;
    let requestBody;

    if (values === null) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getEmployeeData;
    } else {
      requestBody = {
        search: search
        // perPage: postperpage, page: number,
      };
      url = api_searchEmployeeData;
    }
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          if (response?.data?.data?.total === 0) {
            toast.error(`Data not Found`);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
          } else {
            console.log('exam term data', response?.data?.data?.data);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
          }
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
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
    getemployeeUser();
  }, []);
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
    getemployeeUser();
  }, [number]);
  useEffect(() => {
    getemployeeUser();
  }, [postperpage]);

  const column = [
    { title: 'Emp No', feild: 'empNo' },
    { title: 'Name', feild: 'full_name' },
    { title: 'Gender', feild: 'gender_name' },
    { title: 'Category', feild: 'category_name' },
    { title: 'DOB', feild: 'dob' },
    { title: 'DOJ', feild: 'doj' },
    { title: 'Mobile', feild: 'mobile' },
    { title: 'Email', feild: 'email' },
    { title: 'Blood Group', feild: 'blood_group_name' },
    { title: 'Department', feild: 'department_name' }
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text('Employee Details', 10, 10);
    doc.autoTable({
      theme: 'grid',
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: apidata
    }),
      doc.save('employee.pdf');
  };
  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== "") {
  //     const filteredData = apidata.filter((item) => {
  //       return Object.values(item)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase());
  //     });
  //     setFilteredResults(filteredData);
  //   } else {
  //     setFilteredResults(apidata);
  //   }
  // };
  const handleDelete = (id, statues) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.value) {
        deleteItem(id, statues);
      }
    });
    const deleteItem = (id, statues) => {
      setisLoading(true);
      setdeleteStatus(false);

      let requestBody = {
        id: id,
        status: statues === 'Active' ? 'deactive' : 'active'
      };

      AxiosInterceptors.post(api_deleteEmployeeData, requestBody, ApiHeader())
        .then(function (response) {
          console.log('delete response..', response?.data?.data);
          if (response?.data?.status === true) {
            getemployeeUser();
          } else {
            activateBottomErrorCard(true, 'Error occured in deletion.');
          }
          setisLoading(false);
        })
        .catch(function (error) {
          console.log('==delete error...', error);
          activateBottomErrorCard(true, 'Error occured in deletion.');
          setisLoading(false);
        });
    };
  };

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {' '}
      {isLoading && <BarLoader />}
      <div className="block  w-full mx-[10px] ">
        <div className="flex  max-[694px]:block">
          <div className="flex w-full items-start justify-start ml-5 mt-5">
            <div className="block w-full">
              <h1 className="text-4xl font-semibold text-gray-700 flex justify-start w-full ">
                Bulk Employee List
              </h1>
              <h1 className="text-teal-600 flex justify-start text-sm w-full">
                Unlock Your Potential. Join Our Journey Of Education And
                Excellence
              </h1>
            </div>
          </div>
        </div>
        <div className="flex mt-[5vh]">
          <form
            onSubmit={formik.handleSubmit}
            onChange={handleOnChange}
            encType="multipart/form-data"
            className="flex  items-center justify-center w-full"
          >
            <div className="flex  items-center justify-center w-full">
              <div className="flex  items-center justify-center">
                <label
                  htmlFor="uploadCSV"
                  className=" h-[5vh] flex justify-center items-center px-4 bg-white border border-gray-600 rounded-l font-semibold cursor-pointer text-sm text-black tracking-widest  active:bg-white focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition "
                >
                  {' '}
                  Choose Employee CSV File
                </label>
                <div className="flex items-center justify-center">
                  <input
                    type="file"
                    name="uploadCSV"
                    accept=".csv"
                    id="uploadCSV"
                    className="sr-only h-[5vh]  inline-flex items-center px-4 py-2 bg-white border  active:bg-white focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition "
                    value={formik.values.uploadCSV[0]}
                    onChange={(e) => {
                      formik.setFieldValue('uploadCSV', e.target.files[0]);
                    }}
                  />
                  {formik.values.uploadCSV
                    ? formik.values.uploadCSV?.name
                    : 'No file selected'}
                  <br />
                  <span className="text-red-600 text-xs ">
                    {formik.touched.uploadCSV && formik.errors.uploadCSV
                      ? formik.errors.uploadCSV
                      : null}
                  </span>
                </div>
                <button type="submit" className="next-btn">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="block ">
          <div className="w-auto  h-[60vh] overflow-y-auto overflow-x-hidden flex pt-[3vh]  pr-[3vh] bg-white max-[1024px]:overflow-auto  max-[768px]:w-[95%] max-[425px]:overflow-auto mr-2">
            <div className="block w-full mt-[-20px]">
              <div className="flex items-center text-[2.4vh] justify-end mr-4 mb-[10px] max-[918px]:block">
                <div className="float-left w-full flex ml-4 max-[918px]:ml-0">
                  {/* <div className="ml-5">
                    {' '}
                    <h1 className="font-bold text-[#0F766E]">
                      List Of Employee
                    </h1>
                  </div> */}
                </div>
                {/* <div className="items-center float-left  flex mr-4 max-[618px]:ml-4">
                  <div className="flex w-full mr-4">
                    <div className={`${table ? ' text-[#4ade80] flex' : ''}`}>
                      <h1 onClick={() => setTable(true)} className="mr-5">
                        <a title="List View">
                          <img src={Table} alt="table" className="w-8 h-8" />
                        </a>
                      </h1>
                      <h2 className="flex">
                        <a title="Download CSV" className="mr-5">
                          <img
                            src={Excel}
                            onClick={() => setenable(!enable)}
                            className="  font-bold  mr-4 w-17 h-17 "
                          />
                        </a>

                        {enable && (
                          <CSVDownload data={apidata} target="_blank" />
                        )}
                        <a title="Download PDF">
                          <img
                            src={Pdf}
                            className="  font-bold  w-17  h-17"
                            onClick={generatePdf}
                          />
                        </a>
                      </h2>
                    </div>
                  </div>
                </div> */}
                {/* <input
                  type="search"
                  placeholder="Search..."
                  name="search"
                  onKeyUp={(e) => setsearch(e.target.value)}
                  className="bg-[#F2F4F4] h-10 pl-4 "
                /> */}
                {/* <button
                  className="bg-[#0F766E] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
                  type="search"
                  onClick={() => getemployeeUser(search)}
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
                </button> */}
              </div>
              <div className="ml-4 mb-4">
                <hr className=" border-b-2" />
              </div>

              <div className="w-full h-[60vh] block   ">
                <table className="w-full mx-4 my-1   border-b border-b-gray overflow-auto max-[1000px]:w-[100vh] max-[1000px]:relative max-[1000px]:overflow-auto">
                  <thead className=" text-white bg-[#0F766E] text-[1.7vh] p-12 w-full border-b border-b-gray h-[6vh] ">
                    <tr className="py-2 pl-4 w-full flex items-start justify-start text-left">
                      <th className="w-[50vh]">Sl No.</th>
                      <th className="w-[100%] flex items-start justify-start">
                        Emp ID
                      </th>
                      <th className="w-[100%] flex items-start justify-start">
                        Full Name
                      </th>
                      <th className="w-[100%] flex items-start justify-start">
                        Gender
                      </th>
                      {/* <th className="w-[100%] flex items-start justify-start">
                              Category
                            </th> */}
                      <th className="w-[100%] flex items-start justify-start ">
                        Department
                      </th>
                      <th className="w-[100%] flex items-start justify-start ">
                        Blood Group
                      </th>
                      {/* <th className="w-[100%] flex items-start justify-start">
                              DOB
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              DOJ
                            </th> */}
                      <th className="w-[100%] flex items-start justify-start">
                        Mobile
                      </th>
                      <th className="w-[100%] flex items-start justify-start">
                        Email
                      </th>
                      <th className="w-[100%] flex items-start justify-start">
                        Status
                      </th>
                      <th className="w-[100%] flex items-center justify-center pr-1 mr-[2vh]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentpost &&
                      currentpost.map((eachValue, index) => {
                        return (
                          <>
                            <tr className="py-2 pl-4 w-full text-[1.6vh] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100">
                              <td className="w-[50vh] flex items-start justify-start text-[1.5vh]  px-1">
                                {nullToNA(
                                  (number - 1) * postperpage + index + 1
                                )}
                              </td>
                              <td className="w-[100%] flex items-start justify-start  px-1">
                                {nullToNA(eachValue.emp_no)}
                              </td>
                              <td className="w-[100%] flex items-start justify-start  px-1">
                                {nullToNA(eachValue.full_name)}
                              </td>
                              <td className="w-[100%] flex items-start justify-start  px-1">
                                {nullToNA(eachValue.gender_name)}
                              </td>
                              {/* <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.category_name)}
                                      </td> */}
                              <td className="w-[100%] flex items-start justify-start  px-1">
                                {nullToNA(eachValue.department_name)}
                              </td>
                              <td className="w-[100%] flex items-center justify-center   px-1">
                                {nullToNA(eachValue.blood_group_name)}
                              </td>
                              {/* <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.dob)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.doj)}
                                      </td> */}
                              <td className="w-[100%] flex items-start justify-start  px-1">
                                {nullToNA(eachValue.mobile)}
                              </td>
                              <td className="w-[100%] flex items-start justify-start  px-1">
                                {eachValue?.email || 'NA'}
                              </td>
                              <td className="w-[100%] flex items-start justify-start px-1">
                                <span
                                  className={`text-xs font-semibold inline-block py-1 px-2 rounded ${
                                    eachValue.status == 'Active'
                                      ? 'text-green-600 bg-green-200'
                                      : 'text-red-600 bg-red-200'
                                  }  last:mr-0 `}
                                >
                                  {' '}
                                  {nullToNA(eachValue?.status)}
                                </span>
                              </td>

                              <td className=" w-[100%] flex items-center justify-center">
                                <a title="Edit">
                                  <img
                                    src={Edit}
                                    className="mr-2 text-indigo-600  hover:text-gray-500 w-6 h-6"
                                    onClick={() => {
                                      // setData(eachValue.id);
                                      Swal.fire({
                                        icon: 'warning',
                                        title: 'Are you sure?',
                                        text: 'You want to update it!',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes, update it!',
                                        cancelButtonText: 'No, cancel!'
                                      }).then((result) => {
                                        if (result.value) {
                                          navigate(
                                            `/second-editemployee/${eachValue.id}`
                                          );
                                        }
                                      });
                                    }}
                                  />
                                </a>
                                <a title="Delete">
                                  <img
                                    src={Delete}
                                    className=" text-red-600 hover:text-gray-500 mr-2 w-6 h-6"
                                    onClick={() =>
                                      handleDelete(
                                        eachValue.id,
                                        eachValue?.status
                                      )
                                    }
                                  />
                                </a>
                                {/* <a title="View">
                                          <img
                                            src={Eye}
                                            className="text-[#06b6d4] hover:text-gray-500 w-6 h-6"
                                            onClick={
                                              () =>
                                                navigate(
                                                  `/viewstep-form/${eachValue.id}`
                                                )
                                              // handleView(eachValue.id)
                                            }
                                          />
                                        </a> */}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                <Pagination
                  ChangePage={ChangePage}
                  number={number}
                  lastPage={lastPage}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  postperpage={postperpage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
