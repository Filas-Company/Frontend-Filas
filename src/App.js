import React, { useState, useEffect } from 'react';
import './CSS/alert.css';
import './CSS/styles.css';
import './CSS/prontos.css';
import './CSS/proximos.css';
import './CSS/admin.css';

import Alert from './components/Alert';
import AlertChama from './components/AlertChama';
import Pronto from './components/prontos';
import Proximo from './components/proximos';
import Chamando from './components/Chamando';

function App() {
  const [itens, setItens] = useState([]);
  const [jaAbriu, setJaAbriu] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isAlertOpenChama, setIsAlertOpenChama] = useState(true)
  const [singleton, setSingleton] = useState(false)
  const [highlightedSenha, setHighlightedSenha] = useState(null);
  const [highlightedStatus, setHighlightedStatus] = useState(null);
  const [mostrandoProntos, setMostrandoProntos] = useState(false);
  const [verMais, setVerMais] = useState(true);
  const [mostrandoTodos, setMostrandoTodos] = useState(false);
  let highlightedItem = itens.find(item => item.codigo === highlightedSenha);
  

  function getData() {
    fetch('http://localhost:3000/fila/list', { method: 'GET' })
      .then(response => response.json())
      .then(data => setItens(data));
  }

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  }
  const handleCloseAlertChama = () => {
    setIsAlertOpenChama(!isAlertOpenChama);
  }
  
  function TrocarHighlight(item) {
    setHighlightedSenha(item.codigo);
  }
  
  const handleConfirmAlert = (foundItem) => {
    setHighlightedSenha(foundItem.codigo);
    setIsAlertOpen(false);
    setHighlightedStatus(foundItem.status);
    setJaAbriu(true)
    console.log("highlightedSenha:", foundItem.codigo);
    if (!singleton) {
      setSingleton(true);
    }
  };

  function VerChamados() {
    setMostrandoProntos(!mostrandoProntos);
  };

  function VerTodos() {
    setVerMais(!verMais);
    setMostrandoTodos(!mostrandoTodos);
  };

  useEffect(() => {
    getData(); // Função que obtém dados da fila.
    if (!jaAbriu) {
      setIsAlertOpen(true);
    }

    if (highlightedStatus === 2) {
      setMostrandoProntos(true);
    }

    // Verificar se o item highlighted mudou para status 1
    // const highlightedItem = itens.find(item => item.codigo === highlightedSenha);
    // if (highlightedItem && highlightedItem.status === 1) {
    //   alert(`O seu pedido ${highlightedItem.codigo} está pronto!`);
    // }
  }, [singleton, highlightedStatus, jaAbriu, itens]);

  return (
    <div className="App">
      <div>
        <Alert
          isOpen={isAlertOpen}
          onClose={handleCloseAlert}
          onConfirm={handleConfirmAlert}
          lista={itens}
        />
      </div>
      <div>
        {highlightedItem && highlightedItem.status === 1 && (
          <AlertChama
            isOpen={isAlertOpenChama}
            onClose={handleCloseAlertChama}
          />
        )}
      </div>

      <div className="container-principal">
        <header>
          <nav className="navigation">
            <div class="left-group">
            <a href="http://localhost:8000" className="logo-link">
              <img className="seta" src="./img/arrow.png" alt="voltar" />
              <h1 className="logo">FILA</h1>
            </a>
            </div>
            <a href='https://www.burgerking.com.br' className="rest" target='blank'>Restaurante</a>
          </nav>
        </header>
        <div className="container-prontos">
          <div>
            {itens.map(cadaItem => (
              (cadaItem.status === 1) ? (
                <Chamando
                  item={cadaItem}
                  highlighted={Number(highlightedSenha) === Number(cadaItem.codigo)}
                />
              ) : null
            ))}
          </div>

          <div></div>
          <div className='chamados'>
              {mostrandoProntos ? (
                <div className="nao veio">
                    <div className='ja-chamados'>
                      <p>Já chamados:</p>
                      <button className='ver-chamados-btn' onClick={VerChamados}>
                        <label>{mostrandoProntos ? "ver menos" : "ver já chamados"}
                        <span class="material-symbols-outlined"
                        style={{ 
                          fontSize: "13px", 
                          verticalAlign: "middle",
                          marginLeft: "2px",
                          fontWeight: "500"}}
                        >
                          arrow_forward_ios
                        </span>
                        </label>
                      </button>
                    </div>
                    

                    <div className="container-prontos">
                      {itens.map(cadaItem => (
                        (cadaItem.status === 2) ? (
                            <Pronto
                              TrocarHighlight={TrocarHighlight}
                              item={cadaItem}
                              highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                              log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                            />
                        ) : null
                      ))}
                    </div>
                </div>
              ) : (
                <div className='naoveio'>
                  <button className='ver-chamados-btn' onClick={VerChamados}>
                    <label>{mostrandoProntos ? "ver menos" : "ver já chamados"}
                    <span class="material-symbols-outlined"
                        style={{ 
                          fontSize: "13px", 
                          verticalAlign: "middle",
                          marginLeft: "2px",
                          fontWeight: "500"}}
                        >
                          arrow_forward_ios
                    </span>
                    </label>
                  </button>
                </div>
              )}
          </div>
        </div>
        {highlightedSenha ? (
          <div className="container-proximos">
            <ul className="proximo">
              <div className="container-proximos">
                <div className="senha-user">
                  {!mostrandoTodos && (
                    <p>Sua senha </p>
                  )}

                  <button className="ver-tudo" onClick={VerTodos}>
                    <label>{verMais ? "ver todos" : "ver menos"}
                    <span class="material-symbols-outlined"
                        style={{ 
                          fontSize: "13px", 
                          verticalAlign: "middle",
                          marginLeft: "2px",
                          fontWeight: "500"
                        }}
                        >
                          arrow_forward_ios
                    </span>
                    </label>
                  </button>
                </div>

                {itens.map(cadaItem => (
                  (cadaItem.status === 3) && !mostrandoTodos ? (
                    highlightedSenha === cadaItem.codigo ? (
                      <Proximo
                        TrocarHighlight={TrocarHighlight}
                        item={cadaItem}
                        highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                        log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                      />
                    ) : null
                  ) : null
                ))}

                {itens.map(cadaItem => (
                  (cadaItem.status === 3) && mostrandoTodos ? (
                    <Proximo
                      TrocarHighlight={TrocarHighlight}
                      item={cadaItem}
                      highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                      log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                    />
                  ) : null
                ))}
              </div>
            </ul>
          </div>

        ) : (

          <div className="container-proximos">
            <ul className="proximo">
              {itens.map(cadaItem => (
                cadaItem.ordem !== 0 && cadaItem.ordem !== -1 ? (
                  <Proximo
                  TrocarHighlight={TrocarHighlight}
                    item={cadaItem}
                    highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                    log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                  />
                ) : null
              ))}
            </ul>
          </div>

        )}
      </div>
      <script src="/script.js"></script>
    </div>
  );
}

export default App;
