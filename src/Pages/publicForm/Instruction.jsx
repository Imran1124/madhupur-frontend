/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import { FaFilePdf } from 'react-icons/fa';

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
      <div className="h-[85vh] rounded-lg   overflow-y-scroll">
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
              <h1 className="font-bold"> Step 1: Registration</h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • Visit the official website
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Click the link 'New Registration' on the home page
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Fill the form
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Upon successful registration, a provisional registration
                number and password are generated
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • The provisional registration number and password are also sent
                to the registered email ID and mobile no.
              </p>
            </h1>
            {/* step2 */}
            <h1 className="text-base leading-relaxed text-gray-500  ">
              <h1 className="font-bold"> Step 2: Upload Photo</h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • Post the registration, candidates need to upload the
                photograph
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Photograph should be properly scanned and not smudged
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Photograph must be a recent passport-style colour picture
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • The size of the file should be between 10 kb to 50 kb
              </p>
            </h1>
            {/* step3 */}
            <h1 className="text-base leading-relaxed text-gray-500  ">
              <h1 className="font-bold">
                Step 3: Fill the Detailed Application Form
              </h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • This page is divided into five parts, basic details, parents
                details, address details, transport details, . Candidates can
                below the details to be filled in each part: Basic details:
                Here, candidates need to fill in the category, nationality,
                personal details, select exam centres, date of birth, gender,
                father's name or mother's name, address, etc. Parents deatils:
                Here, candidates need to enter parents details . Transport
                details: Candidates need to enter the preferences of pickup
                point
              </p>
            </h1>
            {/* step4 */}
            <h1 className="text-base leading-relaxed text-gray-500  ">
              <h1 className="font-bold">Step 4: Preview of Application Form</h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • Candidates must preview the application form before the final
                submission. They can edit the details entered in the application
                form while validating the same. Once this is complete,
                candidates need to agree to the terms and conditions and submit
                their applications.
              </p>
            </h1>
            <h1 className="text-base leading-relaxed text-gray-500  ">
              <h1 className="font-bold">Step 5: Fee Payment</h1>

              <p className="text-sm leading-relaxed text-gray-500 ">
                • The application form is integrated with the payment gateway.
                Candidates need to follow the steps below for making payment
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • The payment can be made by using debit cards, credit cards,
                internet banking, IMPS, cash cards by providing information as
                asked
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • On successful completion of the transaction, an e-receipt is
                generated
              </p>
              <p className="text-sm leading-relaxed text-gray-500 ">
                • Candidates are required to take a printout of the e-receipt
                and online application form containing fee payment details
              </p>
            </h1>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b  justify-between">
            <div className="flex items-center justify-center text-red-800 ">
              <FaFilePdf className="text-xl font-semibold " />
              {'  '}
              <a href="/howToApplyOnline.pdf" target="_blank" rel="noreferrer">
                <h1 className="text-sm font-semibold underline">
                  Download Instruction
                </h1>
              </a>
            </div>
            <button
              onClick={() => props.setIsModelOpen(false)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
            >
              Continue To Registration
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
