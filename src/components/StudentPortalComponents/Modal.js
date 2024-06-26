import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 5, maxWidth: 500, width: '100%' }}>
        {children}
        <button onClick={onClose} style={{ marginTop: 20 }}>Close</button>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
