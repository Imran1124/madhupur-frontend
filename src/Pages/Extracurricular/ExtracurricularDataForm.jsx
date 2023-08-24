/* eslint-disable no-unused-vars */
import React from "react";
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

const ExtracurricularDataForm = () => {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [extraCurricularList, setextraCurricularList] = useState([]);
  const {
    api_getextracurricularById,
    api_postextracurricular,
    api_editextracurricular,
    api_getextracurricular,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = yup.object({
    extraCurricularName: yup
      .string()
      .required("Extracurricular is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      extraCurricularName: "",
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
      extraCurricularName: values.extraCurricularName,
    };
    if (id !== undefined) {
      url = api_editextracurricular;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postextracurricular;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("Extracurricular master..", response?.data?.data);
        if (response?.data?.status === true) {
          navigate("/extra-curricular");
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
    AxiosInterceptors.post(api_getextracurricularById, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          extraCurricularEditData(response?.data?.data);
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
  const extraCurricularEditData = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("extraCurricularName", data?.extracurricular_name);
  };
  const ExtraCurricularList = () => {
    AxiosInterceptors.post(api_getextracurricular, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setextraCurricularList(response?.data?.data);
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
    ExtraCurricularList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "extraCurricularName" &&
        formik.setFieldValue(
          "extraCurricularName",
          allowCharacterInput(value, formik.values.extraCurricularName, 20)
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
                <div className="big-text">Extra Activities Form</div>
                <div className="small-text">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            <div className="tab-div">
              <div className="add-button-master-div'">
                <button
                  onClick={() => navigate("/extra-curricular-form")}
                  type="submit"
                  className=" add-button-master"
                >
                  Add{" "}
                </button>
              </div>
            </div>
          </div>

          {id !== undefined ? (
            ""
          ) : (
            <Tabs
              listRoute={"/extra-curricular"}
              formRoute={"/extra-curricular-form"}
            />
          )}
          <div className="details-div">
            <span className="detailes">Details of Extra Activities</span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Extracurricular Activities
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("extraCurricularName")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter extra curricular activities"
                    />
                    <span className="text-red-600  text-xs">
                      {formik.touched.extraCurricularName &&
                      formik.errors.extraCurricularName
                        ? formik.errors.extraCurricularName
                        : null}
                    </span>
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate("/extra-curricular")}
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
                      Save
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

export default ExtracurricularDataForm;
