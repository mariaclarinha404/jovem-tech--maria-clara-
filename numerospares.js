const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const numero = Number(await rl.question("Digite um numero: "));
    let i = 2;
    while (i < numero) {
        console.log(i);
        i += 2;
    }
}

main()
    .then(() => console.log("Fim do programa!"))
    .finally(() => rl.close());