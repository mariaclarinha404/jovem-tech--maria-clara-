const prompt= require('prompt-sync')({signit:true});
let horas = Number(prompt("quantas horas voce trabalhou?:"));
let salario = horas * 51.90;
console.log("seu salario é: R$ " + salario.toFixed(2));