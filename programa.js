const prompt = require("prompt-sync")();

let idades = [];
let soma = 0;
let maiorIdade = 0;

for (let i = 0; i < 8; i++) {
    idades[i] = Number(prompt("Digite a idade: "));

    soma += idades[i];

    if (i === 0 || idades[i] > maiorIdade) {
        maiorIdade = idades[i];
    }
}

// A) Média das idades
let media = soma / 8;

console.log("Média das idades:", media);

// B) Pessoas com mais de 25 anos
console.log("Posições com idade maior que 25:");

for (let i = 0; i < 8; i++) {
    if (idades[i] > 25) {
        console.log("Posição:", i + 1);
    }
}

// C) Maior idade
console.log("Maior idade:", maiorIdade);

// D) Posições da maior idade
console.log("Posições da maior idade:");

for (let i = 0; i < 8; i++) {
    if (idades[i] === maiorIdade) {
        console.log("Posição:", i + 1);
    }
}