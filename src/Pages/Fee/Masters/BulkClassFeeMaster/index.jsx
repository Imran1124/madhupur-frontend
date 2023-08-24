import React,{useEffect, useState} from 'react'
import FirstFeeAdd from "./FeeAddUpper";
import SecondFeeAdd from './FeeAddMiddle';
import ThirdFeeAdd from './FeeAddLast';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { months } from '../../../../constant';
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import ApiHeader from "../../../../Components/ApiList/ApiHeader";
import ApiList from "../../../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../../../Components/Common/AxiosInterceptors";

export default function FeeAdd() {
 const{api_fetcHeadTypeActiveList,api_fetcActiveHeadList,api_getactiveClassData,api_finance_year
    // ,api_fetchmonth
    ,api_classfeeadd} = ApiList()
 const navigate=useNavigate();
 const[feeHeadTypeList,setfeeHeadTypeList]=useState()
 const[months,setMonths]=useState([])
 const[feeHeadNameList,setfeeHeadNameList]=useState()
 const[financialList,setFinancialList]=useState()
 const[classList,setClassList]=useState()
 const [isLoading, setisLoading] = useState(false);
  const validationSchema = yup.object({ 
    fyId: yup.string().required('Required'),
    classId: yup.string().required('Required'),
    feeHeadType: yup.string().required('Required'),
    feeHeadName: yup.string().required('Required'),
    feeAmount: yup.string().required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      fyId: '',
      classId: '',
      feeHeadType: '',
      feeHeadName: '',
      feeAmount:'',
      description:'',
      datas:[]
      
    },
    onSubmit: async (values) => {
      console.log('at submit', values);
      let sendData=values?.datas.map((eachitem)=>{
        return {monthId:eachitem?.id,isMothChecked:eachitem?.inputValue,monthName:eachitem?.month_name,fyId:values?.fyId,classId:values?.classId, feeHeadTypeId:values?.feeHeadType,feeHeadId:values?.feeHeadName,feeAmount:eachitem?.inputValue===1 ? values.feeAmount : 0,description:values?.description}
      })
      console.log("hello",sendData)
      saveMasterForm(sendData);
      // formik.resetForm();
    },
    validationSchema
  });
const saveMasterForm=async(sendData)=>{
  try {
    const response = await AxiosInterceptors.post(`${api_classfeeadd}`, {"datas":sendData},ApiHeader());
    if (response.status == 200) {
      navigate('/csms/fee/table-view');
      // setSubmitting(false);
    }
  } catch (error) {
    console.log(error);
    // setSubmitting(false);
  }


}
  const fetchFeeHeadType=()=>{
    AxiosInterceptors.post(api_fetcHeadTypeActiveList, {}, ApiHeader())
    .then(function (response) {
      if (response?.data?.status) {
        setfeeHeadTypeList(response?.data?.data);
      } else {
        console.log(true, `${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log("==2 error list...", error);
      console.log(true, "Error occured while fetching data.");
    });
  }
  const fetchFeeHeadName=()=>{
    AxiosInterceptors.post(api_fetcHeadTypeActiveList, {}, ApiHeader())
    .then(function (response) {
      if (response?.data?.status) {
        setfeeHeadNameList(response?.data?.data);
      } else {
        console.log(true, `${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log("==2 error list...", error);
      console.log(true, "Error occured while fetching data.");
    });
}
const feeClass=()=>{
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
    .then(function (response) {
      if (response?.data?.status) {
        console.log(response?.data?.data);
        setClassList(response?.data?.data);
      } else {
        console.log(true, "Error occured while fetching data.");
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log("==2 error list...", error);
      console.log(true, "Error occured while fetching data.");
    });
}
const financialYear=()=>{
    setisLoading(true);
    AxiosInterceptors.post(api_finance_year, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setFinancialList(response?.data);
        } else {
          console.log(true, "Error occured while fetching data.");
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        console.log(true, "Error occured while fetching data.");
        setisLoading(false);
      });
}
const fetchmonths=async()=>{
  try {
    const response = await AxiosInterceptors.post(`${api_fetchmonth}`, {},ApiHeader());
    if (response.data.status == 200) {
      console.log(response.data);
      setMonths(response.data.data)
    }
  } catch (error) {
    console.log(error);
  }
}
console.log(months)
  useEffect(()=>{
    fetchFeeHeadType()
    fetchFeeHeadName()
    feeClass()
    financialYear()
    fetchmonths()
      },[])
      console.log(feeHeadTypeList,months)
  return (
    <>
    <div className='p-5 w-full h-full'>
        <div className='flex border border-gray-300 py-5  w-full  h-full relative mt-5'>
        <h1 className=' absolute mt-[-4vh] flex items-center justify-center ml-6 font-bold text-[2.5vh] px-1 bg-white '>Add Fee</h1>
        <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                // onChange={handleChange}
                onSubmit={formik.handleSubmit}
              >
      
          <FirstFeeAdd formik={formik} feeHeadTypeList={feeHeadTypeList} financialList={financialList} classList={classList}/>
          <SecondFeeAdd formik={formik} feeHeadNameList={feeHeadNameList}/>
          <ThirdFeeAdd formik={formik} months={months}/>
          <div className='flex items-center justify-center mt-1 w-full'>
<button type="submit" className='px-5 py-2 border border-indigo-500 text-indigo-500 rounded-[10px] bg-white mx-4 hover:text-white hover:bg-indigo-500'>Save</button>
<button type="cancel" onClick={()=>formik.resetForm()} className='px-5 py-2 border border-red-400 text-red-400 rounded-[10px] bg-white mx-4 hover:text-white hover:bg-red-400'>Cancel</button>
</div>
          </Form>
          </FormikProvider>
          </div>
        </div>
        
    </>
    
  )
}
