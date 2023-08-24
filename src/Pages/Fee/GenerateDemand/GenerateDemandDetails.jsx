/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'

const GenerateDemandDetails = (props) => {

    // useSetTitle("Fee Collection")

    const fakeData = [
        { id: 1, month: "January", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2500, 3000, 4000], totalFee: 7800, isPaid: true },
        { id: 2, month: "February", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "March", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "April", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "May", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "June", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "July", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "August", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "September", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "October", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "November", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
        { id: 3, month: "December", fee: ["School Fee", "Bus Fee", "Renewal Fee"], amount: [2100, 3200, 4000], totalFee: 6800, isPaid: false },
    ]


    return (
        <>
            <p className='border-b-2 border-gray-200 mx-5 my-5'></p>
            <div className='m-auto w-[80%]'>
                {/* id is {props.id} */}

                <div className='flex justify-between text-gray-500 my-10'>

                    <div>
                        <p className='font-semibold'>Roll No.</p>
                        <p className='mt-3'>1</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Registration No.</p>
                        <p className='mt-3'>REG12342356</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Student Name</p>
                        <p className='mt-3'>Amit Kumar</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Father Name</p>
                        <p className='mt-3'>Amit Kumar</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Class</p>
                        <p className='mt-3'>X</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Sec</p>
                        <p className='mt-3'>A</p>
                    </div>

                </div>

                <div className="m-auto mt-5">
                    <div className='grid grid-cols-12 font-semibold text-lg text-gray-700'>
                        <div className='col-span-4 ml-5'>Months</div>
                        <div className='col-span-4 ml-3'>Fees</div>
                        <div className='col-span-4'>Amount</div>
                    </div>
                    <div className=' rounded-xl shadow-md border border-gray-200 px-5 overflow-auto h-80'>
                        {fakeData.map((item, index) => (
                            <div key={index} className='grid grid-cols-12 text-gray-600 border-b py-2'>
                                <div className='col-span-4 '>{item.month}</div>
                                <div className='col-span-4'>
                                    {item.fee.map((fees) => (
                                        <p>{fees}</p>
                                    ))}
                                </div>
                                <div className='col-span-4'>
                                    {item.amount.map((amount) => (
                                        <p>₹ {amount}</p>
                                    ))}
                                    {/* <p className='border border-gray-300 bg-gray-200 w-[30%]'>₹ 7800</p> */}
                                    <div className='bg-gray-200 pr-10 pl-4 inline-block -ml-4 border border-gray-300'><p className='inline   w-[30%]'>₹ 7800</p></div>
                                </div>
                            </div>
                        ))}
                        <div className='grid grid-cols-12  my-2'>
                            <p className='col-span-4'></p>
                            <p className='col-span-4 font-bold text-lg text-gray-700'> Total Amount </p>
                            <p className='col-span-4 border border-gray-300 bg-gray-200 w-[30%] font-medium text-gray-600'>Rs. 4000/-</p>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default GenerateDemandDetails