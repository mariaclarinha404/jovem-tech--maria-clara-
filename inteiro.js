const prompt = require('prompt-sync')({signit:true});
let numero = Number(prompt("digite um numero inteiro;"));
let antecessor = numero - 1;
let sucessor = numero + 1;
console.log(" antecessor: " + antecessor);
console.log("sucessor: " + sucessor);