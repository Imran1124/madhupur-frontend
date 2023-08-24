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
import { Icon } from "@iconify/react";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";

function MenuForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [menuMasterList, setmenuMasterList] = useState([]);
  const [userMasterList, setuserMasterList] = useState([]);
  const {
    api_geticonData,
    api_getusertypeactiveData,
    api_postMenuData,
    api_editMenuData,
    api_getMenuDataById,
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    menuName: yup.string().required("Menu name is required feild"),
  });

  const formik = useFormik({
    initialValues: {
      userTypeId: "",
      menuName: "",
      iconName: "",
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
      userTypeId: values?.userTypeId,
      menuName: values?.menuName,
      iconName: values?.iconName,
    };
    if (id !== undefined) {
      url = api_editMenuData;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postMenuData;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("menu master..", response?.data?.data);
        if (response?.data?.status === true) {
          navigate("/menu");
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
    AxiosInterceptors.post(api_getMenuDataById, requestBody, ApiHeader())
      .then(function (response) {
        console.log("fetch edit data response..", response?.data?.data);
        if (response?.data?.status) {
          menuEditData(response?.data?.data);
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
  const menuEditData = (data) => {
    console.log("existing property details in prop address...", data);
    formik.setFieldValue("userTypeId", data?.user_type_id);
    formik.setFieldValue("menuName", data?.menu_name);
    formik.setFieldValue("iconName", data?.icon_name);
  };
  const menuTypeList = () => {
    AxiosInterceptors.post(api_geticonData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          setmenuMasterList(response?.data);
        } else {
          activateBottomErrorCard(true, `error`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");
      });
  };

  const userTypeList = () => {
    AxiosInterceptors.post(api_getusertypeactiveData, {}, ApiHeader())
      .then(function (response) {
        console.log(response.data?.status);
        if (response?.data) {
          setuserMasterList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, `${response.data.message}`);
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
    menuTypeList();
    userTypeList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "menuName" &&
        formik.setFieldValue(
          "menuName",
          allowCharacterInput(value, formik.values.menuName, 50)
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
                <div className="big-text">Menu Master Form</div>
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
                    onClick={() => navigate("/menu-form")}
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
            <Tabs listRoute={"/menu"} formRoute={"/menu-form"} />
          )}
          <div className="details-div">
            <span className="detailes">Details of Menu</span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                {/* Basic address */}

                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      User Type
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps("userTypeId")}
                      className={`form-control h-10 main-select`}
                      placeholder="Select menu"
                    >
                      <option value="">Select</option>
                      {userMasterList?.map((data, index) => (
                        <option value={data?.id}>{data?.user_type}</option>
                      ))}
                    </select>
                    <span className="text-red-600 text-xs">
                      {formik.touched.userTypeId && formik.errors.userTypeId
                        ? formik.errors.userTypeId
                        : null}
                    </span>
                  </div>
                  <div className=" mb-6 col-span-12 md:col-span-2 md:pr-4">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                      Menu Name
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps("menuName")}
                      type="text"
                      className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                      placeholder="Enter menu"
                    />
                    <span className="text-red-600 text-xs">
                      {formik.touched.menuName && formik.errors.menuName
                        ? formik.errors.menuName
                        : null}
                    </span>
                  </div>
                </div>
                <div className="col-span-12 grid grid-cols-12">
                  {/* <label className="col-span-12 form-check-label text-gray-800 ml-2 mt-[4vh] max-[775px]:col-span-12"><span className='inline text-gray-700 text-lg font-semibold'> Select Menu Icon</span></label> */}
                  <div className="form-group col-span-12 md:col-span-2 form-check mb-2 md:px-4 flex items-center max-[780px]:block max-[780px]:mx-[30%]">
                    {menuMasterList &&
                      menuMasterList.map((data) => {
                        return (
                          <>
                            <div className="mr-6 w-full max-[780px]:flex max-[780px]:justify-between">
                              <label className="form-check-label text-gray-800 ml-6">
                                {" "}
                                <span className="inline text-gray-700 text-sm font-semibold ">
                                  {" "}
                                  <Icon
                                    icon={data?.iconName}
                                    className="w-8 h-8"
                                  />
                                </span>
                              </label>
                              <input
                                name="iconName"
                                value={data?.iconName}
                                checked={
                                  formik.values.iconName === data?.iconName
                                }
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    "iconName",
                                    event.target.value
                                  )
                                }
                                type="checkbox"
                                className="text-slat-500  ml-[10px]  text-[#6b7280] w-5 h-5 font-bold mt-2   "
                              />
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>

                {/* Corresponding  address */}

                <div className="cancel-button-div">
                  <div className="    ">
                    <button
                      onClick={() => navigate("/menu")}
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

export default MenuForm;
