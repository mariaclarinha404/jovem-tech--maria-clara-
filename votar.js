import promptSync from 'prompt-sync';
const prompt = promptSync();
let idade = console.log(prompt("digite sua idade:"));
if (idade >= 16)
{console.log("você pode votar!");}
else {
    console.log("você não pode votar.");}