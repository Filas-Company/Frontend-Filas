import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/alert.css';
import '../CSS/alertchama.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';
import '../CSS/admin.css';

import Alert from './Alert';
import AlertChama from './AlertChama';
import Pronto from './prontos';
import Proximo from './proximos';
import Chamando from './Chamando';

//comentario 2
const URL_Backend = `http://localhost:3000/fila/list`
// http://localhost:3000/fila/list -- LOCAL
// https://backend-filas.fly.dev/fila/list -- FLY.IO
// https://backend-filas-production.up.railway.app/fila/list -- RAILWAY

const URL_Frontend = "http://localhost:8000"
//http://localhost:8000 -- LOCAL
//https://www.filaonline.online/dados-fila -- VERSEL
//https://frontend-filas-production.up.railway.app/dados-fila -- RAILWAY

function Fila() {
    let { restaurante } = useParams();

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
    const [notificationSent, setNotificationSent] = useState(false);
    const [ultimoChamado, setUltimoChamado] = useState(null);
    const [ativarSom, setAtivarSom] = useState(true);
    const [ativo, setAtivo] = useState(false);
    const [blink, setBlink] = useState(false);

    let highlightedItem = itens.find(item => item.codigo === highlightedSenha);


    function getData() {
        console.log("Usando o fetch...");
        fetch(URL_Backend + "/" + restaurante, { method: 'GET' })
            .then(response => response.json())
            .then(data => setItens(data));
    }

    function obterHora(hora) {
        const horaCriacao = new Date(hora);
        const horas = horaCriacao.getHours().toString().padStart(2, '0');
        const minutos = horaCriacao.getMinutes().toString().padStart(2, '0');

        return `${horas}:${minutos}`;
    }

    const handleCloseAlertChama = () => {
        setIsAlertOpenChama(!isAlertOpenChama);
    }
    const handleConfirmAlertChama = () => {
    }

    function TrocarHighlight(item) {
        setHighlightedSenha(item.codigo === highlightedSenha ? null : item.codigo)
        setHighlightedStatus(item.codigo === highlightedSenha ? null : item.status)
    }

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
        setJaAbriu(true)
    }
    const handleConfirmAlert = (foundItem) => {
        setHighlightedSenha(foundItem.codigo);
        setHighlightedStatus(foundItem.status);
        setIsAlertOpen(false);
        if (foundItem.status === 2) {
            VerChamados()
        }
        setJaAbriu(true)
        console.log("highlightedSenha:", foundItem.codigo);

        if (!singleton) {
            setSingleton(true);
        }
    };

    function VerChamados() {
        setAtivo(!ativo)
        setMostrandoProntos(!mostrandoProntos);
    };

    function VerTodos() {
        setVerMais(!verMais);
        setMostrandoTodos(!mostrandoTodos);
    };

    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    function falarChamando(senha) {
        if (!ativarSom) return;
        const synth = window.speechSynthesis;
        const frases = ["Chamando", "Senha", senha];
        let index = 0;

        function falarProxima() {
            if (index < frases.length) {
                const utterance = new SpeechSynthesisUtterance(frases[index]);
                utterance.lang = 'pt-BR';
                utterance.rate = 1;

                let voices = synth.getVoices();
                utterance.voice = voices.find(voice => voice.lang === "pt-BR") || null;

                utterance.onend = () => {
                    index++;
                    falarProxima();
                };

                synth.speak(utterance);
            }
        }

        if (isIOS()) {
            synth.onvoiceschanged = () => {
                if (!synth.getVoices().length) return;
                falarProxima();
            };
        }

        if (synth.getVoices().length > 0) {
            falarProxima();
        } else if (isIOS()) {
            synth.onvoiceschanged = falarProxima;
        }
    }

    function falarHighlighted(senha) {
        const synth = window.speechSynthesis;
        const frases = ["Sua Senha está sendo chamada", "Senha", senha];
        let index = 0;

        function falarProxima() {
            if (index < frases.length) {
                const utterance = new SpeechSynthesisUtterance(frases[index]);
                utterance.lang = 'pt-BR';
                utterance.rate = 1;

                let voices = synth.getVoices();
                utterance.voice = voices.find(voice => voice.lang === "pt-BR") || null;

                utterance.onend = () => {
                    index++;
                    falarProxima();
                };

                synth.speak(utterance);

                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]);
                }
            }
        }

        if (isIOS()) {
            synth.onvoiceschanged = () => {
                if (!synth.getVoices().length) return;
                falarProxima();
            };
        }

        if (synth.getVoices().length > 0) {
            falarProxima();
        } else if (isIOS()) {
            synth.onvoiceschanged = falarProxima;
        }
    }

    useEffect(() => {
        getData();

        const itemChamado = itens.find(item => item.codigo === highlightedSenha);
        if (itemChamado && itemChamado.status === 1) {
            // Lógica para abrir o alert aqui
            setIsAlertOpenChama(true);
        }

        if (!jaAbriu) {
            setIsAlertOpen(true);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        const itemChamando = itens.find(item => item.status === 1);
        if ((itemChamando && itemChamando.codigo !== ultimoChamado) && (itemChamando.codigo !== highlightedItem?.codigo)) {
            falarChamando(itemChamando.text ? itemChamando.text : itemChamando.codigo);
            setUltimoChamado(itemChamando.text ? itemChamando.text : itemChamando.codigo);
        }

        if ((highlightedItem?.status === 1) && (highlightedItem?.codigo !== ultimoChamado)) {
            falarHighlighted(highlightedItem.text ? itemChamando.text : itemChamando.codigo);
            setUltimoChamado(highlightedItem.text ? itemChamando.text : itemChamando.codigo);
        }

        if (itemChamando?.codigo !== ultimoChamado) {
            setUltimoChamado(itemChamando?.codigo);
            setBlink(true);
            const timeout = setTimeout(() => setBlink(false), 500); // Pisca por 500ms
            return () => clearTimeout(timeout);
        }
    }, [singleton, highlightedStatus, jaAbriu, itens, highlightedItem, notificationSent ]);

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
                {highlightedStatus === 1 && (
                    <>
                        <AlertChama
                            isOpen={isAlertOpenChama}
                            onClose={handleCloseAlertChama}
                            onConfirm={handleConfirmAlertChama}
                            highlightedSenha={highlightedSenha}
                            highlightedItem={highlightedItem}
                        />
                    </>
                )}
            </div>

            <div className="container-principal">
                <header>
                    <nav className="navigation">
                        <div className="left-group">
                            <a href="https://pratodigital.com.br/casaditalia/" className="logo-link" target="_blank">
                                <span className="material-symbols-outlined">
                                    arrow_back_ios
                                </span>
                                <h1 className="logo">Casa D'Italia</h1>
                            </a>
                        </div>
                        <a className="rest" target='blank'>Fila</a>
                    </nav>
                </header>
                <div className="container-prontos">
                    <div>
                        {itens.map(cadaItem => (
                            (cadaItem.status === 1) ? (
                                <Chamando
                                    key={cadaItem.codigo}
                                    item={cadaItem}
                                    highlighted={Number(highlightedSenha) === Number(cadaItem.codigo)}
                                    VerChamados={VerChamados}
                                    mostrandoProntos={mostrandoProntos}
                                    ativarSom={ativarSom}
                                    setAtivarSom={setAtivarSom}
                                    ativo={ativo}
                                    blink={blink}
                                />
                            ) : null
                        ))}
                    </div>

                    <div></div>
                    <div className='chamados'>
                        {mostrandoProntos ? (
                            <div className="nao veio">
                                <div className='ja-chamados'>
                                    <p>Já Chamados</p>
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
                {highlightedItem?.status === 3 ? (
                    <div className="container-proximos">
                        <ul className="proximo">
                            <div className="container-proximos">
                                <div className="senha-user">
                                    {!mostrandoTodos ? (
                                        <p className='p-senhauser'>Sua Senha</p>
                                    ) : (
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
                                                key={cadaItem.codigo}
                                                TrocarHighlight={TrocarHighlight}
                                                item={cadaItem}
                                                highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                                                log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                                                obterHora={obterHora}
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
                                            obterHora={obterHora}
                                        />
                                    ) : null
                                ))}
                                {!mostrandoTodos && highlightedItem.status === 3 && (
                                    <div className='textinho'>
                                        <p>Te avisaremos na sua vez!</p>
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
                                        key={cadaItem.codigo}
                                        TrocarHighlight={TrocarHighlight}
                                        item={cadaItem}
                                        highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                                        log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                                        obterHora={obterHora}
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

export default Fila;