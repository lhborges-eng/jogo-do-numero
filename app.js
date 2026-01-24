let listaSorteado = [];
let numeroLimite = localStorage.getItem('numeroLimite') ? parseInt(localStorage.getItem('numeroLimite')) : 10;
let numeroDificil = 100;
let numeroChute = numerochute();
let tentativas = 1;

function mostrarTextonaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function mostrarTextoInicial() {
    mostrarTextonaTela('h1', 'Jogo do Chute');
    if (numeroLimite === numeroDificil) {
        mostrarTextonaTela('p', 'Escolha um número entre 1 e 100');
    } else {
        mostrarTextonaTela('p', 'Escolha um número entre 1 e 10');
    }
}
mostrarTextoInicial();
function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroChute) {
        let nometentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mostrarTextonaTela('h1', 'Você acertou!');
        mostrarTextonaTela('p', `você descobriu em ${tentativas} ${nometentativa}`);
        document.getElementById('reiniciar').disabled = false;
    } else {
        if (chute > numeroChute)
            dica = 'O número é menor';
        else
            dica = 'O número é maior';
        mostrarTextonaTela('p', dica);
        limparcampo();
    }
    tentativas++;
}
function numerochute() {
    let numeroLista = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeMaximaTentativas = listaSorteado.length;
    if (quantidadeMaximaTentativas == numeroLimite) {
        listaSorteado = [];
    }
    if (listaSorteado.includes(numeroLista)) {
        return numerochute();
    } else {
        listaSorteado.push(numeroLista);
        console.log(listaSorteado);
        return numeroLista;
    }
}

function limparcampo() {
   chute = document.querySelector("input");
   chute.value = "";
}

function reiniciarJogo() {
    numeroChute = numerochute();
    tentativas = 1;
    limparcampo();
    mostrarTextoInicial();
    document.getElementById('reiniciar').disabled = true;
}

function mudarDificuldade() {
    if (numeroLimite === 10) {
        numeroLimite = numeroDificil;
    } else {
        numeroLimite = 10;
    }
    localStorage.setItem('numeroLimite', numeroLimite);
    listaSorteado = [];
    numeroChute = numerochute();
    limparcampo();
    mostrarTextoInicial();
    document.getElementById('reiniciar').disabled = true;
}