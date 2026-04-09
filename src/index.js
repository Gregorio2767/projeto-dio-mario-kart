const player1 = {
  NOME: "Ayrton Senna",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Gabriel Bortoleto",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();

  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

async function logRollResult(name, tipo, dice, atributo) {
  console.log(
    `🎲 ${name} acelera com ${tipo}: ${dice} + ${atributo} = ${dice + atributo}`
  );
}

async function playRaceEngine(p1, p2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 VOLTA ${round} COMEÇOU!`);
    console.log("Luzes apagadas e lá vão eles! 🚦");

    let block = await getRandomBlock();

    if (block === "RETA") console.log("🏎️ Reta longa! Pé no fundo!");
    if (block === "CURVA") console.log("🌀 Curva desafiadora!");
    if (block === "CONFRONTO") console.log("🔥 Disputa roda a roda!");

    let dice1 = await rollDice();
    let dice2 = await rollDice();

    let total1 = 0;
    let total2 = 0;

    if (block === "RETA") {
      total1 = dice1 + p1.VELOCIDADE;
      total2 = dice2 + p2.VELOCIDADE;

      await logRollResult(p1.NOME, "velocidade", dice1, p1.VELOCIDADE);
      await logRollResult(p2.NOME, "velocidade", dice2, p2.VELOCIDADE);
    }

    if (block === "CURVA") {
      total1 = dice1 + p1.MANOBRABILIDADE;
      total2 = dice2 + p2.MANOBRABILIDADE;

      await logRollResult(p1.NOME, "manobrabilidade", dice1, p1.MANOBRABILIDADE);
      await logRollResult(p2.NOME, "manobrabilidade", dice2, p2.MANOBRABILIDADE);
    }

    if (block === "CONFRONTO") {
      let power1 = dice1 + p1.PODER;
      let power2 = dice2 + p2.PODER;

      console.log(`🥊 ${p1.NOME} e ${p2.NOME} lado a lado!`);

      await logRollResult(p1.NOME, "poder", dice1, p1.PODER);
      await logRollResult(p2.NOME, "poder", dice2, p2.PODER);

      if (power1 > power2 && p2.PONTOS > 0) {
        console.log(`💥 ${p1.NOME} leva a melhor! ${p2.NOME} perde posição!`);
        p2.PONTOS--;
      } else if (power2 > power1 && p1.PONTOS > 0) {
        console.log(`💥 ${p2.NOME} dá o troco! ${p1.NOME} perde posição!`);
        p1.PONTOS--;
      } else {
        console.log("🤝 Que disputa! Ninguém cede!");
      }
    }

    if (total1 > total2) {
      console.log(`🏆 ${p1.NOME} ganha a posição na volta!`);
      p1.PONTOS++;
    } else if (total2 > total1) {
      console.log(`🏆 ${p2.NOME} assume a frente!`);
      p2.PONTOS++;
    } else {
      console.log("⚖️ Empate técnico nessa volta!");
    }

    console.log("────────────────────────────");
  }
}

async function declareWinner(p1, p2) {
  console.log("\n🏁 BANDEIRA QUADRICULADA! 🏁\n");

  console.log(`📊 Resultado final:`);
  console.log(`${p1.NOME}: ${p1.PONTOS} ponto(s)`);
  console.log(`${p2.NOME}: ${p2.PONTOS} ponto(s)\n`);

  if (p1.PONTOS > p2.PONTOS) {
    console.log(`🥇 ${p1.NOME} vence o Grande Prêmio!`);
  } else if (p2.PONTOS > p1.PONTOS) {
    console.log(`🥇 ${p2.NOME} vence o Grande Prêmio!`);
  } else {
    console.log("🤯 Inacreditável! Terminam empatados!");
  }
}

(async function main() {
  console.log("🏎️💨 GRANDE PRÊMIO INICIADO!");
  console.log(
    `Hoje temos ${player1.NOME} vs ${player2.NOME} na pista!\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();