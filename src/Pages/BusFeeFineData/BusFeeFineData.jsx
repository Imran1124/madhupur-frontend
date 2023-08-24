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
import Tabs from "../Tabs";
import { HiPlus } from "react-icons/hi";
import GlobalFilter from "../../Components/ListTable/GlobalFilter";
import DeleteView from "../../Components/Common/DeleteView";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { useFormik } from "formik";

function BusFeeFineData() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const {
    api_getBusFeeFineData,
    api_deleteBusFeeFineData,
    api_searchBusFeeFineData,
  } = ApiList();
  const navigate = useNavigate();

  useSetTitle("Department Master");

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
      Cell: ({ cell }) => <span>{nullToNA(cell.row.index + 1)}</span>,
    },
    {
      Header: "Month Name",
      accessor: "month_name",
    },
    {
      Header: "Due Date",
      accessor: "due_date",
    },
    {
      Header: "Actual Fine Amount",
      accessor: "actual_fine_amount",
    },
    {
      Header: "Fine Amount",
      accessor: "fine_amount",
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
      Cell:({ cell }) => (
        <span>
          {nullToNA(cell.row.original?.date)} | {nullToNA(cell.row.original?.time)}
        </span> 
      ),
    },

    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() =>
              navigate(`/busfeefine-form/${cell.row.original?.id}`)
            }
            className={`px-3 py-1.5 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
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
        </div>
      ),
    },
  ];

  // FUNCTION TO SAVE MASTER DATA
  const deleteItem = () => {
    setisLoading(true);
    setdeleteStatus(false);
    let requestBody = {
      id: currentId,
      status: deletestatus,
    };

    AxiosInterceptors.post(api_deleteBusFeeFineData, requestBody, ApiHeader())
      .then(function (response) {
        console.log("delete response..", response?.data?.data);
        if (response?.data?.status === true) {
          fetchMasterList();
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==delete error...", error);
        activateBottomErrorCard(true, "Error occured in deletion.");
        setisLoading(false);
      });
  };

  const fetchMasterList = (values = null) => {
    let url;
    let requestBody;

    if (values === null) {
      requestBody = {};
      url = api_getBusFeeFineData;
    } else {
      requestBody = {
        search: values?.search,
      };
      url = api_searchBusFeeFineData;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("view department master..", response?.data);
        if (response?.data?.status === true) {
          setreadymadeListData(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");

        setisLoading(false);
      });
  };

  useEffect(() => {
    fetchMasterList();
  }, []);

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  return (
    <>
      <div className={`w-full col-span-10 2xl:py-3 2xl:px-4 px-4 py-2`}>
        <div className="border-[2px] border-gray-200 rounded-md h-[84.2vh] 2xl:p-6 p-4 overflow-y-auto">
          {isLoading && <BarLoader />}

          {erroState && (
            <BottomErrorCard
              activateBottomErrorCard={activateBottomErrorCard}
              errorTitle={erroMessage}
            />
          )}
          {erroState && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center"
              role="alert"
            >
              <strong className="font-bold">Sorry! </strong>
              <span className="block sm:inline">
                Some error occured while fetching list. Please try again later
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}

          {deleteStatus && (
            <DeleteView
              setdeleteStatus={setdeleteStatus}
              deleteItem={deleteItem}
              deactivate={deletestatus}
            />
          )}
          <div className="flex mb-10 items-start justify-start  max-[870px]:block">
            <div className="flex-1 flex justify-start">
              <div className="block">
                <div className="text-4xl font-semibold text-gray-700 flex justify-start">
                  Bus Fee Fine Master List
                </div>
                <div className="text-gray-600 text-sm">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex justify-center items-center   max-[438px]:block ">
                <form onSubmit={formik.handleSubmit}>
                  <div className="global-filter flex">
                    <input
                      type="search"
                      placeholder="Search..."
                      {...formik.getFieldProps("search")}
                      className="bg-[#F2F4F4] h-10 pl-4 "
                    />
                    <button
                      className="bg-[#3b82f6] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
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
                <div className="max-[438px]:mt-3">
                  <button
                    onClick={() => navigate("/busfeefine-form")}
                    type="button"
                    className="ml-6 rounded-full bg-[#1A4D8C] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <HiPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Tabs listRoute={"/busfeefine"} formRoute={"/busfeefine-form"} />

          <div className="mt-6">
            <span className="text-lg font-noarml text-gray-500">
              Bus Fee Fine List
            </span>
          </div>

          {readymadeListStatus && data?.length != 0 && (
            <ListTable
              filter={false}
              exportStatus={false}
              assessmentType={false}
              columns={COLUMNS}
              dataList={readymadeListData}
            />
          )}
          {readymadeListStatus && data?.length == 0 && (
            <div className="text-xl font-semibold text-red-400 text-center">
              Data Not Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BusFeeFineData;
