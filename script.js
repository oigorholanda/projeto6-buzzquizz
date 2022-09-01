// Ajustar as configurações para fazer as imagens terem o gradiente
// onclick quizz, display minha div
// não usar o main se não complica a vida dos outros
// font weigth 400 já é o padrão, precisa declarar?


function selecionarQuizz() {
    const main = document.querySelector('.tela-inicial');
    main.classList.add('hidden')
    const janelaQuizz = document.querySelector('.main-quizz');
    janelaQuizz.classList.remove('hidden');
}

function voltarPrincipal() {
    const janelaQuizz = document.querySelector('.main-quizz');
    janelaQuizz.classList.add('hidden');
    const main = document.querySelector('.tela-inicial');
    main.classList.remove('hidden');
}