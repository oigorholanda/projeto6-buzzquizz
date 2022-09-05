let allQuizzes;
let tituloQuizz;
let qtdPergunta;
let perguntas = [];
let imagemQuizz;
let niveis;
let tituloNivel;
let textoNivel;
let imagemNivel;
let opcoesRespostas;



function updatePage() { //Essa função puxa todos os quizzes do servidor
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promiseQuizzes.then(processPromise);
}
updatePage();

function processPromise(promiseQuizzes) { //Essa função mostra a promise no console
    allQuizzes = promiseQuizzes.data;
    console.log(allQuizzes);

    renderizar();
}

function renderizar() {
    const quizzes = document.querySelector(".quizzes");
    quizzes.innerHTML = '';
    for (let i = 0; i < allQuizzes.length; i++) {
        quizzes.innerHTML += `
        <div class="quizz" id="${allQuizzes[i].id}" data-identifier="quizz-card" onclick="renderizarQuizz(this)">
        <img src="${allQuizzes[i].image}" />
        <p>${allQuizzes[i].title}</p>
        </div>
        `
    }
}

function renderizarQuizz(quizzClicado) {
    console.log(quizzClicado);
    const seletor = Number(quizzClicado.id);

    const ttqz = document.querySelector(".titulo-quizz");
    ttqz.innerHTML = '';

    for (let i = 0; i < allQuizzes.length; i++) {
        if (seletor === allQuizzes[i].id) {
            imagemQuizz = allQuizzes[i].image;
            niveis = allQuizzes[i].levels;
            perguntas = allQuizzes[i].questions;
            tituloQuizz = allQuizzes[i].title;
            qtdPergunta = allQuizzes[i].questions.length;
            console.log(allQuizzes[i]);
        }
    }

    console.log(perguntas);
    ttqz.innerHTML += `
    <img src="${imagemQuizz}">
    <p>${tituloQuizz}</p>
    </div>
    `
    const qdPerg = document.querySelector(".perguntas-quizz");
    qdPerg.innerHTML = '';
    console.log(qdPerg);


    for (let i = 0; i < qtdPergunta; i++) {
        opcoesRespostas = perguntas[i].answers;
        qdPerg.innerHTML +=`
        <div class="quadro-pergunta">
            <div class="pergunta-quizz pergunta${i}" style="background-color:${perguntas[i].color};">
            <p data-identifier="question">${perguntas[i].title}</p>
            </div>
        `
        for (let j = 0; j < opcoesRespostas.length; j++) {            
            if (opcoesRespostas[j].isCorrectAnswer) {
            qdPerg.innerHTML +=`
            <div class="opcao opcao-correta" data-identifier="answer" onclick="selecionarOpcao(this)">
                <img src=${perguntas[i].answers[j].image} alt="imagem opcao 1">
                <p>${perguntas[i].answers[j].text}</p>
            </div>
            `
            } else {
            qdPerg.innerHTML +=`
            <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
                <img src=${perguntas[i].answers[j].image} alt="imagem opcao 2">
                <p>${perguntas[i].answers[j].text}</p>
            </div>
            `    
            }
        }
    }

    const qdResp = document.querySelector(".quadro-resposta");
    qdResp.innerHTML = '';

    for (let i = 0; i < niveis.length; i++) {
        tituloNivel = niveis[i].title;
        textoNivel = niveis[i].text;
        imagemNivel = niveis[i].image;

        qdResp.innerHTML += `
            <div class="quadro-resposta hidden" data-identifier="quizz-result">
                <div class="resposta">
                    <p>88% de acerto: ${tituloNivel}</p>
                </div>
                <div class="resultado">
                    <img src="${imagemNivel}" alt="imagem opcao 4">
                </div>
                <div class="texto-resposta">
                    <p>${textoNivel}</p>
                </div>
            </div>
            `
    }

    const qdbt = document.querySelector(".botoes");
    qdbt.innerHTML = '';

    qdbt.innerHTML += `                 
    <div class="reiniciar-quizz" onclick="reiniciarQuizz()">
    Reiniciar Quizz
    </div>
    <div class="voltar" onclick="voltarPrincipal()">
    Voltar pra home
    </div>
    `
    selecionarQuizz();
}


