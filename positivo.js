const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function perguntar(mensagem) {
    return new Promise(resolve => {
        rl.question(mensagem, resolve);
    });
}