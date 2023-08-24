/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { MdEditSquare } from 'react-icons/md';
import Img11 from '../../assets/image 24.png';
import Nodata from '../../assets/nodata.png';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiHeader2 from '../../Components/ApiList/ApiHeader2';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import { nullToNA } from '../../Components/Common/PowerupFunctions';
import { allowCharacterInput } from '../../Components/Common/PowerupFunctions';
import Swal from 'sweetalert2';
import BackendUrl from '../../Components/ApiList/BackendUrl';
import { FaFilePdf } from "react-icons/fa";

export default function SevenForm(props) {
  const navigate = useNavigate();
  const [ownerRecord, setOwnerRecord] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [relations, setRelation] = useState();
  const [MyFile, setMyFile] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [categoryByNameData, setCategoryByNameData] = useState();
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const { api_getcategorybynameData, api_editEmployeeData } = ApiList();
  const getcategorybynameUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getcategorybynameData, {}, ApiHeader())
      .then(function (response) {
        console.log('Category By Name..', response?.data?.data);
        if (response?.data) {
          setCategoryByNameData(response?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  useEffect(() => {
    getcategorybynameUser();
  }, []);
  useEffect(() => {
    setOwnerRecord(props?.editValue);
  }, [props?.editValue]);
  console.log(props?.editBasicValue?.emp_no);
  const func = (ownerRecord) => {
    const formData = new FormData();
    formData.append('id', props?.editBasicValue?.id);
    formData.append('empNo', props?.editBasicValue?.emp_no);
    formData.append('salutation', props?.allFormData?.basic_detail?.salutation);
    formData.append('firstName', props?.allFormData?.basic_detail?.first_name);
    formData.append(
      'middleName',
      props?.allFormData?.basic_detail?.middle_name
    );
    formData.append('lastName', props?.allFormData?.basic_detail?.last_name);
    formData.append('gender', props?.allFormData?.basic_detail?.gender);

    formData.append('category', props?.allFormData?.basic_detail?.category);
    formData.append('dob', props?.allFormData?.basic_detail?.dob);
    formData.append('doj', props?.allFormData?.basic_detail?.doj);
    formData.append('mobile', props?.allFormData?.basic_detail?.mobile);
    formData.append('email', props?.allFormData?.basic_detail?.email);
    formData.append(
      'bloodGroup',
      props?.allFormData?.basic_detail?.blood_group
    );
    formData.append(
      'department',
      props?.allFormData?.basic_detail?.department_id
    );
    formData.append(
      'employeeType',
      props?.allFormData?.basic_detail?.employee_type_id
    );
    formData.append(
      'maritalStatus',
      props?.allFormData?.basic_detail?.marital_status
    );
    formData.append(
      'teachingTitle',
      props?.allFormData?.basic_detail?.teaching_title_id
    );
    formData.append(
      'uploadImage',
      props?.allFormData?.basic_detail?.upload_image
    );
    formData.append('aadharNo', props?.allFormData?.basic_detail?.aadhar_no);
    formData.append('disability', props?.allFormData?.basic_detail?.disability);
    formData.append(
      "pAddress1",
      props?.allFormData?.communication_detail?.p_address1
    );
    formData.append(
      "pAddress2",
      props?.allFormData?.communication_detail?.p_address2
    );
    formData.append(
      "cAddress1",
      props?.allFormData?.communication_detail?.c_address1
    );
    formData.append(
      "cAddress2",
      props?.allFormData?.communication_detail?.c_address2
    );
    formData.append(
      "pLocality",
      props?.allFormData?.communication_detail?.p_locality
    );
    formData.append(
      "cLocality",
      props?.allFormData?.communication_detail?.c_locality
    );
    formData.append(
      "pLandmark",
      props?.allFormData?.communication_detail?.p_landmark
    );
    formData.append(
      "cLandmark",
      props?.allFormData?.communication_detail?.c_landmark
    );
    formData.append(
      "pDistrict",
      props?.allFormData?.communication_detail?.p_district_id
    );
    formData.append(
      "cDistrict",
      props?.allFormData?.communication_detail?.c_district_id
    );
    formData.append(
      "pState",
      props?.allFormData?.communication_detail?.p_state_id
    );
    formData.append(
      "cState",
      props?.allFormData?.communication_detail?.c_state_id
    );
    formData.append(
      "pCountry",
      props?.allFormData?.communication_detail?.p_country_id
    );
    formData.append(
      "cCountry",
      props?.allFormData?.communication_detail?.c_country_id
    );
    formData.append(
      "pPincode",
      props?.allFormData?.communication_detail?.p_pincode
    );
    formData.append(
      "cPincode",
      props?.allFormData?.communication_detail?.c_pincode
    );
    formData.append(
      "fathersName",
      props?.allFormData?.communication_detail?.fathers_name
    );
    formData.append(
      "mothersName",
      props?.allFormData?.communication_detail?.mothers_name
    );
    formData.append(
      "fathersQualification",
      props?.allFormData?.communication_detail?.fathers_qualification
    );
    formData.append(
      "mothersQualification",
      props?.allFormData?.communication_detail?.mothers_qualification
    );
    formData.append(
      "fathersOccupation",
      props?.allFormData?.communication_detail?.fathers_occupation
    );
    formData.append(
      "mothersOccupation",
      props?.allFormData?.communication_detail?.mothers_occupation
    );
    formData.append("bank", props?.allFormData?.account_detail?.bank_id);
    formData.append(
      "accountNo",
      props?.allFormData?.account_detail?.account_no
    );
    formData.append(
      "accountType",
      props?.allFormData?.account_detail?.account_type
    );
    formData.append("ifscCode", props?.allFormData?.account_detail?.ifsc_code);
    formData.append(
      "branchName",
      props?.allFormData?.account_detail?.branch_name
    );
    formData.append(
      "nomineeName",
      props?.allFormData?.account_detail?.nominee_name
    );
    formData.append(
      "nomineeRelation",
      props?.allFormData?.account_detail?.nominee_relation
    );
    formData.append("panNo", props?.allFormData?.account_detail?.pan_no);
    formData.append("epfNo", props?.allFormData?.account_detail?.epf_no);
    formData.append("uanNo", props?.allFormData?.account_detail?.uan_no);
    formData.append("esiNo", props?.allFormData?.account_detail?.esi_no);
    formData.append("npsNo", props?.allFormData?.account_detail?.nps_no);

    props?.allFormData?.education_detail.forEach((obj, index) => {
      formData.append(
        `educationDetails[${index}][examPassed]`,
        obj?.exam_passed_name
      );
      formData.append(`educationDetails[${index}][board]`, obj?.board_uni_inst);
      formData.append(
        `educationDetails[${index}][passingYear]`,
        obj?.passing_year
      );
      formData.append(`educationDetails[${index}][divGrade]`, obj?.div_grade_name);
      formData.append(
        `educationDetails[${index}][marksObtained]`,
        obj?.marks_obtained
      );
      formData.append(
        `educationDetails[${index}][totalMarks]`,
        obj?.total_marks
      );
      formData.append(
        `educationDetails[${index}][percentage]`,
        obj?.percentage
      );
      formData.append(
        `educationDetails[${index}][uploadEduDoc]`,
        typeof(obj?.upload_edu_doc)=='object' ?  obj?.upload_edu_doc : ""
      );
    });
    props?.allFormData?.experience_details.forEach((obj, index) => {
      formData.append(
        `experienceDetails[${index}][nameOfOrg]`,
        obj?.name_of_org
      );
      formData.append(
        `experienceDetails[${index}][positionHead]`,
        obj?.position_head
      );
      formData.append(
        `experienceDetails[${index}][periodFrom]`,
        obj?.period_from
      );
      formData.append(`experienceDetails[${index}][periodTo]`, obj?.period_to);
      formData.append(`experienceDetails[${index}][salary]`, obj?.salary);
      formData.append(`experienceDetails[${index}][payGrade]`, obj?.pay_grade);
      formData.append(
        `experienceDetails[${index}][uploadExpLetterDocs]`,
        typeof(obj?.upload_exp_letter_docs)=='object' ?  obj?.upload_exp_letter_docs : ""
      );
    });
    ownerRecord.forEach((obj, index) => {
      console.log("like",obj,typeof(obj?.upload_f_member_image))
      formData.append(
        `familyDetails[${index}][fMemberName]`,
        obj?.f_member_name
      );
      formData.append(
        `familyDetails[${index}][fMemberRelation]`,
        obj?.f_member_relation_name
      );
      formData.append(`familyDetails[${index}][fMemberDob]`, obj?.f_member_dob);
      formData.append(
        `familyDetails[${index}][uploadFMemberImage]`,
        typeof(obj?.upload_f_member_image)=='object' ?  obj?.upload_f_member_image : ""
      );
    });
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You want to update the information!',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.value) {
        saveMasterForm(formData);
      }
    });
  };
console.log("like 2", props?.allFormData?.experience_details)
  const saveMasterForm = (formData) => {
    setisLoading(true);
    let url;
    let requestBody;

    url = api_editEmployeeData;
    requestBody = formData;

    AxiosInterceptors.post(url, requestBody, ApiHeader2())
      .then(function (response) {
        console.log('Edit Employee..', response?.data?.data);
        if (response?.data?.status === true) {
          navigate('/employee/view');
          Swal.fire({
            icon: 'success',
            title: `Updated`,
            text: `Information Updated Successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          activateBottomErrorCard(true, 'Error occured in submitting form.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured in submitting form.');

        setisLoading(false);
      });
  };

  const updatedata = () => {
    let tempData = [...ownerRecord];
    tempData[editIndex] = formik.values;
    setOwnerRecord(tempData);
    formik.resetForm();
    setMyFile(false);
  };
  const adddata = () => {
    if (
      formik.values.f_member_name !== '' ||
      formik.values.f_member_relation !== '' ||
      formik.values.f_member_dob !== '' 
    ) {
      setOwnerRecord([...ownerRecord, formik.values]);
      formik.resetForm();
    } else {
      // toast.warning("Fill Feilds");
    }
  };
  const formik = useFormik({
    initialValues: {
      f_member_name: '',
      f_member_relation: '',
      f_member_dob: '',
      upload_f_member_image: ''
    },

    onSubmit: () => {
      MyFile ? updatedata() : adddata();

      //   props?.setCounterFun(8);
    }
  });
  const nextFun = () => {
    props?.setFormDataFun('family_details', ownerRecord);
    props?.setFam_data(ownerRecord);
    func(ownerRecord);
  };
  const handleback = () => {
    props?.setCounterFun(5);
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    {
      name == 'f_member_name' &&
        formik.setFieldValue(
          'f_member_name',
          allowCharacterInput(value, formik.values.f_member_name, 30)
        );
    }
  };

  const removalrow = (index) => {
    setOwnerRecord((current) =>
      current.filter((record) => {
        if (current.indexOf(record) == index) {
        } else {
          return record;
        }
      })
    );
  };
  console.log(ownerRecord)
  const handlerow = (index, eachValue) => {
    formik.setFieldValue('f_member_name', eachValue.f_member_name);
    formik.setFieldValue('f_member_relation', eachValue.f_member_relation_name);
    formik.setFieldValue('f_member_dob', eachValue.f_member_dob);
    formik.setFieldValue(
      'upload_f_member_image',eachValue.upload_f_member_image ? eachValue.upload_f_member_image : formik.values.upload_f_member_image
    );
  };
  console.log(formik.values.upload_f_member_image)
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  return (
    <>
      {isLoading && <BarLoader />}
      <div className="h-[82vh] w-[70%] bg-white overflow-auto  border border-slate-300 rounded-[15px]  max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
        <form
          className=" ml-[1vh]   overflow-auto bg-white  "
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          encType="multipart/form-data"
        >
          <div className="mb-[1vh]">
            <h1
              style={{ zIndex: 100 }}
              className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280] pl-[52px]  bg-white w-full "
            >
              <div className="flex">
                <img
                  src={Img11}
                  alt="Basic"
                  className="mr-5 w-10 h-10 opacity-80"
                />{' '}
                <span className="flex items-center justify-center mt-2 text-[22px]">
                  Family Detail
                </span>
              </div>
            </h1>
            <hr className="mx-[40px]" />

            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleSatulations" className=" label">
                    Name
                  </label>
                  <br />
                  <input
                    name="f_member_name"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.f_member_name}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleEmail" className="label">
                    Relation
                  </label>
                  <br />
                  <select
                    name="f_member_relation"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.f_member_relation}
                  >
                    {categoryByNameData?.f_member_relation?.map((data) => (
                      <option value={data?.subCatName}>
                        {data?.subCatName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[95%] mt-[30px] flex mb-[20px] px-[10px] max-[917px]:block max-[917px]:w-[70%] max-[917px]:items-start max-[917px]:justify-start">
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleMiddlename" className="label2">
                    Date Of Birth
                  </label>
                  <input
                    name="f_member_dob"
                    className="input"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    onChange={formik.handleChange}
                    value={formik.values.f_member_dob}
                  />
                </div>
              </div>
              <div className="w-full mx-[10px]  px-[10px]">
                <div>
                  <label htmlFor="exampleGender" className="label">
                    Upload Image
                  </label>
                  <br />
                  <div className="block justify-start">
                    <label
                      htmlFor="upload_f_member_image"
                      className="form-control ml-[36px]  rounded-[10px] h-10 block w-full border border-gray-200 px-3 py-2 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      Choose File
                    </label>
                    <input
                      name="upload_f_member_image"
                      className="sr-only input2"
                      type="file"
                      id="upload_f_member_image"
                      accept="image/jpeg,image/jpg,image/png"
                      // value={formik.values.upload_f_member_image[0]}
                      onChange={(e) => {
                        formik.setFieldValue(
                          'upload_f_member_image',
                          e.target.files[0]
                        );
                      }}
                    />
                    {formik.values.upload_f_member_image
                      ? formik.values.upload_f_member_image?.name
                      : 'No file selected'}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                MyFile ? updatedata() : adddata();
              }}
              className="text-[2.2vh] bg-[#fde047] float-right font-bold text-gray-600 border border-[#fde047]   mr-[70px] py-[7px] px-[30px] rounded-[5px] m-[20px] hover:text-[#fde047] hover:border-[#fde047] hover:bg-white"
            >
              {MyFile ? 'Update Form' : 'Add Form'}
            </button>
          </div>
          <br />
          <div className="mb-[1vh]">
            <div className="w-[100%] mt-[10px] flex mb-[10px] p-[10px]  max-[768px]:pl-1 max-[768px]:pr-2 overflow-auto  max-[768px]:w-[750px]">
              <table className="justify-center items-center">
                <thead className=" text-black bg-[#98D4D2] text-[20px]  w-full   arimo border border-gray h-[2vh] ">
                  <tr className="py-2  w-full flex items-start justify-start text-center">
                    <th className="w-[10vh] flex items-center justify-center">
                      S.No
                    </th>
                    <th className="w-[23vh] flex items-start justify-start">
                      Family Name
                    </th>
                    <th className="w-[23vh] flex items-start justify-start">
                      Relation
                    </th>
                    <th className="w-[23vh] flex items-start justify-start">
                      Date Of Birth
                    </th>
                    <th className="w-[23vh] flex items-start justify-start">
                      Uploaded Image
                    </th>
                    <th className="w-[23vh] flex items-start justify-start">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ownerRecord ? (
                    ownerRecord &&
                    ownerRecord.map((eachValue, index) => {
                      console.log(eachValue)
                      return (
                        <>
                          <tr
                            className="py-2 pl-4 w-full text-[16px] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100"
                            key={index}
                          >
                            <td className="w-[10vh] flex items-start justify-start">
                              {nullToNA(index + 1)}
                            </td>
                            <td className="w-[23vh] flex items-start justify-start">
                              {nullToNA(eachValue.f_member_name)}
                            </td>
                            <td className="w-[23vh] flex items-start justify-start">
                              {nullToNA(eachValue.f_member_relation_name)}
                            </td>
                            <td className="w-[23vh] flex items-start justify-start">
                              {nullToNA(eachValue.f_member_dob)}
                            </td>
                            <td className="w-[23vh] flex items-start justify-start">
                           <img
                            src={`${BackendUrl}/${eachValue.upload_f_member_image}`}
                            alt="family"
                              />
                            </td>
                            <td className="w-[23vh] flex items-start justify-start">
                              <button
                                type="button"
                                onClick={() => {
                                  setMyFile(true);
                                  setEditIndex(index);
                                  handlerow(index, eachValue);
                                }}
                                className=" text-indigo-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <MdEditSquare size={30} />
                              </button>
                              {/* <button
                                type="button"
                                onClick={() => removalrow(index)}
                                className="text-red-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                {' '}
                                <RiDeleteBinFill size={20} />
                              </button> */}
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
          <div className="flex items-end justify-end pb-[20px] mr-[70px]  max-[768px]:block  max-[768px]:mr-0">
            <button type="button" className="back-btn" onClick={handleback}>
              BACK
            </button>
            <button onClick={() => nextFun()} className="next-btn">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