function selecionarQuizz() {
    const main = document.querySelector('.tela-inicial');
    main.classList.add('hidden')
    const janelaQuizz = document.querySelector('.main-quizz');
    janelaQuizz.classList.remove('hidden');

    document.body.scrollTop = 0; // scroll top page Safari
    document.documentElement.scrollTop = 0; // scroll top page Chrome, Firefox, IE and Opera 
}

function criarQuizz() {
    const main = document.querySelector('.tela-inicial');
    main.classList.add('hidden')
    const janelaCriar = document.querySelector('.criando');
    janelaCriar.classList.remove('hidden');
}

function voltarPrincipal() {
    const janelaQuizz = document.querySelector('.main-quizz');
    janelaQuizz.classList.add('hidden');
    const main = document.querySelector('.tela-inicial');
    main.classList.remove('hidden');
}


function expandePerguntas(fator) {
    let x = fator.parentNode;
    let y = x.parentNode;
    const tampa1 = y.children[1]
    tampa1.classList.toggle('hidden')
    const tampa2 = y.children[2]
    tampa2.classList.toggle('hidden')
    const tampa3 = y.children[3]
    tampa3.classList.toggle('hidden')
}

function expandeNiveis(fator) {
    let x = fator.parentNode;
    let y = x.parentNode;
    const tampa1 = y.children[1]
    tampa1.classList.toggle('hidden')
}

function prossigaParaPerguntas() {
    if ((document.querySelector('.criacao-titulo-do-quiz').value.length > 20) && (document.querySelector('.criacao-titulo-do-quiz').value.length < 65) && (document.querySelector('.criacao-perguntas-quiz').value >= 3) && (document.querySelector('.criacao-niveis-quiz').value >= 2) && (document.querySelector('.url-imagem-quiz').value !== "")) {
        criePerguntas();
        validaNumPgt();
        validaNumNiv();
        geraPerguntas()
    } else {
        alert("Os dados nao foram preenchidos corretamente");
        document.querySelector('.criacao-titulo-do-quiz').value = "";
        document.querySelector('.url-imagem-quiz').value = "";
        document.querySelector('.criacao-perguntas-quiz').value = "";
        document.querySelector('.criacao-niveis-quiz').value = "";
    }
}

let tituloDoQuiz;
function validaTituloQuiz() {
    tituloDoQuiz = document.querySelector('.criacao-titulo-do-quiz').value;
}

let urlImgQuiz;
function validaURL() {
    urlImgQuiz = document.querySelector('.url-imagem-quiz').value;
}


function prossigaParaNiveis() {
    lendoPerguntas();
    crieNiveis();
    geraNiveis();
}


function finalizandoQuiz() {
    lendoNiveis();
    if(minimoZero >= 1){
        finalizaQuizz();
        validaTituloQuiz();
        validaURL();
        geraTelaFinal();
        alteraURL();
        geraPostQuiz()
    }else{
        alert("Pelo menos um nível deve ter percentagem de acerto igual a zero")
    }
}

function criePerguntas() {
    const x = document.querySelector('.criando');
    x.classList.add('hidden');
    const y = document.querySelector('.perguntando');
    y.classList.remove('hidden')
}

let npq;
let npqn;
function validaNumPgt() {
    npq = document.querySelector('.criacao-perguntas-quiz').value;
    npqn = Number(npq);
}

let numnivq;
let numnivqnum;
function validaNumNiv() {
    numnivq = document.querySelector('.criacao-niveis-quiz').value;
    numnivqnum = Number(numnivq);
}

