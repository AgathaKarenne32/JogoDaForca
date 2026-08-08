// ============================================================
// JOGO DA FORCA - Desafio da Aula 01 (POO + JavaScript)
// Feito com Classes, conforme conteúdo revisado em aula.
// Interação via console (Node.js).
// ============================================================

const readline = require("readline");

// -------------------- CLASSE PRINCIPAL --------------------
class JogoDaForca {
  constructor(palavras, tentativasMaximas = 6) {
    this.palavras = palavras;
    this.tentativasMaximas = tentativasMaximas;
    this.palavraSecreta = this.sortearPalavra();
    this.letrasCertas = new Set();
    this.letrasErradas = new Set();
    this.tentativasRestantes = tentativasMaximas;
  }

  sortearPalavra() {
    const indice = Math.floor(Math.random() * this.palavras.length);
    return this.palavras[indice].toUpperCase();
  }

  // Retorna a palavra atual mascarada, ex: "_ A _ A"
  palavraMascarada() {
    return this.palavraSecreta
      .split("")
      .map((letra) => (this.letrasCertas.has(letra) ? letra : "_"))
      .join(" ");
  }

  // Verifica se a palavra já foi completamente descoberta
  venceu() {
    return this.palavraSecreta
      .split("")
      .every((letra) => this.letrasCertas.has(letra));
  }

  perdeu() {
    return this.tentativasRestantes <= 0;
  }

  jogoAcabou() {
    return this.venceu() || this.perdeu();
  }

  // Processa o palpite do jogador
  tentar(letra) {
    letra = letra.toUpperCase();

    if (this.letrasCertas.has(letra) || this.letrasErradas.has(letra)) {
      console.log(`Você já tentou a letra "${letra}". Tente outra!`);
      return;
    }

    if (this.palavraSecreta.includes(letra)) {
      this.letrasCertas.add(letra);
      console.log(`Boa! A letra "${letra}" está na palavra.`);
    } else {
      this.letrasErradas.add(letra);
      this.tentativasRestantes--;
      console.log(`Que pena! A letra "${letra}" não está na palavra.`);
    }
  }

  desenharForca() {
    const estagios = [
      `
   +---+
   |   |
       |
       |
       |
       |
  =========`,
      `
   +---+
   |   |
   O   |
       |
       |
       |
  =========`,
      `
   +---+
   |   |
   O   |
   |   |
       |
       |
  =========`,
      `
   +---+
   |   |
   O   |
  /|   |
       |
       |
  =========`,
      `
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
  =========`,
      `
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
  =========`,
      `
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
  =========`,
    ];

    const erradas = this.tentativasMaximas - this.tentativasRestantes;
    console.log(estagios[erradas]);
  }

  mostrarStatus() {
    console.log("\n============================");
    this.desenharForca();
    console.log(`Palavra: ${this.palavraMascarada()}`);
    console.log(
      `Letras erradas: ${
        this.letrasErradas.size > 0
          ? [...this.letrasErradas].join(", ")
          : "nenhuma"
      }`
    );
    console.log(`Tentativas restantes: ${this.tentativasRestantes}`);
    console.log("============================\n");
  }
}

// -------------------- CLASSE DE CONTROLE DA PARTIDA --------------------
class Partida {
  constructor(jogo) {
    this.jogo = jogo;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  perguntar(pergunta) {
    return new Promise((resolve) => this.rl.question(pergunta, resolve));
  }

  async iniciar() {
    console.log("=== BEM-VINDO AO JOGO DA FORCA ===");

    while (!this.jogo.jogoAcabou()) {
      this.jogo.mostrarStatus();

      const entrada = await this.perguntar("Digite uma letra: ");

      if (!entrada || entrada.length !== 1 || !/[a-zA-Z]/.test(entrada)) {
        console.log("Entrada inválida! Digite apenas uma letra.");
        continue;
      }

      this.jogo.tentar(entrada);
    }

    this.finalizar();
  }

  finalizar() {
    this.jogo.mostrarStatus();

    if (this.jogo.venceu()) {
      console.log(`🎉 Parabéns! Você acertou a palavra: ${this.jogo.palavraSecreta}`);
    } else {
      console.log(`💀 Você perdeu! A palavra era: ${this.jogo.palavraSecreta}`);
    }

    this.rl.close();
  }
}

// -------------------- EXECUÇÃO --------------------
const bancoDePalavras = [
  "JAVASCRIPT",
  "PROGRAMACAO",
  "COMPUTADOR",
  "TECLADO",
  "DESENVOLVEDOR",
  "FACULDADE",
  "ALGORITMO",
];

const jogo = new JogoDaForca(bancoDePalavras);
const partida = new Partida(jogo);
partida.iniciar();
