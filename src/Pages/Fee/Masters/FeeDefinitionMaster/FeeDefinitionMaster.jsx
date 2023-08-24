/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiHeader from '../../../../Components/ApiList/ApiHeader';
import ApiList from '../../../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../../../Components/Common/AxiosInterceptors';
import BarLoader from '../../../../Components/Common/BarLoader'
import { nullToNA } from '../../../../Components/Common/PowerupFunctions';
import useSetTitle from '../../../../Components/Hooks/useSetTitle';
import ListTable from '../../../../Components/ListTable/ListTable';
import Tabs from '../Tabs';
import { HiPlus } from 'react-icons/hi'
import GlobalFilter from '../../../../Components/ListTable/GlobalFilter';
import DeleteView from '../../../../Components/Common/DeleteView';
import BottomErrorCard from '../../../../Components/Common/BottomErrorCard';
import CommonModal from '../../../../Components/Common/CommonModal';

function FeeDefinitionMaster() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [dataToView, setdataToView] = useState();
  const[deletestatus,setDeleteStatus]=useState();
  const { api_fetcClassFeeDefList, api_deleteClassFeeDefById, api_getClassFeeDefById } = ApiList()
  const navigate = useNavigate()

  useSetTitle('Fee Head Type Master')

  const data = [
    { id: 1, fee_head_type: 10, is_annual: 'Yes', is_optional: 'No', is_latefee_applicable: 'No' },
    { id: 2, fee_head_type: 10, is_annual: 'No', is_optional: 'Yes', is_latefee_applicable: 'Yes' },
    { id: 3, fee_head_type: 10, is_annual: 'Yes', is_optional: 'No', is_latefee_applicable: 'Yes' },
    { id: 4, fee_head_type: 10, is_annual: 'No', is_optional: 'Yes', is_latefee_applicable: 'Yes' },
    { id: 5, fee_head_type: 10, is_annual: 'Yes', is_optional: 'No', is_latefee_applicable: 'No' },
  ]

  const COLUMNS = [
    {
      Header: "Sl No.",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.index + 1)}</span>)
    },
    {
      Header: "Class",
      accessor: "class_id",
    },

    {
      Header: "jan Fee",
      accessor: "jan_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.jan_fee)}</span>)
    },
    {
      Header: "Jan Bus Fee",
      accessor: "jan_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.jan_bus_fee)}</span>)
    },

    {
      Header: "Feb Fee",
      accessor: "feb_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.feb_fee)}</span>)
    },
    {
      Header: "Feb Bus Fee",
      accessor: "feb_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.feb_bus_fee)}</span>)
    },
    {
      Header: "Mar Fee",
      accessor: "mar_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.mar_fee)}</span>)
    },
    {
      Header: "Mar Bus Fee",
      accessor: "mar_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.mar_bus_fee)}</span>)
    },
    {
      Header: "April Fee",
      accessor: "april_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.apr_fee)}</span>)
    },
    {
      Header: "April Bus Fee",
      accessor: "apr_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.apr_bus_fee)}</span>)
    },
    {
      Header: "May Fee",
      accessor: "may_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.may_fee)}</span>)
    },
    {
      Header: "May Bus Fee",
      accessor: "may_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.may_bus_fee)}</span>)
    },
    {
      Header: "June Fee",
      accessor: "jun_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.jun_fee)}</span>)
    },
    {
      Header: "June Bus Fee",
      accessor: "jun_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.jun_bus_fee)}</span>)
    },
    {
      Header: "July Fee",
      accessor: "jul_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.jul_fee)}</span>)
    },
    {
      Header: "July Bus Fee",
      accessor: "jul_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.jul_bus_fee)}</span>)
    },

    {
      Header: "Aug Fee",
      accessor: "aug_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.aug_fee)}</span>)
    },
    {
      Header: "Aug Bus Fee",
      accessor: "aug_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.aug_bus_fee)}</span>)
    },
    {
      Header: "Sept Fee",
      accessor: "sep_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.sep_fee)}</span>)
    },
    {
      Header: "Sept Bus Fee",
      accessor: "sep_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.sep_bus_fee)}</span>)
    },
    {
      Header: "Oct Fee",
      accessor: "oct_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.oct_fee)}</span>)
    },
    {
      Header: "Oct Bus Fee",
      accessor: "oct_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.oct_bus_fee)}</span>)
    },
    {
      Header: "Nov Fee",
      accessor: "nov_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.nov_fee)}</span>)
    },
    {
      Header: "Nov Bus Fee",
      accessor: "nov_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.nov_bus_fee)}</span>)
    },
    {
      Header: "Dec Fee",
      accessor: "dec_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.dec_fee)}</span>)
    },
    {
      Header: "Dec Bus Fee",
      accessor: "dec_bus_fee",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.dec_bus_fee)}</span>)
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.status)}</span>)
    },
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() => navigate(`/feedefinition-master-form/${cell.row.original?.id}`)}
            className={`edit-button-master`}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setcurrentId(cell.row.original?.id)
              setDeleteStatus(cell.row.original?.status==="Active" ? "deactive" : "active")
              setdeleteStatus(true)
            }}
            className={`${cell.row.original?.status=="Active" ? "deactivate-button-master" : "deactivate-second-button-master"}`}
          >
           {cell.row.original?.status==="Active" ? "Deactivate" : "Activate"} 
          </button>
          {/* <button
            onClick={() => fetchViewData(cell.row.original?.id)}
            className={`view-button-master`}
          >
            View
          </button> */}
        </div>
      ),
    },

  ];

  // FUNCTION TO SAVE MASTER DATA
  const deleteItem = () => {
    setisLoading(true)
    setdeleteStatus(false)

    let requestBody = {
      id: currentId,
      status: deletestatus
    }

    AxiosInterceptors.post(api_deleteClassFeeDefById, requestBody, ApiHeader())
      .then(function (response) {
        console.log('delete response..', response?.data?.data)
        if (response?.data?.status) {
          fetchMasterList()
        } else {
          activateBottomErrorCard(true, 'Error occured in deletion.')
        }
        setisLoading(false)

      })
      .catch(function (error) {
        console.log('==delete error...', error)
        activateBottomErrorCard(true, 'Error occured in deletion.')
        setisLoading(false)
      })
  }

  const fetchMasterList = () => {
    setisLoading(true)
    AxiosInterceptors.post(api_fetcClassFeeDefList, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setreadymadeListData(response?.data?.data)
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.')
        }
        setisLoading(false)
      })
      .catch(function (error) {
        console.log('==2 error list...', error)
        activateBottomErrorCard(true, 'Error occured while fetching data.')
        setisLoading(false)
      })
  }

  // FUNCTION TO FECTH DATA TO EDIT
  const fetchViewData = (passedId) => {
    setisLoading(true)
    let requestBody = {
      id: passedId
    }
    AxiosInterceptors.post(api_getClassFeeDefById, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetch view data response..', response?.data?.data)
        if (response?.data?.status) {
          setdataToView(response?.data?.data)
          setdataViewStatus(true)
        } else {
          activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
        }
        setisLoading(false)

      })
      .catch(function (error) {
        console.log('= view data error...', error)
        seterroState(true)
        setisLoading(false)
      })
  }

  useEffect(() => {
    fetchMasterList()
  }, [])

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }

  return (
    <>
    <div className={`main-div`}  >
    <div className='main-inner-div'>
      {isLoading && (
        <BarLoader />
      )}
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
      {erroState &&
        <div className="alert-msg" role="alert">
          <strong className="sorry-msg">Sorry! </strong>
          <span className="some-error-msg">Some error occured while fetching list. Please try again later</span>
          <span className="absolute-span">
          </span>
        </div>
      }

      {deleteStatus &&
        <DeleteView setdeleteStatus={setdeleteStatus} deleteItem={deleteItem} deactivate={deletestatus} />
      }
      {
        dataViewStatus &&
        <CommonModal>

          <div className='w-full bg-white shadow-xl mb-6 relative'>
            <button onClick={() => setdataViewStatus(false)} type="button" className="absolute top-3 right-10 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
              <svg className="w-5 h-5" fill="currentColor" ><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
              <div className='font-semibold text-lg px-2 mb-5 text-[#1d807b]'># School Fee</div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">

                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.jan_fee)}</div>
                  <div className='text-gray-500 text-xs'>Jan Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.feb_fee)}</div>
                  <div className='text-gray-500 text-xs'>Feb Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.mar_fee)}</div>
                  <div className='text-gray-500 text-xs'>March Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.apr_fee)}</div>
                  <div className='text-gray-500 text-xs'>April Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.may_fee)}</div>
                  <div className='text-gray-500 text-xs'>May Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.jun_fee)}</div>
                  <div className='text-gray-500 text-xs'>June Fee</div>
                </div>

              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.jul_fee)}</div>
                  <div className='text-gray-500 text-xs'>July Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.aug_fee)}</div>
                  <div className='text-gray-500 text-xs'>August Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.sep_fee)}</div>
                  <div className='text-gray-500 text-xs'>September Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.oct_fee)}</div>
                  <div className='text-gray-500 text-xs'>October Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.nov_fee)}</div>
                  <div className='text-gray-500 text-xs'>November Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.dec_fee)}</div>
                  <div className='text-gray-500 text-xs'>December Fee</div>
                </div>

              </div>
              <div className='font-semibold text-lg px-2 mb-5 text-[#1d807b]'># Bus Fee</div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">

                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.jan_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>Jan Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.feb_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>Feb Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.mar_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>March Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.apr_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>April Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.may_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>May Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.jun_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>June Bus Fee</div>
                </div>

              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.jul_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>July Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.aug_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>August Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.sep_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>September Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.oct_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>October Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.nov_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>November Bus Fee</div>
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-sm'>{nullToNA(dataToView?.dec_bus_fee)}</div>
                  <div className='text-gray-500 text-xs'>December Bus Fee</div>
                </div>

              </div>
            </div>

          </div>
        </CommonModal>
      }

