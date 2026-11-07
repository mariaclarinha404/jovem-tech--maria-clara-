const prompt = require('prompt-sync')({signit:true});
let idade = Number(prompt("digite sua idade:"));
let ensinoMedio = prompt("esta cursando o ensino medio? (SIM ou NAO): ");
if (idade < 18 &&
ensinoMedio.toUpperCase() === "SIM") {
    console.log("aprovado para estagio!");
} else {
    console.log("nao atende aos criterios!");
}