function crieNiveis() {
    const x = document.querySelector('.perguntando');
    x.classList.add('hidden');
    const y = document.querySelector('.nivelando');
    y.classList.remove('hidden')
}

function finalizaQuizz() {
    const x = document.querySelector('.nivelando');
    x.classList.add('hidden');
    const y = document.querySelector('.finalizando');
    y.classList.remove('hidden')
}

function voltaHome() {
    limpaEspacos()
    const x = document.querySelector('.finalizando');
    x.classList.add('hidden');
    const y = document.querySelector('.tela-inicial');
    y.classList.remove('hidden')
}



let objPost = {};


function geraPerguntas() {
    for (let i = 0; i < npqn; i++) {
        const x = document.querySelector('.perguntas-aqui-dentro');
        x.innerHTML += `
        <div class="caixa-perguntas">
                <div class="engloba-pergunta">
                    <h1 class="pergunta margin-bottom primeirapergunta">Pergunta ${i + 1}</h1>
                    <img onclick="expandePerguntas(this)" class="vector" src="./img/Vector (1).png">
                </div>
                <div class="tampa hidden">
                    <form class="form-input">
                        <input type="text" id='input-informacao' class = "c" placeholder="Texto da pergunta" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <p class = "escolha-cor-fundo">Escolha a cor de fundo da pergunta</p>
                        <input type="color" id='input-informacao' class = "c cor-de-fundo-pergunta" placeholder="Cor de fundo da pergunta"
                            autocomplete="off">
                    </form>
                </div>
                <div class="tampa hidden">
                    <h1 class="pergunta margin-bottom">Resposta correta</h1>
                    <form class="form-input">
                        <input type="text" id='input-informacao' class = "c respostacorreta" placeholder="Resposta correta" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <input type="text" id='input-informacao' class = "c" placeholder="URL da imagem" autocomplete="off">
                    </form>
                </div>
                <div class="tampa hidden">
                    <h1 class="pergunta margin-bottom">Respostas incorretas</h1>
                    <form class="form-input">
                        <input type="text" id='input-informacao' class = "c i" placeholder="Resposta incorreta 1" autocomplete="off">
                    </form>
                    <form class="form-input-margin">
                        <input type="text" id='input-informacao' class = "c i" placeholder="URL da imagem" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <input type="text" id='input-informacao' class = "c i" placeholder="Resposta incorreta 2" autocomplete="off">
                    </form>
                    <form class="form-input-margin">
                        <input type="text" id='input-informacao' class = "c i" placeholder="URL da imagem" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <input type="text" id='input-informacao' class = "c i" placeholder="Resposta incorreta 3" autocomplete="off">
                    </form>
                    <form class="form-input-margin">
                        <input type="text" id='input-informacao' class = "c i" placeholder="URL da imagem" autocomplete="off">
                    </form>
                </div>
            </div>
        `
    }
}

let arrQuestions = [];
let grupoPergunta = {};
let objRespostaCorreta = {};
let objRespostaIncorreta1;
let objRespostaIncorreta2;
let objRespostaIncorreta3;
let objResposta = [];
let respostas = [];


