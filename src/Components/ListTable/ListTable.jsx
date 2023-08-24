/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ListTable
//    DESCRIPTION - ListTable Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useState, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination
} from 'react-table';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { CSVLink } from 'react-csv';
import GlobalFilter from './GlobalFilter';
import { format } from 'date-fns';
import axios from 'axios';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

function ListTable(props) {
  const [bounce, setbounce] = useState('hidden');
  const columns = useMemo(() => props.columns, [props]);
  const data = useMemo(() => props.dataList, [props.dataList]);
  useEffect(() => {
    setPageSize(props.pageNumber ? props.pageNumber : 10);
  }, [props]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,//since used pagination
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  let dateObj = new Date();

  let month = String(dateObj.getMonth() + 1).padStart(2, '0');

  let day = String(dateObj.getDate()).padStart(2, '0');

  let year = dateObj.getFullYear();
  let output = day + '-' + month + '-' + year;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="flex mb-2 pb-2">
        {props?.filter && (
          <div className="flex-initial">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        )}
        {props?.exportStatus !== false && (
          <div className="flex-initial ml-2">
            <button
              className="bg-sky-400 px-3 pr-3  shadow-lg rounded py-1 text-white hover:shadow-2xl hover:bg-green-600 text-center relative"
              onMouseEnter={() => setbounce('')}
              onMouseLeave={() => setbounce('hidden')}
            >
              <CSVLink data={props.dataList}>Export</CSVLink>
              <div
                className={
                  bounce +
                  ' absolute h-full top-3 text-sm left-0 text-center animate-bounce'
                }
              >
                <AiOutlineArrowDown />
              </div>
            </button>
          </div>
        )}
        <div className="flex-1">{props.children}</div>
        {props.assessmentType && (
          <div className="flex-initial flex">
            <div className="flex">
              <div className="flex-initial h-4 w-4 text-green-900 text-xs font-semibold text-center bg-green-200 rounded-full ml-4 ">
                N
              </div>
              <div className="flex-initial text-xs ml-2"> New Assessment</div>
              <div className="flex-initial h-4 w-4 bg-blue-200  text-blue-900 text-xs font-semibold text-center rounded-full ml-4">
                R
              </div>
              <div className="flex-initial text-xs ml-2"> Re-Assessment</div>
              <div className="flex-initial h-4 w-4 bg-red-200  text-red-900 text-xs font-semibold text-center rounded-full ml-4">
                M
              </div>
              <div className="flex-initial text-xs ml-2"> Mutation</div>
            </div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      <div className=" py-2 overflow-x-auto bg-white">
        <div className="inline-block min-w-full rounded-sm overflow-hidden bg-[#0F766E]">
          <table
            {...getTableBodyProps}
            className="min-w-full leading-normal max-[1200px]:w-[1200px] max-[1200px]:overflow-auto"
          >
            <thead className="font-bold text-left text-md">
              {headerGroups?.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-3 border-b border-gray-200   text-left text-md text-white"
                    >
                      {column.render('Header')}
                      {/* capitalize  */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? '⬆️'
                            : '⬇️'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-md">
              {/* {rows.map((row) => { */} {/**since used pagination */}
              {page?.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={
                      row?.original?.date == output
                        ? 'bg-[#f0fdfa]  mt-1 shadow-sm hover:bg-[#ECF1FF] rounded-xl cursor-pointer'
                        : 'bg-white shadow-lg mt-1 hover:bg-[#ECF1FF] rounded-xl cursor-pointer'
                    }
                  >
                    {row?.cells?.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-4 text-md text-left"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListTable;
/**
 * Exported to :
 * 1. MailboxContent Component
 * 2. PropertySafApplicationList Component
 *
 */
