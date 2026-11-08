const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let soma = 0;
    while (soma < 100) {
        let numero = Number(await rl.question("Digite um numero: "));
        soma += numero;
    }
    console.log("soma total: " + soma);
}

main().finally(() => rl.close());