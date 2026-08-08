# Jogo da Velha (JavaScript + POO)

Dever de casa da Aula 01 jogo da velha feito com classes.

## Como rodar

```
node jogo_da_velha.js
```

## Modos de jogo

No final do arquivo, troque a constante `MODO`:

```js
const MODO = "interativo"; // joga digitando as posições no console
const MODO = "array";      // roda a partir de um array de jogadas fixo
```

## Tabuleiro

As posições seguem o teclado numérico:

```
7 | 8 | 9
4 | 5 | 6
1 | 2 | 3
```

## Classes

- **Tabuleiro**: guarda as células e verifica vencedor/empate.
- **Jogador**: nome e símbolo (X ou O).
- **JogoDaVelha**: controla o andamento da partida.
- **PartidaInterativa**: modo console.
- **PartidaComArray**: modo array de jogadas.
