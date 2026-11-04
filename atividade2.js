const prompt = require('prompt-sync')({ sigint: true });
let numero =  Number(prompt("digite um número inteiro:"));
let antecessor = numero - 1;
let sucessor = numero + 1;
console.log("antecessor: " + antecessor);
console.log("sucessor: " + sucessor);