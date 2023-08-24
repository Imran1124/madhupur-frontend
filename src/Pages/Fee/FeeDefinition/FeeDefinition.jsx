/* eslint-disable no-unused-vars */
import React from 'react'
import useSetTitle from '../../../Components/Hooks/useSetTitle'
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs'

const FeeDefinition = () => {
  
    useSetTitle("Fee Definition")
  
    return (
    <>
        <div className={`w-full col-span-10 2xl:py-3 2xl:px-4 px-4 py-2`}  >
    <div className='border-[2px] border-gray-200 rounded-md h-[84.2vh] 2xl:p-6 p-4 overflow-y-auto'>
    <div className=''>
        
        {/* Title */}
        <div className="flex mb-10  items-start justify-start">
            <div className='flex-1 flex justify-start'>
          <div className='block'>
          <div className='text-4xl font-semibold text-gray-700 flex justify-start'>Fee Definition</div>
          <div className='text-gray-600 text-sm'>Unlock Your Potential. Join Our Journey Of Education And Excellence</div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
            <div className='relative'>
                <input type="search" name="" id="" className='border-2 border-gray-300 w-[20vw] h-[4.5vh] relative rounded-sm pl-[2.2vw] focus:outline-none focus:border-2 focus:border-gray-500' placeholder='Search...' />
                <span className='absolute top-[1vh] left-[0.6vw] text-[2.4vh] text-gray-500'><BsSearch /></span>
            </div>

            <div>
                <span className='text-blue-800 text-4xl cursor-pointer'
                //  onClick={() => (setTabIndex(1), setEditId(null))}
                 ><BsPlusCircleFill /></span>
            </div>

        </div>

        </div>
        
    </div>
    </div></div>
    </>
  )
}

export default FeeDefinition