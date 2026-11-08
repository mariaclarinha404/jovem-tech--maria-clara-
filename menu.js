const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let opcao;
    do {
        console.log("\n1 - cadastrar");
        console.log("2 - consultar");
        console.log("3 - sair");
        opcao = Number(await rl.question("Escolha uma opção: "));
    } while (opcao !== 3);
    console.log("voce saiu do programa!");
}

main()
    .then(() => console.log("Fim do programa!"))
    .finally(() => rl.close());