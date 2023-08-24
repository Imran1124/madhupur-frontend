/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  allowCharacterNumberSpaceInput,
  allowNumberInput
} from '../../../../Components/Common/PowerupFunctions';
import ApiList from '../../../../Components/ApiList/ApiList';
import ApiHeader from '../../../../Components/ApiList/ApiHeader';
import BarLoader from '../../../../Components/Common/BarLoader';
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard';
import Tabs from '../Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors';
import { toast } from 'react-toastify';

function ClassFeeMasterForm() {
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [headList, setheadList] = useState([]);
  const [discountList, setdiscountList] = useState([]);
  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setclassList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [month, setMonth] = useState([]);
  const [condition, setCondition] = useState({});
  const [monthusedata, setMonthusedata] = useState('');
  const {
    api_getClassFeeById,
    api_getadmissionMonthtypeData,
    api_editClassFee,
    api_finance_year,
    api_postClassFee,
    api_fetcActiveHeadList,
    api_fetchDiscoutGroupList,
    api_getactiveClassData,
    api_section_group_map
  } = ApiList();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    classId: yup.string().required('Select class.'),
    // sectionId: yup.string().required('Select section.'),
    feeHeadId: yup.string().required('Select fee head.'),
    discount: yup.string().required('Enter discount %.'),
    feeHeadId: yup.string().required('Select Fee head head type')
  });

  const formik = useFormik({
    initialValues: {
      classId: 0,
      sectionId: 0,
      feeHeadId: 0,
      feeAmount: 0,
      discount: 0,
      janFee: 0,
      febFee: 0,
      marFee: 0,
      aprFee: 0,
      mayFee: 0,
      junFee: 0,
      julFee: 0,
      augFee: 0,
      sepFee: 0,
      octFee: 0,
      novFee: 0,
      decFee: 0
    },

    onSubmit: (values, resetForm) => {
      console.log('at submit ', values);
      saveMasterForm(values);
    },
    validationSchema,
    enableReinitialize: true
  });
  const valuearray = [];
  // FUNCTION TO SAVE MASTER DATA
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      classId: parseFloat(values?.classId),
      sectionId: parseFloat(values?.sectionId),
      feeHeadId: parseFloat(values?.feeHeadId),
      feeAmount: parseFloat(values?.feeAmount),
      discount: parseFloat(values?.discount),
      janFee: parseFloat(values?.janFee),
      febFee: parseFloat(values?.febFee),
      marFee: parseFloat(values?.marFee),
      aprFee: parseFloat(values?.aprFee),
      mayFee: parseFloat(values?.mayFee),
      junFee: parseFloat(values?.junFee),
      julFee: parseFloat(values?.julFee),
      augFee: parseFloat(values?.augFee),
      sepFee: parseFloat(values?.sepFee),
      octFee: parseFloat(values?.octFee),
      novFee: parseFloat(values?.novFee),
      decFee: parseFloat(values?.decFee)
    };
    if (id !== undefined) {
      url = api_editClassFee;
      requestBody = requestBodyBase;
      requestBody.id = id;
    } else {
      url = api_postClassFee;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('view fee master..', response?.data?.data);
        if (response?.data?.status) {
          navigate('/classfee-master');
        } else {
          toast.error(response?.data?.message);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        toast.error(error?.message);

        setisLoading(false);
      });
  };

  // FUNCTION TO FECTH DATA TO EDIT
  const fetchEditData = () => {
    setisLoading(true);
    let requestBody = {
      id: id
    };
    AxiosInterceptors.post(api_getClassFeeById, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetch edit data response..', response?.data?.data);
        if (response?.data?.status) {
          feedEditData(response?.data?.data);
        } else {
          activateBottomErrorCard(
            true,
            'Error occured in submitting deactivation application. Please try again later.'
          );
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('= edit data error...', error);
        seterroState(true);
        setisLoading(false);
      });
  };

  // FUNCTION TO FEED EDIT DATA
  const feedEditData = (data) => {
    console.log('existing property details in prop address...', data);
    formik.setFieldValue('classId', data?.class_id);
    formik.setFieldValue('sectionId', data?.section_id);
    formik.setFieldValue('feeHeadId', data?.fee_head_id);
    formik.setFieldValue('feeAmount', data?.fee_amount);
    formik.setFieldValue('discount', data?.discount);
    formik.setFieldValue('janFee', data?.jan_fee);
    formik.setFieldValue('febFee', data?.feb_fee);
    formik.setFieldValue('marFee', data?.mar_fee);
    formik.setFieldValue('aprFee', data?.apr_fee);
    formik.setFieldValue('mayFee', data?.may_fee);
    formik.setFieldValue('junFee', data?.jun_fee);
    formik.setFieldValue('julFee', data?.jul_fee);
    formik.setFieldValue('augFee', data?.aug_fee);
    formik.setFieldValue('sepFee', data?.sep_fee);
    formik.setFieldValue('octFee', data?.oct_fee);
    formik.setFieldValue('novFee', data?.nov_fee);
    formik.setFieldValue('decFee', data?.dec_fee);
  };

  const fetchFeeHeadList = () => {
    AxiosInterceptors.post(api_fetcActiveHeadList, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setheadList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };
  const fetchDiscountList = () => {
    AxiosInterceptors.post(api_fetchDiscoutGroupList, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setdiscountList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };
  const fetchClassList = () => {
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setclassList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };
  const fetchSectionList = (values) => {
    AxiosInterceptors.post(
      api_section_group_map,
      {
        classId: values
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setsectionList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');
      });
  };
  console.log(sectionList);
  const fetchFinanceList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_finance_year, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setfinanceYearList(response?.data);
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
  const fetchMonthList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getadmissionMonthtypeData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setMonth(response?.data);
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
  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
    fetchMonthList();
    fetchFeeHeadList();
    fetchDiscountList();
    fetchFinanceList();
    fetchClassList();
    if (id !== undefined) {
      fetchEditData();
    }
  }, []);
  // useEffect(() => {
  //   if (formik.values.classId) {
  //     fetchSectionList(formik.values.classId);
  //   }
  // }, [formik.values.classId]);
  let pair;
  useEffect(() => {
    let pair2 =
      (parseFloat(formik.values.janFee ? formik.values.janFee : 0) +
        parseFloat(formik.values.febFee ? formik.values.febFee : 0) +
        parseFloat(formik.values.marFee ? formik.values.marFee : 0) +
        parseFloat(formik.values.aprFee ? formik.values.aprFee : 0) +
        parseFloat(formik.values.mayFee ? formik.values.mayFee : 0) +
        parseFloat(formik.values.junFee ? formik.values.junFee : 0) +
        parseFloat(formik.values.julFee ? formik.values.julFee : 0) +
        parseFloat(formik.values.augFee ? formik.values.augFee : 0) +
        parseFloat(formik.values.sepFee ? formik.values.sepFee : 0) +
        parseFloat(formik.values.octFee ? formik.values.octFee : 0) +
        parseFloat(formik.values.novFee ? formik.values.novFee : 0) +
        parseFloat(formik.values.decFee ? formik.values.decFee : 0)) *
      (parseFloat(formik.values.discount ? formik.values.discount : 0) / 100);
    pair =
      parseFloat(formik.values.janFee ? formik.values.janFee : 0) +
      parseFloat(formik.values.febFee ? formik.values.febFee : 0) +
      parseFloat(formik.values.marFee ? formik.values.marFee : 0) +
      parseFloat(formik.values.aprFee ? formik.values.aprFee : 0) +
      parseFloat(formik.values.mayFee ? formik.values.mayFee : 0) +
      parseFloat(formik.values.junFee ? formik.values.junFee : 0) +
      parseFloat(formik.values.julFee ? formik.values.julFee : 0) +
      parseFloat(formik.values.augFee ? formik.values.augFee : 0) +
      parseFloat(formik.values.sepFee ? formik.values.sepFee : 0) +
      parseFloat(formik.values.octFee ? formik.values.octFee : 0) +
      parseFloat(formik.values.novFee ? formik.values.novFee : 0) +
      parseFloat(formik.values.decFee ? formik.values.decFee : 0) -
      pair2;
    formik.setFieldValue('feeAmount', pair);
  }, [
    formik.values.janFee,
    formik.values.febFee,
    formik.values.marFee,
    formik.values.aprFee,
    formik.values.mayFee,
    formik.values.junFee,
    formik.values.julFee,
    formik.values.augFee,
    formik.values.sepFee,
    formik.values.octFee,
    formik.values.novFee,
    formik.values.decFee,
    formik.values.discount
  ]);

  // FUNCTION TO HANDLE ONCHANGE RESTRICTION
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == 'feeHeadId') {
      let selectName = e.target.selectedOptions[0].text;
      let selectedValue = e.target.selectedOptions[0].value;
      setFeeHeadValue(selectName, selectedValue);
      return;
    }
    {
      name == 'janFee' &&
        formik.setFieldValue(
          'janFee',
          allowNumberInput(value, formik.values.janFee, 5)
        );
    }
    {
      name == 'febFee' &&
        formik.setFieldValue(
          'febFee',
          allowNumberInput(value, formik.values.febFee, 5)
        );
    }
    {
      name == 'marFee' &&
        formik.setFieldValue(
          'marFee',
          allowNumberInput(value, formik.values.marFee, 5)
        );
    }
    {
      name == 'aprFee' &&
        formik.setFieldValue(
          'aprFee',
          allowNumberInput(value, formik.values.aprFee, 5)
        );
    }
    {
      name == 'mayFee' &&
        formik.setFieldValue(
          'mayFee',
          allowNumberInput(value, formik.values.mayFee, 5)
        );
    }
    {
      name == 'junFee' &&
        formik.setFieldValue(
          'junFee',
          allowNumberInput(value, formik.values.junFee, 5)
        );
    }
    {
      name == 'julFee' &&
        formik.setFieldValue(
          'julFee',
          allowNumberInput(value, formik.values.julFee, 5)
        );
    }
    {
      name == 'augFee' &&
        formik.setFieldValue(
          'augFee',
          allowNumberInput(value, formik.values.augFee, 5)
        );
    }
    {
      name == 'sepFee' &&
        formik.setFieldValue(
          'sepFee',
          allowNumberInput(value, formik.values.sepFee, 5)
        );
    }
    {
      name == 'octFee' &&
        formik.setFieldValue(
          'octFee',
          allowNumberInput(value, formik.values.octFee, 5)
        );
    }
    {
      name == 'novFee' &&
        formik.setFieldValue(
          'novFee',
          allowNumberInput(value, formik.values.novFee, 5)
        );
    }
    {
      name == 'decFee' &&
        formik.setFieldValue(
          'decFee',
          allowNumberInput(value, formik.values.decFee, 5)
        );
    }
  };

  const setFeeHeadValue = (selectName, selectedValue) => {
    const dataget = headList.find((e) => {
      return e.id == selectedValue;
    });
    setCondition(dataget);
  };
  console.log(condition, monthusedata);
  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  return (
    <>
      <div className={`main-div`}>
        <div className="main-inner-div">
          {isLoading && <BarLoader />}
          {erroState && (
            <BottomErrorCard
              activateBottomErrorCard={activateBottomErrorCard}
              errorTitle={erroMessage}
            />
          )}

          <div className="main-sub-div">
            <div className="main-sub-inner-div">
              <div className="text-div">
                <div className="big-text">Class Fee Master Form</div>
                <div className="small-text text-teal-300">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </div>
              </div>
            </div>
            {id === undefined ? (
              <div className="tab-div">
                <div className="add-button-master-div">
                  <button
                    onClick={() => navigate('/classfee-master-form')}
                    type="submit"
                    className=" add-button-master bg-[#0F766E] hover:bg-[#0F766E]"
                  >
                    Add{' '}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {id !== undefined ? (
            ''
          ) : (
            <Tabs
              listRoute={'/classfee-master'}
              formRoute={'/classfee-master-form'}
            />
          )}
          <div className="details-div">
            <span className="detailes text-[#0F766E]">
              Details of Class Fee Master
            </span>
          </div>

          <div className="form-div">
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div className="form">
                <div className="col-span-4 grid grid-cols-12">
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Session Start
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <input
                      {...formik.getFieldProps('monthName')}
                      disabled
                      type="text"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder:text-gray-500 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="April"
                    />
                  </div>
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Financial Year
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('fy')}
                      type="number"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select class"
                    >
                      {financeYearList?.map((data, index) => (
                        <option value={data?.fy}>{data?.fy}</option>
                      ))}
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.fy && formik.errors.fy
                        ? formik.errors.fy
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Class
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('classId')}
                      type="number"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select class"
                    >
                      <option value="">Select</option>
                      {classList?.map((data, index) => (
                        <option value={data?.id}>{data?.class_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.classId && formik.errors.classId
                        ? formik.errors.classId
                        : null}
                    </span>
                  </div>
                  {/* <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Section
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('sectionId')}
                      type="number"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select section"
                    >
                      <option value="">Select</option>
                      {sectionList?.map((data, index) => (
                        <option value={data?.id}>{data?.section_name}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.sectionId && formik.errors.sectionId
                        ? formik.errors.sectionId
                        : null}
                    </span>
                  </div> */}
                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                      Select Fee Head
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                    </label>
                    <select
                      {...formik.getFieldProps('feeHeadId')}
                      type="number"
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 h-10 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                      placeholder="Select fee head"
                    >
                      <option value="">Select</option>
                      {headList?.map((data, index) => (
                        <option value={data?.id}>{data?.fee_head}</option>
                      ))}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.feeHeadId && formik.errors.feeHeadId
                        ? formik.errors.feeHeadId
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4 relative">
                    <div className="form-group mb-6 col-span-12 md:col-span-2 md:pr-4">
                      <label className="form-label inline-block mb-1 text-teal-900 text-sm font-semibold">
                        Classwise Discount
                        <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                          *
                        </small>
                      </label>
                      <input
                        {...formik.getFieldProps('discount')}
                        type="number"
                        onKeyDown={(evt) =>
                          ['e', 'E', '+', '-'].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        className={`form-control block w-full px-3 h-10 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                        placeholder="Enter discount"
                      />
                      <span className="text-red-600  text-xs">
                        {formik.touched.discount && formik.errors.discount
                          ? formik.errors.discount
                          : null}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ROW INPUTS */}

                <div className=" w-full grid-cols-12 col-span-12 grid mt-1   max-[683px]:grid-cols-6">
                  <div className="form-group mb-6 flex col-span-6  md:pr-4   max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">April Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('aprFee')}
                      onInput={(e) => {
                        formik.setFieldValue('mayFee', e.target.value);
                        formik.setFieldValue('junFee', e.target.value);
                        formik.setFieldValue('julFee', e.target.value);
                        formik.setFieldValue('augFee', e.target.value);
                        formik.setFieldValue('sepFee', e.target.value);
                        formik.setFieldValue('octFee', e.target.value);
                        formik.setFieldValue('novFee', e.target.value);
                        formik.setFieldValue('decFee', e.target.value);
                        formik.setFieldValue('janFee', e.target.value);
                        formik.setFieldValue('febFee', e.target.value);
                        formik.setFieldValue('marFee', e.target.value);
                      }}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                  <div className="form-group mb-6 col-span-4  flex  md:pr-4  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">May Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('mayFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                </div>
                <div className="w-full grid-cols-12 col-span-12 grid mt-1   max-[683px]:grid-cols-6">
                  <div className="form-group mb-6 col-span-6  flex  md:pr-4  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">June Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('junFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                  <div className="form-group mb-6 col-span-4 md:pr-4 flex  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">July Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('julFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                </div>
                <div className="w-full grid-cols-12 col-span-12 grid mt-1   max-[683px]:grid-cols-6">
                  <div className="form-group mb-6 col-span-6 md:pr-4 flex  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">August Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('augFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                  <div className="form-group mb-6 col-span-4 md:pr-4 flex  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">
                        September Fee
                      </span>
                    </label>
                    <input
                      {...formik.getFieldProps('sepFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                </div>
                <div className="w-full grid-cols-12 col-span-12 grid mt-1   max-[683px]:grid-cols-6">
                  <div className="form-group mb-6 col-span-6 md:pr-4 flex  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">October Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('octFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                  <div className="form-group mb-6 col-span-4 md:pr-4 flex  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 w-full ml-2">
                      {' '}
                      <span className="inline text-gray-700">November Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('novFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                </div>
                <div className="w-full grid-cols-12 col-span-12 grid mt-1   max-[683px]:grid-cols-6">
                  <div className="form-group mb-6 col-span-6 md:pr-4 flex  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">December Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('decFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                  <div className="form-group mb-6 col-span-4  flex  md:pr-4 max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">January Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('janFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                </div>
                <div className="  w-full grid-cols-12 col-span-12 grid mt-1  max-[683px]:grid-cols-6">
                  <div className="form-group mb-6 col-span-6 flex  md:pr-4 max-[683px]:col-span-6 max-[683px]:block">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">February Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('febFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3 ||
                        condition?.fee_head_type_id === 4 ||
                        condition?.fee_head_type_id === 5
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                  <div className="form-group mb-6 col-span-4  flex  md:pr-4  max-[683px]:col-span-6 max-[683px]:block ">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">March Fee</span>
                    </label>
                    <input
                      {...formik.getFieldProps('marFee')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled={
                        condition?.fee_head_type_id === 1 ||
                        condition?.fee_head_type_id === 3
                      }
                      className={`disabled:border disabled:border-[#64748b] disabled:bg-[#e5e7eb] form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md`}
                    />
                  </div>
                </div>
                <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                  <div className="form-group mb-6 col-span-5 md:pr-4 flex justify-start max-[464px]:col-span-6">
                    <label className="form-check-label text-gray-800 ml-2 w-full">
                      {' '}
                      <span className="inline text-gray-700">
                        Net Fee Amount
                        <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                          *
                        </small>
                      </span>
                    </label>
                  </div>{' '}
                  <div className="form-group mb-6 col-span-2 md:pr-4 flex max-[464px]:col-span-6">
                    <input
                      {...formik.getFieldProps('feeAmount')}
                      type="number"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      disabled
                      className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md `}
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.feeAmount && formik.errors.feeAmount
                        ? formik.errors.feeAmount
                        : null}
                    </span>
                  </div>
                </div>
                <div className="w-full grid-cols-12 col-span-12 grid mt-1 max-[464px]:grid-cols-6">
                  <div className=" form-group mb-6 col-span-6 md:pr-4 flex  max-[464px]:justify-center ">
                    <button
                      onClick={() => navigate('/classfee-master')}
                      type="button"
                      className="deactivate-button-master bg-red-500 text-white py-2"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="form-group mb-6 col-span-6 md:pr-4 flex justify-end max-[464px]:justify-center">
                    <button
                      type="submit"
                      className="cypress_next2_button submit-button bg-[#0F766E]"
                    >
                      {id !== undefined ? 'Update' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassFeeMasterForm;
