function Proximo({ item, highlighted, TrocarHighlight}) {
  return (
    <li className={`prontos ${highlighted ? 'highlighted' : ''}`}>
      {/*
      <div className="lugar">
        <p>{(item.ordem)+1}º</p>
      </div>
      */}
      
      <p className="senha">
        { String(item.codigo).padStart(2, '0') }
      </p>
      
      <p className="code">
        {
          item.text ? item.text : ""
        }
      </p>

      {highlighted ? 
      <span
      >
      Já Chamou!
    </span>
      : 
      <span
      >
      </span>
      }
    </li>
  );
}

export default Proximo;