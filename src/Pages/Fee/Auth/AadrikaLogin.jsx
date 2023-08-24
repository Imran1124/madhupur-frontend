/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EMAIL_REGEX, NO_SPACE_REGEX } from "../../../constant/index";
import Rightlogo from "../../../assets/logo1.avif";
import ApiList from "../../../Components/ApiList/ApiList";
import ApiHeader from "../../../Components/ApiList/ApiHeader";
import BarLoader from "../../../Components/Common/BarLoader";
import BottomErrorCard from "../../../Components/Common/BottomErrorCard";
import AxiosInterceptors from "../../../Components/Common/AxiosInterceptors";
import * as yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";

export default function AadrikaLogin() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_loginData } = ApiList();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Enter Email-Id")
      .matches(EMAIL_REGEX, "Please Enter Valid E-mail"),
    password: yup
      .string()
      .required("Enter Password")
      .matches(NO_SPACE_REGEX, "Please Enter Valid E-mail"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      saveMasterForm(values);
    },
    validationSchema,
  });
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      email: values.email,
      password: values?.password,
    };

    url = api_loginData;
    requestBody = requestBodyBase;
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("Login.....", response?.data);
        if (response?.data?.status === true) {
          const data = JSON.stringify(response?.data?.data);
          sessionStorage.setItem("loginInfo", data);
          navigate("/");
          Swal.fire({
            icon: "success",
            title: `User`,
            text: `User Login Successfully.`,
            showConfirmButton: false,
            timer: 1500,
          });
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
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <div className="h-full">
        <div className="h-full lg:w-full max-[425px]:w-full max-[425px]:px-4  flex flex-row items-center justify-center  py-[13%] image">
          <div className="block">
            <div className="h-auto w-auto bg-[#FFFFFF] border-2 max-[425px]:w-full max-[425px]:pl-4 max-[375px]:pr-8 max-[375px]:pl-8 flex items-center justify-center py-1 pr-20  rounded-[10px] pb-[20px]">
              <div className="w-full h-full">
                <div className="text-[cornflowerblue] flex flex-row items-start justify-start w-full ml-5">
                  <a href="/public-student-registration">
                    <span className="flex ">
                      <BiArrowBack title="Back to Home" className="mt-1 ml-2" />
                      Go to Home
                    </span>
                  </a>
                </div>
                <img src={Rightlogo} alt="user" className="image2" />
              </div>
              <div className="max-[425px]:w-full ml-4">
                <form onSubmit={formik.handleSubmit}>
                  <div className="pt-4">
                    <h1 className="flex items-center justify-center text-4xl font-bold text-[cornflowerblue] gill">
                      Aadrika Login
                    </h1>
                    <div className="my-[10%]">
                      <label className="flex items-start justify-start text-xl text-[cornflowerblue] font-bold ml-2 arial">
                        Email
                      </label>
                      <br />
                      <input
                        name="email"
                        placeholder="Email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="border-b-2 border-[gainsboro] h-10 w-full pl-4"
                      />
                    </div>
                    <div className="my-[10%]">
                      <label className="flex items-start justify-start text-xl text-[cornflowerblue] font-bold ml-2 arial">
                        Password
                      </label>
                      <br />
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="border-b-2 border-[gainsboro] h-10 w-full pl-4"
                      />
                    </div>
                    {/* <div className="flex items-end justify-end text-[cornflowerblue] underline arial mt-1">
                      <a href="/login-user">School Login</a>
                    </div>
                    <div className="flex items-end justify-end text-[cornflowerblue] underline arial mt-2">
                      <a href="/registration">School Registration</a>
                    </div> */}
                    <div className="mx-[10%]">
                      <button
                        type="submit"
                        className="bg-[cornflowerblue] text-white flex items-center justify-center text-xl font-bold mt-4 mx-24 px-3 py-3 rounded-lg gill"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

