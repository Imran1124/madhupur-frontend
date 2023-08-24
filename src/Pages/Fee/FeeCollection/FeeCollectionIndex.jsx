/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import imgIdCard from './idcard.png';
import rupeeIcon from './rupeeIcon.png';
import BarLoader from '../../../Components/Common/BarLoader';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ApiList from '../../../Components/ApiList/ApiList';
import { useEffect } from 'react';
import AxiosInterceptors from '../../../Components/Common/AxiosInterceptors';
import ApiHeader from '../../../Components/ApiList/ApiHeader';
import { SelectField } from '../../../Components/forms';

// name:imran
// devmode -: open

const FeeCollectionIndex = () => {
  // if 2023-07-14 16:07:50
  let currentDate = new Date().toISOString().slice(0, 10);
  console.log(currentDate);
  const [selectedOption, setSelectedOption] = useState('');
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [getPaidFee, setPaidFee] = useState([]);
  const {
    api_master_fee_collection_search,
    api_payment_mode_active_all,
    api_fee_collection_store,
    api_fetch_fee_collection
  } = ApiList();
  const [paymentData, setPaymentData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [student, setStudent] = useState();
  const [submitFee, setSubmitFee] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const validationSchema = yup.object({
    admissionNo: yup.string().required('Admission number is required feild')
  });

  const navigate = useNavigate();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      // monthName: "",
      admissionNo: '',
      // monthId: "",
      paymentModeId: '1',
      paymentMode: 'Cash'
    },

    onSubmit: async (values) => {
      console.log('at submit ', values);
      await fetchMasterList(values);
      setIsEdit(!isEdit);
    },
    validationSchema
  });

  const fetchPaymentModeData = async () => {
    try {
      const response = await AxiosInterceptors.post(
        api_payment_mode_active_all,
        {},
        ApiHeader()
      );
      console.log('paymentMode', response?.data);
      if (response?.data?.status === true) {
        setPaymentData(response?.data?.data);
      }
    } catch (error) {
      console.log('paymentMode', error);
      activateBottomErrorCard(true, 'Error occured in submitting form.');
    }
  };

  const fetchMasterList = async (values) => {
    setisLoading(true);
    try {
      const response = await AxiosInterceptors.post(
        api_master_fee_collection_search,
        {
          admissionNo: values.admissionNo
        },
        ApiHeader()
      );
      console.log('paymentMode', response?.data);
      if (response?.data?.status === true) {
        setStudent(response?.data?.data?.studentDetails);
        // setGrandTotal(response?.data?.data?.grandTotal);
        setFeeData(
          response?.data?.data?.monthly_fee.map((item) => {
            return {
              ...item,
              isPaid: false
            };
          })
        );
      } else {
        console.log('==2 error list...', error);
        // activateBottomErrorCard(true, 'Error occured in submitting form.');
        toast.warning('Error occured in submitting form');
        setisLoading(false);
      }
      setisLoading(false);
    } catch (error) {
      console.log('paymentMode', error);
      activateBottomErrorCard(true, 'Error occured in submitting form.');
      setisLoading(false);
    }
  };
  const handleChange = (e) => {};

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
  console.log(student);

  // const handleCheck = (event, index) => {
  //   // if check box is unchecked then all check box is unchecked after unchecked check box?
  //   setFeeData((prev) =>
  //     prev.map((item, i) => {
  //       if (i === index) {
  //         return {
  //           ...item,
  //           isPaid: event.target.checked
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   );
  // };

  useEffect(() => {
    console.log('feeDataaa', feeData);

    const GetData = feeData.flatMap((item) => {
      if (item.isPaid) {
        return item?.fee.map((item1) => {
          return {
            admissionNo: student?.admissionNo,
            monthName: item?.month_name,
            totalFee: item?.total,
            isPaid: item?.isPaid ? 1 : 0,
            addPayment: item?.addPayment,
            paymentDate: currentDate,
            paymentModeId: parseInt(formik?.values?.paymentModeId),
            grandTotal: grandTotal,
            feeHeadId: item1?.fee_ids,
            feeHeadName: item1?.fee_head,
            feeAmount: item1?.amount,
            className: student?.className,
            paymentMode: formik?.values?.paymentMode
          };
        });
      }
      return [];
    });
    console.log('GetData', GetData);

    setSubmitFee(GetData);
    setGrandTotal(
      feeData.reduce((acc, item) => {
        if (item.isPaid && item.addPayment) {
          return acc + item.total;
        } else {
          return acc;
        }
      }, 0)
    );
  }, [feeData, formik?.values?.paymentModeId]);

  const fetchFeeCollection = async () => {
    try {
      const response = await AxiosInterceptors.post(
        api_fetch_fee_collection,
        {
          admissionNo: student?.admissionNo
        },
        ApiHeader()
      );
      console.log('fetchFeeColl', response?.data);
      if (response?.data?.status == true) {
        setPaidFee(response?.data?.data);
        setFeeData((prev) =>
          prev.map((item) => {
            return {
              ...item,
              receiptNo: response?.data?.data?.find(
                (item1) => item1?.month_name == item?.month_name
              )?.receipt_no,

              isPaid:
                response?.data?.data?.some(
                  (item1) => item1?.month_name == item?.month_name
                ) || false,
              isDisabled:
                response?.data?.data?.some(
                  (item1) => item1?.month_name == item?.month_name
                ) || false
            };
          })
        );
      }
    } catch (error) {
      console.log('paymentMode', error);
      activateBottomErrorCard(true, 'Error occured in submitting form.');
    }
  };

  useEffect(() => {
    fetchFeeCollection();
  }, [isEdit]);

  const handlePayment = async () => {
    console.log('submitFee', submitFee);
    if (submitFee.length <= 0) {
      toast.warning('Please check at least one month');
    } else {
      try {
        const response = await AxiosInterceptors.post(
          api_fee_collection_store,
          {
            admissionNo: student?.admissionNo,
            grandTotal: grandTotal,
            isPaid: formik?.values?.paymentModeId == 1 ? 1 : 0,
            paymentDate: currentDate,
            paymentModeId: parseInt(formik?.values?.paymentModeId),
            feeCollection: submitFee.filter((item) => item?.addPayment == true)
          },
          ApiHeader()
        );
        console.log('paymentMode', response?.data?.receiptNo);
        if (response?.data?.status) {
          alert('Payment Done');
          navigate('/receipt', {
            state: {
              receiptNo: response?.data?.data?.receiptNo
            }
          });
        } else {
          toast.warning(`${response.data.message}`);
        }
      } catch (err) {
        console.log(err);
        activateBottomErrorCard(true, 'Error occured in submitting form.');
      }
    }
  };

  useEffect(() => {
    fetchPaymentModeData();
  }, [formik?.values?.paymentModeId]);

  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <div className="px-3 w-[70%] m-auto space-y-5 h-[80vh] overflow-auto">
          <div className="text-center">
            <div className="text-[32px] font-semibold text-gray-700">
              Fee Collection
            </div>
            <p className="text-teal-600">
              Securing a Bright Future: Collecting Fees to Support Education
              Excellence
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-lg w-full m-auto p-5 ">
            <div className="flex items-center justify-center gap-14 flex-wrap ">
              <div>
                <p className="text-2xl font-semibold text-teal-900">Date</p>
              </div>
              <div>
                <input
                  // {...formik.getFieldProps("admissionNo")}
                  disabled
                  type="text"
                  className="border rounded-lg shadow-md w-full h-10 px-8 block -mt-1 "
                  placeholder=""
                  value={currentDate}
                />
              </div>
              <div>
                <p className="text-2xl font-semibold text-teal-900">
                  Admission No{' '}
                  <small className="mt-1 -ml-1 text-lg font-semibold text-red-600 inline ">
                    *
                  </small>
                </p>
              </div>
              <div>
                {' '}
                <input
                  {...formik.getFieldProps('admissionNo')}
                  type="text"
                  className="border rounded-lg shadow-md w-full h-10 px-8 block -mt-1 "
                  placeholder="Enter admission no"
                />
              </div>
              <div>
                {' '}
                <button
                  type="submit"
                  className="text-white bg-[#0F766E] w-full px-10 mr-9 rounded-lg font-semibold py-2"
                >
                  Search
                </button>
              </div>
            </div>
            <span className="text-red-600 ml-[45vh]  text-sm mt-2">
              {formik.touched.admissionNo && formik.errors.admissionNo
                ? formik.errors.admissionNo
                : null}
            </span>
          </div>
          {/* <div className="mt-3">
                <p className="text-2xl ml-7  font-semibold text-gray-600">
                  Select Month
                </p>
                <div>
                  <select
                    name="monthId"
                    onChange={(e) => {
                      formik.setFieldValue("monthId", e.target.value);
                      formik.setFieldValue(
                        "monthName",
                        e.target.selectedOptions[0].text
                      );
                      return formik.handleChange(e);
                    }}
                    type="text"
                    className=" border rounded-lg shadow-md h-9 w-[100%] py-1 px-6"
                    placeholder="Select month"
                  >
                    <option value="">Select</option>
                    {monthList?.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.month_name}
                      </option>
                    ))}
                  </select>
               
                </div>
              </div> */}

          {/* Should Appear After searhing admission no. */}
          {feeData.length > 0 ? (
            <>
              <div>
                <p className="ml-5 text-gray-700 font-bold text-xl">
                  Name - {student?.fullName}
                </p>
                <div className="flex justify-between rounded-lg shadow-lg border border-gray-200 p-5">
                  <div>
                    <p className="font-bold text-xl text-gray-700">
                      Admission No
                    </p>
                    <p className="text-[18px] font-medium text-gray-500">
                      {student?.admissionNo}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-700">Class</p>
                    <p className="text-[18px] font-medium text-gray-500 text-center">
                      {student?.className}
                    </p>
                  </div>
                  {/* <div>
                    <p className="font-bold text-xl text-gray-700">Sec</p>
                    <p className="text-[18px] font-medium text-gray-500 text-center">
                      {student?.sectionName}
                    </p>
                  </div> */}
                  <div>
                    <p className="font-bold text-xl text-gray-700">Status</p>
                    <p className="text-[18px] font-medium text-green-500 text-center">
                      {student?.status}
                    </p>
                  </div>
                  <div>
                    <img
                      src={imgIdCard}
                      alt="Id Card"
                      className="opacity-80 h-12"
                    />
                  </div>
                </div>

                <div className="m-auto mt-5 overflow-auto">
                  <div className="grid grid-cols-12 font-semibold text-lg text-gray-700">
                    <div className="col-span-3 ml-5">Months</div>
                    <div className="col-span-3 ml-3">Fees</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-1"></div>
                    <div className="col-span-2 mx-auto flex justify-start items-center">
                      {/* <img
                        className="h-10 w-10 "
                        src={rupeeIcon}
                        alt="Rupee Icon"
                      /> */}
                      <input
                        type="checkbox"
                        className="w-6 h-6"
                        // check all check box using setCheckAll state and set it to true
                        onChange={(e) => {
                          const temp = feeData.map((item) => {
                            return { ...item, isPaid: e.target.checked };
                          });
                          setFeeData(temp);
                        }}
                        checked={
                          feeData?.filter((item) => item?.isPaid == true)
                            .length == feeData?.length
                        }
                      />
                    </div>
                  </div>
                  <div className=" rounded-lg shadow-lg border border-gray-200 px-5">
                    {feeData &&
                      feeData.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 text-gray-600 border-b py-2"
                        >
                          <div className="col-span-3 ">{item.month_name}</div>
                          <div className="col-span-3">
                            {item.fee.map((fees) => (
                              <>
                                <div>{fees.fee_head}</div>
                              </>
                            ))}
                            <div className="font-bold text-black">Total </div>
                          </div>
                          <div className="col-span-2">
                            {item.fee.map((amount) => (
                              <p>₹ {amount.amount}</p>
                            ))}
                            <p className=" text-black font-bold w-full px-10">
                              ₹ {item.total}
                            </p>
                          </div>
                          <div className="col-span-1 border-r-2 border-gray-200 my-2"></div>
                          <div className="col-span-2 m-auto text-center">
                            {item?.isDisabled ? (
                              <p
                                className="font-medium text-green-600 cursor-pointer"
                                onClick={() => {
                                  navigate('/receipt', {
                                    state: {
                                      receiptNo: item?.receiptNo
                                    }
                                  });
                                }}
                              >
                                View
                              </p>
                            ) : (
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  const temp = feeData.map((item, i) => {
                                    if (i == index) {
                                      return {
                                        ...item,
                                        isPaid: e.target.checked,
                                        addPayment: true
                                      };
                                    } else if (i > index) {
                                      return {
                                        ...item,
                                        isPaid: false,
                                        addPayment: false
                                      };
                                    } else {
                                      return item;
                                    }
                                  });
                                  setFeeData(temp);
                                }}
                                checked={item?.isPaid}
                                className={`w-6 h-6  content-center`}
                                disabled={
                                  index == 0
                                    ? false
                                    : feeData[index - 1]?.isPaid
                                    ? false
                                    : true
                                }
                              />
                            )}

                            {/* {item.isPaid && isEdit && (
                              <p className="font-medium text-green-700">Paid</p>
                            )} */}
                          </div>
                        </div>
                      ))}
                    <div className="grid grid-cols-12 mt-4 mb-4">
                      <div className="col-span-6">
                        <p className="font-bold text-lg text-black">
                          {' '}
                          Paid Amount{' '}
                        </p>
                      </div>
                      <div className="col-span-4">
                        <p className=" px-3 w-1/2  font-bold text-black">
                          ₹{' '}
                          {feeData
                            .filter((item) => item?.isDisabled)
                            .reduce((acc, item) => {
                              return acc + item?.total;
                            }, 0)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 mt-4 mb-4">
                      <div className="col-span-6">
                        <p className="font-bold text-lg text-black"> Amount </p>
                      </div>
                      <div className="col-span-4">
                        <p className=" px-3 w-1/2  font-bold text-black">
                          ₹ {grandTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg shadow-xl w-full m-auto p-5 ">
                <div className="flex flex-wrap justify-center items-center gap-x-5">
                  <div>
                    <p className="font-bold text-lg text-gray-700">
                      Payment Mode
                    </p>
                  </div>
                  <div>
                    <SelectField
                      className="border rounded-lg shadow-md w-full h-10 px-8 "
                      name="paymentModeId"
                      formik={formik}
                      selectedText="paymentMode"
                    >
                      {/* <option value="">Select</option> */}
                      {paymentData?.map((item) => (
                        <option value={item?.id}>
                          {item?.payment_mode_name}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                </div>
                {/* ..............Enter here.......... */}

                <div className="mt-3 ">
                  <div className="flex justify-center py-5">
                    <button
                      type="button"
                      className="bg-green-700 px-3 py-1 text-white font-semibold rounded shadow"
                      onClick={() => handlePayment()}
                      // onClick={() => navigate('/receipt')}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <span>No record found</span>
          )}
        </div>
      </form>
    </>
  );
};

export default FeeCollectionIndex;
