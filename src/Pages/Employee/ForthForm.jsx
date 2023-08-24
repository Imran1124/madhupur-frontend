/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { RiDeleteBinFill } from 'react-icons/ri';
import { MdEditSquare } from 'react-icons/md';
import Img11 from '../../assets/image 22.png';
import Nodata from '../../assets/nodata.png';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import {
  allowNumberInput,
  nullToNA,
  allowCharacterInput
} from '../../Components/Common/PowerupFunctions';

export default function ForthForm(props) {
  const [ownerRecord, setOwnerRecord] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [localValue, setLocalValue] = useState(
    localStorage.getItem('employee number')
  );
  const [MyFile, setMyFile] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const updatedata = () => {
    let tempData = [...ownerRecord];
    tempData[editIndex] = formik.values;
    setOwnerRecord(tempData);
    formik.resetForm();
    setMyFile(false);
  };
  const adddata = () => {
    if (
      formik.values.name_of_org !== '' ||
      formik.values.position_head !== '' ||
      formik.values.period_from !== '' ||
      formik.values.period_to !== '' ||
      formik.values.salary !== '' ||
      formik.values.pay_grade !== '' ||
      formik.values.upload_exp_letter_docs !== ''
    ) {
      setOwnerRecord([...ownerRecord, formik.values]);
      formik.resetForm();
    } else {
      activateBottomErrorCard(true, 'Fill all Feilds');
    }
  };
  const formik = useFormik({
    initialValues: {
      name_of_org: '',
      position_head: '',
      period_from: '',
      period_to: '',
      salary: '',
      pay_grade: '',
      upload_exp_letter_docs: ''
    },

    onSubmit: () => {
      props?.setFormDataFun('experience_details', ownerRecord);
      props?.setCounterFun(6);
    }
  });
  const handleback = () => {
    props?.setCounterFun(4);
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == 'salary' &&
        formik.setFieldValue(
          'salary',
          allowNumberInput(value, formik.values.salary, 30)
        );
    }
    {
      name == 'name_of_org' &&
        formik.setFieldValue(
          'name_of_org',
          allowCharacterInput(value, formik.values.name_of_org, 30)
        );
    }
    {
      name == 'position_head' &&
        formik.setFieldValue(
          'position_head',
          allowCharacterInput(value, formik.values.position_head, 30)
        );
    }
  };

  const removerow = (index) => {
    setOwnerRecord((current) =>
      current.filter((record) => {
        if (current.indexOf(record) == index) {
        } else {
          return record;
        }
      })
    );
  };
  const handlerow = (index, eachValue) => {
    formik.setFieldValue('name_of_org', eachValue.name_of_org);
    formik.setFieldValue('position_head', eachValue.position_head);
    formik.setFieldValue('period_from', eachValue.period_from);
    formik.setFieldValue('period_to', eachValue.period_to);
    formik.setFieldValue('salary', eachValue.salary);
    formik.setFieldValue('pay_grade', eachValue.pay_grade);
    formik.setFieldValue(
      'upload_exp_letter_docs',
      eachValue.upload_exp_letter_docs
    );
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
      <div className="h-[82vh] w-[70%] bg-white overflow-auto  border border-slate-300 rounded-[15px] max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" mx-[1vh]   overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
            >
              <div className="flex w-full max-[833px]:block">
                <div className="flex justify-start items-center w-full">
                  <img
                    src={Img11}
                    alt="Basic"
                    className="mr-5 w-10 h-10 opacity-80"
                  />{' '}
                  <span className="flex items-center justify-center mt-2 text-[22px]">
                    Experience Detail
                  </span>
                </div>
                <div className="text-[20px] flex items-center justify-end mt-2 w-full mr-4">
                  <span className="bg-yellow-300 p-2">
                    Employee No:{localValue}
                  </span>
                </div>
              </div>
            </h1>
            <hr className="mx-[40px]" />
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Name of Organization
                  </label>
                  <br />
                  <input
                    name="name_of_org"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.name_of_org}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Position Head
                  </label>
                  <br />
                  <input
                    name="position_head"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.position_head}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className="label2">
                    Period From
                  </label>
                  <input
                    name="period_from"
                    className="input"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    onChange={formik.handleChange}
                    value={formik.values.period_from}
                  />
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className="label2">
                    Period To
                  </label>
                  <input
                    name="period_to"
                    className="input"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    onChange={formik.handleChange}
                    value={formik.values.period_to}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    salary
                  </label>
                  <br />
                  <input
                    name="salary"
                    className="input"
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onChange={formik.handleChange}
                    value={formik.values.salary}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Pay Grade
                  </label>
                  <br />
                  <input
                    name="pay_grade"
                    className="input"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.pay_grade}
                  />
                </div>
              </div>
            </div>

            <div className="w-[33%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Upload Document
                  </label>
                  <br />
                  <div className="block justify-start">
                      <label
                        htmlFor="upload_exp_letter_docs"
                        className="form-control ml-10 h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose File
                      </label>
                  <input
                    name="upload_exp_letter_docs"
                    className="sr-only input2"
                    type="file"
                    id="upload_exp_letter_docs"
                    accept=".pdf"
                    // value={formik.values.upload_exp_letter_docs[0]}
                    onChange={(e) => {
                      formik.setFieldValue("upload_exp_letter_docs", e.target.files[0]);
                    }}
                  />
                   {formik.values.upload_exp_letter_docs
                        ? formik.values.upload_exp_letter_docs?.name
                        : "No file selected"}
                </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                MyFile ? updatedata() : adddata();
              }}
              className="text-[20px] bg-[#fde047] float-right font-bold text-gray-600 border border-[#fde047]  mr-[70px]  py-[7px] px-[30px] rounded-[5px] m-[20px] hover:text-[#fde047] hover:border-[#fde047] hover:bg-white"
            >
              {MyFile ? 'Update Form' : 'Add Form'}
            </button>
          </div>

          <div className="mb-[1vh] ">
            <div className="w-[100%] mt-[10px] flex mb-[10px] p-[10px] max-[917px]:block max-[768px]:pl-1 max-[768px]:pr-2 overflow-auto  max-[768px]:w-[750px]">
              <table className="w-full justify-center items-center ">
                <thead className="  text-black bg-[#98D4D2] text-[17px]  w-full   arimo border border-gray h-[2vh] ">
                  <tr className="py-2 pl-4  w-full flex items-start justify-start text-center">
                    <th className="w-full flex items-start justify-start">
                      S.No
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Name of Org.
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Position Head
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Period From
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Period To
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Salary
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Pay Grade
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Document
                    </th>
                    <th className="w-full flex items-start justify-start">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ownerRecord.length > 0 ? (
                    ownerRecord &&
                    ownerRecord.map((eachValue, index) => {
                      return (
                        <>
                          <tr
                            className="py-2 pl-4 w-full text-[16px] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100"
                            key={index}
                          >
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(index + 1)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.name_of_org)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.position_head)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.period_from)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.period_to)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.salary)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.pay_grade)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              {nullToNA(eachValue.upload_exp_letter_docs?.name)}
                            </td>
                            <td className="w-full flex items-start justify-start">
                              <button
                                type="button"
                                onClick={() => {
                                  setMyFile(true);
                                  setEditIndex(index);
                                  handlerow(index, eachValue);
                                }}
                                className=" text-indigo-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <MdEditSquare size={20} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removerow(index)}
                                className="text-red-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <RiDeleteBinFill size={20} />
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="flex items-center justify-center opacity-[0.5] py-2 pl-4 w-full text-[16px]  verdana h-auto">
                        <img
                          src={Nodata}
                          alt="nodata"
                          className="w-[200px] h-[200px]"
                        />
                      </div>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="flex items-end justify-end pb-[20px] mr-[70px] max-[768px]:block max-[768px]:mr-0">
            <button type="button" className="back-btn" onClick={handleback}>
              BACK
            </button>

            <button type="submit" className="next-btn">
              SAVE & NEXT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
