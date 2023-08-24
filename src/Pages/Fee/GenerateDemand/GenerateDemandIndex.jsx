/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSetTitle from '../../../Components/Hooks/useSetTitle';
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs';
// import StudentForm from './StudentForm'
import ApiHeader from '../../../Components/ApiList/ApiHeader';
import ApiList from '../../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../../Components/Common/AxiosInterceptors';
import BarLoader from '../../../Components/Common/BarLoader';
import { nullToNA } from '../../../Components/Common/PowerupFunctions';
import ListTableRedesign from '../../../Components/Common/ListTableRedesign/ListTableRedesign';
import GenerateDemandDetails from './GenerateDemandDetails';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const GenerateDemandIndex = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [editId, setEditId] = useState(null);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setClassList] = useState([]);
  const {
    api_finance_year,
    api_getDemandGenerate,
    api_postDemandGenerate,
    api_editDemandGenerate,
    api_searchDemandGenerate
  } = ApiList();
  const navigate = useNavigate();
  useSetTitle('Generate Demand');
  useEffect(() => {
    fetchFinanceList();
    fetchMasterList();
    formik.setFieldValue('dateValue');
  }, []);
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
  const fetchMasterList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getDemandGenerate, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setreadymadeListData(response?.data?.data);
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
  const validationSchema = yup.object({
    fy: yup.string().required('Select financial year.'),
    admissionNo: yup.string().required('Enter admission number.')
  });
  const formik = useFormik({
    initialValues: {
      fy: 4,
      admissionNo: ''
    },

    onSubmit: (values, resetForm) => {
      console.log('at submit ', values);
      saveMasterForm(values);
    },
    validationSchema
  });
  console.log(editId);
  const saveMasterForm = (values) => {
    setisLoading(true);
    let url;
    let requestBody;
    let requestBodyBase = {
      fy: values.fy,
      admissionNo: values.admissionNo
    };
    if (editId !== null) {
      url = api_editDemandGenerate;
      requestBody = requestBodyBase;
      requestBody.id = editId;
    } else {
      url = api_postDemandGenerate;
      requestBody = requestBodyBase;
    }

    AxiosInterceptors.post(api_postDemandGenerate, requestBody, ApiHeader())
      .then(function (response) {
        console.log('view fee master..', response?.data?.data);
        if (response?.data?.status) {
          fetchMasterList();
          toast.success('Demad Generated Successfully');
        } else {
          // activateBottomErrorCard(true, 'Error occured in submitting form.');
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        // activateBottomErrorCard(true, 'Error occured in submitting form.');
        toast.warning('Error occured in submitting form');

        setisLoading(false);
      });
  };
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, '0');

  let currentMonth = String(date.getMonth() + 1).padStart(2, '0');

  let currentYear = date.getFullYear();

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  const COLUMNS = [
    {
      Header: 'Admission No.',
      accessor: 'admission_no'
    },
    {
      Header: 'Student Name',
      accessor: 'student_name        ',
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.student_name)}</span>
      )
    },
    {
      Header: 'Month Name',
      accessor: 'month_name'
    },

    {
      Header: 'Fee Head',
      accessor: 'fee_head',
      Cell: ({ cell }) => <span>{nullToNA(cell.row.original.fee_head)}</span>
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: ({ cell }) => <span>{nullToNA(cell.row.original.amount)}</span>
    },
    {
      Header: 'Created Date & Time',
      Cell: ({ cell }) => (
        <span>
          {nullToNA(cell.row.original?.date)} |{' '}
          {nullToNA(cell.row.original?.time)}
        </span>
      )
    },
    {
      Header: 'Status',
      Cell: ({ cell }) => (
        <span
          className={
            cell.row.original?.status === 'Active'
              ? 'text-[green]'
              : 'text-[red]'
          }
        >
          {nullToNA(cell.row.original?.status)}
        </span>
      )
    }
    // {
    //   Header: "Action",
    //   Cell: ({ cell }) => (
    //     <div>
    //       <button
    //         className="bg-[#6875E3] px-3 py-1.5 rounded-md text-white"
    //         onClick={() => updateFun(cell.row.original.id)}
    //       >
    //         View
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const updateFun = (id) => {
    setTabIndex(1);
    setEditId(id);
  };
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  console.log(financeYearList);

  return (
    <>
      <div className={`w-full col-span-10 2xl:py-3 2xl:px-4 px-4 py-2`}>
        <div className="border-[2px] border-gray-200 rounded-md h-[82vh] 2xl:p-6 p-4 overflow-y-auto">
          <div className="">
            {/* Title */}
            <div className="flex w-full justify-between items-center max-[870px]:block">
              <div className="flex flex-col">
                <span className="text-3xl font-semibold text-gray-600 flex flex-start">
                  Generate Demand
                </span>
                <span className="text-sm font-medium text-teal-600">
                  Empowering Education: Discover Transparent and Affordable
                  Class Fees
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="search"
                    name=""
                    id=""
                    className="border-2 border-gray-300 w-[20vw] h-[4.5vh] relative rounded-sm pl-[2.2vw] focus:outline-none focus:border-2 focus:border-gray-500"
                    placeholder="Search..."
                  />
                  <span className="absolute top-[1vh] left-[0.6vw] text-[2.4vh] text-gray-500">
                    <BsSearch />
                  </span>
                </div>

                {/* <div>
                            <span className='text-blue-800 text-4xl cursor-pointer' onClick={() => (setTabIndex(1), setEditId(null))}><BsPlusCircleFill /></span>
                        </div> */}
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full grid grid-cols-10 text-teal-900 mt-5 max-[1120px]:block ">
                <div className="col-span-3 flex w-full justify-center gap-3  max-[1120px]:mt-2 max-[1120px]:justify-start">
                  <p>Demand Date</p>
                  {
                    <input
                      type="text"
                      {...formik.getFieldProps('dateValue')}
                      disabled
                      placeholder={currentDate}
                      className="border rounded-lg h-8 shadow w-[50%] px-3"
                    />
                  }
                </div>
                <div className="col-span-3 flex w-full gap-3  max-[1120px]:mt-2 max-[1120px]:justify-start">
                  <p>
                    Financial Year{' '}
                    <small className="mt-1 text-sm font-semibold text-red-600  ">
                      *
                    </small>
                  </p>
                  <select
                    required
                    {...formik.getFieldProps('fy')}
                    id=""
                    className="border rounded-lg h-8 shadow w-[50%] px-3"
                  >
                    <option value="">Select</option>
                    {financeYearList?.map((data, index) => (
                      <option value={data?.id} selected={data?.id == 4}>
                        {data?.fy}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3 flex w-full justify-end gap-3  max-[1120px]:mt-2 max-[1120px]:justify-start">
                  <p>
                    Admission no.{' '}
                    <small className="mt-1 text-sm font-semibold text-red-600  ">
                      *
                    </small>
                  </p>
                  <input
                    required
                    type="text"
                    {...formik.getFieldProps('admissionNo')}
                    className="border rounded-lg h-8 shadow w-[50%] px-3"
                  />
                </div>
                <div className="col-span-1 flex w-full justify-end gap-3  max-[1120px]:mt-2 max-[1120px]:justify-start">
                  <button
                    type="submit"
                    className="bg-[#0F766E] px-3 rounded-md text-white"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </form>
            {/* Tabs */}
            <div className="text-gray-600 flex gap-4 mt-8 mb-4">
              <div
                className={
                  tabIndex == 0 && `border-b-[2px] border-blue-500 w-max pb-2`
                }
              >
                <button
                  className={`${
                    tabIndex == 0 ? `bg-blue-200` : `bg-gray-300`
                  }  px-2 py-1.5 w-[4rem] rounded-[4px] text-sm transition-all duration-200`}
                  onClick={() => setTabIndex(0)}
                >
                  List
                </button>
              </div>
              <div
                className={
                  tabIndex == 1 && `border-b-[2px] border-blue-500 w-max pb-2`
                }
              >
                <button
                  className={`${
                    tabIndex == 1 ? `bg-blue-200` : `bg-gray-200`
                  }  px-2 py-1.5 w-[4rem] rounded-[4px] text-sm transition-all duration-200`}
                  onClick={() => (setTabIndex(1), setEditId(null))}
                >
                  Details
                </button>
              </div>
            </div>
            <div className="max-[768px]:block ">
              <div className="max-[768px]:justify-start max-[768px]:mt-2">
                {tabIndex == 0 && (
                  <>
                    <div className="mt-6">
                      <h1 className="text-teal-600 text-xl">
                        List Of Students
                      </h1>
                      <ListTableRedesign
                        columns={COLUMNS}
                        dataList={readymadeListData}
                      />
                    </div>
                  </>
                )}
                {tabIndex == 1 && (
                  <>
                    <div className="mt-6">
                      <h1 className="text-[#0F766E] text-xl">
                        Details Of Students
                      </h1>
                      <GenerateDemandDetails id={editId} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateDemandIndex;
