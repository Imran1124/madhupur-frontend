/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterNumberSpaceInput,allowCharacterInput } from '../../../../Components/Common/PowerupFunctions'
import ApiList from '../../../../Components/ApiList/ApiList'
import ApiHeader from '../../../../Components/ApiList/ApiHeader'
import BarLoader from '../../../../Components/Common/BarLoader'
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard'
import Tabs from '../Tabs'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors'

function FeeHeadMasterForm() {
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [feeHeadTypeList, setfeeHeadTypeList] = useState([]);
    const { api_editHead, api_postHead, api_getHeadById, api_fetcHeadTypeList } = ApiList()
    const navigate = useNavigate()
    const { id } = useParams()

    const validationSchema = yup.object({
        feeHead: yup.string().required('Enter fee head.'),
        feeHeadTypeId: yup.string().required('Select fee head type'),
        description: yup.string().required('Enter description.'),
    })


    const formik = useFormik({
        initialValues: {
            feeHead: '',
            feeHeadTypeId: '',
            description: ''
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
            feeHeadTypeId: values.feeHeadTypeId,
            feeHead: values?.feeHead,
            description: values?.description
        }
        if (id !== undefined) {
            url = api_editHead
            requestBody = requestBodyBase
            requestBody.id = id
            requestBody.status='active'
        } else {
            url = api_postHead
            requestBody = requestBodyBase
        }

        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    navigate('/feehead-master')
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
        AxiosInterceptors.post(api_getHeadById, requestBody, ApiHeader())
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
        formik.setFieldValue('id', data?.id)
        formik.setFieldValue('feeHead', data?.fee_head)
        formik.setFieldValue('feeHeadTypeId', data?.fee_head_type_id)
        formik.setFieldValue('feeHeadType', data?.fee_head_type)
        formik.setFieldValue('description', data?.description)
    }
    const fetchFeeHeadTypeList = () => {
        AxiosInterceptors.post(api_fetcHeadTypeList, {}, ApiHeader())
            .then(function (response) {
                if (response?.data?.status) {
                    setfeeHeadTypeList(response?.data?.data)
                } else {
                    activateBottomErrorCard(true, `${response?.data?.message}`)
                }
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                activateBottomErrorCard(true, 'Error occured while fetching data.')
            })
    }


    // CALLING API TO FETCH DATA IN EDIT CASE
    useEffect(() => {
        fetchFeeHeadTypeList()
        if (id !== undefined) {
            fetchEditData()
        }
    }, [])
console.log(feeHeadTypeList)

    // FUNCTION TO HANDLE ONCHANGE RESTRICTION
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        { name == 'feeHead' && formik.setFieldValue("feeHead", allowCharacterInput(value, formik.values.feeHead, 50)) }
        { name == 'feeHeadTypeId' && formik.setFieldValue("feeHeadTypeId", allowCharacterNumberSpaceInput(value, formik.values.feeHeadTypeId, 200)) }
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
          <div className='big-text'>Fee Head Master Form</div>
          <div className='small-text'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        {id ===undefined ? (
 <div className='tab-div'>
 <div className='add-button-master-div' >
     <button onClick={() => navigate('/feehead-master-form')} type="submit" className=" add-button-master">Add </button>
 </div>
</div>
           ) : null}  
            </div>

            {id!==undefined ? "" : (<Tabs listRoute={'/feehead-master'} formRoute={'/feehead-master-form'} />)}
            <div className='details-div'>
                <span className='detailes'>Details of Fee Head Master</span>
            </div>



            <div className='form-div'>
                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="form">

                        {/* Basic address */}
                        <div className="col-span-4 grid grid-cols-12">
                        <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Fee Head Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('feeHeadTypeId')} type="text" className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                                    placeholder="Select fee head type" >
                                    <option value=''>Select</option>
                                    {

                                        feeHeadTypeList?.map((data, index) => (
                                            <option  value={data?.id}>{data?.fee_head_type}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600  text-xs">{formik.touched.feeHeadTypeId && formik.errors.feeHeadTypeId ? formik.errors.feeHeadTypeId : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Fee Head<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('feeHead')} type="text" className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    placeholder="Enter fee head" />
                                <span className="text-red-600 text-xs">{formik.touched.feeHead && formik.errors.feeHead ? formik.errors.feeHead : null}</span>
                            </div>
                            
                            <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Description<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('description')} type="text" className={`form-control h-10 block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    placeholder="Enter description" />
                                <span className="text-red-600 text-xs">{formik.touched.description && formik.errors.description ? formik.errors.description : null}</span>
                            </div>

                        </div>

                        {/* Corresponding  address */}


                        <div className="cancel-button-div">
                            <div className='    '>
                                <button onClick={() => navigate('/feehead-master')} type="button" className="cancel-button">Back to List</button>
                            </div>
                            <div className='submit-button-div'>
                                <button type="submit" className=" cypress_next2_button submit-button">{id!==undefined ? "Update" :"Save"}</button>
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

export default FeeHeadMasterForm