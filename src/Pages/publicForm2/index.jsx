import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import StudentRegistration from './StudentRegistration';
import PreviewModal from './PreviewModal';
import Payment from './payment/Payment';
import Navbar from './Navbar';
import { initialFormValue } from './initialValue';
import Stepper from './Stepper';

export default function StudentRegistrationNew() {
  const ref = useRef();
  const [searchParams] = useSearchParams();
  const [isModelOpen, setIsModelOpen] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState(initialFormValue());
  const [isEdit, setIsEdit] = React.useState(false);
  const schoolId = searchParams.get('token');
  const makeRequest = async (newData) => {
    // setStatus(newData.kycStatus);
    // setPage(1);
  };
  const handleNextStep = (newData, finalStep = false) => {
    setData({ ...data, ...newData });
    if (finalStep) {
      makeRequest(newData);
      return;
    }
    setPage(page + 1);
  };
  const handlePrevStep = (newData) => {
    setIsEdit(true);
    setData({ ...data, ...newData });
    setPage(page - 1);
  };

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const stepData = [
    <StudentRegistration
      data={data}
      next={handleNextStep}
      isModelOpen={isModelOpen}
      setIsModelOpen={setIsModelOpen}
      isEdit={isEdit}
    />,
    <PreviewModal
      data={data}
      prev={handlePrevStep}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
    />
  ];

  return (
    <>
      <Navbar isModelOpen={isModelOpen} />
      <div ref={ref} />
      <div className={`w-full  2xl:py-3 2xl:px-24 px-6 py-2 mt-20 `}>
        <Stepper page={page} setPage={setPage} />

        <div className="mt-5" />
        <div className="border-[2px] border-gray-200 rounded-md h-[90vh] 2xl:p-6 p-4 overflow-y-auto">
          <div className="">
            <div className="flex w-full justify-between items-center max-[870px]:block">
              <div className="flex flex-col">
                <span className="text-3xl text-center font-semibold text-gray-600 flex flex-start">
                  Student Registration{' '}
                  {page === 0 ? 'Form' : page === 1 ? 'Preview' : 'Payment'}{' '}
                  {page + 1}/3
                </span>
                <span className="text-sm text-center font-medium text-gray-400">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                  {/* {JSON.stringify(values.sibling)} */}
                </span>
              </div>
            </div>
          </div>
          {/* form */}
          <div className={`${page === 0 ? 'block' : 'hidden'}`}>
            <StudentRegistration
              data={data}
              next={handleNextStep}
              isModelOpen={isModelOpen}
              setIsModelOpen={setIsModelOpen}
              isEdit={isEdit}
              page={page}
            />
          </div>
          {/* preview */}
          <div className={`${page === 1 ? 'block' : 'hidden'}`}>
            <PreviewModal
              data={data}
              next={handleNextStep}
              prev={handlePrevStep}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              page={page}
            />
          </div>
          <div className={`${page === 2 ? 'block' : 'hidden'}`}>
            <Payment
              data={data}
              next={handleNextStep}
              prev={handlePrevStep}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              page={page}
            />
          </div>
        </div>
      </div>
    </>
  );
}
