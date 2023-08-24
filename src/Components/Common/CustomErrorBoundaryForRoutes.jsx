/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'

class CustomErrorBoundaryForRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }


  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }


  changeUrl = () => {
    window.location.replace('/property')
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          {/* <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-2/3 h-60 bg-white mx-auto my-auto text-center flex justify-center  items-center shadow-xl'>
              <div>
                <h1 className='text-red-600 text-2xl font-semibold'>{this.props?.errorMsg}</h1>
                <button onClick={()=> window.location.reload()} className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mt-5 mr-2">Reload</button>
                <button onClick={this.changeUrl} className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mt-5 ml-2">Home</button>
              </div>
            </div>
          </div> */}
          <div className='w-screen h-screen grid justify-center items-center'>
            <div className="items-center justify-center p-10 bg-white shadow-xl">
              <div className="text-center">
                <div className="inline-flex rounded-full bg-indigo-100 p-4">
                  <div className="rounded-full stroke-indigo-600 bg-indigo-200 p-4">
                    <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 16L22 21M22 16L17 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                </div>
              </div>

              <div className=" p-10">
                <div>
                  <div className="text-center font-semibold text-3xl">Problem with the server</div>
                  <p className="text-slate-600 mt-1 lg:text-lg text-center">{this.props?.errorMsg}</p>
                  <div className="text-center mt-10">
                    <button onClick={() => window.location.reload()} className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mt-5 mr-2">Reload</button>
                    <button onClick={this.changeUrl} className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mt-5 ml-2">Home</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
export default CustomErrorBoundaryForRoutes
