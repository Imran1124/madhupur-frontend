/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  allowNumberInput,
  allowCharacterInput,
} from "../../Components/Common/PowerupFunctions";
import ApiList from "../../Components/ApiList/ApiList";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import BarLoader from "../../Components/Common/BarLoader";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import Tabs from "../Tabs";
import { CATEGORY_REGEX } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";

const VehicleTypeDataForm = () => {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [vehicleTypeList, setvehicleTypeList] = useState([]);
  const {
    api_getvehicleTypeDataById,
    api_postvehicleTypeData,
    api_editvehicleTypeData,
    api_getvehicleTypeData,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = yup.object({
    vehiclesTypeName: yup
      .string()
      .required("Vehicle Type name is required feild"),
    maxSeatingNo: yup.number().required("Max Seating is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      vehiclesTypeName: "",
      maxSeatingNo: "",
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
      vehiclesTypeName: values.vehiclesTypeName,
      maxSeatingNo: values.maxSeatingNo,
    };
    if (id !== undefined) {
      url = api_editvehicleTypeData;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postvehicleTypeData;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("vehicle type master..", response?.data?.data);
        if (response?.data?.status === true) {
          navigate("/vehicle-type");
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
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
    AxiosInterceptors.post(api_getvehicleTypeDataById, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          vehicleTypeEditData(response?.data?.data);
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
  const vehicleTypeEditData = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("vehiclesTypeName", data?.vehicle_type_name);
    formik.setFieldValue("maxSeatingNo", data?.max_seating_no);
  };
  const VehicleTypeList = () => {
    AxiosInterceptors.post(api_getvehicleTypeData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setvehicleTypeList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");
      });
  };

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    VehicleTypeList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "vehiclesTypeName" &&
        formik.setFieldValue(
          "vehiclesTypeName",
          allowCharacterInput(value, formik.values.vehiclesTypeName, 50)
        );
    }
    {
      name == "maxSeatingNo" &&
        formik.setFieldValue(
          "maxSeatingNo",
          allowNumberInput(value, formik.values.maxSeatingNo, 3)
        );
    }
  };

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

          <div className="main-sub-div">
            <div className="main-sub-inner-div">
              <div className="text-div">
                <div className="big-text">Vehicle Type Master Form</div>
                <div className="small-text">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            {id === undefined ? (
              <div className="tab-div">
                <div className="add-button-master-div">
                  <button
                    onClick={() => navigate("/vehicle-type-form")}
                    type="submit"
                    className=" add-button-master"
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
            <Tabs
              listRoute={"/vehicle-type"}
              formRoute={"/vehicle-type-form"}
            />
          )}
          <div className="details-div">
            <span className="detailes">Details of Vehicle type</span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Vehicle Type Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("vehiclesTypeName")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter vehicle type name"
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.vehiclesTypeName &&
                      formik.errors.vehiclesTypeName
                        ? formik.errors.vehiclesTypeName
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Max Seating Capacity
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("maxSeatingNo")}
                      type="number"
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter max seating capacity"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.maxSeatingNo && formik.errors.maxSeatingNo
                        ? formik.errors.maxSeatingNo
                        : null}
                    </span>
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate("/vehicle-type")}
                      type="button"
                      className="cancel-button"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="submit-button-div">
                    <button
                      type="submit"
                      className="cypress_next2_button submit-button"
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
};

export default VehicleTypeDataForm;
