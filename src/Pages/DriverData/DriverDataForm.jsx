/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  allowCharacterInput,
  allowCharacterNumberInput,
} from "../../Components/Common/PowerupFunctions";
import ApiList from "../../Components/ApiList/ApiList";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import BarLoader from "../../Components/Common/BarLoader";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import Tabs from "../Tabs";
import { FaFilePdf } from "react-icons/fa";
import { ADDRESS_REGEX } from "../../constant";
import { phoneRegExp } from "../../constant";
import { aadharRegExp } from "../../constant";
import { EMAIL_REGEX } from "../../constant";
import { CATEGORY_REGEX } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BackendUrl from "../../Components/ApiList/BackendUrl";

function DriverMasterForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const[editdataFirst,setEditdataFirst]=useState("")
  const[editseconddataFirst,setEditseconddataFirst]=useState("")
  const[editthirddataFirst,setEditthirddataFirst]=useState("")
  const[editforthdataFirst,setEditforthdataFirst]=useState("")
  const {
    api_getDriverData,
    api_postDriverData,
    api_editDriverData,
    api_getDriverDataById,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    driverName: yup
      .string()
      .matches(CATEGORY_REGEX, "Please Enter value between A-Z to a-z")
      .required("Driver name is required feild"),
    mobile: yup
      .string()
      .matches(phoneRegExp, "Please Enter valid mobile no")
      .required("mobile no is required feild"),
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Please Enter Valid Email")
      .required("Email is required feild"),
    address: yup
      .string()
      .matches(ADDRESS_REGEX, "Please Enter Valid Address")
      .required("Address is required feild"),
    licenseNo: yup.string().required("License no is required feild"),
    aadharNo: yup
      .string()
      .matches(aadharRegExp, "Please Enter Valid Aadhar no")
      .required("Aadhar is required feild"),
    panNo: yup.string().required("Pan no is required feild"),
    // aadharDoc: yup.string().required("Choose Aadhar Card in .pdf format"),
    //   panDoc: yup.string().required("Choose pan card in .pdf format"),
    //   photoDoc: yup.string().required("Choose photo "),
    //   licenseDoc: yup.string().required("Choose license in .pdf format"),
  });

  const formik = useFormik({
    initialValues: {
      driverName: "",
      mobile: "",
      email: "",
      address: "",
      licenseNo: "",
      aadharNo: "",
      panNo: "",
      aadharDoc: "",
      panDoc: "",
      photoDoc: "",
      licenseDoc: "",
    },

    onSubmit: async (values, resetForm) => {
      console.log("at submit ", values);
      const formdata = new FormData();
      formdata.append("aadharDoc", values.aadharDoc);
      formdata.append("panDoc", values.panDoc);
      formdata.append("photoDoc", values.photoDoc);
      formdata.append("licenseDoc", values.licenseDoc);
      formdata.append("driverName", values.driverName);
      formdata.append("mobile", values.mobile);
      formdata.append("email", values.email);
      formdata.append("address", values.address);
      formdata.append("licenseNo", values.licenseNo);
      formdata.append("aadharNo", values.aadharNo);
      formdata.append("panNo", values.panNo);

      for (const value of formdata.values()) {
        console.log(value);
      }
      saveMasterForm(formdata);
    },
    validationSchema,
  });

  // FUNCTION TO SAVE MASTER DATA
  const saveMasterForm = (formdata) => {
    setisLoading(true);
    let url;
    let requestBody;
    if (id !== undefined) {
      url = api_editDriverData;
      requestBody = formdata;
      requestBody.id = formdata.append("id", id);
    } else {
      url = api_postDriverData;
      requestBody = formdata;
    }
    console.log(requestBody);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("driver master..", response?.data?.data);
        if (response?.data?.status === true) {
          navigate("/driver");
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured in submitting form.");
        seterroState(true);
        setisLoading(false);
      });
  };

  // FUNCTION TO FECTH DATA TO EDIT
  const fetchEditData = () => {
    setisLoading(true);
    let requestBody = {
      id: id,
    };
    AxiosInterceptors.post(api_getDriverDataById, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          driverEditData(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("= edit data error...", error);
        seterroState(true);
        setisLoading(false);
      });
  };

  // FUNCTION TO FEED EDIT DATA
  const driverEditData = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("driverName", data?.driver_name);
    formik.setFieldValue("mobile", data?.mobile);
    formik.setFieldValue("email", data?.email);
    formik.setFieldValue("address", data?.address);
    formik.setFieldValue("licenseNo", data?.license_no);
    formik.setFieldValue("aadharNo", data?.aadhar_no);
    formik.setFieldValue("panNo", data?.pan_no);
    formik.setFieldValue(
      "aadharDoc",""
    );
    formik.setFieldValue(
      "panDoc",""
    );
    formik.setFieldValue(
      "licenseDoc",
     ""
    );
    formik.setFieldValue(
      "photoDoc",""
    );
    setEditdataFirst(data?.aadhar_doc)
    setEditseconddataFirst(data?.pan_doc)
    setEditthirddataFirst(data?.license_doc)      
    setEditforthdataFirst(data?.photo_doc)
  };
  const driverTypeList = () => {
    AxiosInterceptors.post(api_getDriverData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setDriverList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");
        seterroState(true);
        setisLoading(false);
      });
  };

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    driverTypeList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "driverName" &&
        formik.setFieldValue(
          "driverName",
          allowCharacterInput(value, formik.values.driverName, 40)
        );
    }
    {
      name == "address" &&
        formik.setFieldValue(
          "address",
          allowCharacterInput(value, formik.values.address, 200)
        );
    }
    {
      name == "licenseNo" &&
        formik.setFieldValue(
          "licenseNo",
          allowCharacterNumberInput(value, formik.values.licenseNo, 50)
        );
    }
    {
      name == "panNo" &&
        formik.setFieldValue(
          "panNo",
          allowCharacterNumberInput(value.toUpperCase(), formik.values.panNo, 10)
        );
    }
    if (name == "mobile") {
      let selectMobile = e.target.value;
      selectMobileNumber(selectMobile);
    }
    if (name == "aadharNo") {
      let selectAadhar = e.target.value;
      selectAadharNumber(selectAadhar);
    }
  };

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  

  const selectAadharNumber = (selectAadhar) => {
    if (selectAadhar > 12) {
      formik.setFieldValue("aadharNo", selectAadhar.slice(0, 12));
    }
  };

  const selectMobileNumber = (selectMobile) => {
    if (selectMobile.length > 10) {
      formik.setFieldValue("mobile", selectMobile.slice(0, 10));
    }
  };
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
          <div className="main-sub-div">
            <div className="main-sub-inner-div">
              <div className="text-div">
                <div className="big-text">Driver Master Form</div>
                <div className="small-text">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            {/* {id === undefined ? (
              <div className="tab-div">
                <div className="add-button-master-div">
                  <button
                    onClick={() => navigate("/driver-form")}
                    type="submit"
                    className=" add-button-master"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null} */}
          </div>

          {id !== undefined ? (
            ""
          ) : (
            <Tabs listRoute={"/driver"} formRoute={"/driver-form"} />
          )}
          <div className="details-div">
            <span className="text-lg font-noarml text-[#0F766E]">
              Details of Driver
            </span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      Driver Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("driverName")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter driver name"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.driverName && formik.errors.driverName
                        ? formik.errors.driverName
                        : null}
                    </span>
                  </div>
                  {/* 2nd div */}
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      {" "}
                      Mobile No.
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("mobile")}
                      type="number"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter mobile no."
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.mobile && formik.errors.mobile
                        ? formik.errors.mobile
                        : null}
                    </span>
                  </div>

                  {/* 3rd div */}
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      {" "}
                      Email
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("email")}
                      type="email"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter email "
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null}
                    </span>
                  </div>

                  {/* 4th div */}

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      {" "}
                      Address
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("address")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter address "
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.address && formik.errors.address
                        ? formik.errors.address
                        : null}
                    </span>
                  </div>

                  {/* 5th div */}

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      {" "}
                      License No.
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("licenseNo")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter license no."
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.licenseNo && formik.errors.licenseNo
                        ? formik.errors.licenseNo
                        : null}
                    </span>
                  </div>

                  {/* 6th div */}
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      {" "}
                      Aadhar No.
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("aadharNo")}
                      type="number"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter aadhar no."
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.aadharNo && formik.errors.aadharNo
                        ? formik.errors.aadharNo
                        : null}
                    </span>
                  </div>
                </div>
                <div className="col-span-4 grid grid-cols-12">
                  {/* 7th div */}
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      {" "}
                      PAN No.
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small>
                    </label>
                    <input
                      {...formik.getFieldProps("panNo")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter pan no."
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.panNo && formik.errors.panNo
                        ? formik.errors.panNo
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold ">
                      Upload Aadhar
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <div className="block justify-start">
                      <label
                        htmlFor="aadharDoc"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>

                      <input
                        className="sr-only form-control h-10 block w-full px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                        name="aadharDoc"
                        id="aadharDoc"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          formik.setFieldValue("aadharDoc", e.target.files[0]);
                        }}
                      />
                      {formik.values.aadharDoc && id!==undefined
                        ? `${formik.values.aadharDoc?.name}`.slice(
                            `${formik.values.aadharDoc?.name}`.lastIndexOf(
                              "-"
                            ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                "/"
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                "\\"
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                "."
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                " "
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                ","
                              ) + 1 ||
                              `${formik.values.aadharDoc?.name}`.lastIndexOf(
                                "?"
                              ) + 1,
                            `${formik.values.aadharDoc?.name}`.length
                          )
                        : formik.values.aadharDoc && id===undefined
                        ? formik.values.aadharDoc?.name
                        : editdataFirst 
                        ? (<a
                          href={`${BackendUrl}/api/${editdataFirst}`}
                          target="_blank"
                          className="text-xl text-red-700 flex items-center justify-center"
                        >
                         {editdataFirst ? ( <FaFilePdf className="text-red bg-red w-8 h-8 mt-4" />) : ""}
                        </a>)
                        : "No file selected"}
                        <br/>
                        <span className="text-red-600  text-xs">
                      {formik.touched.aadharDoc && formik.errors.aadharDoc
                        ? formik.errors.aadharDoc
                        : null}
                    </span>
                    </div>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold">
                      Upload PAN
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <div className="block justify-start">
                      <label
                        htmlFor="panDoc"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>
                      <input
                        className="sr-only form-control h-10 block w-full px-3 2xl:py-1.5 py-3 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                        name="panDoc"
                        id="panDoc"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          formik.setFieldValue("panDoc", e.target.files[0]);
                        }}
                      />
                      {formik.values.panDoc && id!==undefined
                        ? `${formik.values.panDoc?.name}`.slice(
                            `${formik.values.panDoc?.name}`.lastIndexOf("-") +
                              1 ||
                              `${formik.values.panDoc?.name}`.lastIndexOf("/") +
                                1 ||
                              `${formik.values.panDoc?.name}`.lastIndexOf(
                                "\\"
                              ) + 1 ||
                              `${formik.values.panDoc?.name}`.lastIndexOf(".") +
                                1 ||
                              `${formik.values.panDoc?.name}`.lastIndexOf(" ") +
                                1 ||
                              `${formik.values.panDoc?.name}`.lastIndexOf(",") +
                                1 ||
                              `${formik.values.panDoc?.name}`.lastIndexOf("?") +
                                1,
                            `${formik.values.panDoc?.name}`.length
                          )
                        : formik.values.panDoc && id===undefined
                        ? formik.values.panDoc?.name
                        : editseconddataFirst
                        ? (<a
                        href={`${BackendUrl}/api/${editseconddataFirst}`}
                        target="_blank"
                        className="text-xl text-red-700 flex items-center justify-center"
                      >
                       {editseconddataFirst ? ( <FaFilePdf className="text-red bg-red w-8 h-8 mt-4" />) : ""}
                      </a>)
                        :  "No file selected"}
                        <br/>
                        <span className="text-red-600  text-xs">
                      {formik.touched.panDoc && formik.errors.panDoc
                        ? formik.errors.panDoc
                        : null}
                    </span>
                    </div>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label
                      className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold "
                      htmlFor="photoDoc"
                    >
                      Upload Photo
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <div className="block justify-start">
                      <label
                        htmlFor="photoDoc"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>
                      <input
                        className="sr-only form-control h-10 block w-full px-3 2xl:py-1.5 py-3 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                        name="photoDoc"
                        id="photoDoc"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => {
                          formik.setFieldValue("photoDoc", e.target.files[0]);
                        }}
                      />
                      {formik.values.photoDoc && id!==undefined
                        ? `${formik.values.photoDoc?.name}`.slice(
                            `${formik.values.photoDoc?.name}`.lastIndexOf("-") +
                              1 ||
                              `${formik.values.photoDoc?.name}`.lastIndexOf(
                                "/"
                              ) + 1 ||
                              `${formik.values.photoDoc?.name}`.lastIndexOf(
                                "\\"
                              ) + 1 ||
                              `${formik.values.photoDoc?.name}`.lastIndexOf(
                                "."
                              ) + 1 ||
                              `${formik.values.photoDoc?.name}`.lastIndexOf(
                                " "
                              ) + 1 ||
                              `${formik.values.photoDoc?.name}`.lastIndexOf(
                                ","
                              ) + 1 ||
                              `${formik.values.photoDoc?.name}`.lastIndexOf(
                                "?"
                              ) + 1,
                            `${formik.values.photoDoc?.name}`.length
                          )
                        : formik.values.photoDoc && id===undefined
                        ? formik.values.photoDoc?.name
                        : editforthdataFirst
                        ? (<div className="flex items-center justify-center mt-4"><img src={`${BackendUrl}/api/${editforthdataFirst}`} className="w-10 h-10 flex items-center justify-center"/></div>)
                        :  "No file selected"}
                        <br/>
                        <span className="text-red-600  text-xs">
                      {formik.touched.photoDoc && formik.errors.photoDoc
                        ? formik.errors.photoDoc
                        : null}
                    </span>
                    </div>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label
                      className="form-label inline-block mb-1 text-[#0F766E] text-sm font-semibold "
                     
                    >
                      Upload License
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <div className="block justify-start">
                      <label
                        htmlFor="licenseDoc"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>
                      <input
                        className="sr-only form-control h-10 block w-full px-3 2xl:py-1.5 py-3 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                        name="licenseDoc"
                        id="licenseDoc"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          formik.setFieldValue("licenseDoc", e.target.files[0]);
                        }}
                      />
                      {formik.values.licenseDoc && id!==undefined
                        ? `${formik.values.licenseDoc?.name}`.slice(
                            `${formik.values.licenseDoc?.name}`.lastIndexOf(
                              "-"
                            ) + 1 ||
                              `${formik.values.licenseDoc?.name}`.lastIndexOf(
                                "/"
                              ) + 1 ||
                              `${formik.values.licenseDoc?.name}`.lastIndexOf(
                                "\\"
                              ) + 1 ||
                              `${formik.values.licenseDoc?.name}`.lastIndexOf(
                                "."
                              ) + 1 ||
                              `${formik.values.licenseDoc?.name}`.lastIndexOf(
                                " "
                              ) + 1 ||
                              `${formik.values.licenseDoc?.name}`.lastIndexOf(
                                ","
                              ) + 1 ||
                              `${formik.values.licenseDoc?.name}`.lastIndexOf(
                                "?"
                              ) + 1,
                            `${formik.values.licenseDoc?.name}`.length
                          )
                        : formik.values.licenseDoc && id===undefined 
                         ? formik.values.licenseDoc?.name
                         :  editthirddataFirst
                         ? (<a
                          href={`${BackendUrl}/api/${editthirddataFirst}`}
                          target="_blank"
                          className="text-xl text-red-700 flex items-center justify-center"
                        >
                         {editthirddataFirst ? ( <FaFilePdf className="text-red bg-red w-8 h-8 mt-4" />) : ""}
                        </a>)
                         : "No file selected"}
                         <br/>
                         <span className="text-red-600  text-xs">
                       {formik.touched.licenseDoc && formik.errors.licenseDoc
                         ? formik.errors.licenseDoc
                         : null}
                     </span>
                    </div>
                  </div>
                </div>
                {/* Basic address */}

                <div className="cancel-button-div">
                  <div className="">
                    <button
                      onClick={() => navigate("/driver")}
                      type="button"
                      className="deactivate-button-master bg-red-500 text-white py-2"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="submit-button-div">
                    <button
                      type="submit"
                      className="save-button"
                    >
                      {id !== undefined ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverMasterForm;