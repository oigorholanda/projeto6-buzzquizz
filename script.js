function updatePage(){ //Essa função puxa todos os quizzes do servidor
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promiseQuizzes.then(processPromise);
}
updatePage();

function processPromise(promiseQuizzes){ //Essa função mostra a promise no console
    console.log(promiseQuizzes);
    console.log(promiseQuizzes.data);
    allQuizzes = promiseQuizzes.data;
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
                        <input type="text" id='input-informacao' placeholder="Cor de fundo da pergunta"
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







