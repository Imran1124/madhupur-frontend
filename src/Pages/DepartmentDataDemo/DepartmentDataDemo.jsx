import { useState, useEffect } from "react";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import useSetTitle from "../../Components/Hooks/useSetTitle";
import ListTable from "../../Components/ListTable/ListTable";
import { HiPlus } from "react-icons/hi";
import GlobalFilter from "../../Components/ListTable/GlobalFilter";
import DeleteView from "../../Components/Common/DeleteView";
import { TextField, InputAdornment } from "@mui/material";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { allowCharacterInput } from "../../Components/Common/PowerupFunctions";
import { useFormik } from "formik";
import { CSVDownload } from "react-csv";
import { AiFillFilePdf, AiFillFileExcel } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsFiletypePdf, BsFiletypeCsv } from "react-icons/bs";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Pagination from "../../Components/Common/Pagination";
import TabulationHeader from "../../Components/Common/TabulationHeader";

const DepartmentDataDemo = () => {
  const [csvdata, setCsvdata] = useState([]);
  const [blockToast, setBlockToast] = useState(false);
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [deactivateid, setdeactivateid] = useState(null);
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
  const [searchTableData, setSearchTableData] = useState();
  const {
    api_getdepartmentData,
    api_deletedepartmentData,
    api_searchdepartmentData,
    api_postdepartmentData,
    api_getdepartmentDataById,
    api_editdepartmentData,
  } = ApiList();

  useSetTitle("Department Master");

  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: "hello" },
  ];
  const validationSchema = yup.object({
    departmentName: yup.string().required("Department name is required feild"),
    abbreviationName: yup.string().required("Short name is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      // search: "",
      departmentName: "",
      abbreviationName: "",
    },

    onSubmit: (values, resetForm) => {
      console.log("at submit ", values);
      saveMasterForm(values);
      formik.resetForm();
    },
    validationSchema,
  });
  const fetchMasterList = (values) => {
    console.log(values);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getdepartmentData;
    } else {
      requestBody = {
        search: values,
        perPage: postperpage,
        page: number,
      };
      url = api_searchdepartmentData;
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
        } 
        
        else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        // activateBottomErrorCard(true, "Error occured while fetching data.");
        toast.error(`${response?.data?.message}`);
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
      Header: "Department Name",
      accessor: "department_name",
    },
    {
      Header: "Short Name",
      accessor: "abbreviation_name",
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
        </div>
      ),
    },
  ];
  console.log(number);
  //Edit data
  const fetchEditData = (getid) => {
    setisLoading(true);
    let requestBody = {
      id: getid,
    };
    AxiosInterceptors.post(api_getdepartmentDataById, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          departmentEditData(response?.data?.data);
        } else {
          toast.error(`${response?.data?.message}`);
          // activateBottomErrorCard(true, `${response?.data?.message}`);
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
  const departmentEditData = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("departmentName", data?.department_name);
    formik.setFieldValue("abbreviationName", data?.abbreviation_name);
  };
  console.log(currentId);
  // post  data
  const saveMasterForm = (values) => {
    console.log(values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      departmentName: values.departmentName,
      abbreviationName: values.abbreviationName,
    };
    if (currentId !== null) {
      url = api_editdepartmentData;
      requestBody = requestBodyBase;
      requestBody.id = currentId;
    } else if (
      values?.departmentName !== "" &&
      values?.abbreviationName !== "" &&
      currentId == null
    ) {
      url = api_postdepartmentData;
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
          toast.error(`${response?.data?.message}`);
          // activateBottomErrorCard(true, `${response?.data?.message}`);
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

    AxiosInterceptors.post(api_deletedepartmentData, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          fetchMasterList();
          requestBody?.status == "active"
            ? toast.success("Activated Successfully")
            : toast.error("Deactivated Successfully");
        } else {
          toast.error(`${response?.data?.message}`);
          // activateBottomErrorCard(true, `${response?.data?.message}`);
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
      name == "departmentName" &&
        formik.setFieldValue(
          "departmentName",
          allowCharacterInput(value, formik.values.departmentName, 50)
        );
    }
    {
      name == "abbreviationName" &&
        formik.setFieldValue(
          "abbreviationName",
          allowCharacterInput(value.trim(), formik.values.abbreviationName, 200)
        );
    }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  const column = [
    { title: "Department", feild: "department_name" },
    { title: "Short Name", feild: "abbreviation_name" },
    { title: "Created Date  ", feild: "date" },
    { title: "Created Time ", feild: "time" },
    { title: "Status", feild: "status" },
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Department Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: readymadeListData,
    }),
      doc.save("department.pdf");
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
      <div className="w-full h-[76vh] lg:h-auto overflow-auto ">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">
            Department Form
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
                  <div className="w-full mb-6 mt-[14vh] pb-10  ">
                    <form
                      onSubmit={formik.handleSubmit}
                      onChange={handleChange}
                    >
                      <div className="grid grid-cols-12">
                        <div className=" col-span-12 lg:col-span-3">
                          <label
                            className=" flex items-start justify-start ml-2 text-teal-900 text-md md:w-[20vw] w-full font-bold"
                            htmlFor=""
                          >
                            Department Name
                            <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                          <input
                            {...formik.getFieldProps("departmentName")}
                            className="common-input-css"
                            type="text"
                            placeholder="Enter department name"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.departmentName &&
                            formik.errors.departmentName
                              ? formik.errors.departmentName
                              : null}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-6">
                        <div className=" col-span-12 lg:col-span-3">
                          <label
                            className=" flex items-start justify-start ml-2 text-teal-900 text-md w-full md:w-[20vw]  font-bold"
                            htmlFor=""
                          >
                            Short Name
                            <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                          <input
                            {...formik.getFieldProps("abbreviationName")}
                            className="common-input-css"
                            type="text"
                            placeholder="Enter short name"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.abbreviationName &&
                            formik.errors.abbreviationName
                              ? formik.errors.abbreviationName
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
              </div>
              <div className=" col-span-12 md:col-span-12 lg:col-span-8 w-full lg:ml-2 ">
                <div className="mt-8 border border-teal-300  rounded-md relative">
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

export default DepartmentDataDemo;
