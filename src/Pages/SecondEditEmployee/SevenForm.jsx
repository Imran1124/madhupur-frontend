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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SevenForm(props) {
  const navigate = useNavigate();
  const [categoryByNameData, setCategoryByNameData] = useState();
const [isLoading, setisLoading] = useState(false);
const [erroState, seterroState] = useState(false);
const [currentId, setcurrentId] = useState(null);
const[editadta,setEditdata]=useState("")
const { api_getcategorybynameData,api_showByFamilyId,api_delteByFamilyId,api_postByFamilyId,api_editByFamilyId } = ApiList();
const getcategorybynameUser = () => {
  setisLoading(true);
  AxiosInterceptors.post(api_getcategorybynameData, {}, ApiHeader())
    .then(function (response) {
      console.log('Category By Name..', response?.data);
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

const formik = useFormik({
  enableReinitialize: true,
  initialValues: {
    f_member_name: '',
    f_member_relation: '',
    f_member_dob: '',
    upload_f_member_image: ''
  },
 
  onSubmit: (values) => {
    console.log("hello",values)
    saveMasterForm(values);
    formik.resetForm()
  }
});
const saveMasterForm = (values) => {
  const formdata = new FormData();
  formdata.append('empNo', props?.editValue?.emp_no)
  formdata.append("fMemberName",values?.f_member_name);
  formdata.append("fMemberRelation",values?.f_member_relation_name );
  formdata.append("fMemberDob", values?.f_member_dob);
  formdata.append("uploadFMemberImage", values?.upload_f_member_image );
  console.log(values);
  setisLoading(true);
  let url;
  let requestBody;
  let requestBodyBase =formdata
  if (currentId !== null) {
    url = api_editByFamilyId;
    requestBody = requestBodyBase;
    requestBody.id = formdata.append('id', currentId);
  } else if (
    values?.f_member_name !== '' &&
    currentId == null
  ) {
    url = api_postByFamilyId;
    requestBody = requestBodyBase;
  }

  AxiosInterceptors.post(url, requestBody, ApiHeader())
    .then(function (response) {
      console.log('bank master..', response?.data?.data);
      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: `Section`,
          text: currentId!==null ? "Data Updated Successfully!" : "Data Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        toast.success(
          currentId !== null
            ? 'Data Updated Successfully!'
            : 'Data Added Successfully'
        );
        props?.getemployeeFamilyById(props?.id)
        setcurrentId(null);
      } else {
        // activateBottomErrorCard(true, `${response?.data?.message}`);
        toast.error(`${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log('==2 error list...', error);
      // activateBottomErrorCard(true, "Error occured in submitting form.");
      toast.warning('Error occured in submitting form.');
      setisLoading(false);
    });
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
const fetchEditData = (getid) => {
  setisLoading(true);
  let requestBody = {
    id: getid
  };
  AxiosInterceptors.post(api_showByFamilyId, requestBody, ApiHeader())
    .then(function (response) {
      console.log('fetch edit data response..', response?.data?.data);
      if (response?.data?.status) {
        sectionEditData(response?.data?.data);
      } else {
        // activateBottomErrorCard(true, `${response?.data?.message}`);
        toast.error(`${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log('= edit data error...', error);
      seterroState(true);
      setisLoading(false);
    });
};

//Fetch Edit Data
const sectionEditData = (data) => {
  console.log('existing property details in prop address...', data);
  formik.setFieldValue('id', data?.id);
  formik.setFieldValue('f_member_name', data?.f_member_name);
    formik.setFieldValue('f_member_relation', data?.f_member_relation_name);
    formik.setFieldValue('f_member_dob', data?.f_member_dob);
    formik.setFieldValue(
      'upload_f_member_image',""
    );
  setEditdata(data?.upload_f_member_image);      
};
const handleDelete=(getid)=>{
  setisLoading(true);
  let requestBody = {
    id: getid
  };
  AxiosInterceptors.post(api_delteByFamilyId, requestBody, ApiHeader())
  .then(function (response) {
    console.log('fetch edit data response..', response?.data?.data);
    if (response?.data?.status) {
      props?.getemployeeFamilyById(props?.id)
    } else {
      // activateBottomErrorCard(true, `${response?.data?.message}`);
      toast.error(`${response?.data?.message}`);
    }
    setisLoading(false);
  })
  .catch(function (error) {
    console.log('= edit data error...', error);
    seterroState(true);
    setisLoading(false);
  });
}
  return (
    <>
      {isLoading && <BarLoader />}
      <div className="h-[70vh] w-[90%] bg-white overflow-auto  border border-slate-300 rounded-[15px]  max-[600px]:w-[95%]  max-[600px]:pb-[7vh] max-[320px]:pb-[10vh]">
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
                     {formik.values.upload_f_member_image && currentId !== null
                        ? `${formik.values.upload_f_member_image?.name}`.slice(
                            `${formik.values.upload_f_member_image?.name}`.lastIndexOf(
                              '-'
                            ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '/'
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '\\'
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '.'
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                ' '
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                ','
                              ) + 1 ||
                              `${formik.values.eventDocs?.name}`.lastIndexOf(
                                '?'
                              ) + 1,
                            `${formik.values.eventDocs?.name}`.length
                          )
                        : formik.values.upload_f_member_image && currentId === null
                        ? formik.values.upload_f_member_image?.name
                        : editadta && currentId!==null
                        ? (<img
                          src={`${BackendUrl}/${editadta}`}
                        />
                         )
                        :  'No file selected'}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="next-btn">
               {currentId!==null ? 'Update Form' : 'Add Form'}
            </button>
          </div>
          <br />
          <div className="mb-[1vh]">
            <div className="w-full mt-[10px] flex justify-center items-center mb-[10px]   max-[768px]:pl-1 max-[768px]:pr-2 overflow-auto  max-[768px]:w-[750px]">
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
                {props?.readymadeListData ? (
                    props?.readymadeListData &&
                    props?.readymadeListData.map((eachValue, index) => {
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
                            className='w-[10vh] h-[10vh]'
                              />
                            </td>
                            <td className="w-[23vh] flex items-start justify-start">
                              <button
                                type="button"
                                onClick={() => {
                                  setcurrentId(eachValue?.id);
                                  fetchEditData(eachValue?.id);
                                }}
                                className=" text-indigo-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <MdEditSquare size={30} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(eachValue?.id)}
                                className=" text-red-600 px-[5px] py-[2px] rounded-[5px]"
                              >
                                <RiDeleteBinFill size={30} />
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
        </form>
      </div>
    </>
  );
}
