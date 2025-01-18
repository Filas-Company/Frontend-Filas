import React, { useState, useEffect } from 'react';
import './CSS/alert.css';
import './CSS/alertchama.css';
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
    fetch('http://localhost:3000/fila/list ', { method: 'GET' })
    // http://localhost:3000/fila/list 
    // ou 
    // https://backend-filas-production.up.railway.app/fila/list
      .then(response => response.json())
      .then(data => setItens(data));
  }

  const handleCloseAlertChama = () => {
    setIsAlertOpenChama(!isAlertOpenChama);
  }
  
  function TrocarHighlight(item) {
    setHighlightedSenha(item.codigo===highlightedSenha ? null : item.codigo)
  }
  
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setJaAbriu(true)
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
            highlightedSenha={highlightedSenha}
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
            <a href='https://www.hachimitsuoficial.com.br/' className="rest" target='blank'>Hachimitsu</a>
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
                        <label>{mostrandoProntos ? "ver menos" : "1 chamados"}
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
                    {itens
                      .filter(cadaItem => cadaItem.status === 2)
                      .sort((a, b) => b.ordem_chamado - a.ordem_chamado)
                      .map(cadaItem => (
                        <Pronto
                          key={cadaItem.codigo}
                          TrocarHighlight={TrocarHighlight}
                          item={cadaItem}
                          highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                          log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                        />
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
                    <p>Sua senha</p>
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
                {!mostrandoTodos && (
                    <div className='textinho'>
                    <p>Seu pedido sendo preparado!</p>
                    <p>Você será notificado assim que estiver pronto. 😊</p>
                  </div>
                )}
              </div>
            </ul>
          </div>

        ) : (

          <div className="container-proximos">
            <p className="p-proximos">Próximos</p>
            <ul className="proximo">
              {itens.map(cadaItem => (
                cadaItem.status !== 2 && cadaItem.status !== 1 ? (
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
