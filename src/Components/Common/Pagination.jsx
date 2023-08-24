import React from "react";

export default function Pagination(props) {
  const { ChangePage, number, lastPage, nextPage, prevPage, postperpage,blockToast,setBlockToast } =
    props;
  return (
    <div className="mt-3 grid grid-cols-12">
      <div className="col-span-2">
        {" "}
        <select
          className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={postperpage}
          onChange={(e) => ChangePage(e.target.value)}
        >
          {[5, 10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-4 text-center col-start-5">
        {" "}
        <span className="text-[#0F766E]">
          Page {""}
          <strong>
            {number} of {lastPage}
          </strong>
          {""}
        </span>
      </div>

      <div className="col-span-4 text-right">
    
        <button
          className={
            (number === 1 ? "opacity-50" : "opacity-100") +
            " text-xl hover:bg-sky-300 hover:text-white"
          }
          onClick={() =>{ prevPage(number)
            setBlockToast(true)
          }}
          disabled={number === 1}
        >
          ⬅️
        </button>
        <button
          className={
            (number === lastPage ? "opacity-50" : "opacity-100") +
            " text-xl hover:bg-sky-300 hover:text-white"
          }
          onClick={() =>{ nextPage(number)
          setBlockToast(true)}}
          disabled={number === lastPage}
        >
          ➡️
        </button>

      </div>
    </div>
  );
}
