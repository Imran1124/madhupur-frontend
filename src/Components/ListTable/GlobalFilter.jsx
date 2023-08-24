/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - GlobalFilter
//    DESCRIPTION - GlobalFilter Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function GlobalFilter({ filter, setFilter }) {
  return (
    <>
    
      {/* <input className='border-2 border-gray-600 px-2 bg-gray-200' type="text" value={filter || ''} onChange={e => setFilter(e.target.value)} /> */}
      <input className='border-2 border-gray-600 px-2 bg-gray-200' type="text"   />
    </>
  )
}

export default GlobalFilter
/**
 * Exported to :
 * 1. BasicTable Component
 * 
 */