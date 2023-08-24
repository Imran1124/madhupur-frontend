import React from "react";
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

function SubjectData() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState();
  const { api_getSubjectData, api_deleteSubjectData, api_searchSubjectData } =
    ApiList();
  const navigate = useNavigate();

  useSetTitle("Subject Master");

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
      Header: "Subject",
      accessor: "subject_name",
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
            onClick={() => navigate(`/subject-form/${cell.row.original?.id}`)}
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

    AxiosInterceptors.post(api_deleteSubjectData, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          fetchMasterList();
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, "Error occured in deletion.");
        setisLoading(false);
      });
  };

  const fetchMasterList = (values = null) => {
    let url;
    let requestBody;

    if (values === null) {
      requestBody = {};
      url = api_getSubjectData;
    } else {
      requestBody = {
        search: values?.search,
      };
      url = api_searchSubjectData;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("Response", response);
        if (response?.data?.status) {
          setreadymadeListData(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
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
                <div className="big-text">Subject Master List</div>
                <div className="small-text">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            <div className="tab-div ">
              <div className="global-filter-div ">
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
                    onClick={() => navigate("/subject-form")}
                    type="button"
                    className="hiplus-button"
                  >
                    <HiPlus className="hiplus" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Tabs listRoute={"/subject"} formRoute={"/subject-form"} />

          <div className="mt-6">
            <span className="lists">Subject List</span>
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
            <div className="data-not-found">Data Not Found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default SubjectData;
