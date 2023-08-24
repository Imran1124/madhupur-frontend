/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { allowCharacterInput } from "../../Components/Common/PowerupFunctions";
import ApiList from "../../Components/ApiList/ApiList";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import BarLoader from "../../Components/Common/BarLoader";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import Tabs from "../Tabs";
import { CATEGORY_REGEX } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";

function BusFeeFineDataForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [busfeefineList, setBusfeefineList] = useState([]);
  const [admissionMidMonth, setadmissionMidMonth] = useState();
  const {
    api_getBusFeeFineData,
    api_postBusFeeFineData,
    api_editBusFeeFineData,
    api_getBusFeeFineDataById,
    api_getadmissionMonthtypeData,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    monthName: yup.string().required("month Id is required feild"),
    dueDate: yup.string().required("due date is required feild"),
    actualFineAmount: yup
      .string()
      .required("actual fine amount is required feild"),
    fineAmount: yup.string().required("fine amount is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      monthName: "",
      dueDate: "",
      actualFineAmount: "",
      fineAmount: "",
    },

    onSubmit: (values, resetForm) => {
      console.log("at submit ", values);
      saveMasterForm(values);
    },
    validationSchema,
  });

  // FUNCTION TO SAVE MASTER DATA
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      monthName: values.monthName,
      dueDate: values.dueDate,
      actualFineAmount: values.actualFineAmount,
      fineAmount: values.fineAmount,
    };
    if (id !== undefined) {
      url = api_editBusFeeFineData;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postBusFeeFineData;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("Bus fee fine master..", response?.data?.data);
        if (response?.data?.status === true) {
          navigate("/busfeefine");
        } else {
          activateBottomErrorCard(true, "Error occured in submitting form.");
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured in submitting form.");

        setisLoading(false);
      });
  };

  // FUNCTION TO FECTH DATA TO EDIT
  const fetchEditData = () => {
    setisLoading(true);
    let requestBody = {
      id: id,
    };
    AxiosInterceptors.post(api_getBusFeeFineDataById, requestBody, ApiHeader())
      .then(function (response) {
        // console.log('fetch edit data response of Bus fee ', response?.data?.data)
        console.log("qwerty", response);
        if (response?.data?.status) {
          busfeefineEditData(response?.data?.data);
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

  const getAdmissionMonthUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getadmissionMonthtypeData, {}, ApiHeader())
      .then(function (response) {
        console.log(response);
        if (response?.data?.status===true) {
          setadmissionMidMonth(response?.data?.data);
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
console.log(admissionMidMonth)
  //add

  // FUNCTION TO FEED EDIT DATA
  const busfeefineEditData = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("monthName", data?.month_name);
    formik.setFieldValue("dueDate", data?.due_date);
    formik.setFieldValue("actualFineAmount", data?.actual_fine_amount);
    formik.setFieldValue("fineAmount", data?.fine_amount);
  };
  const busfeefineTypeList = () => {
    AxiosInterceptors.post(api_getBusFeeFineData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setBusfeefineList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, "Error occured while fetching data.");
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");
      });
  };

  useEffect(() => {
    getAdmissionMonthUser();
  }, []);
  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    busfeefineTypeList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // { name == 'departmentName' && formik.setFieldValue("departmentName", allowCharacterInput(value, formik.values.departmentName, 50)) }
    // { name == 'abbreviationName' && formik.setFieldValue("abbreviationName", allowCharacterInput(value, formik.values.abbreviationName, 200)) }
  };

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

          <div className="flex mb-10  items-start justify-start  max-[870px]:block">
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
            {id === undefined ? (
              <div className="flex-1 justify-end">
                <div className="flex justify-end items-end">
                  <button
                    onClick={() => navigate("/busfeefine-form")}
                    type="submit"
                    className=" px-6 py-2.5 w-auto bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Add{" "}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {id !== undefined ? (
            ""
          ) : (
            <Tabs listRoute={"/busfeefine"} formRoute={"/busfeefine-form"} />
          )}
          <div className="mt-6 border-b">
            <span className="text-lg font-noarml text-gray-500">
              Details of Bus Fee Fine{" "}
            </span>
          </div>

          <div className="w-full mb-6 mt-6 pb-10">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Basic address */}

                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-14">
                    <label
                      for="exampleEmail"
                      className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"
                    >
                      Month Name <span className="text-red-600">*</span>
                    </label>
                    <br />
                    <select
                      name="monthName"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      type="select"
                      onChange={formik.handleChange}
                      value={formik.values.monthName}
                    >
                      <option value="">Select</option>
                      {admissionMidMonth?.map((data) => (
                        <option value={data?.id}>
                          {data?.month_name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                      {formik.touched.monthName && formik.errors.monthName
                        ? formik.errors.monthName
                        : null}
                    </p>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Due Date
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("dueDate")}
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter due date"
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.dueDate && formik.errors.dueDate
                        ? formik.errors.dueDate
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Actual Fine Amount
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("actualFineAmount")}
                      type="number"
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter actual fine amount"
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.actualFineAmount &&
                      formik.errors.actualFineAmount
                        ? formik.errors.actualFineAmount
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Fine Amount
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("fineAmount")}
                      type="number"
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter action fine amount"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.fineAmount && formik.errors.fineAmount
                        ? formik.errors.fineAmount
                        : null}
                    </span>
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="col-span-4 grid grid-cols-2 mt-10">
                  <div className="    ">
                    <button
                      onClick={() => navigate("/busfeefine")}
                      type="button"
                      className=" px-6 py-2.5 bg-gray-200 hover:bg-gray-400 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="md:px-10 text-right">
                    <button
                      type="submit"
                      className="cypress_next2_button px-6 py-2.5 bg-[#6AB783] text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
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

export default BusFeeFineDataForm;
