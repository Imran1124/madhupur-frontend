/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

const StudentForm = ({id}) => {

  const [editState, setEditState] = useState(false)
  
  useEffect(() => {
    id != null ? setEditState(true) : setEditState(false)
  },[id])

  const validationSchema = yup.object({
    admissionNo : yup.string().required("Admission no. required"),
    studentName : yup.string().required("Student name required"),
    fatherName : yup.string().required("Father name required"),
    dob : yup.string().required("Date of birth required"),
    deductionGroup : yup.string().required("Deduction group required"),
  })

  const formik = useFormik({
    initialValues: {
      admissionNo : '',
      studentName : '',
      fatherName: "",
      dob: "",
      deductionGroup : ""
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      submitFun(values)
    },validationSchema
  })

  const submitFun = (values) => {

  }
    
  return (
    <>

    <div className='relative'>

      <h1 className='text-gray-600 text-xl mt-6 w-full border-b-2 pb-2'>Details Of Student</h1>
      
      <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className='text-gray-600 mt-4 flex items-center flex-wrap gap-5'>
        
        <div className='flex flex-col w-[30%] gap-1'>
          <label className='text-sm' htmlFor="admissionNo">Admission No.</label>
          <input type="text" name="admissionNo" id="admissionNo" className='rounded-md shadow-sm border border-gray-200 px-2 py-1.5 focus:outline-none focus:border-gray-400 text-sm' placeholder='Enter admssion no.' value={formik.values.admissionNo} />
          {formik.touched.admissionNo && formik.errors.admissionNo && <span className='text-xs text-red-500'>{formik.errors.admissionNo}</span>}
        </div>

        <div className='flex flex-col w-[30%] gap-1'>
          <label className='text-sm' htmlFor="studentName">Student Name</label>
          <input type="text" name="studentName" id="studentName" className='rounded-md shadow-sm border border-gray-200 px-2 py-1.5 focus:outline-none focus:border-gray-400 text-sm' placeholder='Enter student name' value={formik.values.studentName} />
          {formik.touched.studentName && formik.errors.studentName && <span className='text-xs text-red-500'>{formik.errors.studentName}</span>}
        </div>

        <div className='flex flex-col w-[30%] gap-1'>
          <label className='text-sm' htmlFor="fatherName">Father Name</label>
          <input type="text" name="fatherName" id="fatherName" className='rounded-md shadow-sm border border-gray-200 px-2 py-1.5 focus:outline-none focus:border-gray-400 text-sm' placeholder='Enter father name' value={formik.values.fatherName} />
          {formik.touched.fatherName && formik.errors.fatherName && <span className='text-xs text-red-500'>{formik.errors.fatherName}</span>}
        </div>

        <div className='flex flex-col w-[30%] gap-1'>
          <label className='text-sm' htmlFor="dob">Date Of Birth</label>
          <input type="date" name="dob" id="dob" className='rounded-md shadow-sm border border-gray-200 px-2 py-1.5 focus:outline-none focus:border-gray-400 text-sm' placeholder='Select dob' value={formik.values.dob} />
          {formik.touched.dob && formik.errors.dob && <span className='text-xs text-red-500'>{formik.errors.dob}</span>}
        </div>

        <div className='flex flex-col w-[30%] gap-1'>
          <label className='text-sm' htmlFor="deductionGroup">Deduction Group</label>
          <input type="text" name="deductionGroup" id="deductionGroup" className='rounded-md shadow-sm border border-gray-200 px-2 py-1.5 focus:outline-none focus:border-gray-400 text-sm' placeholder='Enter deduction group' value={formik.values.deductionGroup} />
          {formik.touched.deductionGroup && formik.errors.deductionGroup && <span className='text-xs text-red-500'>{formik.errors.deductionGroup}</span>}
        </div>

        <button type='submit' className="text-white bg-green-500 hover:bg-green-600 rounded-md px-4 py-1 self-end bottom-0">{editState? "Update" : "Save"}</button>

      </form>

    </div>
    
    </>
  )
}

export default StudentForm