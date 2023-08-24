import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import CommonModal from '../Common/CommonModal';
import AxiosInterceptors from '../Common/AxiosInterceptors';
import ApiList from '../ApiList/ApiList';
import ApiHeader from '../ApiList/ApiHeader';
import BarLoader from '../Common/BarLoader';
import BottomErrorCard from '../Common/BottomErrorCard';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { allowCharacterNumberInput } from '../Common/PowerupFunctions';
import * as yup from 'yup';

export default function subadminmodal(props) {
  const { isOpen, toggle } = props;
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { api_searchStudentByIdList } = ApiList();

  const navigate = useNavigate();
  const initialValues = {
    admissionNo: ''
  };
  const validationSchema = yup.object({
    admissionNo: yup.string().required('Admission Number is required feild')
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
      admissionNo: values.admissionNo
    };

    url = api_searchStudentByIdList;
    requestBody = requestBodyBase;

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('category master..', response?.data?.data);
        if (response?.data?.status === true) {
          if (response?.data?.data?.admission_no) {
            navigate('/add-new-student');
            localStorage.setItem(
              'admission_no',
              response?.data?.data?.admission_no
            );
           
          } else if (
            response?.data?.data?.id
          ) {
            navigate(`/edit-student/${response?.data?.data?.id}`);
            activateBottomErrorCard(true, 'Admission No. already existing');
          }
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
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == 'admissionNo' &&
        formik.setFieldValue('admissionNo', value.trim());
    }
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
      <CommonModal isOpen={isOpen}>
        <div
          toggle={toggle}
          className="flex justify-between w-full px-[20px] py-[20px] text-[2.5vh] font-bold bg-[#0F766E] text-white rounded-t-[15px]"
          close={<button onClick={() => toggle()}>×</button>}
        >
          <h1>Search Admission No</h1>
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
                    <label className="w-[25vh] mr-2 text-[2vh] text-teal-900 flex items-center justify-center max-[625px]:w-full">
                      Admission No.
                      <span className="text-red-600 ml-1 mr-1">*</span>
                    </label>
                    <div className="block">
                      <input
                        name="admissionNo"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.admissionNo}
                        className="w-[40vh] h-11  p-3 flex text-[2vh]  items-start justify-start  border border-[#E5E7E9] bg-white rounded-[5px] max-[825px]:w-full max-[825px]:h-full"
                      />
                      <br />
                      <span className="text-red-600 text-xs">
                        {formik.touched.admissionNo && formik.errors.admissionNo
                          ? formik.errors.admissionNo
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full h-[8vh] flex items-center justify-center max-[768px]:block mb-5 max-[768px]:ml-5">
                <button
                  type="submit"
                   className="text-[2vh] bg-[#0F766E] text-white border border-[#0F766E]  py-[7px] px-[20px] rounded-[5px] m-[20px] hover:text-[#0F766E] hover:border-[#0F766E] hover:bg-white"
                  >
                  Search
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
