import { useState, useEffect } from "react";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import useSetTitle from "../../Components/Hooks/useSetTitle";
import ListTable from "../../Components/ListTable/ListTable";
import DeleteView from "../../Components/Common/DeleteView";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { allowCharacterNumberSpaceInput } from "../../Components/Common/PowerupFunctions";
import { TextField, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { CSVDownload } from "react-csv";
import { BiEditAlt } from "react-icons/bi";
import { BsFiletypePdf, BsFiletypeCsv } from "react-icons/bs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import jsPDF from "jspdf";
import Instruction from "./instruction";
import autoTable from "jspdf-autotable";
import { FcInfo } from "react-icons/fc";
import moment from "moment";
import Pagination from "../../Components/Common/Pagination";
import TabulationHeader from "../../Components/Common/TabulationHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookData = () => {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [csvdata, setCsvdata] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(true);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [enable, setenable] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [deactivateId, setdeactivateId] = useState();
  const [bulkHolidayData, setBulkHolidayData] = useState("");
  const [searchTableData, setSearchTableData] = useState();
  const {
    api_getHolidayByID,
    api_getHolidayData,
    api_postHolidayData,
    api_editHolidayData,
    api_deleteHolidayData,
    api_searchHolidayData,
    api_getActiveHolidayData,
    api_postCSVfile,
  } = ApiList();
  useSetTitle("Holiday Master");

  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: "hello" },
  ];
  const validationSchema = yup.object({
    holiday: yup.string().required("Holiday is required feild"),
    holidayDate: yup.string().required("Date is required feild"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        bookName:" ",
        bookCategoryId:"",
        authorName:" ",
        isbnNumber:" ",
        publicationName:" ",
        price:" ",
        bookCount:" "
    },

    onSubmit: (values, { resetForm }) => {
      // saveMasterForm(values);
      resetForm();
      console.log("Submit",values);
    },
    // validationSchema,
  });
  const fetchMasterList = (values) => {
    // console.log(values);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getHolidayData;
    } else {
      requestBody = {
        search: values,
      };
      url = api_searchHolidayData;
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
          } else {
            console.log("Misc. Category data", response?.data?.data?.data);
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
        // activateBottomErrorCard(true, "Error occured while fetching data.");
        toast.warning("Error occured while fetching data.");

        setisLoading(false);
      });
  };
  //pagination
  // console.log(lastdata);
  const lastpost = number * postperpage;
  const currentpost = readymadeListData;
  // console.log(readymadeListData);
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
      Header: "Sl No.",
      Cell: ({ cell }) => (
        <span> {(number - 1) * postperpage + cell.row.index + 1} </span>
      ),
    },
    {
      Header: "Holiday",
      accessor: "holiday",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Created Date & Time",
      Cell: ({ cell }) => (
        <span>
          {nullToNA(cell.row.original?.date)} |{" "}
          {nullToNA(cell.row.original?.time)}
        </span>
      ),
    },
    {
      Header: "Status",
      Cell: ({ cell }) => (
        <span
          className={
            cell.row.original?.status === "Active"
              ? "text-[green]"
              : "text-[red]"
          }
        >
          {nullToNA(cell.row.original?.status)}
        </span>
      ),
    },

    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() => {
              Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                text: "You want to update it!",
                showCancelButton: true,
                confirmButtonText: "Yes, update it!",
                cancelButtonText: "No, cancel!",
              }).then((result) => {
                if (result.value) {
                  setcurrentId(cell.row.original?.id);
                  fetchEditData(cell.row.original?.id);
                }
              });
            }}
            className={`edit-button-master`}
          >
            <a title="edit">
              <BiEditAlt size={23} />
            </a>
          </button>
          <button
            onClick={() => {
              setdeactivateId(cell.row.original?.id);
              setDeleteStatus(
                cell.row.original?.status === "Active" ? "deactive" : "active"
              );
              setdeleteStatus(true);
            }}
            className={`${
              cell.row.original?.status == "Active"
                ? "deactivate-button-master"
                : "deactivate-second-button-master"
            }`}
          >
            {cell.row.original?.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];
  // console.log(number);
  useEffect(() => {
    // console.log("formikvalue", formik.values);
  }, [formik.values]);
  useEffect(() => {
    const modifiedArray = readymadeListData.map((obj) => {
      const { id, ...filteredObj } = obj;
      return filteredObj;
    });
    // console.log(modifiedArray);
    setCsvdata(modifiedArray);
  }, [readymadeListData]);
  //Edit data
  const fetchEditData = (getid) => {
    setisLoading(true);
    let requestBody = {
      id: getid,
    };
    AxiosInterceptors.post(api_getHolidayByID, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          sectionEditData(response?.data?.data);
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("= edit data error...", error);
        seterroState(true);
        setisLoading(false);
      });
  };
  //Fetch Edit Data
  const sectionEditData = (data) => {
    // console.log("existing property details in prop address...", data);
    formik.setFieldValue("holiday", data?.holiday);
    formik.setFieldValue("holidayDate", data?.holiday_date);
    formik.setFieldValue("description", data?.description);
  };

  //Bulk Post
  const saveBulkData = (bulkHolidayData) => {
    // console.log(bulkHolidayData);
    setisLoading(true);
    const formdata = new FormData();
    formdata.append("bookDocs", bulkHolidayData);
    let url;
    let requestBody;
    for (const value of formdata.keys()) {
      console.log(value);
    }
    url = api_postCSVfile;
    requestBody = formdata;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("holiday master..", response?.data?.data);
        if (response?.data?.status === true) {
          toast.success(
            currentId !== null
              ? "Data Updated Successfully!"
              : "Data Added Successfully"
          );
          fetchMasterList();
          setcurrentId(null);
          setBulkHolidayData("");
        } else {
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        // activateBottomErrorCard(true, "Error occured in submitting form.");
        toast.warning("Error occured in submitting form.");

        setisLoading(false);
      });
  };
  // post  data
  const saveMasterForm = (values) => {
    console.log(values);
    const formdata = new FormData();
    formdata.append("holiday", values.holiday);
    formdata.append("holidayDate", values.holidayDate);
    formdata.append("description", values.description);
    setisLoading(true);
    let url;
    let requestBody = formdata;
    if (currentId !== null) {
      url = api_editHolidayData;
      requestBody = formdata;
      formdata.append("id", currentId);
    } else if (currentId == null) {
      url = api_postHolidayData;
      requestBody = formdata;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("bank master..", response?.data?.data);
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
              ? "Data Updated Successfully!"
              : "Data Added Successfully"
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
        console.log("==2 error list...", error);
        // activateBottomErrorCard(true, "Error occured in submitting form.");
        toast.warning("Error occured in submitting form.");

        setisLoading(false);
      });
  };
  // Delete data
  const deleteItem = () => {
    setisLoading(true);
    setdeleteStatus(false);
    let requestBody = {
      id: deactivateId,
      status: deletestatus,
    };

    AxiosInterceptors.post(api_deleteHolidayData, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          fetchMasterList();
          requestBody?.status == "active"
            ? toast.success("Activated Successfully")
            : toast.error("Deactivated Successfully");
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        // activateBottomErrorCard(true, "Error occured in deletion.");
        toast.warning("Error occured in deletion.");

        setisLoading(false);
      });
  };
  useEffect(() => {
    fetchMasterList();
  }, []);
  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "holiday" &&
        formik.setFieldValue(
          "holiday",
          allowCharacterInput(value, formik.values.holiday, 40)
        );
    }
    {
      name == "description" &&
        formik.setFieldValue(
          "description",
          allowCharacterNumberSpaceInput(value, formik.values.description, 100)
        );
    }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const column = [
    { title: "Holiday", feild: "holiday" },
    { title: "Holiday Date", feild: "holiday_date" },
    { title: "Description", feild: "description" },
    { title: "Created Date  ", feild: "date" },
    { title: "Created Time ", feild: "time" },
    { title: "Status", feild: "status" },
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Holiday Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: readymadeListData,
    }),
      doc.save("Holiday.pdf");
  };
  return (
    <>
      <Instruction setIsModelOpen={setIsModelOpen} isModelOpen={isModelOpen} />
      <div className="w-full h-[76vh]  overflow-auto ">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">Book Form</h1>
          <h1 className="common-header-smalltext">
            Unlock Your Potential. Join Our Journey Of Education And Excellence
          </h1>
        </div>
        <div className=" mt-1 ml-3 mr-3 ">
          <div className="flex h-auto  items-start justify-start w-full">
            <div className="grid grid-cols-12 w-full  ml-3 mr-3 ">
              <div className="col-span-12  lg:col-span-4 w-full flex justify-center">
                <div className="block col-span-12  lg:col-span-4 w-full ">
                  <div className="mt-8 border border-teal-300 w-full h-[73.2%] rounded-md relative">
                    <div className="bg-white px-3 ">
                      {" "}
                      <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-[#0F766E] ml-9">
                        Add
                      </h1>
                    </div>
                    <div className="w-full mb-6 mt-[14vh] pb-10 px-2  ">
                      <form
                        onSubmit={formik.handleSubmit}
                        onChange={handleChange}
                      >
                     
                        <div className="grid grid-cols-12 mt-1 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              Book Name
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps("bookName")}
                              className="common-input-css"
                              type="text"
                            //   placeholder="Enter Book name"
                            />
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched.bookName && formik.errors.bookName
                                ? formik.errors.bookName
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-1 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              Book Category
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps(" bookCategoryId")}
                              className="common-input-css"
                              type="number"
                            //   placeholder="Enter Book name"
                            />
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched. bookCategoryId && formik.errors. bookCategoryId
                                ? formik.errors. bookCategoryId
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-1 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              Author Name
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps("authorName")}
                              className="common-input-css"
                              type="text"
                            //   placeholder="Enter author name"
                            />
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched.authorName && formik.errors.authorName
                                ? formik.errors.authorName
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-2 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              ISBN Number
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps("isbnNumber")}
                              className="common-input-css"
                              type="text"
                          
                            />
                            
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched.isbnNumber &&
                              formik.errors.isbnNumber
                                ? formik.errors.isbnNumber
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-2 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              Publication Name
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps("publicationName")}
                              className="common-input-css"
                              type="text"
                            //   placeholder="Enter description"
                            />
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched.publicationName &&
                              formik.errors.publicationName
                                ? formik.errors.publicationName
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-2 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              Price
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps("price")}
                              className="common-input-css"
                              type="number"
                              min={0}
                            //   placeholder="Enter price"
                            />
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched.price &&
                              formik.errors.price
                                ? formik.errors.price
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-2 w-full">
                          <div className=" col-span-12 lg:col-span-4 w-full">
                            <label
                              className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full font-bold"
                              htmlFor=""
                            >
                              Book Count
                              <small className="mt-1 text-sm font-semibold text-red-600  ">
                                *
                              </small>
                            </label>
                          </div>
                          <div className="col-span-12 lg:col-span-8 w-full">
                            <input
                              {...formik.getFieldProps("bookCount")}
                              className="common-input-css"
                              type="number"
                              min={0}
                            //   placeholder="Enter description"
                            />
                            <br />
                            <span className="text-red-600  text-xs">
                              {formik.touched.bookCount &&
                              formik.errors.bookCount
                                ? formik.errors.bookCount
                                : null}
                            </span>
                          </div>
                        </div>

                        <div className="mt-7">
                          <button type="submit" className="save-button">
                            {currentId !== null ? "Update" : "Save"}
                          </button>
                        </div>
                      </form>
                      <div className="mandatorytext">
                        <h1>Note : (*) is a mandatory field </h1>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 border border-teal-300 w-full  rounded-md relative">
                    <span
                      onClick={() => setIsModelOpen(true)}
                      className="w-full text-right flex items-start justify-end my-2 mr-4"
                    >
                      <a href="#" title="View instruction">
                        <FcInfo size={30} />
                      </a>
                    </span>
                    <label
                      htmlFor="bookDocs"
                      className="  mt-4 inline-flex items-center px-4 py-2 bg-white border border-teal-600 rounded-l font-semibold cursor-pointer text-sm text-black tracking-widest  active:bg-white focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition "
                    >
                      {" "}
                      Choose Holiday CSV File
                    </label>
                    <div>
                      <input
                        type="file"
                        name="bookDocs"
                        accept=".csv"
                        id="bookDocs"
                        className="sr-only inline-flex items-center px-4 py-2 bg-white border  active:bg-white focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition "
                        value={bulkHolidayData[0]}
                        onChange={(e) => {
                          setBulkHolidayData(e.target.files[0]);
                        }}
                      />
                      {bulkHolidayData
                        ? bulkHolidayData?.name
                        : "No file selected"}
                    </div>
                    <button
                      className={
                        bulkHolidayData ? "next-btn" : "next-disable-btn"
                      }
                      disabled={bulkHolidayData === ""}
                      onClick={() => saveBulkData(bulkHolidayData)}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              <div className=" col-span-12 md:col-span-12 lg:col-span-8 w-full lg:ml-2 ">
                <div className="mt-8 border border-teal-300  rounded-md relative">
                  <div className="bg-white px-3 ">
                    {" "}
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
                        <Pagination
                          ChangePage={ChangePage}
                          number={number}
                          lastPage={lastPage}
                          nextPage={nextPage}
                          prevPage={prevPage}
                          postperpage={postperpage}
                        />
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

export default BookData;
