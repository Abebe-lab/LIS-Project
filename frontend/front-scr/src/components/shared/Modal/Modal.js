import React, { useEffect, useState } from 'react';
//import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  const [showModal, setShowModal] = useState(show);
  
    console.log('children');
//    console.log(children);

  const handleClose = () => {
    setShowModal(false);
   // onClose(); // Call the onClose prop handler to inform the parent component
  };

  return (
    <>
      {showModal && (
        <div style={{ position: 'fixed', background: 'white', color: 'black', borderColor: 'black', borderRadius: 15, width: '300px', height: '300px', right: '250px', top: '100px', zIndex: 101}}>
          <div >
            <div className="modal-content">{children}</div>
            <button onClick={handleClose} style={{position: 'absolute', 'bottom': '10px', left: '20px'}}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