function lendoPerguntas() {
    for (let i = 0; i < npqn; i++) {
        let txtDaPergunta = document.querySelector('.c');
        let txtDaPerguntaValue = txtDaPergunta.value;

        txtDaPergunta.classList.remove('c');

        let corFundoPergunta = document.querySelector('.c');
        let corFundoPerguntaValue = corFundoPergunta.value;

        corFundoPergunta.classList.remove('c');


        let respostaCorreta = document.querySelector('.c');
        let respostaCorretaValue = respostaCorreta.value;

        respostaCorreta.classList.remove('c');

        let URLrespostaCorrreta = document.querySelector('.c');
        let URLrespostaCorrretaValue = URLrespostaCorrreta.value;

        URLrespostaCorrreta.classList.remove('c');

        objRespostaCorreta = {
            text: `${respostaCorretaValue}`,
            image: `${URLrespostaCorrretaValue}`,
            isCorrectAnswer: true
        }

        respostas.push(objRespostaCorreta)


        let respostaIncorreta1 = document.querySelector('.c');
        let respostaIncorreta1Value = respostaIncorreta1.value;


        respostaIncorreta1.classList.remove('c');

        let URLincorreta1 = document.querySelector('.c');
        let URLincorreta1Value = URLincorreta1.value;

        URLincorreta1.classList.remove('c');

        let respostaIncorreta2 = document.querySelector('.c');
        let respostaIncorreta2Value = respostaIncorreta2.value;

        respostaIncorreta2.classList.remove('c');

        let URLincorreta2 = document.querySelector('.c');
        let URLincorreta2Value = URLincorreta2.value;

        URLincorreta2.classList.remove('c');

        let respostaIncorreta3 = document.querySelector('.c');
        let respostaIncorreta3Value = respostaIncorreta3.value;

        respostaIncorreta3.classList.remove('c');

        let URLincorreta3 = document.querySelector('.c');
        let URLincorreta3Value = URLincorreta3.value;

        URLincorreta3.classList.remove('c');

        if (respostaIncorreta1Value !== "") {
            objRespostaIncorreta1 = {
                text: `${respostaIncorreta1Value}`,
                image: `${URLincorreta1Value}`,
                isCorrectAnswer: false
            }
            respostas.push(objRespostaIncorreta1)
        }

        if (respostaIncorreta2Value !== "") {
            objRespostaIncorreta2 = {
                text: `${respostaIncorreta2Value}`,
                image: `${URLincorreta2Value}`,
                isCorrectAnswer: false
            }
            respostas.push(objRespostaIncorreta2)
        }

        if (respostaIncorreta3Value !== "") {
            objRespostaIncorreta3 = {
                text: `${respostaIncorreta3Value}`,
                image: `${URLincorreta3Value}`,
                isCorrectAnswer: false
            }
            respostas.push(objRespostaIncorreta3)
        }

        console.log(respostas);

        grupoPergunta = {
            title: `${txtDaPerguntaValue}`,
            color: `${corFundoPerguntaValue}`,
            answers: respostas,
        };

        console.log(grupoPergunta);

        arrQuestions.push(grupoPergunta);

        respostas = [];

    }
}


function geraNiveis() {
    for (let i = 0; i < numnivqnum; i++) {
        const x = document.querySelector('.niveis-aqui-dentro');
        x.innerHTML += `
        <div class="caixa-perguntas">
            <div class="engloba-pergunta">
                <h1 class="pergunta margin-bottom primeirapergunta">Nível ${i + 1}</h1>
                <img onclick="expandeNiveis(this)" class="vector" src="./img/Vector (1).png">
            </div>
            <div class="tampa hidden">
                <form class="form-input">
                    <input type="text" id='input-informacao' class = "n" placeholder="Título do nível" autocomplete="off">
                </form>
                <form class="form-input">
                    <input type="text" id='input-informacao' class = "n" placeholder="% de acerto mínima"
                        autocomplete="off">
                </form>
                <form class="form-input">
                    <input type="text" id='input-informacao' class = "n" placeholder="URL da imagem do nível"
                        autocomplete="off">
                </form>
                <form class="form-input">
                    <textarea id='input-informacao-nivel' rows="4" cols="20" class = "n" placeholder="Descrição do nível"
                        autocomplete="off"></textarea>
                </form>
            </div>
        </div>
        `
    }
}

let arrLevels = [];

let objLevels = {};

let minimoZero = 0;

