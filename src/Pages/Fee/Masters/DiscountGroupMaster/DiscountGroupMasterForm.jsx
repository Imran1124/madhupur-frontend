/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterNumberSpaceInput, allowCharacterInput } from '../../../../Components/Common/PowerupFunctions'
import ApiList from '../../../../Components/ApiList/ApiList'
import ApiHeader from '../../../../Components/ApiList/ApiHeader'
import BarLoader from '../../../../Components/Common/BarLoader'
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard'
import Tabs from '../Tabs'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors'

function DiscountGroupMasterForm() {
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const[feecheck,setFeecheck]=useState(false)
    const[buscheck,setBuscheck]=useState(false)
    const { api_editDiscount, api_postDiscount, api_getDiscountById } = ApiList()
    const navigate = useNavigate()
    const { id } = useParams()

    const validationSchema = yup.object({
        discountGroup: yup.string().required('Enter discout group.'),
        // disPer: yup.string().required('Enter discount percentage.'),
        description: yup.string().required('Enter description.'),
        isClassFeeDiscount: yup.boolean(),
        isBusFeeDiscount: yup.boolean(),

    })


    const formik = useFormik({
        initialValues: {
            discountGroup: '',
            // disPer: '',
            description: '',
            // isClassFeeDiscount: false,
            // isBusFeeDiscount: false,
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
            discountGroup: values?.discountGroup,
            // discountPercent: values?.disPer,
            description: values?.description,
            // isClassFeeDiscount: values?.isClassFeeDiscount,
            // isBusFeeDiscount: values?.isBusFeeDiscount,
        }
        if (id !== undefined) {
            url = api_editDiscount
            requestBody = requestBodyBase
            requestBody.id = id
        } else {
            url = api_postDiscount
            requestBody = requestBodyBase
        }

        console.log('before post or edit...', requestBody)
        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    navigate('/discount-master')
                } else {
                    activateBottomErrorCard(true, `${response?.data?.message}`)
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
        let requestBody = {
            id: id
        }
        AxiosInterceptors.post(api_getDiscountById, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    feedEditData(response?.data?.data)
                } else {
                    activateBottomErrorCard(true, `${response?.data?.message}`)
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
        formik.setFieldValue('discountGroup', data?.discount_group)
        // formik.setFieldValue('disPer', data?.discount_percent)
        formik.setFieldValue('description', data?.description)
        // formik.setFieldValue('isClassFeeDiscount', data?.is_class_fee_discount)
        // formik.setFieldValue('isBusFeeDiscount', data?.is_bus_fee_discount)
        // setFeecheck(data?.is_class_fee_discount);
        // setBuscheck(data?.is_bus_fee_discount)
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
        { name == 'discountGroup' && formik.setFieldValue("discountGroup", allowCharacterInput(value, formik.values.discountGroup, 50)) }
        // { name == 'disPer' && formik.setFieldValue("disPer", allowNumberInput(value, formik.values.disPer, 3)) }
        { name == 'description' && formik.setFieldValue("description", allowCharacterNumberSpaceInput(value, formik.values.description, 200)) }
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
          <div className='big-text'>Discount Group Master Form</div>
          <div className='small-text'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        {id ===undefined ? (
 <div className='tab-div'>
 <div className='add-button-master-div' >
     <button onClick={() => navigate('/discount-master-form')} type="submit" className=" add-button-master">Add </button>
 </div>
</div>
           ) : null} 
            </div>

            {id!==undefined ? "" : (<Tabs listRoute={'/discount-master'} formRoute={'/discount-master-form'} />)}
            <div className='details-div'>
                <span className='detailes'>Details of Discount Master</span>
            </div>



            <div className='form-div'>
                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="form">

                        {/* Basic address */}
                        <div className="col-span-4 grid grid-cols-12">
                            <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Discount Group<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('discountGroup')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    placeholder="Enter discount group" />
                                <span className="text-red-600 text-xs">{formik.touched.discountGroup && formik.errors.discountGroup ? formik.errors.discountGroup : null}</span>
                            </div>
                            {/* <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Discount %<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('disPer')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    placeholder="Enter discount percent" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.disPer && formik.errors.disPer ? formik.errors.disPer : null}</span>
                            </div> */}
                            <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Description</label>
                                <input {...formik.getFieldProps('description')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    placeholder="Enter description" />
                                <span className="text-red-600 text-xs">{formik.touched.desc && formik.errors.desc ? formik.errors.desc : null}</span>
                            </div>

                            {/* <div className="form-group col-span-12 md:col-span-2 form-check mb-2 md:px-4 flex items-center">
                                <input {...formik.getFieldProps('isClassFeeDiscount')} type="checkbox" checked={formik.values.isClassFeeDiscount }
                                    className="cypress_addressCheckbox w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800 ml-2"> <span className='inline text-gray-700 text-sm font-semibold'>Is Class Fee Discount? </span></label>
                            </div>
                            <div className="form-group col-span-12 md:col-span-2 form-check mb-2 md:px-4 flex items-center">
                                <input {...formik.getFieldProps('isBusFeeDiscount')} type="checkbox" checked={formik.values.isBusFeeDiscount}
                                    className="cypress_addressCheckbox w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800 ml-2"> <span className='inline text-gray-700 text-sm font-semibold'>Is Late Fee Applicable? </span></label>
                            </div> */}

                        </div>

                        {/* Corresponding  address */}


                        <div className="cancel-button-div">
                            <div className='    '>
                                <button onClick={() => navigate('/discount-master')} type="button" className=" cancel-button">Back to List</button>
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

export default DiscountGroupMasterForm