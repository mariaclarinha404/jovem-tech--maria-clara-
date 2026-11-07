const prompt = require('prompt-sync')({signit:true});
let nascimento = Number(prompt("Digite seu ano de nascimento:"));
let idade = 2026 - nascimento;
console.log("Sua idade é: " + idade + " anos.");