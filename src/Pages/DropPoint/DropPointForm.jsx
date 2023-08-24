/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  allowCharacterInput,
  allowCharacterNumberSpaceInput,
} from "../../Components/Common/PowerupFunctions";
import ApiList from "../../Components/ApiList/ApiList";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import BarLoader from "../../Components/Common/BarLoader";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import Tabs from "../Tabs";
import { CATEGORY_REGEX } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";

function DropPointForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [pickupMasterList, setpickupMasterList] = useState([]);
  const {
    api_drop_point_store,
    api_drop_point_edit,
    api_getPickupPointData,
    api_drop_point_show,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    dropPointName: yup.string().required("Drop point name is required field"),
    dropPointAddress: yup
      .string()
      .required("Drop point address is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      dropPointName: "",
      dropPointAddress: "",
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
      dropPointName: values.dropPointName,
      dropPointAddress: values.dropPointAddress,
    };
    if (id !== undefined) {
      url = api_drop_point_edit;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_drop_point_store;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("bank master..", response?.data?.data);
        if (response?.data?.status === true) {
          navigate("/drop-point-list");
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
    AxiosInterceptors.post(api_drop_point_show, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          dropPointEdit(response?.data?.data);
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

  // FUNCTION TO FEED EDIT DATA
  const dropPointEdit = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("dropPointName", data?.drop_point_name);
    formik.setFieldValue("dropPointAddress", data?.drop_point_address);
  };
  const dropTypeList = () => {
    AxiosInterceptors.post(api_getPickupPointData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setpickupMasterList(response?.data?.data);
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

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    dropTypeList();
    if (id != undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "dropPointName" &&
        formik.setFieldValue(
          "dropPointName",
          allowCharacterInput(value, formik.values.dropPointName, 50)
        );
    }
    {
      name == "bankName" &&
        formik.setFieldValue(
          "feeHead",
          allowCharacterNumberSpaceInput(value, formik.values.feeHead, 50)
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
                <div className="big-text">Drop Point Master List</div>
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
                    onClick={() => navigate("/drop-point-form")}
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
              listRoute={"/drop-point-list"}
              formRoute={"/drop-point-form"}
            />
          )}
          <div className="mt-6 border-b">
            <span className="text-lg font-noarml text-gray-500">
              Details of Drop Point
            </span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Drop Point Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("dropPointName")}
                      type="text"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter drop point name"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.dropPointName &&
                      formik.errors.dropPointName
                        ? formik.errors.dropPointName
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Drop Point Address
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("dropPointAddress")}
                      type="text"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter drop point address"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.dropPointAddress &&
                      formik.errors.dropPointAddress
                        ? formik.errors.dropPointAddress
                        : null}
                    </span>
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className=" ">
                    <button
                      onClick={() => navigate("/drop-point-list")}
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
}

export default DropPointForm;
