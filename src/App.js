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


const URL_Backend = "http://localhost:3000/fila/list"
// http://localhost:3000/fila/list 
// ou 
// https://backend-filas-production.up.railway.app/fila/list

const URL_Frontend = "http://localhost:8000"
//http://localhost:8000 
//ou 
//https://frontend-filas.vercel.app


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
    fetch(URL_Backend, { method: 'GET' })
      .then(response => response.json())
      .then(data => setItens(data));
  }

  const handleCloseAlertChama = () => {
    setIsAlertOpenChama(!isAlertOpenChama);
  }

  function TrocarHighlight(item) {
    setHighlightedSenha(item.codigo === highlightedSenha ? null : item.codigo)
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
              <a href={URL_Frontend} className="logo-link">
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
                  VerChamados={VerChamados}
                  mostrandoProntos={mostrandoProntos}
                />
              ) : null
            ))}
          </div>

          <div></div>
          <div className='chamados'>
            {mostrandoProntos ? (
              <div className="nao veio">
                <div className='ja-chamados'>
                  <p>Já Chamados:</p>
                </div>


                <div className="container-chamados">
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
                
              </div>
            )}
          </div>
        </div>
        {highlightedSenha ? (
          <div className="container-proximos">
            <ul className="proximo">
              <div className="container-proximos">
                <div className="senha-user">
                  {!mostrandoTodos ? (
                    <p className='p-senhauser'>Sua senha</p>
                  ):(
                    <p className='p-senhauser'>Próximos</p>
                  )}

                  <button className="ver-tudo" onClick={VerTodos}>
                    <label>{verMais ? "Ver Todos" : "Ver Menos"}
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
                {!mostrandoTodos && highlightedStatus === 3 && (
                  <div className='textinho'>
                    <p>Seu pedido está sendo preparado!</p>
                    <p>😊</p>
                  </div>
                )}
              </div>
            </ul>
          </div>

        ) : (

          <div className="container-proximos">
            <div className="senha-user">
              <p className='p-proximos-semhigh'>Próximos</p>
            </div>

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
