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
import { useFormik } from "formik";
import { CSVDownload } from "react-csv";
import { BiEditAlt } from "react-icons/bi";
import { BsFiletypePdf, BsFiletypeCsv } from "react-icons/bs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { allowCharacterNumberInput } from "../../Components/Common/PowerupFunctions";
import Pagination from "../../Components/Common/Pagination";
import TabulationHeader from "../../Components/Common/TabulationHeader";

const VehicleDemo = () => {
  const [vehicleTypeList, setvehicleTypeList] = useState([]);
  const [blockToast, setBlockToast] = useState(false);
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [deactivateid, setdeactivateid] = useState(null);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [csvdata, setCsvdata] = useState([]);
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
    api_getvehicleDataById,
    api_getvehicleData,
    api_searchvehicleData,
    api_postvehicleData,
    api_editvehicleData,
    api_deletevehicleData,
    api_getActivevehicleTypeData,
  } = ApiList();

  useSetTitle("Vehicle Master");

  const data = [
    { id: 1, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 2, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 3, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 4, fee_head: 10, fee_head_type: 10, desc: "hello" },
    { id: 5, fee_head: 10, fee_head_type: 10, desc: "hello" },
  ];
  const validationSchema = yup.object({
    vehicleTypesId: yup.string().required("Vehicle type is Required"),
    registrationNo: yup.string().required("Registration no is Required"),
    chasisNo: yup.string().required("Chasis no is Required"),
  });

  const formik = useFormik({
    initialValues: {
      vehicleTypesId: "",
      registrationNo: "",
      chasisNo: "",
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
      url = api_getvehicleData;
    } else {
      requestBody = {
        search: values,
        search: values,
        perPage: postperpage,
        page: number,
      };
      url = api_searchvehicleData;
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
      Header: "Vehicle type Name",
      accessor: "vehicle_type_name",
    },

    {
      Header: "Registration No",
      accessor: "registration_no",
    },
    {
      Header: "Chasis no",
      accessor: "chasis_no",
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
    AxiosInterceptors.post(api_getvehicleDataById, requestBody, ApiHeader())
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
    formik.setFieldValue("vehiclesTypeName", data?.vehicle_type_name);
    formik.setFieldValue("vehicleTypesId", data?.vehicle_types_id);
    formik.setFieldValue("registrationNo", data?.registration_no);
    formik.setFieldValue("chasisNo", data?.chasis_no);
  };
  console.log(currentId);
  // post  data
  const saveMasterForm = (values) => {
    console.log(values);
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      vehicleTypesId: values.vehicleTypesId,
      registrationNo: values.registrationNo,
      chasisNo: values.chasisNo,
    };
    if (currentId !== null) {
      url = api_editvehicleData;
      requestBody = requestBodyBase;
      requestBody.id = currentId;
    } else if (
      values?.registrationNo !== "" &&
      values?.chasisNo !== "" &&
      currentId == null
    ) {
      url = api_postvehicleData;
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

    AxiosInterceptors.post(api_deletevehicleData, requestBody, ApiHeader())
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
  const VehicleList = () => {
    AxiosInterceptors.post(api_getActivevehicleTypeData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data?.data);
          setvehicleTypeList(response?.data?.data);
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        // activateBottomErrorCard(true, "Error occured while fetching data.");
        toast.warning("Error occured while fetching data.");
      });
  };
  useEffect(() => {
    VehicleList();
    fetchMasterList();
  }, []);
  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    {
      name == "registrationNo" &&
        formik.setFieldValue(
          "registrationNo",
          allowCharacterNumberInput(
            value.toUpperCase(),
            formik.values.registrationNo,
            30
          )
        );
    }
    {
      name == "chasisNo" &&
        formik.setFieldValue(
          "chasisNo",
          allowCharacterNumberInput(
            value.toUpperCase(),
            formik.values.chasisNo,
            30
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
    { title: "Vehicle type Name", feild: "vehicle_type_name" },
    { title: "Registration No", feild: "registration_no" },
    { title: "Chasis no", feild: "chasis_no" },
    { title: "Created Date  ", feild: "date" },
    { title: "Created Time ", feild: "time" },
    { title: "Status", feild: "status" },
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Vehicle Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: readymadeListData,
    }),
      doc.save("VehicleDetails.pdf");
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
            Vehicle Details Form
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
                      <div className="grid grid-cols-12 mt-6">
                        <div className=" col-span-12 lg:col-span-3">
                          <label
                            className=" flex items-start justify-start ml-2 text-teal-900 text-md w-[20vw] font-bold"
                            htmlFor=""
                          >
                            Vehicle Type
                            <small className="mt-1 text-sm font-semibold text-red-600  ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                          <select
                            {...formik.getFieldProps("vehicleTypesId")}
                            type="text"
                            className={`common-input-css`}
                            placeholder="Select country"
                          >
                            <option value="">Select</option>
                            {vehicleTypeList?.map((data, index) => (
                              <option value={data?.id}>
                                {data?.vehicle_type_name}
                              </option>
                            ))}
                          </select>
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.vehicleTypesId &&
                            formik.errors.vehicleTypesId
                              ? formik.errors.vehicleTypesId
                              : null}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-6">
                        <div className=" col-span-12 lg:col-span-3">
                          <label
                            className=" flex items-start justify-start ml-2 text-teal-900 text-md w-[20vw] font-bold"
                            htmlFor=""
                          >
                            Registration No
                            <small className="mt-1 text-sm font-semibold text-red-600  ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                          <input
                            {...formik.getFieldProps("registrationNo")}
                            className="common-input-css"
                            type="text"
                            placeholder="Enter registration no"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.registrationNo &&
                            formik.errors.registrationNo
                              ? formik.errors.registrationNo
                              : null}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-6">
                        <div className=" col-span-12 lg:col-span-3">
                          <label
                            className=" flex items-start justify-start ml-2 text-teal-900 text-md w-[20vw] font-bold"
                            htmlFor=""
                          >
                            Chasis No
                            <small className="mt-1 text-sm font-semibold text-red-600  ">
                              *
                            </small>
                          </label>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                          <input
                            {...formik.getFieldProps("chasisNo")}
                            className="common-input-css"
                            type="text"
                            placeholder="Enter chasis no"
                          />
                          <br />
                          <span className="text-red-600  text-xs">
                            {formik.touched.chasisNo && formik.errors.chasisNo
                              ? formik.errors.chasisNo
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

export default VehicleDemo;
