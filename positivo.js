const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let numero = Number(await rl.question('Digite um numero positivo: '));

    while (!Number.isFinite(numero) || numero <= 0) {
        console.log('Digite um numero maior que zero.');
        numero = Number(await rl.question('Digite outro numero: '));
    }

    console.log('Fim do programa!');
}

main().finally(() => rl.close());
