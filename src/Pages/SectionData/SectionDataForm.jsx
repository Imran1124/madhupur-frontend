/* eslint-disable react-hooks/exhaustive-deps */
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

function ClassMasterForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [sectionList, setsectionList] = useState([]);
  const {
    api_getSectionData,
    api_editSectionData,
    api_postSectionData,
    api_getSectionDataByID,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    sectionName: yup
      .string()
      .matches(CATEGORY_REGEX, "Please Enter value between A-Z to a-z")
      .required("Section is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      sectionName: "",
    },

    onSubmit: (values, resetForm) => {
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
      sectionName: values.sectionName,
    };
    if (id !== undefined) {
      url = api_editSectionData;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postSectionData;
      requestBody = requestBodyBase;
    }
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          navigate("/section");
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
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
    AxiosInterceptors.post(api_getSectionDataByID, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          classEditData(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        seterroState(true);
        setisLoading(false);
      });
  };

  // FUNCTION TO FEED EDIT DATA
  const classEditData = (data) => {
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("sectionName", data?.section_name);
  };
  const sectionTypeList = () => {
    AxiosInterceptors.post(api_getSectionData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setsectionList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, "Error occured while fetching data.");
      });
  };

  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    sectionTypeList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "sectionName" &&
        formik.setFieldValue(
          "sectionName",
          allowCharacterInput(value.toUpperCase().trim(), formik.values.sectionName, 1)
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
                <div className="big-text">Section Master Form</div>
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
                    onClick={() => navigate("/section-form")}
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
            <Tabs listRoute={"/section"} formRoute={"/section-form"} />
          )}
          <div className="details-div">
            <span className="detailes">Details of Section </span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Section Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("sectionName")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter section"
                    />
                    <span className="text-red-600 text-xs flex items-center ml-8">
                      {formik.touched.sectionName && formik.errors.sectionName
                        ? formik.errors.sectionName
                        : null}
                    </span>
                  </div>
                </div>

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate("/section")}
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

export default ClassMasterForm;
