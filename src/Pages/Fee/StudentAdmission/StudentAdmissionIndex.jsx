/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useSetTitle from '../../../Components/Hooks/useSetTitle'
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs'
import StudentList from './StudentList'
import StudentForm from './StudentForm'
import ListTableRedesign from '../../../Components/Common/ListTableRedesign/ListTableRedesign'
import { nullToNA } from '../../../Components/Common/PowerupFunctions'
import todo from '../../../assets/todo.png'
import check from '../../../assets/check.png'

const StudentAdmissionIndex = () => {

    const [tabIndex, setTabIndex] = useState(0)
    const [editId, setEditId] = useState(null)

    useSetTitle("Student Admission")

    let dummyData = [
        {
            id: 1,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        },
        {
            id: 2,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        },
        {
            id: 3,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        },
        {
            id: 4,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        },
        {
            id: 5,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        },
        {
            id: 6,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        },
        {
            id: 7,
            ward_name: "Dummy",
            owner_name: "Dummy",
            pt_no: "Dummy",
            new_holding_no: "Dummy",
            mobile_no: "Dummy",
            prop_address: "Dummy"
        }
    ]

    const COLUMNS = [
        {
            Header: "Sl. No.",
            accessor: "ward_name",
        },
        {
            Header: "Owner's Name",
            accessor: "owner_name",
        },
        {
            Header: "Property Tax No.",
            accessor: "pt_no",
            Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.pt_no)}</span>)
        },
        {
            Header: "Holding No",
            accessor: "new_holding_no",
            Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.new_holding_no)}</span>)

        },
        {
            Header: "Mobile No",
            accessor: "mobile_no",
            Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.mobile_no)}</span>)

        },
        {
            Header: "Address",
            accessor: "prop_address",
            Cell: ({ cell }) => (<span>{nullToNA(cell.row.original.prop_address)}</span>)

        },
        {
            Header : "Action",
            Cell : ({cell}) => (
                <div>
                    <button className='bg-[#6875E3] px-3 py-1.5 rounded-md text-white' onClick={() => updateFun(cell.row.original.id)}>View</button>
                </div>
            )
        }
    ];

    const updateFun = (id) => {
        setTabIndex(1)
        setEditId(id)
    }

  return (
    <>
          <div className={`w-full col-span-10 2xl:py-3 2xl:px-4 px-4 py-2`}  >
    <div className='border-[2px] border-gray-200 rounded-md h-[84.2vh] 2xl:p-6 p-4 overflow-y-auto'>
    <div className=''>
        
        {/* Title */}
        <div className="flex mb-10  items-start justify-start  max-[870px]:block">
            <div className='flex-1 flex justify-start'>
          <div className='block'>
          <div className='text-4xl font-semibold text-gray-700 flex justify-start'>Student Admission</div>
          <div className='text-gray-600 text-sm'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
            <div className='relative'>
                <input type="search" name="" id="" className='border-2 border-gray-300 w-[20vw] h-[4.5vh] relative rounded-sm pl-[2.2vw] focus:outline-none focus:border-2 focus:border-gray-500 max-[870px]:pl-6' placeholder='Search...' />
                <span className='absolute top-[1vh] left-[0.6vw] text-[2.4vh] text-gray-500'><BsSearch /></span>
            </div>

            <div>
                <span className='text-blue-800 text-4xl cursor-pointer' onClick={() => (setTabIndex(1), setEditId(null))}><BsPlusCircleFill /></span>
            </div>

        </div>

        </div>

        {/* Tabs */}

        <div className='mt-8 mb-4 flex w-full justify-between'>
<div className='text-gray-600 flex gap-4 '>
            <div className={tabIndex == 0 && `border-b-[2px] border-blue-500 w-max pb-2`}>
                <button className={`${tabIndex == 0 ? `bg-blue-200` : `bg-gray-300`}  px-2 py-1.5 w-[4rem] rounded-[4px] text-sm transition-all duration-200`} onClick={() => setTabIndex(0)}>List</button>
            </div>
            <div className={tabIndex == 1 && `border-b-[2px] border-blue-500 w-max pb-2`}>
            <button className={`${tabIndex == 1 ? `bg-blue-200` : `bg-gray-200`}  px-2 py-1.5 w-[4rem] rounded-[4px] text-sm transition-all duration-200`} onClick={() => (setTabIndex(1), setEditId(null))}>Details</button>
            </div>
        </div>
        <div className=''>
            <img src={tabIndex == 0 ? todo : check} alt="" srcset="" className='w-10 opacity-80' />
        </div>
        </div>
        

        {
            tabIndex == 0 && <>
             <div className='mt-6'>
                <h1 className='text-gray-600 text-xl'>List Of Students</h1>
             <ListTableRedesign columns={COLUMNS} dataList={dummyData} />
             </div>
            </>
        }
        {
            tabIndex == 1 && <StudentForm id={editId} />
        }
        
    </div>
    </div></div>
    </>
  )
}

export default StudentAdmissionIndex