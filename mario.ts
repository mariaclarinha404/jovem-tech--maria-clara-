class Personagem {
  nome: string;
  vidas: number;
  pontos: number;

  constructor(nome: string) {
    this.nome = nome;
    this.vidas = 3;
    this.pontos = 0;
  }

  pular(): void {
    console.log(`${this.nome} pulou! 🍄`);
  }
}
// Criando objetos:
const mario = new Personagem("Mario");
const luigi = new Personagem("Luigi");
console.log("==========================================\n");
console.log("Criando o objeto Mario (herdando de Personagem)...");
mario.pular();     // Método implementado a partir da classe abstrata
console.log("==========================================\n");
console.log("Criando o objeto Luigi (herdando de Personagem)...");
luigi.pular();     // Método implementado a partir da classe abstrata