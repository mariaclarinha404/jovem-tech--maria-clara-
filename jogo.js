'use strict';
/**
 * CAÇA AO TESOURO EM LABIRINTO (versão simples)
 * JovemTech / M2 Lógica de Programação
 *
 * Objetivo: levar o jogador (@) até o tesouro ($) sem bater nas paredes (█).
 * Como rodar: node jogo.js
 */

import { createInterface } from 'node:readline';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/* ---------- 1. CORES ANSI ---------- */

const COR = {
  vermelho: '\x1b[31m',
  verde: '\x1b[32m',
  amarelo: '\x1b[33m',
  azul: '\x1b[34m',
  magenta: '\x1b[35m',
  ciano: '\x1b[36m',
  reset: '\x1b[0m',
};

// Coloca a cor no texto e SEMPRE termina com reset.
function colorir(texto, cor) {
  if (process.env.NO_COLOR || !COR[cor]) return texto;
  return COR[cor] + texto + COR.reset;
}

/* ---------- 2. DADOS ---------- */

// Mapa: matriz de texto. # parede | . caminho | @ jogador | $ tesouro
const MAPA = [
  '###########',
  '#@..#.....#',
  '#.#.#.###.#',
  '#.#...#...#',
  '#.#####.#.#',
  '#.......#$#',
  '###########',
];

// Cada tecla vira um deslocamento (dx = coluna, dy = linha)
const DIRECOES = {
  w: { dx: 0, dy: -1 },
  s: { dx: 0, dy: 1 },
  a: { dx: -1, dy: 0 },
  d: { dx: 1, dy: 0 },
};

/* ---------- 3. LÓGICA ---------- */

// Cria o estado do jogo a partir do mapa.
function criarJogo(mapa) {
  const grade = mapa.map((linha) => linha.split('')); // matriz de caracteres
  const jogador = { x: -1, y: -1 };

  for (let y = 0; y < grade.length; y++) {
    for (let x = 0; x < grade[y].length; x++) {
      if (grade[y][x] === '@') {
        jogador.x = x;
        jogador.y = y;
        grade[y][x] = '.';
      }
    }
  }

  if (jogador.x === -1) throw new Error('O mapa precisa ter um jogador (@).');
  return { grade, jogador, passos: 0, venceu: false };
}

// Valida o texto digitado. Retorna { valido, tecla, mensagem }.
function lerComando(entrada) {
  const tecla = String(entrada).trim().toLowerCase();

  if (tecla === '') return { valido: false, mensagem: 'Digite w, a, s, d ou sair.' };
  if (tecla === 'sair' || tecla === 'q') return { valido: true, tecla: 'sair' };
  if (DIRECOES[tecla]) return { valido: true, tecla };

  return { valido: false, mensagem: `"${tecla}" não é um comando. Use w, a, s, d ou sair.` };
}

// Tenta mover o jogador. Retorna a mensagem do resultado.
function mover(jogo, tecla) {
  const dir = DIRECOES[tecla];
  const nx = jogo.jogador.x + dir.dx;
  const ny = jogo.jogador.y + dir.dy;

  // fora do mapa ou parede = não anda
  if (ny < 0 || ny >= jogo.grade.length || nx < 0 || nx >= jogo.grade[0].length) {
    return colorir('[ERRO] Fim do mapa!', 'vermelho');
  }
  if (jogo.grade[ny][nx] === '#') {
    return colorir('[ERRO] Bateu na parede!', 'vermelho');
  }

  jogo.jogador.x = nx;
  jogo.jogador.y = ny;
  jogo.passos++;

  if (jogo.grade[ny][nx] === '$') {
    jogo.venceu = true;
    return colorir('[OK] Você encontrou o tesouro!', 'verde');
  }
  return '';
}

/* ---------- 4. DESENHO ---------- */

function desenhar(jogo, mensagem) {
  console.clear();
  console.log(colorir('=== CAÇA AO TESOURO ===', 'ciano'));
  console.log(`Passos: ${jogo.passos}\n`);

  for (let y = 0; y < jogo.grade.length; y++) {
    let linha = '  ';
    for (let x = 0; x < jogo.grade[y].length; x++) {
      if (x === jogo.jogador.x && y === jogo.jogador.y) linha += colorir('@', 'amarelo');
      else if (jogo.grade[y][x] === '#') linha += colorir('█', 'ciano');
      else if (jogo.grade[y][x] === '$') linha += colorir('$', 'magenta');
      else linha += colorir('.', 'azul');
    }
    console.log(linha);
  }

  console.log(`\n${colorir('@', 'amarelo')} você   ${colorir('█', 'ciano')} parede   ${colorir('$', 'magenta')} tesouro`);
  console.log('Comandos: w (cima) | s (baixo) | a (esquerda) | d (direita) | sair');
  if (mensagem) console.log('\n' + mensagem);
}

/* ---------- 5. LOOP PRINCIPAL ---------- */
async function jogar() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const perguntar = (texto) => new Promise((resolve) => rl.question(texto, resolve));

  const jogo = criarJogo(MAPA);
  let mensagem = '';

  while (!jogo.venceu) {
    desenhar(jogo, mensagem);
    const cmd = lerComando(await perguntar('\n> '));

    if (!cmd.valido) mensagem = colorir('[ERRO] ' + cmd.mensagem, 'vermelho');
    else if (cmd.tecla === 'sair') break;
    else mensagem = mover(jogo, cmd.tecla);
  }

  if (jogo.venceu) {
    desenhar(jogo, mensagem);
    console.log(colorir(`\nParabéns! Você terminou em ${jogo.passos} passos.`, 'verde'));
  } else {
    console.log('\nAté a próxima!');
  }
  rl.close();
}

// Só inicia o jogo se rodar "node jogo.js" (permite importar nos testes)
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) jogar();

export { MAPA, colorir, criarJogo, lerComando, mover };