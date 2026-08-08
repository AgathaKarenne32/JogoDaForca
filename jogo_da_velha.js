const readline = require("readline");

class Tabuleiro {
  constructor() {
    // Posições de 1 a 9, como um teclado numérico:
    // 7 | 8 | 9
    // 4 | 5 | 6
    // 1 | 2 | 3
    this.celulas = Array(9).fill(null);
  }

  // Converte a posição (1-9) para o índice do array (0-8)
  #paraIndice(posicao) {
    return posicao - 1;
  }

  posicaoValida(posicao) {
    return Number.isInteger(posicao) && posicao >= 1 && posicao <= 9;
  }

  posicaoLivre(posicao) {
    const indice = this.#paraIndice(posicao);
    return this.celulas[indice] === null;
  }

  marcar(posicao, simbolo) {
    const indice = this.#paraIndice(posicao);
    this.celulas[indice] = simbolo;
  }

  cheio() {
    return this.celulas.every((celula) => celula !== null);
  }

  // Retorna o símbolo vencedor ("X" ou "O") ou null se não houver vencedor
  verificarVencedor() {
    const linhasDeVitoria = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
      [0, 4, 8], [2, 4, 6],            // diagonais
    ];

    for (const [a, b, c] of linhasDeVitoria) {
      if (
        this.celulas[a] &&
        this.celulas[a] === this.celulas[b] &&
        this.celulas[a] === this.celulas[c]
      ) {
        return this.celulas[a];
      }
    }
    return null;
  }

  desenhar() {
    const exibir = (i) => (this.celulas[i] ? this.celulas[i] : i + 1);
    const linha = (a, b, c) =>
      `  ${exibir(a)} | ${exibir(b)} | ${exibir(c)}  `;

    console.log("\n" + linha(6, 7, 8));
    console.log(" ---+---+---");
    console.log(linha(3, 4, 5));
    console.log(" ---+---+---");
    console.log(linha(0, 1, 2) + "\n");
  }
}

class Jogador {
  constructor(nome, simbolo) {
    this.nome = nome;
    this.simbolo = simbolo;
  }
}

class JogoDaVelha {
  constructor(jogador1 = "Jogador 1", jogador2 = "Jogador 2") {
    this.tabuleiro = new Tabuleiro();
    this.jogadores = [
      new Jogador(jogador1, "X"),
      new Jogador(jogador2, "O"),
    ];
    this.indiceJogadorAtual = 0;
    this.vencedor = null;
    this.empate = false;
  }

  jogadorDaVez() {
    return this.jogadores[this.indiceJogadorAtual];
  }

  trocarJogador() {
    this.indiceJogadorAtual = this.indiceJogadorAtual === 0 ? 1 : 0;
  }

  jogoAcabou() {
    return this.vencedor !== null || this.empate;
  }

  // Executa uma jogada. Retorna true se a jogada foi válida e aceita.
  jogar(posicao) {
    if (this.jogoAcabou()) {
      console.log("O jogo já terminou!");
      return false;
    }

    if (!this.tabuleiro.posicaoValida(posicao)) {
      console.log("Posição inválida! Escolha um número de 1 a 9.");
      return false;
    }

    if (!this.tabuleiro.posicaoLivre(posicao)) {
      console.log("Essa posição já está ocupada! Escolha outra.");
      return false;
    }

    const jogadorAtual = this.jogadorDaVez();
    this.tabuleiro.marcar(posicao, jogadorAtual.simbolo);

    const simboloVencedor = this.tabuleiro.verificarVencedor();
    if (simboloVencedor) {
      this.vencedor = jogadorAtual;
    } else if (this.tabuleiro.cheio()) {
      this.empate = true;
    } else {
      this.trocarJogador();
    }

    return true;
  }

  mostrarResultado() {
    this.tabuleiro.desenhar();
    if (this.vencedor) {
      console.log(`🎉 ${this.vencedor.nome} (${this.vencedor.simbolo}) venceu o jogo!`);
    } else if (this.empate) {
      console.log("🤝 Deu velha! O jogo empatou.");
    }
  }
}

class PartidaInterativa {
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
    console.log("=== BEM-VINDO AO JOGO DA VELHA ===");
    console.log("Posições do tabuleiro:");
    this.jogo.tabuleiro.desenhar();

    while (!this.jogo.jogoAcabou()) {
      const jogadorAtual = this.jogo.jogadorDaVez();
      const entrada = await this.perguntar(
        `${jogadorAtual.nome} (${jogadorAtual.simbolo}), escolha uma posição (1-9): `
      );

      const posicao = parseInt(entrada, 10);
      const jogadaValida = this.jogo.jogar(posicao);

      if (jogadaValida && !this.jogo.jogoAcabou()) {
        this.jogo.tabuleiro.desenhar();
      }
    }

    this.jogo.mostrarResultado();
    this.rl.close();
  }
}

class PartidaComArray {
  constructor(jogo, jogadas) {
    this.jogo = jogo;
    this.jogadas = jogadas; // array de números, ex: [5, 1, 9, 3, 7]
  }

  executar() {
    console.log("=== JOGO DA VELHA (MODO ARRAY DE JOGADAS) ===");
    console.log("Jogadas recebidas:", this.jogadas);

    for (const posicao of this.jogadas) {
      if (this.jogo.jogoAcabou()) break;

      const jogadorAtual = this.jogo.jogadorDaVez();
      console.log(`\n${jogadorAtual.nome} (${jogadorAtual.simbolo}) joga na posição ${posicao}`);
      this.jogo.jogar(posicao);
      this.jogo.tabuleiro.desenhar();
    }

    if (!this.jogo.jogoAcabou()) {
      console.log("As jogadas acabaram, mas o jogo ainda não terminou.");
    }

    this.jogo.mostrarResultado();
  }
}

// Para escolher o modo, altere a constante MODO abaixo:
// "interativo" -> joga digitando posições no console
// "array"      -> joga a partir de um array de jogadas fixo

const MODO = "interativo"; // troque para "array" se quiser testar o outro modo

if (MODO === "interativo") {
  const jogo = new JogoDaVelha("Jogador 1", "Jogador 2");
  const partida = new PartidaInterativa(jogo);
  partida.iniciar();
} else {
  // Exemplo de array de jogadas (alternando entre os dois jogadores)
  // Nesse exemplo o Jogador 1 (X) vence na diagonal 1-5-9
  const jogadasExemplo = [1, 2, 5, 3, 9];

  const jogo = new JogoDaVelha("Jogador 1", "Jogador 2");
  const partida = new PartidaComArray(jogo, jogadasExemplo);
  partida.executar();
}
