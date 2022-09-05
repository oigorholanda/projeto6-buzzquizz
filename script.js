let allQuizzes;
let tituloQuizz;
let qtdPergunta;
let perguntas = [];
let imagemQuizz;
let niveis;





function updatePage(){ //Essa função puxa todos os quizzes do servidor
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promiseQuizzes.then(processPromise);
}
updatePage();

function processPromise(promiseQuizzes){ //Essa função mostra a promise no console
    allQuizzes = promiseQuizzes.data;
    console.log(allQuizzes);
    
    
    renderizar();
}


function renderizar(){
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
 
function renderizarQuizz(quizzClicado){
    console.log(quizzClicado);
    const seletor = Number(quizzClicado.id);

    const mainqz = document.querySelector(".main-quizz");
    mainqz.innerHTML = '';
    
    for(let i = 0; i < allQuizzes.length; i++){
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
    mainqz.innerHTML = `
    <div class="titulo-quizz">
    <img src="${imagemQuizz}" alt="Castelo">
    <p>${tituloQuizz}</p>
    </div>
    `
    for (let i = 0; i < qtdPergunta; i++) {
        mainqz.innerHTML +=
        `
        <div class="quadro-pergunta">
            <div class="pergunta-quizz pergunta${i}" style="background-color:${perguntas[i].color};">
                <p data-identifier="question">${perguntas[i].title}</p>
            </div>
            <div class="opcao opcao-correta" data-identifier="answer" onclick="selecionarOpcao(this)">
                <img src=${perguntas[i].answers[0].image} alt="imagem opcao 1">
                <p>${perguntas[i].answers[0].text}</p>
            </div>
            <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
                <img src=${perguntas[i].answers[1].image} alt="imagem opcao 2">
                <p>${perguntas[i].answers[1].text}</p>
            </div>
            `

        //     <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
        //         <img src="${perguntas[i].answers[2].image}" alt="imagem opcao 3">
        //         <p>${perguntas[i].answers[2].text}</p>
        //     </div>
        //     <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
        //         <img src="${perguntas[i].answers[3].image}" alt="imagem opcao 4">
        //         <p${perguntas[i].answers[3].text}</p>
        //     </div>
        // </div>
        //   `
    }

    mainqz.innerHTML += `
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


function expandePerguntas(fator){
    let x = fator.parentNode;
    let y = x.parentNode;
    const tampa1 = y.children[1]
    tampa1.classList.toggle('hidden')
    const tampa2 = y.children[2]
    tampa2.classList.toggle('hidden')
    const tampa3 = y.children[3]
    tampa3.classList.toggle('hidden')
}

function expandeNiveis(fator){
    let x = fator.parentNode;
    let y = x.parentNode;
    const tampa1 = y.children[1]
    tampa1.classList.toggle('hidden')
}

function prossigaParaPerguntas(){
    if ((document.querySelector('.criacao-titulo-do-quiz').value.length > 20)  && (document.querySelector('.criacao-titulo-do-quiz').value.length < 65) && (document.querySelector('.criacao-perguntas-quiz').value >= 3) && (document.querySelector('.criacao-niveis-quiz').value >= 2) && (document.querySelector('.url-imagem-quiz').value !== "" )){
        criePerguntas();
        validaNumPgt();
        validaNumNiv();
        geraPerguntas()  
    }else {
        alert("Os dados nao foram preenchidos corretamente");
        document.querySelector('.criacao-titulo-do-quiz').value = "";
        document.querySelector('.url-imagem-quiz').value = "";
        document.querySelector('.criacao-perguntas-quiz').value = "";
        document.querySelector('.criacao-niveis-quiz').value = "";
    }
}

let tituloDoQuiz;
function validaTituloQuiz(){
    tituloDoQuiz = document.querySelector('.criacao-titulo-do-quiz').value;
}

let urlImgQuiz;
function validaURL(){
    urlImgQuiz = document.querySelector('.url-imagem-quiz').value;
}


function prossigaParaNiveis(){
    
    lendoPerguntas();
    crieNiveis();
    geraNiveis();
}


function finalizandoQuiz(){
    lendoNiveis();
    finalizaQuizz();
    validaTituloQuiz();
    validaURL();
    geraTelaFinal();
    alteraURL()
    
}

function criePerguntas(){
    const x = document.querySelector('.criando');
    x.classList.add('hidden');
    const y = document.querySelector('.perguntando');
    y.classList.remove('hidden')
}

let npq;
let npqn;
function validaNumPgt(){
    npq = document.querySelector('.criacao-perguntas-quiz').value;
    npqn = Number(npq);
}

let numnivq;
let numnivqnum;
function validaNumNiv(){
    numnivq = document.querySelector('.criacao-niveis-quiz').value;
    numnivqnum = Number(numnivq);
}

function crieNiveis(){
    const x = document.querySelector('.perguntando');
    x.classList.add('hidden');
    const y = document.querySelector('.nivelando');
    y.classList.remove('hidden')
}

function finalizaQuizz(){
    const x = document.querySelector('.nivelando');
    x.classList.add('hidden');
    const y = document.querySelector('.finalizando');
    y.classList.remove('hidden')
}

function voltaHome(){
    const x = document.querySelector('.finalizando');
    x.classList.add('hidden');
    const y = document.querySelector('.tela-inicial');
    y.classList.remove('hidden')
}




let objPost = {};





function geraPerguntas(){
    for (let i = 0; i < npqn; i++){
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
let objRespostaCorreta = {};
let objRespostaIncorreta1 = {};
let objRespostaIncorreta2 = {};
let objRespostaIncorreta3 = {};
let objResposta = [];
let respostas = [];


function lendoPerguntas(){
    for(let i = 0; i < npqn; i++){
        let a = document.querySelector('.c');
        let av = a.value;

        a.classList.remove('c');

        let b = document.querySelector('.c');
        let bv = b.value;
        
        b.classList.remove('c');

        
        let c = document.querySelector('.c');
        let cv = c.value;

        c.classList.remove('c');

        let d = document.querySelector('.c');
        let dv = d.value;

        d.classList.remove('c');

        objRespostaCorreta = {
            text: `${cv}`,
            image: `${dv}`,
            isCorrectAnswer: true
        }

        objResposta.push(objRespostaCorreta)

    
        let e = document.querySelector('.c');
        let ev = e.value;


        e.classList.remove('c');

        let f = document.querySelector('.c');
        let fv = f.value;

        f.classList.remove('c');

        let g = document.querySelector('.c');
        let gv = g.value;

        g.classList.remove('c');

        let h = document.querySelector('.c');
        let hv = h.value;

        h.classList.remove('c');

        let i = document.querySelector('.c');
        let iv = i.value;

        i.classList.remove('c');

        let j = document.querySelector('.c');
        let jv = j.value;

        j.classList.remove('c');

        if (ev !== ""){
            objRespostaIncorreta1 = {
                text: `${ev}`,
                image: `${fv}`,
                isCorrectAnswer: false
            }
            objResposta.push(objRespostaIncorreta1)
        }

        if (gv !== ""){
            objRespostaIncorreta2 = {
                text: `${gv}`,
                image: `${hv}`,
                isCorrectAnswer: false
            }
            objResposta.push(objRespostaIncorreta2)
        }

        if (iv !== ""){
            objRespostaIncorreta3 = {
                text: `${iv}`,
                image: `${jv}`,
                isCorrectAnswer: false
            }
            objResposta.push(objRespostaIncorreta3)
        }

        respostas.push(objResposta)
        
        arrQuestions = {
			title:`${av}`,
			color: `${bv}`,
			answers: `${respostas}`,
        }


    }
}




function geraNiveis(){
    for (let i = 0; i < numnivqnum; i++){
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


function lendoNiveis(){
    
    for(let i = 0; i < numnivqnum; i++){
        let a = document.querySelector('.n');
        let av = a.value;
        

        a.classList.remove('n');
        let b = document.querySelector('.n');
        let bv = b.value;
        

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
            text:  `${dv}`,
            minValue: `${bv}`
        };

        arrLevels.push(objLevels);


        
    }

    
}





function geraTelaFinal(){
    
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

function alteraURL(){
    const x = document.querySelector('.caixa-img-final');
    x.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${urlImgQuiz}") no-repeat top center`
}



function recarregaSite() {
    window.location.reload()
}


function selecionarOpcao (objeto) {
    console.log(objeto);
    const opcoes = objeto.parentNode;
    
    if (opcoes.classList.contains('respondido')){
        return;
    } else {
        objeto.classList.add('selecionado');
        opcoes.classList.add('respondido');
    }

    mostrarResposta();
}

function mostrarResposta () {
    const indiceResposta = document.querySelectorAll('.respondido')

    if (indiceResposta.length === 3){
        const qdresp = document.querySelector('.quadro-resposta');
        qdresp.classList.remove('hidden');
    }
}

function reiniciarQuizz () {
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

