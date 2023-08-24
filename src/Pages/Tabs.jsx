/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

function Tabs(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex">
        <div className="">
          <button
            onClick={() => navigate(props?.listRoute)}
            type="button"
            className="cypress_back2_button px-6 py-2.5 bg-[#E3E3E9A3] hover:bg-gray-400 hover:text-white text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg  focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
          >
            List
          </button>
        </div>
        <div className="ml-4">
          <button
            onClick={() => navigate(props?.formRoute)}
            type="submit"
            className="cypress_next2_button px-6 py-2.5 bg-[#CAD8FD] text-gray-700 font-medium text-xs leading-tight  rounded shadow-md hover:bg-teal-300 hover:shadow-lg focus:bg-teal-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-300 active:shadow-lg transition duration-150 ease-in-out"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default Tabs;
