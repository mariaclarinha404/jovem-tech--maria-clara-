const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let numero;
    do {
        numero = Number(await rl.question("Digite um numero: "));
    } while (!Number.isFinite(numero) || numero % 5 !== 0);
    console.log("Voce digitou um multiplo de 5!");
}

main().finally(() => rl.close());