/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { BsFiletypePdf } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import Amity from '../../../../public/e-scuola-logo-1.1.png';
import ApiList from '../../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../../Components/Common/AxiosInterceptors';
import ApiHeader from '../../../Components/ApiList/ApiHeader';

export default function Receipt() {
  const { api_feecollection_view_receipt } = ApiList();
  // get the state from useLocation hook
  const location = useLocation();
  const [data, setData] = React.useState({});
  // get the state from useLocation hook
  const { state } = location;
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const fetchReceipt = async () => {
    try {
      const response = await AxiosInterceptors.post(
        api_feecollection_view_receipt,
        {
          receiptNo: state.receiptNo
        },
        ApiHeader()
      );
      console.log('data', response);
      setData(response.data.data);
      if (response?.data?.status) {
      } else {
        console.log('data', response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // get the state from useLocation hook
  React.useEffect(() => {
    fetchReceipt();
  }, []);

  return (
    <>
      <div
        className="flex w-full h-[75vh] overflow-auto max-[1200px]:block max-[1200px]:overflow-auto"
        ref={componentRef}
      >
        <ViewReceipt
          data={data}
          copy="Candidate copy"
          receipt={state?.receiptNo}
        />
        <ViewReceipt
          data={data}
          copy="School copy"
          receipt={state?.receiptNo}
        />
      </div>
      <div className="flex justify-end items-center w-full h-[8vh]">
        <button
          className="flex justify-center items-center w-[10vh] h-[5vh] bg-blue-600 text-white rounded-md mr-2"
          onClick={handlePrint}
        >
          <BsFiletypePdf className="text-[2vh]" />
          <span className="text-[1.5vh] ml-2">Print</span>
        </button>
      </div>
    </>
  );
}

const ViewReceipt = ({ data, copy, receipt }) => {
  return (
    <div className="w-full h-[79vh] overflow-auto border-x border-x-gray-500 border-y border-y-gray-500 mr-1 mx-2 mt-2 max-[782px]:w-[782px] max-[782px]:overflow-auto">
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <h1 className="text-[2vh] flex justify-start w-full  mt-2 ">
          {receipt}
        </h1>
        <h1 className="text-[2vh] flex justify-end w-full -ml-2 mt-2 ">
          {copy}
        </h1>
      </div>
      <div className="w-full flex items-center justify-start mb-2">
        <div className="flex items-start justify-start  w-full">
          <img
            src="/assets/schoollogo.jpeg"
            alt="school logo"
            className="w-[10vh] h-[10vh] rounded-[50%] ml-10"
          />
          <div className="block w-full text-left ml-5">
            <h1 className="text-[2.8vh] font-bold text-blue-600">
              SR International School
            </h1>
            <h2 className="text-[1.5vh]">plot No. 65,Sector-20</h2>
            <h3 className="text-[1.5vh]">Sarita Vihar, Ranchi-110044</h3>
          </div>
        </div>
      </div>
      <table className="border-t  border-t-gray-500  w-full">
        <tr className=" w-full">
          <td className="text-[2.2vh] font-bold w-full" colSpan={4}>
            School Fee Structure:-2023-2024
          </td>
        </tr>
        <tr className="border-t border-b border-t-gray-500 border-b-gray-500 w-full">
          <td className="w-[25%]">Name</td>
          <td className="border-l border-l-gray-500 w-[25%]">
            {data?.stdDetails?.first_name}
          </td>
          <td className="border-l border-gray-500 w-[25%]">Roll</td>
          <td className="border-l border-l-gray-500 w-[25%]">
            {data?.stdDetails?.roll_no}
          </td>
        </tr>

        <tr className="border-t border-b border-t-gray-500 border-b-gray-500 w-full">
          <td className="w-[25%]">Class</td>
          <td className="border-l border-l-gray-500 w-[25%]">
            {data?.stdDetails?.class_name}
          </td>
          <td className="border-l border-gray-500 w-[25%]">Section</td>
          <td className="border-l border-l-gray-500 w-[25%]">
            {data?.stdDetails?.section_name}
          </td>
        </tr>
        <tr className="border-t border-b border-t-gray-500 border-b-gray-500 w-full">
          <td className="w-[65%]" colSpan={3}>
            Date:- {new Date().toLocaleDateString()}
          </td>
          <td className="border-l border-l-gray-500 w-[35%]">
            Admission no. {data?.stdDetails?.admission_no}
          </td>
        </tr>

        <tr className="border-t border-b border-t-gray-500 border-b-gray-500 w-full h-auto">
          <td className="w-[10%] font-bold">S No.</td>
          <td className="border-l border-l-gray-500 w-[10%]  font-bold">
            Month
          </td>
          <td className="border-l border-l-gray-500 w-[25%]  font-bold">
            Particulars
          </td>
          <td className="border-l border-l-gray-500 w-[25%]  font-bold">
            Amount (Rs.)
          </td>
        </tr>
        {data?.feeDetails?.map((item, index) =>
          item?.details.map((item1, index1) => {
            return (
              <tr
                key={index}
                className="border-t border-b border-t-gray-500 border-b-gray-500 w-full"
              >
                <td className="w-[10%]">{index1 + index + 1}</td>
                <td className="border-l border-l-gray-500 w-[10%]">
                  {item?.monthName}
                </td>
                <td className="border-l border-l-gray-500 w-[25%]">
                  {item1?.feeHeadName}
                </td>
                <td className="border-l border-l-gray-500 w-[25%]">
                  {item1?.amount}
                </td>
              </tr>
            );
          })
        )}
        <tr className="border-t border-b border-t-gray-500 border-b-gray-500 w-full h-auto">
          <td className="text-[2vh] font-bold w-full " colSpan={3}>
            Total
          </td>
          <td className="text-[2vh] font-bold w-full border-l border-l-gray-500">
            {data?.feeDetails?.reduce(
              (acc, item) =>
                acc +
                item?.details?.reduce(
                  (acc1, item1) => parseInt(acc1) + parseInt(item1?.amount),
                  0
                ),
              0
            )}
          </td>
        </tr>

        {/* <tr className="border-t border-b border-t-gray-500 border-b-gray-500 w-full h-auto">
          <td className="text-[2vh] font-bold w-full " colSpan={4}>
            In Words:-
           
            {data?.feeDetails?.reduce(
              (acc, item) =>
                acc +
                item?.details?.reduce(
                  (acc1, item1) => parseInt(acc1) + parseInt(item1?.amount),
                  0
                ),
              0
            )}
            /-
            ...........................................................................................................................................
          </td>
        </tr> */}

        <tr className=" border-t border-b border-t-gray-500 border-b-gray-500 w-full">
          <td className="text-[2vh] font-bold w-full " colSpan={4}>
            Note:-{' '}
            <span className="text[1.8vh] font-thin">
              Fees once paid is not refunable and transferable
            </span>
          </td>
        </tr>
        <tr className=" w-full  h-auto">
          <td
            className="text-[2vh] font-bold w-full flex items-end"
            colSpan={2}
          ></td>
          <td className="flex items-end ml-10 mt-8" colSpan={2}>
            Signature
          </td>{' '}
        </tr>
      </table>
    </div>
  );
};
