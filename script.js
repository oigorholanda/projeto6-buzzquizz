function expande(fator){
    const a = document.querySelector('.tampa1')
    a.classList.toggle('none')
    const b = document.querySelector('.tampa2')
    b.classList.toggle('none')
    const c = document.querySelector('.tampa3')
    c.classList.toggle('none')
    const d = document.querySelector('.primeirapergunta')
    d.classList.toggle('margin-bottom')
}

function expande2(){
    const a = document.querySelector('.tampa4')
    a.classList.toggle('none')
    const b = document.querySelector('.tampa5')
    b.classList.toggle('none')
    const c = document.querySelector('.tampa6')
    c.classList.toggle('none')
    const d = document.querySelector('.segundapergunta')
    d.classList.toggle('margin-bottom')
}

function expande3(){
    const a = document.querySelector('.tampa7')
    a.classList.toggle('none')
    const b = document.querySelector('.tampa8')
    b.classList.toggle('none')
    const c = document.querySelector('.tampa9')
    c.classList.toggle('none')
    const d = document.querySelector('.terceirapergunta')
    d.classList.toggle('margin-bottom')
}

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