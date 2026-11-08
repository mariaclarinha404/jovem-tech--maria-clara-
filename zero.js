const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let numero;

    do {
        numero = Number(await rl.question("Digite um número positivo ou zero para sair: "));

        if (numero > 0) {
            console.log("Número: " + numero);
        }

    } while (numero !== 0);

    console.log("Programa encerrado!");
}

main().finally(() => rl.close());