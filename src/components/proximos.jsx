function Proximo({ item, highlighted, TrocarHighlight, obterHora }) {
  return (
    <li className={`filas ${highlighted ? 'highlighted' : ''}`}>
      {/*
      <div className="lugar">
        <p>{(item.ordem)+1}º</p>
      </div>
      */}
      <p className="senha">
        {
          item.codigo
        }
      </p>

      {
        item.text
        ?
        <p className="nome-text">{item.text}
        </p>
        :
        <p className={`${highlighted ? 'hora-actived' : 'hora'}`}>
          {obterHora(item.hora_criacao)}
        </p>
      }

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