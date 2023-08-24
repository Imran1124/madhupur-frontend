/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
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

function DropPointList() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const {
    api_drop_point_retrieve_all,
    api_drop_point_delete,
    api_drop_point_search_all,
  } = ApiList();
  const navigate = useNavigate();

  useSetTitle("Drop Point Master");

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
      Header: "Drop Point Name",
      accessor: "drop_point_name",
    },
    {
      Header: "Drop Point Address",
      accessor: "drop_point_address",
    },
    {
      Header: "Status",
      accessor: "status",
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
            onClick={() =>
              navigate(`/drop-point-form/${cell.row.original?.id}`)
            }
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

    AxiosInterceptors.post(api_drop_point_delete, requestBody, ApiHeader())
      .then(function (response) {
        console.log("delete response..", response?.data?.data);
        if (response?.data?.status === true) {
          fetchMasterList();
        } else {
          activateBottomErrorCard(true, "Error occured in deletion.");
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
      url = api_drop_point_retrieve_all;
    } else {
      requestBody = {
        search: values?.search,
      };
      url = api_drop_point_search_all;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("view fee master..", response?.data?.data);
        if (response?.data?.status) {
          setreadymadeListData(response?.data?.data);
        } else {
          activateBottomErrorCard(true, "Error occured while fetching data.");
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
      <div className={`main-div`}>
        <div className="main-inner-div">
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
                Some error occured while fetching list. Please try again later
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
          <div className="main-sub-div">
            <div className="main-sub-inner-div">
              <div className="text-div">
                <div className="big-text">Drop Point Master List</div>
                <div className="small-text">
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
                <div className="hiplus-div">
                  <button
                    onClick={() => navigate("/drop-point-form")}
                    type="button"
                    className="hiplus-button"
                  >
                    <HiPlus className="hiplus" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Tabs listRoute={"/drop-point-list"} formRoute={"/drop-point-form"} />

          <div className="mt-6">
            <span className="text-lg font-noarml text-gray-500">
              Drop Point List
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

export default DropPointList;
