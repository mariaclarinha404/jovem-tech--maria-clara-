import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });
// 1. Cria o vetor vazio para armazenar os 8 números reais
const numeros = [];
let soma = 0;
console.log('=== ENTRADA DE NÚMEROS REAIS ===');
// 2. Laço para ler os 8 valores e acumular a soma
for (let i = 0; i < 8; i++) {
  // Usamos parseFloat para aceitar números decimais (com ponto)
  numeros[i] = parseFloat(prompt(`Digite o ${i + 1}º número: `));
  // Soma o número atual ao total acumulado
  soma += numeros[i];
}
console.log('\n=== RESULTADO ===');
// 3. Exibe o vetor lido e a soma total formatada
console.log('Valores armazenados:', numeros);
console.log(`A soma de todos os valores é: ${soma.toFixed(2)}`);
