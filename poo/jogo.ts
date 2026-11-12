import * as readline from "readline";

// ===================== UTILITÁRIOS =====================

const cor = {
  verde: (t: string) => `\x1b[32m${t}\x1b[0m`,
  vermelho: (t: string) => `\x1b[31m${t}\x1b[0m`,
  amarelo: (t: string) => `\x1b[33m${t}\x1b[0m`,
  ciano: (t: string) => `\x1b[36m${t}\x1b[0m`,
  roxo: (t: string) => `\x1b[35m${t}\x1b[0m`,
  cinza: (t: string) => `\x1b[90m${t}\x1b[0m`,
  negrito: (t: string) => `\x1b[1m${t}\x1b[0m`,
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const sortear = <T>(lista: T[]): T => lista[Math.floor(Math.random() * lista.length)];

const plural = (n: number) => (n === 1 ? "vida" : "vidas");

// ===================== PERSONAGENS =====================

interface ResultadoAtaque {
  desviou: boolean;
  dano: number;
}

class Personagem {
  vidas: number;
  pontos = 0;
  desviando = false;

  constructor(
    public readonly nome: string,
    public readonly vidasMaximas = 5
  ) {
    this.vidas = vidasMaximas;
  }

  get estaVivo(): boolean {
    return this.vidas > 0;
  }

  pular(): void {
    this.desviando = true;
  }

  atacar(alvo: Personagem): ResultadoAtaque {
    return this.causarDano(alvo, 1, 10);
  }

  protected causarDano(alvo: Personagem, dano: number, pontosGanhos: number): ResultadoAtaque {
    if (alvo.desviando) {
      alvo.desviando = false;
      return { desviou: true, dano: 0 };
    }

    const danoReal = Math.min(dano, alvo.vidas);
    alvo.vidas -= danoReal;
    this.pontos += pontosGanhos;
    return { desviou: false, dano: danoReal };
  }
}

class Heroi extends Personagem {
  static readonly RECARGA_GOLPE = 3;
  recargaGolpe = 0;

  get golpeDisponivel(): boolean {
    return this.recargaGolpe === 0;
  }

  golpeDeLuz(alvo: Personagem): ResultadoAtaque {
    this.recargaGolpe = Heroi.RECARGA_GOLPE;
    return this.causarDano(alvo, 2, 20);
  }

  passarTurno(): void {
    if (this.recargaGolpe > 0) this.recargaGolpe--;
  }
}

type AcaoVilao = "atacar" | "explosao" | "pular";

class Vilao extends Personagem {
  // Como o narrador se refere ao vilão
  readonly apelido = "O Destruidor";

  explosaoSombria(alvo: Personagem): ResultadoAtaque {
    return this.causarDano(alvo, 1, 10);
  }

  escolherAcao(): AcaoVilao {
    const sorteio = Math.random();
    if (sorteio < 0.5) return "atacar";
    if (sorteio < 0.85) return "explosao";
    return "pular";
  }
}

// ===================== NARRAÇÃO =====================

async function narrar(linha: string, pausa = 700): Promise<void> {
  console.log(linha);
  await sleep(pausa);
}

async function turnoDoHeroi(
  acao: "atacar" | "golpe" | "pular",
  heroi: Heroi,
  vilao: Vilao
): Promise<void> {
  if (acao === "pular") {
    heroi.pular();
    await narrar(cor.ciano("🦘 Você pulou! Está pronto para desviar do próximo ataque."));
    return;
  }

  let resultado: ResultadoAtaque;

  if (acao === "atacar") {
    await narrar(cor.verde(`⚔️  ${sortear([
      `Você avançou e atacou ${vilao.apelido}!`,
      `Você atacou ${vilao.apelido} com sua espada!`,
      `Você investiu contra ${vilao.apelido}!`,
    ])}`));
    resultado = heroi.atacar(vilao);
  } else {
    await narrar(cor.amarelo("✨ Você concentrou toda a luz da sua espada..."), 900);
    await narrar(cor.amarelo(cor.negrito("☀️  GOLPE DE LUZ!")));
    resultado = heroi.golpeDeLuz(vilao);
  }

  if (resultado.desviou) {
    await narrar(cor.cinza(`💨 ${vilao.apelido} desviou do seu ataque!`));
  } else {
    await narrar(
      cor.verde(`💥 Acertou! ${vilao.apelido} perdeu ${resultado.dano} ${plural(resultado.dano)}!`)
    );
  }
}

async function turnoDoVilao(heroi: Heroi, vilao: Vilao): Promise<void> {
  // O desvio do vilão do turno anterior expira aqui
  vilao.desviando = false;

  const acao = vilao.escolherAcao();

  if (acao === "pular") {
    vilao.pular();
    await narrar(cor.roxo(`🦘 ${vilao.apelido} pulou, preparado para desviar do seu próximo golpe!`));
    return;
  }

  let resultado: ResultadoAtaque;

  if (acao === "atacar") {
    await narrar(cor.vermelho(`🗡️  ${sortear([
      `${vilao.apelido} te golpeou!`,
      `${vilao.apelido} avançou e tentou te atingir!`,
      `${vilao.apelido} desferiu um golpe contra você!`,
    ])}`));
    resultado = vilao.atacar(heroi);
  } else {
    await narrar(cor.roxo(`🌑 ${vilao.apelido} reuniu energia sombria...`), 900);
    await narrar(cor.roxo(cor.negrito("💀 EXPLOSÃO SOMBRIA!")));
    resultado = vilao.explosaoSombria(heroi);
  }

  if (resultado.desviou) {
    await narrar(cor.ciano("💨 Você desviou com um salto no último segundo!"));
  } else {
    await narrar(cor.vermelho(`😖 Você perdeu ${resultado.dano} ${plural(resultado.dano)}!`));
  }
}

// ===================== INTERFACE =====================

const LINHA = "=".repeat(44);

function titulo(texto: string): void {
  const espacos = " ".repeat(Math.max(0, Math.floor((44 - texto.length) / 2)));
  console.log(`${LINHA}\n${espacos}${cor.negrito(texto)}\n${LINHA}`);
}

function barraDeVidas(p: Personagem): string {
  return cor.vermelho("♥".repeat(p.vidas)) + cor.cinza("♡".repeat(p.vidasMaximas - p.vidas));
}

function exibirStatus(heroi: Heroi, vilao: Vilao): void {
  console.log("\n" + cor.cinza("-".repeat(44)));
  console.log(`${cor.negrito("Você")} (${heroi.nome})`);
  console.log(`  Vidas: ${barraDeVidas(heroi)}   Pontos: ${heroi.pontos}`);
  console.log(`${cor.negrito(vilao.apelido)} (${vilao.nome})`);
  console.log(`  Vidas: ${barraDeVidas(vilao)}   Pontos: ${vilao.pontos}`);
  console.log(cor.cinza("-".repeat(44)));
}

function exibirMenu(heroi: Heroi): void {
  const golpe = heroi.golpeDisponivel
    ? cor.amarelo("[B] Golpe de Luz")
    : cor.cinza(`[B] Golpe de Luz (recarga: ${heroi.recargaGolpe})`);

  console.log("\nSua vez! Escolha uma ação:");
  console.log(`  ${cor.verde("[A] Atacar")}`);
  console.log(`  ${golpe}`);
  console.log(`  ${cor.ciano("[P] Pular (desvia do próximo ataque)")}`);
  console.log(`  ${cor.cinza("[Q] Sair")}`);
}

function finalizar(heroi: Heroi, vilao: Vilao): never {
  console.log("");
  titulo("RESULTADO");

  if (!vilao.estaVivo) {
    console.log(cor.verde(cor.negrito("🏆 VITÓRIA! Você derrotou " + vilao.apelido + "!")));
  } else {
    console.log(cor.vermelho(cor.negrito("☠️  DERROTA... " + vilao.apelido + " venceu a batalha.")));
  }

  console.log(`\nSua pontuação final: ${cor.amarelo(String(heroi.pontos))} pontos`);
  process.exit(0);
}

// ===================== JOGO =====================

const heroi = new Heroi("Kael");
const vilao = new Vilao("Zarok");

let rodada = 1;
let ocupado = false; // bloqueia teclas enquanto a narração acontece

async function jogarRodada(acao: "atacar" | "golpe" | "pular"): Promise<void> {
  ocupado = true;

  console.log("\n" + cor.negrito(`--- RODADA ${rodada} ---`));

  // Turno do herói (jogador)
  await turnoDoHeroi(acao, heroi, vilao);
  if (!vilao.estaVivo) return finalizar(heroi, vilao);

  console.log("");

  // Turno do vilão (computador)
  await turnoDoVilao(heroi, vilao);
  heroi.desviando = false; // o desvio só vale para um ataque
  if (!heroi.estaVivo) return finalizar(heroi, vilao);

  heroi.passarTurno();
  rodada++;

  exibirStatus(heroi, vilao);
  exibirMenu(heroi);

  ocupado = false;
}

function iniciar(): void {
  console.clear();
  titulo("BATALHA DOS REINOS");
  console.log(`${cor.negrito(heroi.nome)} enfrentará ${cor.negrito(vilao.nome + ", " + vilao.apelido.toLowerCase())}!`);

  exibirStatus(heroi, vilao);
  exibirMenu(heroi);

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  process.stdin.on("keypress", (_texto, tecla) => {
    if (tecla.ctrl && tecla.name === "c") process.exit(0);
    if (tecla.name === "q") {
      console.log("\nVocê saiu do jogo. Até a próxima!");
      process.exit(0);
    }

    // Ignora teclas enquanto a narração está rolando
    if (ocupado) return;

    switch (tecla.name) {
      case "a":
        jogarRodada("atacar");
        break;
      case "b":
        if (!heroi.golpeDisponivel) {
          console.log(
            cor.cinza(`\nGolpe de Luz em recarga (${heroi.recargaGolpe} rodada(s))! Escolha outra ação.`)
          );
        } else {
          jogarRodada("golpe");
        }
        break;
      case "p":
        jogarRodada("pular");
        break;
    }
  });
}

iniciar();