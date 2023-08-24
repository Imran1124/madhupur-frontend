/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { allowCharacterNumberSpaceInput,allowNumberInput } from "../../../../Components/Common/PowerupFunctions";
import ApiList from "../../../../Components/ApiList/ApiList";
import ApiHeader from "../../../../Components/ApiList/ApiHeader";
import BarLoader from "../../../../Components/Common/BarLoader";
import BottomErrorCard from "../../../../Components/Common/BottomErrorCard";
import Tabs from "../Tabs";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInterceptors from "../../../../Components/Common/AxiosInterceptors";

function DiscountGroupMasterMapForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [DiscountGroupTypeList, setDiscountGroupTypeList] = useState([]);
  const { api_editDiscountMap,  api_postDiscountMap, api_getDiscountByIdMap, api_fetchDiscoutGroupList } =
    ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    admissionNo: yup.string().required("Enter admissioon no."),
    discountGroupId: yup.string().required("Select discount Group"),
    discountPercent: yup.string().required("Enter discount percent"),
  });

  const formik = useFormik({
    initialValues: {
        admissionNo: "",
        discountGroupId: "",
        discountPercent: "",
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
        discountGroupId: values.discountGroupId,
        admissionNo: values?.admissionNo,
        discountPercent: values?.discountPercent,
    };
    if (id !== undefined) {
      url = api_editDiscountMap;
      requestBody = requestBodyBase;
      requestBody.id = id;
      requestBody.status = "active";
    } else {
      url = api_postDiscountMap;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("view discount group master..", response?.data?.data);
        if (response?.data?.status) {
          navigate("/discount-group-map");
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
    AxiosInterceptors.post(api_getDiscountByIdMap, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          DiscountGroupEdit(response?.data?.data);
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
  const DiscountGroupEdit = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("id", data?.id);
    formik.setFieldValue("admissionNo", data?.admission_no);
    formik.setFieldValue("discountGroupId", data?.discount_group_id);
    formik.setFieldValue("discountGroup", data?.discount_group);
    formik.setFieldValue("discountPercent", data?.discount_percent);
  };
  const DiscountGroupType = () => {
    AxiosInterceptors.post(api_fetchDiscoutGroupList, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
        setDiscountGroupTypeList(response?.data?.data);
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
    DiscountGroupType();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);


  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "discountPercent" &&
        formik.setFieldValue(
          "discountPercent",
          allowNumberInput(value, formik.values.discountPercent, 2)
        );
    }
    {
      name == "discountGroupId" &&
        formik.setFieldValue(
          "discountGroupId",
          allowCharacterNumberSpaceInput(
            value,
            formik.values.discountGroupId,
            200
          )
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
                <div className="big-text">Discount Group Map Master Form</div>
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
                    onClick={() => navigate("/discount-group-map-form")}
                    type="submit"
                    className=" add-button-master"
                  >
                    Add{" "}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {id!==undefined ? "" : ( <Tabs
            listRoute={"/discount-group-map"}
            formRoute={"/discount-group-map-form"}
          />)}
          <div className="details-div">
            <span className="detailes">Details of Discount Group Map</span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Discount Group Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps("discountGroupId")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select Discount Group"
                    >
                      <option value="">Select</option>
                      {DiscountGroupTypeList?.map((data, index) => (
                        <option value={data?.id}>{data?.discount_group}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.discountGroupId &&
                      formik.errors.discountGroupId
                        ? formik.errors.discountGroupId
                        : null}
                    </span>
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Admission No
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("admissionNo")}
                      type="text"
                      disabled={id!==undefined}
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter admission no"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.admissionNo && formik.errors.admissionNo
                        ? formik.errors.admissionNo
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Discount %
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("discountPercent")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter discount %"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.discountPercent && formik.errors.discountPercent
                        ? formik.errors.discountPercent
                        : null}
                    </span>
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate("/discount-group-map")}
                      type="button"
                      className="cancel-button"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="submit-button-div">
                    <button
                      type="submit"
                      className=" cypress_next2_button submit-button"
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

export default DiscountGroupMasterMapForm;
