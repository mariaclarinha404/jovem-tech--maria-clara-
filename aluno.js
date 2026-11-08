const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let resposta;

    do {
        const nota = Number(await rl.question("Digite a nota do aluno: "));

        console.log("Nota registrada: " + nota);

        resposta = await rl.question("Deseja continuar? (s/n): ");

    } while (resposta.toLowerCase() === "s");

    console.log("Fim da leitura!");
}

main().finally(() => rl.close());