let qtdPergunta;
let perguntas;
let tituloPergunta;

function updatePage(){ //Essa função puxa todos os quizzes do servidor
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promiseQuizzes.then(processPromise);
}
updatePage();

function processPromise(promiseQuizzes){ //Essa função mostra a promise no console
    console.log(promiseQuizzes);
    console.log(promiseQuizzes.data);
    allQuizzes = promiseQuizzes.data;
    for(let i = 0; i < allQuizzes.length; i++){
        qtdPergunta = allQuizzes[i].questions.length;
        perguntas = allQuizzes[i].questions;
        tituloPergunta = allQuizzes[i].questions[i].title;
    }
    console.log(tituloPergunta);
    renderizar();
}


function renderizar(){
    const quizzes = document.querySelector(".quizzes");
    quizzes.innerHTML = '';
    for (let i = 0; i < allQuizzes.length; i++) {
            quizzes.innerHTML += `
            <div class="quizz" data-identifier="quizz-card" onclick="selecionarQuizz(this)">
                        <img src="${allQuizzes[i].image}" />
                        <p>${allQuizzes[i].title}</p>
                    </div>
            `
        }
}
 
function renderizarPerguntas(){
    const quadroPergunta = document.querySelector(".quadro-pergunta");
    quadroPergunta.innerHTML = '';
    for (let i = 0; i < qtdPergunta; i++) {
        quadroPergunta.innerHTML +=
    
        `<div class="quadro-pergunta">
                <div class="pergunta-quizz primeira">
                    <p data-identifier="question">${tituloPergunta}</p>
                </div>
                    <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
                        <img src="./img/image 3.png" alt="imagem opcao 1">
                        <p>Gatíneo</p>
                    </div>
                    <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
                        <img src="./img/image 4.png" alt="imagem opcao 2">
                        <p>Ratata</p>
                    </div>
                    
                    <div class="opcao opcao-errada" data-identifier="answer" onclick="selecionarOpcao(this)">
                        <img src="./img/image 1.png" alt="imagem opcao 3">
                        <p>Sapo Gordo</p>
                    </div>
                    <div class="opcao opcao-correta" data-identifier="answer" onclick="selecionarOpcao(this)">
                        <img src="./img/image 2.png" alt="imagem opcao 4">
                        <p>Mustela putorius (Famoso furão)</p>
                    </div>
                
            </div>

            <div class="quadro-pergunta">
                <div class="pergunta-quizz segunda">
                    <p data-identifier="question">Qual dos objetos abaixo NÃO é uma horcrux?</p>
                </div>
                <div class="opcao opcao1" data-identifier="answer" onclick="selecionarOpcao(this)">
                    <img src="./img/image 5.png" alt="imagem opcao 1">
                    <p>The boy who lived</p>
                </div>
                <div class="opcao opcao2" data-identifier="answer" onclick="selecionarOpcao(this)">
                    <img src="./img/image 6.png" alt="imagem opcao 2">
                    <p>O livro monstruoso dos monstros</p>
                </div>
                <div class="opcao opcao3" data-identifier="answer" onclick="selecionarOpcao(this)">
                    <img src="./img/image 7.png" alt="imagem opcao 3">
                    <p>Anel velho</p>
                </div>
                <div class="opcao opcao4" data-identifier="answer" onclick="selecionarOpcao(this)">
                    <img src="./img/image 8.png" alt="imagem opcao 4">
                    <p>Diadema da Ravenclaw</p>
                </div>
            </div>

            <div class="quadro-resposta" data-identifier="quizz-result">
                <div class="resposta">
                    <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p>
                </div>
                <div class="resultado">
                    <img src="./img/resultado1.png" alt="imagem opcao 4">
                </div>
                <div class="texto-resposta">
                    <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão
                        abaixo para usar o vira-tempo e reiniciar este teste.</p>
                </div>
            </div>
            <div class="reiniciar-quizz" onclick="reiniciarQuizz()">
                Reiniciar Quizz
            </div>
            <div class="voltar" onclick="voltarPrincipal()">
                Voltar pra home
            </div>
        </div>`
    }
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

function selecionarQuizz() {
    const main = document.querySelector('.tela-inicial');
    main.classList.add('hidden')
    const janelaQuizz = document.querySelector('.main-quizz');
    janelaQuizz.classList.remove('hidden');
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

function prossigaParaPerguntas(){
    criePerguntas();
    validaNumPgt();
    validaNumNiv();
    geraPerguntas()
}

function prossigaParaNiveis(){
    crieNiveis();
    geraNiveis();
}

function finalizandoQuiz(){
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
                        <input type="text" id='input-informacao' placeholder="Texto da pergunta" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <p class = "escolha-cor-fundo">Escolha a cor de fundo da pergunta</p>
                        <input type="color" id='input-informacao' class = "cor-de-fundo-pergunta${i + 1}" placeholder="Cor de fundo da pergunta"
                            autocomplete="off">
                    </form>
                </div>

                <div class="tampa hidden">
                    <h1 class="pergunta margin-bottom">Resposta correta</h1>
                    <form class="form-input">
                        <input type="text" id='input-informacao' placeholder="Resposta correta" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <input type="text" id='input-informacao' placeholder="URL da imagem" autocomplete="off">
                    </form>
                </div>

                <div class="tampa hidden">
                    <h1 class="pergunta margin-bottom">Respostas incorretas</h1>
                    <form class="form-input">
                        <input type="text" id='input-informacao' placeholder="Resposta incorreta 1" autocomplete="off">
                    </form>
                    <form class="form-input-margin">
                        <input type="text" id='input-informacao' placeholder="URL da imagem" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <input type="text" id='input-informacao' placeholder="Resposta incorreta 2" autocomplete="off">
                    </form>
                    <form class="form-input-margin">
                        <input type="text" id='input-informacao' placeholder="URL da imagem" autocomplete="off">
                    </form>
                    <form class="form-input">
                        <input type="text" id='input-informacao' placeholder="Resposta incorreta 3" autocomplete="off">
                    </form>
                    <form class="form-input-margin">
                        <input type="text" id='input-informacao' placeholder="URL da imagem" autocomplete="off">
                    </form>
                </div>
            </div>
        `
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
                    <input type="text" id='input-informacao' placeholder="Título do nível" autocomplete="off">
                </form>
                <form class="form-input">
                    <input type="text" id='input-informacao' placeholder="% de acerto mínima"
                        autocomplete="off">
                </form>
                <form class="form-input">
                    <input type="text" id='input-informacao' placeholder="URL da imagem do nível"
                        autocomplete="off">
                </form>
                <form class="form-input">
                    <textarea id='input-informacao-nivel' rows="4" cols="20" placeholder="Descrição do nível"
                        autocomplete="off"></textarea>
                </form>
            </div>
        </div>
        `
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

    if (indiceResposta.length === 2){
        const resp = document.querySelector('.quadro-resposta');
        resp.classList.remove('hidden');
    }
}

function reiniciarQuizz () {
    const rmv = document.querySelectorAll('.respondido');
    const desc = document.querySelectorAll('.selecionado');
    for (let i = 0; i < desc.length; i++) {
        desc[i].classList.remove('selecionado');
        rmv[i].classList.remove('respondido'); 
    }

    const resp = document.querySelector('.quadro-resposta');
    resp.classList.add('hidden');

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera 
}


