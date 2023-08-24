/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterInput } from '../../../../Components/Common/PowerupFunctions'
import ApiList from '../../../../Components/ApiList/ApiList'
import ApiHeader from '../../../../Components/ApiList/ApiHeader'
import BarLoader from '../../../../Components/Common/BarLoader'
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard'
import Tabs from '../Tabs'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors'

function FeeHeaderTypeMasterForm() {
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const { api_getHeadTypeById, api_postHeadType, api_editHeadType } = ApiList()
    const navigate = useNavigate()
    const { id } = useParams()

    const validationSchema = yup.object({
        feeHeadType: yup.string().required('Enter fee head type.'),
        isAnnual: yup.boolean(),
        // isOptional: yup.boolean(),
        // isLateFeeApplicable: yup.boolean(),
        // academicYr: yup.string().required('Enter fee head type.'),

    })


    const formik = useFormik({
        initialValues: {
            feeHeadType: '',
            // isAnnual: false,
            // isOptional: false,
            // isLateFeeApplicable: false,
            // academicYr: '',
        },

        onSubmit: (values, resetForm) => {
            console.log('at submit ', values)
            saveMasterForm(values)
        }
        , validationSchema
    })

    // FUNCTION TO SAVE MASTER DATA
    const saveMasterForm = (values) => {
        setisLoading(true)
        let url
        let requestBody
        let requestBodyBase = {
            feeHeadType: values.feeHeadType,
            // isAnnual: values?.isAnnual ? 1 : 0,
            // isOptional: values?.isOptional ? 1 : 0,
            // isLateFineApplicable: values?.isLateFeeApplicable ? 1 : 0,
            // academicYear: values?.academicYr
        }
        if (id !== undefined) {
            url = api_editHeadType
            requestBody = requestBodyBase
            requestBody.id = id
        } else {
            url = api_postHeadType
            requestBody = requestBodyBase
        }

        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    navigate('/feeheadtype-master')
                } else {
                    activateBottomErrorCard(true,  `${response?.data?.message}`)
                }
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                activateBottomErrorCard(true, 'Error occured in submitting form.')

                setisLoading(false)
            })
    }

    // FUNCTION TO FECTH DATA TO EDIT
    const fetchEditData = () => {
        setisLoading(true)
        seterroState(false)
        let requestBody = {
            id: id
        }
        AxiosInterceptors.post(api_getHeadTypeById, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    feedEditData(response?.data?.data)
                } else {
                    activateBottomErrorCard(true,  `${response?.data?.message}`)
                }
                setisLoading(false)

            })
            .catch(function (error) {
                console.log('= edit data error...', error)
                seterroState(true)
                setisLoading(false)
            })
    }

    // FUNCTION TO FEED EDIT DATA
    const feedEditData = (data) => {
        console.log('existing property details in prop address...', data)
        formik.setFieldValue('feeHeadType', data?.fee_head_type)
        // formik.setFieldValue('isAnnual', data?.is_annual)
        // formik.setFieldValue('isOptional', data?.is_optional)
        // formik.setFieldValue('isLateFeeApplicable', data?.is_latefee_applicable)
        // formik.setFieldValue('academicYr', data?.academic_year)
    }

    // CALLING API TO FETCH DATA IN EDIT CASE
    useEffect(() => {
        if (id !== undefined) {
            fetchEditData()
        }
    }, [])

    // FUNCTION TO HANDLE ONCHANGE RESTRICTION
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        { name == 'feeHeadType' && formik.setFieldValue("feeHeadType", allowCharacterInput(value, formik.values.feeHeadType, 50)) }
    }

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
         <div className={`main-div`}  >
    <div className='main-inner-div'>
            {isLoading && <BarLoader />}
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

            <div className="main-sub-div">
            <div className='main-sub-inner-div'>
          <div className='text-div'>
          <div className='big-text'>Fee Head Type Master Form</div>
          <div className='small-text'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        {id ===undefined ? (
 <div className='tab-div'>
 <div className='add-button-master-div' >
     <button onClick={() => navigate('/feeheadtype-master-form')} type="submit" className=" add-button-master">Add </button>
 </div>
</div>
           ) : null}  
            </div>

            {id!==undefined ? "" : (<Tabs listRoute={'/feeheadtype-master'} formRoute={'/feeheadtype-master-form'} />)}
            <div className='details-div'>
                <span className='detailes'>Details of Fee Head Type Master</span>
            </div>



            <div className='form-div'>
                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="form">

                        {/* Basic address */}
                        <div className="col-span-4 grid grid-cols-12">
                        <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Academic Year<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('academicYr')} disabled type="text" className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                                    placeholder="Select fee head type" >
                                    <option value={'2022-2023'}>2022-2023</option>
                                    <option value={'2023-2024'}>2023-2024</option>
                                </select>
                                <span className="text-red-600 text-xs">{formik.touched.academicYr && formik.errors.academicYr ? formik.errors.academicYr : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Fee Head Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('feeHeadType')} type="text" className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    placeholder="Enter fee head type" />
                                <span className="text-red-600  text-xs">{formik.touched.feeHeadType && formik.errors.feeHeadType ? formik.errors.feeHeadType : null}</span>
                            </div>
                            

                            {/* <div className="form-group col-span-12 md:col-span-2 form-check mb-2 md:px-4 flex items-center">
                                <input {...formik.getFieldProps('isAnnual')} type="checkbox"
                                    className="cypress_addressCheckbox w-6 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800 ml-2"> <span className='inline text-gray-700 text-sm font-semibold'>Is Annual? </span></label>
                            </div>
                            <div className="form-group col-span-12 md:col-span-2 form-check mb-2 md:px-4 flex items-center">
                                <input {...formik.getFieldProps('isOptional')} type="checkbox"
                                    className="cypress_addressCheckbox w-6 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800 ml-2"> <span className='inline text-gray-700 text-sm font-semibold'>Is Optional? </span></label>
                            </div>
                            <div className="form-group col-span-12 md:col-span-2 form-check mb-2 md:px-4 flex items-center">
                                <input {...formik.getFieldProps('isLateFeeApplicable')} type="checkbox"
                                    className="cypress_addressCheckbox w-6 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800 ml-2"> <span className='inline text-gray-700 text-sm font-semibold'>Is Fee Applicable? </span></label>
                            </div> */}
                        </div>

                        {/* Corresponding  address */}


                        <div className="cancel-button-div">
                            <div className='    '>
                                <button onClick={() => navigate('/feeheadtype-master')} type="button" className="cancel-button">Back to List</button>
                            </div>
                            <div className='submit-button-div'>
                                <button type="submit" className="cypress_next2_button submit-button">{id!==undefined ? "Update" : "Save"}</button>
                            </div>
                        </div>

                    </div>

                </form>

            </div>
            </div>
            </div>
        </>
    )
}

export default FeeHeaderTypeMasterForm