<div className="main-sub-div">
            <div className='main-sub-inner-div'>
          <div className='text-div'>
          <div className='big-text'>Fee Definition Master List</div>
          <div className='small-text'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        <div className='tab-div'>
          <div className='global-filter-div' >
            <div>
              <div className='global-filter flex'><input
          type="search"
          placeholder="Search..."
          className="bg-[#F2F4F4] h-10 pl-4 "
          name="hearder_search"
        />
        <button className="bg-[#3b82f6] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5 "
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
        </button> </div>
            </div>
            <div className='hiplus-div'>
              <button onClick={() => navigate('/feedefinition-master-form')}
                type="button"
                className="hiplus-button"
              >
                <HiPlus className="hiplus" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <Tabs listRoute={'/feedefinition-master'} formRoute={'/feedefinition-master-form'} />

      <div className='mt-6'>
        <span className='lists'> Fee Definition Master List</span>
      </div>

      {readymadeListStatus && data?.length != 0 &&
        <ListTable filter={false} exportStatus={false} assessmentType={false} columns={COLUMNS} dataList={readymadeListData} />
      }
      {
        readymadeListStatus && data?.length == 0 &&
        <div className="data-not-found">Data Not Found</div>
      }
      </div>
      </div>
    </>
  )
}

export default FeeDefinitionMaster