function lendoNiveis() {

    for (let i = 0; i < numnivqnum; i++) {
        let a = document.querySelector('.n');
        let av = a.value;


        a.classList.remove('n');
        let b = document.querySelector('.n');
        let bv = b.value;
        if (bv === 0){
            minimoZero += 1;
        }


        b.classList.remove('n');
        let c = document.querySelector('.n');
        let cv = c.value;


        c.classList.remove('n');
        let d = document.querySelector('.n');
        let dv = d.value;


        d.classList.remove('n');


        objLevels = {
            title: `${av}`,
            image: `${cv}`,
            text: `${dv}`,
            minValue: `${bv}`
        };

        arrLevels.push(objLevels);



    }

}

function geraPostQuiz() {
    objPost = {
        title: `${tituloDoQuiz}`,
        image: `${urlImgQuiz}`,
        questions: arrQuestions,
        levels: arrLevels
    }
    axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objPost)
    armazenarQuizzes(objPost);
}

function limpaEspacos() {
    document.querySelector('.criacao-titulo-do-quiz').value = "";
    document.querySelector('.url-imagem-quiz').value = "";
    document.querySelector('.criacao-perguntas-quiz').value = "";
    document.querySelector('.criacao-niveis-quiz').value = "";
    document.querySelector('.perguntas-aqui-dentro').innerHTML = "";
    document.querySelector('.niveis-aqui-dentro').innerHTML = "";
    document.querySelector('.finalizando').innerHTML = "";
}



function geraTelaFinal() {

    let x = document.querySelector('.finalizando');

    x.innerHTML = `
    <div class="caixa-img-final">
        <p class = "potterhead">${tituloDoQuiz}</p>
    </div>
    <div class="botao-prosseguir-final">
        <p class="prosseguir">Acessar o quiz</p>
    </div>
    <div onclick = "voltaHome()" class="voltar-home">
        <p class="prosseguir-home">Voltar para home</p>
    </div>
    `
}

function alteraURL() {
    const x = document.querySelector('.caixa-img-final');
    x.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${urlImgQuiz}") no-repeat top center`
}


function recarregaSite() {
    window.location.reload()
}


function selecionarOpcao(objeto) {
    console.log(objeto);
    const opcoes = objeto.parentNode;

    if (opcoes.classList.contains('respondido')) {
        return;
    } else {
        objeto.classList.add('selecionado');
        opcoes.classList.add('respondido');
    }

    mostrarResposta();
}

function mostrarResposta() {
    const indiceResposta = document.querySelectorAll('.respondido')

    if (indiceResposta.length === 3) {
        const qdresp = document.querySelector('.quadro-resposta');
        qdresp.classList.remove('hidden');
    }
}

function reiniciarQuizz() {
    const resp = document.querySelectorAll('.respondido');
    const selec = document.querySelectorAll('.selecionado');
    for (let i = 0; i < selec.length; i++) {
        selec[i].classList.remove('selecionado');
        resp[i].classList.remove('respondido');
    }

    const qresp = document.querySelector('.quadro-resposta');
    qresp.classList.add('hidden');

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera 
}

function armazenarQuizzes(objPost){
    const dadosSerializados = JSON.stringify(objPost);
    for(let i = 0; i < allQuizzes.length; i++){
        localStorage.setItem(quizzUsuario${i}, dadosSerializados);
    }
}

let dadosSerializados;

function renderizarQuizzesUsuario(){
    const yourquizzes = document.querySelector('.your-quizzes');
    for(let i = 0; i < allQuizzes.length; i++){
        const quizzSerializado = localStorage.getItem(quizzUsuario${i}, dadosSerializados);
        const quizzDeserializado = JSON.parse(quizzSerializado);

        if(quizzDeserializado.id === allQuizzes[i].id){
            yourquizzes.innerHTML += 
            <div class="quizz" id="${quizzDeserializado.id}" data-identifier="quizz-card" onclick="renderizarQuizz(this)">
                        <img src="${quizzDeserializado.image}" />
                        <p>"${quizzDeserializado.title}"</p>
            </div>
            

        }
    }

}