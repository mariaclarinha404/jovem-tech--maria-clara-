const prompt = require("prompt-sync")();

let numeros = [];

for (let i = 0; i < 10; i++) {
    numeros[i] = Number(prompt("Digite um número inteiro: "));
}

console.log("Números pares:");

for (let i = 0; i < 10; i++) {
    if (numeros[i] % 2 === 0) {
        console.log("Número:", numeros[i], "Posição:", i + 1);
    }
}