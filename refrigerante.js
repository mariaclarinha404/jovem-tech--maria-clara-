const prompt = require("prompt-sync")();

let lata = Number(prompt("Quantidade de latas de 350ml: "));
let garrafa600 = Number(prompt("Quantidade de garrafas de 600ml: "));
let garrafa2L = Number(prompt("Quantidade de garrafas de 2 litros: "));

let total = (lata * 0.35) + (garrafa600 * 0.6) + (garrafa2L * 2);

console.log("Total de litros comprados:", total);