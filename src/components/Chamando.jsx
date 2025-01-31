function Chamando({ item, highlighted, VerChamados, mostrandoProntos }) {

    return (
      <li className='chamando'>
        <p className="senha-atual">Senha Atual</p>
        <h1>{item.codigo}</h1>
        <div className="container-jachamados">
          {item.text && (
            <div className="div-pessoa">
              <span className="material-symbols-outlined">
                person
              </span>
              <p className='name'>{item.text}</p>
            </div>
          )}

          <button className='ver-jachamados' onClick={VerChamados}>
            {mostrandoProntos ? "Ver Menos" : "Ver Chamados"}
          </button>
        </div>
      </li>
    )
  }
  
  export default Chamando
  