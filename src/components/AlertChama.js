import Modal from 'react-modal';

Modal.setAppElement('#root');

const AlertChama = ({ isOpen, onClose, highlightedSenha, highlightedItem }) => {

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
        <div className='div-h2'>
          <h2>
            <strong style={{ textTransform: "uppercase" }}>
              {highlightedItem.text ? highlightedItem.text : null}
            </strong>
          </h2>
          <h2>
            Você está sendo chamado!
          </h2>
        </div>
        <h3>nº {highlightedSenha}</h3>

        <div className="chama-button">
          <button onClick={onClose} className="button-voltar">Não Sou Eu</button>
          <button onClick={onClose} className="button-ok">Estou Indo!</button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertChama;
