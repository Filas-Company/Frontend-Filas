function Chamando({ item, highlighted, VerChamados, mostrandoProntos, ativarSom, setAtivarSom, ativo, blink }) {

  return (
    <li className={`chamando ${blink ? "piscar" : ""}`}>
      <div className="cima-chamando">
        <p className="senha-atual">CHAMANDO...</p>

        {ativarSom ?
          <span
            onClick={() => setAtivarSom(!ativarSom)}
            className="material-symbols-outlined sinoactive">
            volume_up
          </span>
          :
          <span
            onClick={() => setAtivarSom(!ativarSom)}
            className="material-symbols-outlined sino">
            volume_off
          </span>
        }
      </div>
      <div className="chamando-codigo">
      <h1>{String(item.codigo).padStart(2, '0')}</h1>
        {/*<h2 className="codigo-chamando">Senha<br></br>Atual</h2>*/}
      </div>
      <div className="container-jachamados">
        {item.text && (
          <div className="div-pessoa">
            <span className="material-symbols-outlined">
              person
            </span>
            <p className='name'>{item.text}</p>
          </div>
        )}

        <button
          className={`ver-jachamados ${ativo ? "ativo" : ""}`}
          onClick={VerChamados}>
          <span className="material-symbols-outlined">
            history
          </span>
        </button>
      </div>
    </li>
  )
}

export default Chamando
