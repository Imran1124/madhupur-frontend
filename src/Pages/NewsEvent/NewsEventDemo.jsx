import { useState, useEffect } from "react";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import { TextField, InputAdornment } from "@mui/material";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import useSetTitle from "../../Components/Hooks/useSetTitle";
import ListTable from "../../Components/ListTable/ListTable";
import DeleteView from "../../Components/Common/DeleteView";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { allowCharacterInput } from "../../Components/Common/PowerupFunctions";
import { useFormik, FormikProvider, Form } from "formik";
import CommonModal from "../../Components/Common/CommonModal";
import { CSVDownload } from "react-csv";
import { BiEditAlt } from "react-icons/bi";
import { BsFiletypePdf, BsFiletypeCsv } from "react-icons/bs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BackendUrl from "../../Components/ApiList/BackendUrl";
import { FaFilePdf } from "react-icons/fa";
import { allowCharacterNumberInput } from "../../Components/Common/PowerupFunctions";
import Pagination from "../../Components/Common/Pagination";
import TabulationHeader from "../../Components/Common/TabulationHeader";

const EbookDemo = () => {
  const [vehicleTypeList, setvehicleTypeList] = useState([]);
  const [blockToast, setBlockToast] = useState(false);
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [deactivateid, setdeactivateid] = useState(null);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [csvdata, setCsvdata] = useState([]);
  const [enable, setenable] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [editadta, setEditdata] = useState("");
  const [dataToView, setdataToView] = useState();
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [searchTableData, setSearchTableData] = useState();
  const {
    api_getEventData,
    api_postEventData,
    api_editEventData,
    api_getEventDataByID,
    api_deleteEventData,
    api_searchEventData,
    // api_getActivevehicleTypeData
  } = ApiList();

  useSetTitle("E-Book Master");

  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: "hello" },
  ];
  const validationSchema = yup.object({
    eventName: yup.string().required("News name is required feild"),
    // eventDocs: yup.string().required('Upload is requitred feild'),
    date: yup.string().required("Date is requitred feild"),
    time: yup.string().required("Time is requitred feild"),
    eventVenue: yup.string().required("Eveny Venue is requitred feild"),
    organizer: yup.string().required("Organizer is requitred feild"),
  });

  const formik = useFormik({
    initialValues: {
      eventName: "",
      date: "",
      time: "",
      description: "",
      eventVenue: "",
      organizer: "",
      eventDocs: "",
    },

    onSubmit: (values, resetForm) => {
      console.log("at submit ", values);
      saveMasterForm(values);
      formik.resetForm();
      setEditdata("");
    },
    validationSchema,
  });
  console.log(readymadeListData);
  const fetchMasterList = (values) => {
    console.log(values);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getEventData;
    } else {
      requestBody = {
        search: values,
        search: values,
        perPage: postperpage,
        page: number,
      };
      url = api_searchEventData;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          if (response?.data?.data?.total === 0) {
            toast.error(`Data not Found`);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            setBlockToast(false);
          } else {
            console.log("Class data", response?.data?.data?.data);
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
        // activateBottomErrorCard(true, "Error occured while fetching data.");
        toast.warning("Error occured while fetching data.");

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

  const COLUMNS = [
    {
      Header: "Sl No.",
      Cell: ({ cell }) => (
        <span> {(number - 1) * postperpage + cell.row.index + 1} </span>
      ),
    },
    {
      Header: "News/Event Name",
      accessor: "event_name",
    },
    {
      Header: "Event Date",
      accessor: "event_date",
    },
    // {
    //   Header: "Event Time",
    //   accessor: "event_time",
    // },
    // {
    //   Header: "Description",
    //   accessor: "description",
    // },
    // {
    //   Header: "Event Venue",
    //   accessor: "event_venue",
    // },
    // {
    //   Header: "Organizer",
    //   accessor: "organizer",
    // },
    {
      Header: "View",
      // accessor: "upload_event_docs",
      Cell: ({ cell }) => (
        <a
          href={`${BackendUrl}/api/${cell.row.original?.upload_event_docs}`}
          target="_blank"
          className="text-xl text-red-700 "
        >
          {cell.row.original?.upload_event_docs ? (
            <FaFilePdf className="text-red bg-red w-8 h-8" />
          ) : (
            ""
          )}
        </a>
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
      Header: "Created Date",
      accessor: "date",
    },
    {
      Header: "Created Time",
      accessor: "time",
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
              setdeactivateid(cell.row.original?.id);
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
          <button
            onClick={() => fetchViewData(cell.row.original?.id)}
            className={`view-button-master`}
          >
            View
          </button>
        </div>
      ),
    },
  ];
  console.log(number);
  //modal view

  const fetchViewData = (passedId) => {
    setisLoading(true);
    let requestBody = {
      id: passedId,
    };
    AxiosInterceptors.post(api_getEventDataByID, requestBody, ApiHeader())
      .then(function (response) {
        console.log(
          "fetch fee master view data response..",
          response?.data?.data
        );
        if (response?.data?.status) {
          setdataToView(response?.data?.data);
          setdataViewStatus(true);
        } else {
          activateBottomErrorCard(
            true,
            "Error occured in submitting deactivation application. Please try again later."
          );
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("= edit data error...", error);
        seterroState(true);
        setisLoading(false);
      });
  };
  //Edit data
  const fetchEditData = (getid) => {
    setisLoading(true);
    let requestBody = {
      id: getid,
    };
    AxiosInterceptors.post(api_getEventDataByID, requestBody, ApiHeader())
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
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("eventName", data?.event_name);
    formik.setFieldValue("date", data?.event_date);
    formik.setFieldValue("time", data?.event_time);
    formik.setFieldValue("description", data?.description);
    formik.setFieldValue("eventVenue", data?.event_venue);
    formik.setFieldValue("organizer", data?.organizer);
    formik.setFieldValue("eventDocs", "");
    setEditdata(data?.upload_event_docs);
  };
  console.log(currentId);
  // post  data
  const saveMasterForm = (values) => {
    const formdata = new FormData();
    formdata.append("eventName", values.eventName);
    formdata.append("date", values.date);
    formdata.append("time", values.time);
    formdata.append("description", values.description);
    formdata.append("eventVenue", values.eventVenue);
    formdata.append("organizer", values.organizer);
    formdata.append("eventDocs", values.eventDocs);
    console.log(values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = formdata;
    if (currentId !== null) {
      url = api_editEventData;
      requestBody = requestBodyBase;
      requestBody.id = formdata.append("id", currentId);
    } else if (
      values?.eventName !== "" &&
      values?.date !== "" &&
      values?.time !== "" &&
      values?.description !== "" &&
      values?.eventVenue !== "" &&
      values?.organizer !== "" &&
      values?.eventDocs !== "" &&
      currentId == null
    ) {
      url = api_postEventData;
      requestBody = requestBodyBase;
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
      id: deactivateid,
      status: deletestatus,
    };

    AxiosInterceptors.post(api_deleteEventData, requestBody, ApiHeader())
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
  // const VehicleList = () => {
  //   AxiosInterceptors.post(api_getActivevehicleTypeData, {}, ApiHeader())
  //     .then(function (response) {
  //       if (response?.data) {
  //         console.log(response?.data?.data);
  //         setvehicleTypeList(response?.data?.data);
  //       } else {
  //         // activateBottomErrorCard(true, `${response?.data?.message}`);
  //         toast.error(`${response?.data?.message}`);
  //       }
  //       setisLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log('==2 error list...', error);
  //       // activateBottomErrorCard(true, "Error occured while fetching data.");
  //       toast.warning('Error occured while fetching data.');
  //     });
  // };
  useEffect(() => {
    // VehicleList();
    fetchMasterList();
  }, []);
  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // {
    //   name == 'registrationNo' &&
    //     formik.setFieldValue(
    //       'registrationNo',
    //       allowCharacterNumberInput(
    //         value.toUpperCase(),
    //         formik.values.registrationNo,
    //         30
    //       )
    //     );
    // }
    // {
    //   name == 'chasisNo' &&
    //     formik.setFieldValue(
    //       'chasisNo',
    //       allowCharacterNumberInput(
    //         value.toUpperCase(),
    //         formik.values.chasisNo,
    //         30
    //       )
    //     );
    // }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  const column = [
    { title: "News/Event Name", feild: "event_name" },
    { title: "Event Date", feild: "event_date" },
    { title: "Event Time", feild: "event_time" },
    { title: "Description", feild: "description" },
    { title: "Event Venue", feild: "event_venue" },
    { title: "organizer", feild: "organizer" },
    { title: "Created Date ", feild: "date" },
    { title: "Created Time ", feild: "time" },
    { title: "Status", feild: "status" },
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("News-Event Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: readymadeListData,
    }),
      doc.save("News-Event.pdf");
  };
  useEffect(() => {
    const modifiedArray = readymadeListData.map((obj) => {
      const { id, ...filteredObj } = obj;
      return filteredObj;
    });
    console.log(modifiedArray);
    setCsvdata(modifiedArray);
  }, [readymadeListData]);
  return (
    <>
      {dataViewStatus && (
        <CommonModal>
          <div className="w-full bg-[#ddf8f6] shadow-xl mb-6 relative">
            <button
              onClick={() => setdataViewStatus(false)}
              type="button"
              class="absolute top-3 right-10 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white"
            >
              <svg class="w-5 h-5" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 mt-2 rounded-lg shadow-lg p-8">
              <div className="font-semibold text-lg px-2 mb-5 text-[#1d807b]">
                News/Event Details
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
                <div className="flex-1">
                  <div className="text-gray-500 text-xs">News/Event Name</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.event_name)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-500 text-xs">Event Date</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.event_date)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-500 text-xs">Event Time</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.event_time)}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-gray-500 text-xs">Description</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.description)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                <div className="flex-1">
                  <div className="text-gray-500 text-xs">Event Venue</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.event_venue)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-500 text-xs">Organizer</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.organizer)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-500 text-xs">Status</div>
                  <div className="font-bold text-sm">
                    {nullToNA(dataToView?.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}
      <div className="w-full h-[72vh] lg:h-auto overflow-auto ">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">
            News-Event Details
          </h1>
          <h1 className="common-header-smalltext">
            Unlock Your Potential. Join Our Journey Of Education And Excellence
          </h1>
        </div>
        <div className=" mt-1 ml-3 mr-3 ">
          <div className="flex h-auto  items-start justify-start w-full">
            <div className="grid grid-cols-12 w-full  ml-3 mr-3 ">
              <div className="col-span-12  lg:col-span-4 w-full flex justify-center">
                <div className="mt-8 border border-teal-300 w-full  rounded-md relative">
                  <div className="bg-white px-3 ">
                    {" "}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-[#0F766E] ml-9">
                      Add
                    </h1>
                  </div>
                  <div className="w-full mb-6 mt-[6vh] pb-10  ">
                    <FormikProvider value={formik}>
                      <Form
                        autoComplete="off"
                        onChange={handleChange}
                        onSubmit={formik.handleSubmit}
                      >
                        {/* <div className="grid grid-cols-12 mt-6">
                        <div className=" col-span-12 lg:col-span-3">
                          <label
                            className=" flex items-start justify-start ml-2 text-gray-800 text-md w-[20vw] font-bold"
                            htmlFor=""
                          >
                            Book Name
                            <small className="mt-1 text-sm font-semibold text-red-600  ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                        <input
                            {...formik.getFieldProps('bookName')}
                            className="h-10  w-[90%] lg:w-[60%] px-7 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                            type="text"
                            placeholder="Enter book name"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.bookName &&
                            formik.errors.bookName
                              ? formik.errors.bookName
                              : null}
                          </span>
                        </div>
                      </div> */}

                        <div className="my-3 px-10 flex w-full">
                          <TextField
                            {...formik.getFieldProps("eventName")}
                            id="eventName"
                            name="eventName"
                            label="Event Name"
                            fullWidth
                            size="small"
                            type="text"
                            error={
                              formik.touched.eventName &&
                              Boolean(formik.errors.eventName)
                            }
                            helperText={
                              formik.touched.eventName &&
                              formik.errors.eventName
                            }
                          />
                        </div>
                        <div className="my-3 px-10 flex w-full">
                          <TextField
                            {...formik.getFieldProps("date")}
                            id="date"
                            name="date"
                            // label="Event date"
                            fullWidth
                            size="small"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            error={
                              formik.touched.date && Boolean(formik.errors.date)
                            }
                            helperText={
                              formik.touched.date && formik.errors.date
                            }
                          />
                        </div>
                        <div className="my-3  px-10 flex w-full">
                          <TextField
                            {...formik.getFieldProps("time")}
                            id="time"
                            name="time"
                            // label="Publish By"
                            fullWidth
                            size="small"
                            type="time"
                            error={
                              formik.touched.time && Boolean(formik.errors.time)
                            }
                            helperText={
                              formik.touched.time && formik.errors.time
                            }
                          />
                        </div>
                        <div className="my-3  px-10 flex w-full">
                          <TextField
                            {...formik.getFieldProps("description")}
                            id="description"
                            name="description"
                            label="Description"
                            fullWidth
                            size="small"
                            type="text"
                            error={
                              formik.touched.description &&
                              Boolean(formik.errors.description)
                            }
                            helperText={
                              formik.touched.description &&
                              formik.errors.description
                            }
                          />
                        </div>
                        <div className="my-3  px-10 flex w-full">
                          <TextField
                            {...formik.getFieldProps("eventVenue")}
                            id="eventVenue"
                            name="eventVenue"
                            label="Event Venue"
                            fullWidth
                            size="small"
                            type="text"
                            error={
                              formik.touched.eventVenue &&
                              Boolean(formik.errors.eventVenue)
                            }
                            helperText={
                              formik.touched.eventVenue &&
                              formik.errors.eventVenue
                            }
                          />
                        </div>
                        <div className="my-3  px-10 flex w-full">
                          <TextField
                            {...formik.getFieldProps("organizer")}
                            id="organizer"
                            name="organizer"
                            label="Organizer"
                            fullWidth
                            size="small"
                            type="text"
                            error={
                              formik.touched.organizer &&
                              Boolean(formik.errors.organizer)
                            }
                            helperText={
                              formik.touched.organizer &&
                              formik.errors.organizer
                            }
                          />
                        </div>
                        <div className="form-group grid-cols-12 mt-6">
                          <div className=" col-span-12 lg:col-span-3">
                            <div className="block justify-start px-10">
                              <label
                                htmlFor="eventDocs"
                                className="form-control h-15 block w-full border border-gray-400 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                              >
                                Choose News-Event
                              </label>

                              <input
                                className="sr-only "
                                name="eventDocs"
                                id="eventDocs"
                                type="file"
                                accept=".pdf"
                                // value={formik.values.eventDocs[0] }
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "eventDocs",
                                    e.target.files[0]
                                  );
                                }}
                              />
                              {formik.values.eventDocs && currentId !== null ? (
                                `${formik.values.eventDocs?.name}`.slice(
                                  `${formik.values.eventDocs?.name}`.lastIndexOf(
                                    "-"
                                  ) + 1 ||
                                    `${formik.values.eventDocs?.name}`.lastIndexOf(
                                      "/"
                                    ) + 1 ||
                                    `${formik.values.eventDocs?.name}`.lastIndexOf(
                                      "\\"
                                    ) + 1 ||
                                    `${formik.values.eventDocs?.name}`.lastIndexOf(
                                      "."
                                    ) + 1 ||
                                    `${formik.values.eventDocs?.name}`.lastIndexOf(
                                      " "
                                    ) + 1 ||
                                    `${formik.values.eventDocs?.name}`.lastIndexOf(
                                      ","
                                    ) + 1 ||
                                    `${formik.values.eventDocs?.name}`.lastIndexOf(
                                      "?"
                                    ) + 1,
                                  `${formik.values.eventDocs?.name}`.length
                                )
                              ) : formik.values.eventDocs &&
                                currentId === null ? (
                                formik.values.eventDocs?.name
                              ) : editadta ? (
                                <a
                                  href={`${BackendUrl}/api/${editadta}`}
                                  target="_blank"
                                  className="text-xl text-red-700 flex items-center justify-center"
                                >
                                  {editadta ? (
                                    <FaFilePdf className="text-red bg-red w-8 h-8 mt-4" />
                                  ) : (
                                    ""
                                  )}
                                </a>
                              ) : (
                                "No file selected"
                              )}
                              <br />
                              <span className="text-red-600  text-xs">
                                {formik.touched.eventDocs &&
                                formik.errors.eventDocs
                                  ? formik.errors.eventDocs
                                  : null}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-7">
                          <button type="submit" className="save-button">
                            {currentId !== null ? "Update" : "Save"}
                          </button>
                        </div>
                      </Form>
                    </FormikProvider>
                    <div className="mandatorytext">
                      <h1>Note : (*) is a mandatory field </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-12 md:col-span-12 lg:col-span-8 w-full lg:ml-2 ">
                <div className="mt-8 border border-teal-300   rounded-md relative">
                  <div className="bg-white px-3 ">
                    {" "}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-[#0F766E] ml-9">
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

                      {/* {erroState && (
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
                      )} */}

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
                          blockToast={blockToast}
                          setBlockToast={setBlockToast}
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

export default EbookDemo;
