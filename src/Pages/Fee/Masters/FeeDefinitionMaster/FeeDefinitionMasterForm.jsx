/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterNumberSpaceInput, allowNumberInput } from '../../../../Components/Common/PowerupFunctions'
import ApiList from '../../../../Components/ApiList/ApiList'
import ApiHeader from '../../../../Components/ApiList/ApiHeader'
import BarLoader from '../../../../Components/Common/BarLoader'
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard'
import Tabs from '../Tabs'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors'
import CommonModal from '../../../../Components/Common/CommonModal'

function FeeDefinitionMasterForm() {
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [classList, setclassList] = useState([]);
    const { api_getClassFeeDefById, api_editClassFeeDef, api_postClassFeeDef, api_getClassData } = ApiList()
    const navigate = useNavigate()
    const { id } = useParams()

    const validationSchema = yup.object({
        classId: yup.string().required('Enter fee head type.'),
        janFee: yup.string().required('Enter fee.'),
        febFee: yup.string().required('Enter fee.'),
        marchFee: yup.string().required('Enter fee.'),
        aprilFee: yup.string().required('Enter fee.'),
        mayFee: yup.string().required('Enter fee.'),
        juneFee: yup.string().required('Enter fee.'),
        julyFee: yup.string().required('Enter fee.'),
        augFee: yup.string().required('Enter fee.'),
        septFee: yup.string().required('Enter fee.'),
        OctFee: yup.string().required('Enter fee.'),
        novFee: yup.string().required('Enter fee.'),
        decFee: yup.string().required('Enter fee.'),
        janBusFee: yup.string().required('Enter bus fee.'),
        febBusFee: yup.string().required('Enter bus fee.'),
        marchBusFee: yup.string().required('Enter bus fee.'),
        aprilBusFee: yup.string().required('Enter bus fee.'),
        mayBusFee: yup.string().required('Enter bus fee.'),
        juneBusFee: yup.string().required('Enter bus fee.'),
        julyBusFee: yup.string().required('Enter bus fee.'),
        augBusFee: yup.string().required('Enter bus fee.'),
        septBusFee: yup.string().required('Enter bus fee.'),
        octBusFee: yup.string().required('Enter bus fee.'),
        novBusFee: yup.string().required('Enter bus fee.'),
        decBusFee: yup.string().required('Enter bus fee.'),

    })


    const formik = useFormik({
        initialValues: {
            classId: '',
            janFee: '',
            febFee: '',
            marchFee: '',
            aprilFee: '',
            mayFee: '',
            juneFee: '',
            julyFee: '',
            augFee: '',
            septFee: '',
            OctFee: '',
            novFee: '',
            decFee: '',
            janBusFee: '',
            febBusFee: '',
            marchBusFee: '',
            aprilBusFee: '',
            mayBusFee: '',
            juneBusFee: '',
            julyBusFee: '',
            augBusFee: '',
            septBusFee: '',
            octBusFee: '',
            novBusFee: '',
            decBusFee: '',
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
            classId: values?.classId,
            janFee: values?.janFee,
            febFee: values?.febFee,
            marFee: values?.marchFee,
            aprFee: values?.aprilFee,
            mayFee: values?.mayFee,
            junFee: values?.juneFee,
            julFee: values?.julyFee,
            augFee: values?.augFee,
            sepFee: values?.septFee,
            octFee: values?.OctFee,
            novFee: values?.novFee,
            decFee: values?.decFee,

            janBusFee: values?.janBusFee,
            febBusFee: values?.febBusFee,
            marBusFee: values?.marchBusFee,
            aprBusFee: values?.aprilBusFee,
            mayBusFee: values?.mayBusFee,
            junBusFee: values?.juneBusFee,
            julBusFee: values?.julyBusFee,
            augBusFee: values?.augBusFee,
            sepBusFee: values?.septBusFee,
            octBusFee: values?.octBusFee,
            novBusFee: values?.novBusFee,
            decBusFee: values?.decBusFee

        }
        if (id !== undefined) {
            url = api_editClassFeeDef
            requestBody = requestBodyBase
            requestBody.id = id
        } else {
            url = api_postClassFeeDef
            requestBody = requestBodyBase
        }

        console.log('before submit definition', requestBody)
        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    navigate('/feedefinition-master')
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting form.')
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
        AxiosInterceptors.post(api_getClassFeeDefById, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    feedEditData(response?.data?.data)
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
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
        formik.setFieldValue('classId', data?.class_id)
        formik.setFieldValue('janFee', data?.feb_fee)
        formik.setFieldValue('febFee', data?.mar_fee)
        formik.setFieldValue('marchFee', data?.mar_fee)
        formik.setFieldValue('aprilFee', data?.apr_fee)
        formik.setFieldValue('mayFee', data?.may_fee)
        formik.setFieldValue('juneFee', data?.jun_fee)
        formik.setFieldValue('julyFee', data?.jul_fee)
        formik.setFieldValue('augFee', data?.aug_fee)
        formik.setFieldValue('septFee', data?.sep_fee)
        formik.setFieldValue('OctFee', data?.oct_fee)
        formik.setFieldValue('novFee', data?.nov_fee)
        formik.setFieldValue('decFee', data?.dec_fee)

        formik.setFieldValue('janBusFee', data?.jan_bus_fee)
        formik.setFieldValue('febBusFee', data?.feb_bus_fee)
        formik.setFieldValue('marchBusFee', data?.mar_bus_fee)
        formik.setFieldValue('aprilBusFee', data?.apr_bus_fee)
        formik.setFieldValue('mayBusFee', data?.may_bus_fee)
        formik.setFieldValue('juneBusFee', data?.jun_bus_fee)
        formik.setFieldValue('julyBusFee', data?.jul_bus_fee)
        formik.setFieldValue('augBusFee', data?.aug_bus_fee)
        formik.setFieldValue('septBusFee', data?.sep_bus_fee)
        formik.setFieldValue('octBusFee', data?.oct_bus_fee)
        formik.setFieldValue('novBusFee', data?.nov_bus_fee)
        formik.setFieldValue('decBusFee', data?.dec_bus_fee)

    }

    const fetchClassList = () => {
        AxiosInterceptors.post(api_getClassData, {}, ApiHeader())
            .then(function (response) {
                if (response?.data?.status) {
                    setclassList(response?.data?.data)
                } else {
                    activateBottomErrorCard(true, 'Error occured while fetching data.')
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
        fetchClassList()
        if (id !== undefined) {
            fetchEditData()
        }
    }, [])




    // FUNCTION TO HANDLE ONCHANGE RESTRICTION
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        { name == 'classId' && formik.setFieldValue("classId", allowNumberInput(value, formik.values.classId, 8)) }
        { name == 'janFee' && formik.setFieldValue("janFee", allowNumberInput(value, formik.values.janFee, 8)) }
        { name == 'febFee' && formik.setFieldValue("febFee", allowNumberInput(value, formik.values.febFee, 8)) }
        { name == 'marchFee' && formik.setFieldValue("marchFee", allowNumberInput(value, formik.values.marchFee, 8)) }
        { name == 'aprilFee' && formik.setFieldValue("aprilFee", allowNumberInput(value, formik.values.aprilFee, 8)) }
        { name == 'mayFee' && formik.setFieldValue("mayFee", allowNumberInput(value, formik.values.mayFee, 8)) }
        { name == 'juneFee' && formik.setFieldValue("juneFee", allowNumberInput(value, formik.values.juneFee, 8)) }
        { name == 'julyFee' && formik.setFieldValue("julyFee", allowNumberInput(value, formik.values.julyFee, 8)) }
        { name == 'augFee' && formik.setFieldValue("augFee", allowNumberInput(value, formik.values.augFee, 8)) }
        { name == 'septFee' && formik.setFieldValue("septFee", allowNumberInput(value, formik.values.septFee, 8)) }
        { name == 'OctFee' && formik.setFieldValue("OctFee", allowNumberInput(value, formik.values.OctFee, 8)) }
        { name == 'novFee' && formik.setFieldValue("novFee", allowNumberInput(value, formik.values.novFee, 8)) }
        { name == 'decFee' && formik.setFieldValue("decFee", allowNumberInput(value, formik.values.decFee, 8)) }
        { name == 'janBusFee' && formik.setFieldValue("janBusFee", allowNumberInput(value, formik.values.janBusFee, 8)) }
        { name == 'febBusFee' && formik.setFieldValue("febBusFee", allowNumberInput(value, formik.values.febBusFee, 8)) }
        { name == 'marchBusFee' && formik.setFieldValue("marchBusFee", allowNumberInput(value, formik.values.marchBusFee, 8)) }
        { name == 'aprilBusFee' && formik.setFieldValue("aprilBusFee", allowNumberInput(value, formik.values.aprilBusFee, 8)) }
        { name == 'mayBusFee' && formik.setFieldValue("mayBusFee", allowNumberInput(value, formik.values.mayBusFee, 8)) }
        { name == 'juneBusFee' && formik.setFieldValue("juneBusFee", allowNumberInput(value, formik.values.juneBusFee, 8)) }
        { name == 'julyBusFee' && formik.setFieldValue("julyBusFee", allowNumberInput(value, formik.values.julyBusFee, 8)) }
        { name == 'augBusFee' && formik.setFieldValue("augBusFee", allowNumberInput(value, formik.values.augBusFee, 8)) }
        { name == 'septBusFee' && formik.setFieldValue("septBusFee", allowNumberInput(value, formik.values.septBusFee, 8)) }
        { name == 'octBusFee' && formik.setFieldValue("octBusFee", allowNumberInput(value, formik.values.octBusFee, 8)) }
        { name == 'novBusFee' && formik.setFieldValue("novBusFee", allowNumberInput(value, formik.values.novBusFee, 8)) }
        { name == 'decBusFee' && formik.setFieldValue("decBusFee", allowNumberInput(value, formik.values.decBusFee, 8)) }
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
          <div className='big-text'>Fee Definition Master Form</div>
          <div className='small-text'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        {id ===undefined ? (
 <div className='tab-div'>
 <div className='add-button-master-div' >
     <button onClick={() => navigate('/feedefinition-master-form')} type="submit" className=" add-button-master">Add </button>
 </div>
</div>
           ) : null} 
            </div>

            {id!==undefined ? "" : ( <Tabs listRoute={'/feedefinition-master'} formRoute={'/feedefinition-master-form'} />)}
            <div className='details-div'>
                <span className='detailes'>Details of Fee Difinition Master</span>
            </div>



            <div className='form-div'>
                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="form">
                        <div className="col-span-4 grid grid-cols-12">
                            <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Class<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('classId')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                                    placeholder="Select class" >
                                    <option value=''>Select</option>

                                    {

                                        classList?.map((data, index) => (
                                            <option value={data?.id}>{data?.class_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.classId && formik.errors.classId ? formik.errors.classId : null}</span>
                            </div>

                        </div>

                        <div className='border-b border-gray-200 col-span-12 mb-2'></div>

                        {/* ROW Head */}
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>Month</div>
                                <div className='flex-1'>School Fee</div>
                                <div className='flex-1'>Bus Fee</div>

                            </div>
                        </div>

                        {/* ROW INPUTS */}
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>J</div>January Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('janFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.janFee && formik.errors.janFee ? formik.errors.janFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('janBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.janBusFee && formik.errors.janBusFee ? formik.errors.janBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>F</div>February Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('febFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.febFee && formik.errors.febFee ? formik.errors.febFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('febBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.febBusFee && formik.errors.febBusFee ? formik.errors.febBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>M</div>March Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('marchFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.marchFee && formik.errors.marchFee ? formik.errors.marchFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('marchBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.marchBusFee && formik.errors.marchBusFee ? formik.errors.marchBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>A</div>April Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('aprilFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.aprilFee && formik.errors.aprilFee ? formik.errors.aprilFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('aprilBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.aprilBusFee && formik.errors.aprilBusFee ? formik.errors.aprilBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>M</div>May Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('mayFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mayFee && formik.errors.mayFee ? formik.errors.mayFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('mayBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mayBusFee && formik.errors.mayBusFee ? formik.errors.mayBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>J</div>June Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('juneFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.juneFee && formik.errors.juneFee ? formik.errors.juneFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('juneBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.juneBusFee && formik.errors.juneBusFee ? formik.errors.juneBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>J</div>July Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('julyFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.julyFee && formik.errors.julyFee ? formik.errors.julyFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('julyBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.julyBusFee && formik.errors.julyBusFee ? formik.errors.julyBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>A</div>August Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('augFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.augFee && formik.errors.augFee ? formik.errors.augFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('augBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.augBusFee && formik.errors.augBusFee ? formik.errors.augBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>S</div>September Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('septFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.septFee && formik.errors.septFee ? formik.errors.septFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('septBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.septBusFee && formik.errors.septBusFee ? formik.errors.septBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>O</div>October Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('OctFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.OctFee && formik.errors.OctFee ? formik.errors.OctFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('octBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.octBusFee && formik.errors.octBusFee ? formik.errors.octBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>N</div>November Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('novFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.novFee && formik.errors.novFee ? formik.errors.novFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('novBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.novBusFee && formik.errors.novBusFee ? formik.errors.novBusFee : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 grid grid-cols-12 mt-1">
                            <div className="form-group mb-6 col-span-10 md:pr-4 flex">
                                <div className='flex-1'>  <div className='w-10 h-10 bg-cyan-50 rounded-full inline-flex justify-center items-center shadow-xl font-semibold text-[#08625d] mr-2'>D</div>December Levied</div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('decFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.decFee && formik.errors.decFee ? formik.errors.decFee : null}</span>
                                </div>
                                <div className='flex-1 relative px-10'>
                                    <input {...formik.getFieldProps('decBusFee')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.decBusFee && formik.errors.decBusFee ? formik.errors.decBusFee : null}</span>
                                </div>
                            </div>
                        </div>


                        <div className="secondcancel-button-div">
                            <div className='    '>
                                <button onClick={() => navigate('/feedefinition-master')} type="button" className="cancel-button">Back to List</button>
                            </div>
                            <div className='submit-button-div'>
                                <button type="submit" className="cypress_next2_button submit-button">Save</button>
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

export default FeeDefinitionMasterForm