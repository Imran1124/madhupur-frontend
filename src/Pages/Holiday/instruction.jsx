/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import { BsFiletypeCsv } from 'react-icons/bs';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: 'transparent',
    border: 'none',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root');
function CommonModal(props) {
  return (
    <Modal
      isOpen={props.isModelOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="h-[85vh] rounded-lg   flex items-center justify-center">
        <div className=" bg-white lg:w-[900px]  rounded-lg shadow ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Instructions
            </h3>

            <button
              onClick={() => props.setIsModelOpen(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
              data-modal-hide="staticModal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            {/* step1 */}
            <h1 className="text-base leading-relaxed text-gray-500  ">
              <h1 className="font-bold"> Step 1:Upload Data Through Form </h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • Fill the data 
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Check the Validation
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Click on the save button
              </p>
            </h1>
            <h1 className="text-base leading-relaxed text-gray-500  ">
              <h1 className="font-bold"> Step 1: Upload Data Through CSV File</h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • If you want to upload CSV file
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Download the CSV file first in instruction page
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Fill the form according to the header
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • save the file 
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Upload the File
              </p>
            </h1>
            {/* step2 */}
            
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b  justify-between">
            <div className="flex items-center justify-center text-green-600 ">
              <BsFiletypeCsv className="text-xl font-semibold " />
              {'  '}
              <a href="/holiday-csv.csv" target="_blank" rel="noreferrer">
                <h1 className="text-sm font-semibold underline">
                  Download CSV
                </h1>
              </a>
            </div>
            <button
              onClick={() => props.setIsModelOpen(false)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
            >
              Continue To Add Holiday 
            </button>
            {/* <button
            data-modal-hide="staticModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  dark:text-gray-300 dark:border-gray-500   dark:focus:ring-gray-600"
          >
            Decline
          </button> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CommonModal;
