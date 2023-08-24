import React from 'react'
import { Helmet } from 'react-helmet'

export default function index(props) {
  return (
    <Helmet>
        <title>{props?.title}</title>
    </Helmet>
  )
}
