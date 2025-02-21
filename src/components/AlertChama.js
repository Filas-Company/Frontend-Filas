import Modal from 'react-modal';

Modal.setAppElement('#root');

const AlertChama = ({ isOpen, onClose, highlightedSenha }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="chama"
      overlayClassName="custom-overlay"
    >
      <div className="chama-close">
        <span class="material-symbols-outlined" onClick={onClose}>
          close
        </span>
      </div>

      <div className="chama-body">
        <span class="material-symbols-outlined" onClick={onClose}>
          check_circle
        </span>
        <h2>Você está sendo chamado!</h2>
        <h3>nº {highlightedSenha}</h3>

        <div className="chama-button">
          <button onClick={onClose} className="button-voltar">Voltar fila</button>
          <button onClick={onClose} className="button-ok">OK</button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertChama;
