import React from 'react';
import Navbar from './Navbar';

export default function SchoolSuccessSubmit() {
  const regNO = localStorage.getItem('school_reg_no');
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-green-100 rounded-md p-16 mt-64 justify-center">
          <div className="flex items-center justify-center">
            <svg
              className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              strokelinecap="round"
              strokelinejoin="round"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <circle cx={12} cy={12} r={9} />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div className="text-green-700">
            <div className="font-bold text-xl">
              School Registration Form Submitted Successfully
            </div>
            <div>
              Your User-Id-: {regNO}. You will be contacted by our team soon.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
