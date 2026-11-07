const prompt = require('prompt-sync')({signit:true});
let cliente = prompt("digite o nome do cliente:");
let compra = Number(prompt("digite o valor da compra:"));
let desconto = compra * 0.15;
let total = compra - desconto;
console.log("cliente: " + cliente);
console.log("valor da compra: R$ " + total.toFixed(2));