import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AlertChama = ({ isOpen, onClose }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="custom-modal-header">
        {/*<button onClick={onClose} className="close-button">X</button>*/}
      </div>
      <div className="custom-modal-body">
        <h2 className='alert-text'>Qual a sua senha?</h2>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-button">Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertChama;
