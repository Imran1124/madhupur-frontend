import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import CommonModal from '../Common/CommonModal';
import AxiosInterceptors from '../Common/AxiosInterceptors';
import ApiList from '../ApiList/ApiList';
import ApiHeader from '../ApiList/ApiHeader';
import BarLoader from '../Common/BarLoader';
import BottomErrorCard from '../Common/BottomErrorCard';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allowCharacterNumberInput } from '../Common/PowerupFunctions';
import * as yup from 'yup';

export default function subadminmodal(props) {
  const { isOpen, toggle } = props;
  const [erroState, seterroState] = useState(false);
  const[roledata,setRoledata]=useState([])
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_getRoleStudentById,
    get_active_role } = ApiList();

  const navigate = useNavigate();
  const initialValues = {
    id: "",
    roleId:""
  };
  useEffect(()=>{
    getRoleData()
  },[])
  const getRoleData=()=>{
    setisLoading(true);
    AxiosInterceptors.post(get_active_role, {}, ApiHeader())
      .then(function (response) {
        console.log("view Employee Data..", response?.data?.data);
        if (response?.data?.status === true) {
          setRoledata(
            response?.data?.data
          );
        } else {
          toast.error(`${response?.data?.message}`);
          
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        toast.warning("Error occured while fetching data.");

        setisLoading(false);
      });

  }
  const validationSchema = yup.object({
    roleId: yup.string().required('Select Role'),

  });
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      console.log(values);
      saveMasterForm(values);
    },
    validationSchema
  });
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      id:props?.currentId,
      roleId: parseInt(values.roleId)
    };

    url = api_getRoleStudentById;
    requestBody = requestBodyBase;

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('category master..', response?.data?.data);
        if (response?.data?.status === true) {
         toast.success("Role Successfully updated")
            navigate('/role/student');
            toggle()
          } else{
            toast.error(`${response?.data?.message}`);
          
          }
          setisLoading(false);
        } )
      .catch(function (error) {
        console.log('==2 error list...', error);
        toast.warning("Error occured while fetching data.");

        setisLoading(false);
      });
  };
 
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  };
  return (
    <>
      {isLoading && <BarLoader />}
      <CommonModal isOpen={isOpen}>
        <div
          toggle={toggle}
          className="flex justify-between w-full px-[20px] py-[20px] text-[2.5vh] font-bold bg-[#0F766E] text-white rounded-t-[15px]"
          close={<button onClick={() => toggle()}>×</button>}
        >
          <h1>Student Role</h1>
        </div>
        <div className="flex items-center  justify-center overflow-hidden bg-white rounded-b-[15px] h-auto max-[606px]:h-[35vh]">
          <div className="block w-full   m-[20px] max[784px]:m-[10]">
            <form
              // class="flex flex-col justify-center"
              onSubmit={formik.handleSubmit}
              onChange={handleChange}
            >
              <div className="w-full h-auto bg-white px-[20px] py-[20px] max[784px]:px-[0px]">
                <div className="m-3 block ">
                  <div className="flex max-[425px]:block">
                    <label className="w-[25vh] text-teal-900 mr-2 text-[2vh] flex items-center justify-center max-[625px]:w-full">
                      Role
                      <span className="text-red-600 ml-1 mr-1">*</span>
                    </label>
                    <div className="block">
                    <select
                    name="roleId"
                    className="w-[40vh] h-11  p-2 flex text-[2vh]  items-start justify-start  border border-[#E5E7E9] bg-white rounded-[5px] max-[825px]:w-full max-[825px]:h-full"
                    onChange={formik.handleChange}
                    value={formik.values.roleId}
                  >
                    <option value="">Select</option>
                    {roledata?.map((data) => (
                      <option value={data?.id}>
                        {data?.role_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm flex items-start justify-start ml-[40px]">
                    {formik.touched.roleId && formik.errors.roleId
                      ? formik.errors.roleId
                      : null}
                  </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full h-[8vh] flex items-center justify-center max-[768px]:block mb-5 max-[768px]:ml-5">
                <button
                  type="submit"
                  className="text-[2vh] bg-[#0F766E] text-white border border-[#0F766E]  py-[7px] px-[20px] rounded-[5px] m-[20px] hover:text-[#0F766E] hover:border-[#0F766E] hover:bg-white"
                  >
                  Update
                </button>
                <button
                  onClick={() => {
                    toggle();
                    props?.Link ? navigate(`${props?.Link}`) : null;
                  }}
                  type="cancel"
                  className="text-[2vh] border-red-600 border text-white bg-red-600 px-[20px] py-[7px]  rounded-[5px] hover:border-red-600 hover:bg-white hover:text-red-600"
                >
                  Cancel
                </button>
              </div>
              <div className="mb-5 w-full flex justify-center items-center max-[350px]:items-end max-[350px]:mt-12">
                <h1 className="text-gray-500">
                  Note : (<span className="text-red-600">*</span>) marks is
                  mandatory.
                </h1>
              </div>
            </form>
          </div>
        </div>
      </CommonModal>
    </>
  );
}
