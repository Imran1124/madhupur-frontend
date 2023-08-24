import React from 'react';

export default function SuccessSubmit() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-56">
        <div className="bg-green-100 rounded-md p-16 mt-16 lg:mt-32 justify-center">
          <div className="flex items-center justify-center mb-6">
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
              Attendance Submitted Successfully
            </div>
            <div></div>
          </div>
          <div className="flex items-center justify-center mt-8">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View list
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
