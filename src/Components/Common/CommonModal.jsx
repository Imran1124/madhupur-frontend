/* eslint-disable react/prop-types */
import Modal from "react-modal";


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
Modal.setAppElement("#root");
function CommonModal(props) {
    return (

        <Modal
            isOpen={true}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {/* <div className="overflow-y-scroll"> */}
                {props?.children}
            {/* </div> */}
        </Modal>
    )
}

export default CommonModal