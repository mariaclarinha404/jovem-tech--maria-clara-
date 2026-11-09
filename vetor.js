const prompt = require("prompt-sync")();

let numeros = [];

for (let i = 0; i < 5; i++) {
    numeros[i] = Number(prompt("Digite um número: "));
}

let procurado = Number(prompt("Qual número deseja procurar? "));

let encontrado = false;

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] === procurado) {
        console.log("Número encontrado na posição:", i + 1);
        encontrado = true;
    }
}

if (encontrado === false) {
    console.log("Número não encontrado!");
}