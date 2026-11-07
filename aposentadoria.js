const prompt = require('prompt-sync')({signit:true});
let idade = Number(prompt("digite sua idade:"));
if (idade >= 60) {
    console.log("aposentado!");
} else {
    console.log("trabalho formal!");
}