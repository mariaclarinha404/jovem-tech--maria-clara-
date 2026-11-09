const prompt = require("prompt-sync")();

let numeros = [];

for (let i = 0; i < 15; i++) {
    numeros[i] = Number(prompt("Digite um número: "));
}

console.log("Vetor completo:", numeros);

for (let i = 0; i < 15; i++) {
    if (numeros[i] % 10 === 0) {
        console.log("Múltiplo de 10 na posição:", i + 1);
    }
}