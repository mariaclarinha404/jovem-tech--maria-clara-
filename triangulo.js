const prompt = require('prompt-sync')();
let base = Number(prompt("digite a base do triangulo: "));
let altura = Number(prompt('digite a altura do triangulo: '));
let area = (base * altura) / 2;
console.log("a area do triangulo e:", area)