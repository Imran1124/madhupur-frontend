/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import useSetTitle from "../../Components/Hooks/useSetTitle";
import ListTable from "../../Components/ListTable/ListTable";
import CommonModal from "../../Components/Common/CommonModal";
import Tabs from "../Tabs";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalFilter from "../../Components/ListTable/GlobalFilter";
import DeleteView from "../../Components/Common/DeleteView";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { useFormik } from "formik";
import BackendUrl from "../../Components/ApiList/BackendUrl";
import { FaFilePdf } from "react-icons/fa";
import Pagination from "../../Components/Common/Pagination";

function DriverData() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [blockToast, setBlockToast] = useState(false);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [dataToView, setdataToView] = useState();
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();

  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const {
    api_getDriverData,
    api_getDriverDataById,
    api_deleteDriverData,
    api_searchDriverData,
  } = ApiList();
  const navigate = useNavigate();

  useSetTitle("Driver Master");
  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: "hello" },
  ];
  const formik = useFormik({
    initialValues: {
      search: "",
    },

    onSubmit: (values, resetForm) => {
      console.log("at submit ", values);
      fetchMasterList(values);
    },
  });
  const COLUMNS = [
    {
      Header: "Sl No.",
      Cell: ({ cell }) => (
        <span>{(number - 1) * postperpage + cell.row.index + 1}</span>
      ),
    },
    {
      Header: "Driver Name",
      accessor: "driver_name",
    },
    {
      Header: "Mobile No",
      accessor: "mobile",
    },
    // {
    //   Header: "Email",
    //   accessor: "email",
    // },
    // {
    //   Header: "Address",
    //   accessor: "address",
    // },
    // {
    //   Header: "License No",
    //   accessor: "license_no",
    // },
    // {
    //   Header: "Aadhar No",
    //   accessor: "aadhar_no",
    // },
    // {
    //   Header: "PAN No",
    //   accessor: "pan_no",
    // },

    {
      Header: "Aadhar",
      Cell: ({ cell }) => (
        <a
          href={`${BackendUrl}/api/${cell.row.original?.aadhar_doc}`}
          target="_blank"
          className="text-xl text-red-700 "
        >
          {cell.row.original?.aadhar_doc ? (
            <FaFilePdf className="text-red bg-red w-8 h-8" />
          ) : (
            ""
          )}
        </a>
      ),
    },
    {
      Header: "PAN",
      Cell: ({ cell }) => (
        <a
          href={`${BackendUrl}/api/${cell.row.original?.pan_doc}`}
          target="_blank"
          className="text-xl text-red-700 "
        >
          {cell.row.original?.pan_doc ? (
            <FaFilePdf className="text-red bg-red w-8 h-8" />
          ) : (
            ""
          )}
        </a>
      ),
    },
    {
      Header: "License",
      Cell: ({ cell }) => (
        <a
          href={`${BackendUrl}/api/${cell.row.original?.license_doc}`}
          target="_blank"
          className="text-xl text-red-700 "
        >
          {cell.row.original?.license_doc ? (
            <FaFilePdf className="text-red bg-red w-8 h-8" />
          ) : (
            ""
          )}
        </a>
      ),
    },
    {
      Header: "Photo",
      Cell: ({ cell }) =>
        cell.row.original?.photo_doc ? (
          <img
            src={`${BackendUrl}/api/${cell.row.original?.photo_doc}`}
            className="text-xl w-10 h-10 "
          />
        ) : (
          ""
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
      Header: "Created Date & Time",
      Cell: ({ cell }) => (
        <span>
          {nullToNA(cell.row.original?.date)} |{" "}
          {nullToNA(cell.row.original?.time)}
        </span>
      ),
    },

    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() => navigate(`/driver-form/${cell.row.original?.id}`)}
            className={`edit-button-master`}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setcurrentId(cell.row.original?.id);
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
  const fetchViewData = (passedId) => {
    setisLoading(true);
    let requestBody = {
      id: passedId,
    };
    AxiosInterceptors.post(api_getDriverDataById, requestBody, ApiHeader())
      .then(function (response) {
        console.log(
          "fetch fee master view data response..",
          response?.data?.data
        );
        if (response?.data?.status) {
          setdataToView(response?.data?.data);
          setdataViewStatus(true);
        } else {
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
  console.log(dataViewStatus);
  // FUNCTION TO SAVE MASTER DATA
  const deleteItem = () => {
    setisLoading(true);
    setdeleteStatus(false);
    let requestBody = {
      id: currentId,
      status: deletestatus,
    };

    AxiosInterceptors.post(api_deleteDriverData, requestBody, ApiHeader())
      .then(function (response) {
        console.log("delete response..", response?.data?.data);
        if (response?.data?.status === true) {
          fetchMasterList();
          requestBody?.status == "active"
            ? toast.success("Activated Successfully")
            : toast.error("Deactivated Successfully");
        } else {
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==delete error...", error);
        toast.warning("Error occured in deletion.");
        setisLoading(false);
      });
  };

  const fetchMasterList = (values) => {
    console.log(values);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getDriverData;
    } else {
      requestBody = {
        search: values.search,
        perPage: postperpage,
        page: number,
      };
      url = api_searchDriverData;
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
            console.log("exam term data", response?.data?.data?.data);
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

  useEffect(() => {
    fetchMasterList();
  }, []);

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD

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



  return (
    <>
      <div className={`main-div`}>
        <div className="main-inner-div">
          {isLoading && <BarLoader />}

          {erroState && (
            <div className="alert-msg" role="alert">
              <strong className="sorry-msg">Sorry! </strong>
              <span className="some-error-msg">
                Some error occured while fetching list. Please try again later
              </span>
              <span className="absolute-span"></span>
            </div>
          )}

          {deleteStatus && (
            <DeleteView
              setdeleteStatus={setdeleteStatus}
              deleteItem={deleteItem}
            />
          )}
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
                    Driver Details
                  </div>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">Driver Name</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.driver_name)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">Mobile No</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.mobile)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">Email</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.email)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">Address</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.address)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">License No</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.license_no)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">Aadhar No</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.aadhar_no)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs">Pan No</div>
                      <div className="font-bold text-sm">
                        {nullToNA(dataToView?.pan_no)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CommonModal>
          )}
          <div className="main-sub-div">
            <div className="main-sub-inner-div">
              <div className="text-div">
                <div className="big-text">Driver Master List</div>
                <div className="small-text text-teal-600">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            <div className="tab-div">
              <div className="global-filter-div">
                <form onSubmit={formik.handleSubmit}>
                  <div className="global-filter flex">
                    <input
                      type="search"
                      placeholder="Search..."
                      {...formik.getFieldProps("search")}
                      className="bg-[#F2F4F4] h-10 pl-4 "
                    />
                    <button
                      className="bg-[#0F766E] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
                      type="submit"
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
                    </button>{" "}
                  </div>
                </form>
                <div className="hiplus-div">
                  <button
                    onClick={() => navigate("/driver-form")}
                    type="button"
                    className="hiplus-button bg-[#0F766E]"
                  >
                    <HiPlus className="hiplus" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Tabs listRoute={"/driver"} formRoute={"/driver-form"} />

          <div className="mt-6">
            <span className="lists text-[#0F766E]">Driver List</span>
          </div>

          {readymadeListStatus && data?.length != 0 && (
            <>
              <ListTable
                filter={false}
                exportStatus={false}
                assessmentType={false}
                columns={COLUMNS}
                dataList={readymadeListData}
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
          {readymadeListStatus && data?.length == 0 && (
            <div className="data-not-found">Data Not Found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default DriverData;
