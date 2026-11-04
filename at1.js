const prompt = require('prompt-sync')({ sigint: true });

const nome = prompt('Qual o seu nome? ');
console.log(`Olá, ${nome}!`);
