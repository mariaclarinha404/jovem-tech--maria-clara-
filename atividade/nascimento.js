import promptSync from 'prompt-sync';
const prompt = promptSync();
let nascimento = Number(prompt("digite seu ano de nascimento:"));
let idade = 2026 - nascimento;
console.log("sua idade é: " + idade + " anos.");