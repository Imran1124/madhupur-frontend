import React from 'react';
import { useFormik, FormikProvider, Form } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import Rightlogo from '../../../assets/logo1.avif';

export default function LoginForm({ formik }) {
  const { handleSubmit, handleChange, values } = formik;
  const [showPassword, setShowPassword] = React.useState(false);

  //
  //

  return (
    <div className="block">
      <div className="h-auto w-auto bg-[#FFFFFF] border-2 max-[425px]:w-full max-[425px]:pl-4 max-[375px]:pr-8 max-[375px]:pl-8 flex items-center justify-center py-1 pr-20  rounded-[10px] pb-[20px]">
        <div className="w-full h-full">
          <div className="text-[cornflowerblue] flex flex-row items-start justify-start w-full ml-5 gap-5">
            <div className="flex justify-start items-center">
              <input
                type="radio"
                name="userType"
                className="ml-2"
                checked={formik.values.userType === 'admin'}
                onChange={() => formik.setFieldValue('userType', 'admin')}
              />
              <label className="ml-2 text-lg">Admin</label>
            </div>
            <div className="flex justify-start items-center">
              <input
                type="radio"
                name="userType"
                className="ml-2"
                checked={formik.values.userType === 'employee'}
                onChange={() => formik.setFieldValue('userType', 'employee')}
              />
              <label className="ml-2 text-lg">Employee</label>
            </div>
          </div>
          <img src={Rightlogo} alt="user" className="image2" />
          <a href="/csms/landing-csms">
            <span className="flex text-[cornflowerblue] ">
              <BiArrowBack title="Back to Home" className="mt-1 ml-6" />
              Go to Home
            </span>
          </a>
        </div>

        <div className="max-[425px]:w-full ml-4">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="pt-4">
                <div className="flex items-center justify-center">
                  <h1 className="flex items-center justify-start text-4xl font-bold text-[cornflowerblue] gill ">
                    {formik?.values?.userType === 'admin'
                      ? 'Admin'
                      : 'Employee'}
                  </h1>
                </div>
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
                  <span className="text-red-500 text-sm text-start">
                    {formik.errors.email}
                  </span>
                </div>
                <div className="my-[10%]">
                  <label className="flex items-start justify-start text-xl text-[cornflowerblue] font-bold ml-2 arial">
                    Password
                  </label>
                  <br />
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className="border-b-2 border-[gainsboro] h-10 w-full pl-4"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      {showPassword ? (
                        <AiFillEye
                          className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-red-500 text-sm text-start">
                    {formik.errors.password}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="mx-[10%]">
                    <button
                      type="submit"
                      className="bg-[cornflowerblue] text-white flex items-center justify-center text-xl font-bold mt-4 mx-24 px-3 py-3 rounded-lg gill"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}
