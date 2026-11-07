const prompt = require('prompt-sync')({signit:true});
let compra = Number(prompt("digite o valor da compra:"));
let cartao = prompt("possui cartao fidelidade? (SIM ou NAO): ");
if (cartao.toUpperCase() === "SIM" || compra >= 500) {
    let desconto = compra * 0.20;
    let total = compra - desconto;
    console.log("desconto de 20% aplicado!");
    console.log("total com desconto: R$ " + total.toFixed(2));
} else {
    console.log("nao tem direito ao desconto!");
    console.log("total da compra: R$ " + compra.toFixed(2));
}