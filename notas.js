const prompt = require('prompt-sync')({signit:true});
let nota1 = Number(prompt("digite a primeira nota:"));
let nota2 = Number(prompt("digite a segunda nota:"));
let nota3 = Number(prompt("digite a terceira nota:"));
let media = (nota1 + nota2 + nota3) / 3;
console.log("a media do aluno é: " + media.toFixed(2));
if (media >= 7) {
    console.log("o aluno foi aprovadoo!");
} else {
    console.log("o aluno foi reprovado!");
}