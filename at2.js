import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

const nome = prompt('Qual o seu nome? ');
console.log(`Olá, ${nome}!`);