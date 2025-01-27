function Proximo({ item, highlighted, TrocarHighlight, obterHora }) {
  return (
    <li className={`filas ${highlighted ? 'highlighted' : ''}`}>
      {/*
      <div className="lugar">
        <p>{(item.ordem)+1}º</p>
      </div>
      */}
      <p>
        { obterHora(item.hora_criacao) }
      </p>
      <p className="senha">
        {
          item.codigo
        }
      </p>
      <p className="code">
        {
          item.text ? item.text : ""
        }
      </p>

      {highlighted ? 
      <span className="material-symbols-outlined sinoactive"
      onClick={() => TrocarHighlight(item)}>
      notifications_active
    </span>
      : 
      <span className="material-symbols-outlined sino"
      onClick={() => TrocarHighlight(item)}>
        notifications
      </span>
      }
    </li>
  );
}

export default Proximo;