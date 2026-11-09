const prompt = require('prompt-sync')();
let cavalos = Number(prompt("quantos cavalos foram comprados? "));
let ferraduras = cavalos * 4;
console.log("quantidade de ferraduras:", ferraduras);