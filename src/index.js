const characters = [
  {
    name: "Mario",
    speed: 4,
    handling: 3,
    power: 3,
  },
  {
    name: "Luigi",
    speed: 3,
    handling: 4,
    power: 3,
  },
  {
    name: "Bowser",
    speed: 3,
    handling: 3,
    power: 4,
  },
];

async function rollDice(numOfSides) {
  return Math.floor(Math.random() * numOfSides) + 1;
}

async function getRandomBlock() {
  let result = "";
  let random = await rollDice(3);
  switch (random) {
    case 1:
      result = "STRAIGHT";
      break;
    case 2:
      result = "TURN";
      break;
    case 3:
      result = "OVERTAKE";
      break;
    default:
      console.log("Invalid number.");
      return;
  }
  return result;
}

async function rollLog(playerName, skillResult) {
  console.log(
    skillResult === 8
      ? `${playerName} rolls an ${skillResult}.`
      : `${playerName} rolls a ${skillResult}.`
  );
}

async function raceEngine(char1, char2) {
  for (let i = 1; i <= 5; i++) {
    let block = await getRandomBlock();
    let diceResult1 = await rollDice(6);
    let diceResult2 = await rollDice(6);
    let skillTest1 = 0;
    let skillTest2 = 0;

    console.log(`🚨 == Round ${i}: ${block} == 🚨`);

    switch (block) {
      case "STRAIGHT":
        skillTest1 = diceResult1 + char1.speed;
        skillTest2 = diceResult2 + char2.speed;
        break;

      case "TURN":
        skillTest1 = diceResult1 + char1.handling;
        skillTest2 = diceResult2 + char2.handling;
        break;

      case "OVERTAKE":
        skillTest1 = diceResult1 + char1.power;
        skillTest2 = diceResult2 + char2.power;
        break;

      default:
        console.log("Invalid block.");
        return;
    }

    await rollLog(char1.name, skillTest1);
    await rollLog(char2.name, skillTest2);

    if (skillTest1 > skillTest2) {
      console.log(`🚩 ${char1.name} wins round ${i}!\n`);
      char1.points++;
    } else if (skillTest1 < skillTest2) {
      console.log(`🚩 ${char2.name} wins round ${i}!\n`);
      char2.points++;
    } else {
      console.log(`🚩 Round ${i} is a draw!\n`);
    }
  }

  await winnerLog(char1.name, char1.points, char2.name, char2.points);
}

async function winnerLog(name1, points1, name2, points2){
  console.log("🏁 == CHECKERED FLAG == 🏁")
  console.log(`${name1} scored ${points1} points. \n${name2} scored ${points2} points.`)
  if (points1 > points2) {
    console.log(`🏆 ${name1} is the winner! Game over!`)
  } else if (points1 < points2) {
    console.log(`🏆 ${name2} is the winner! Game over!`)
  } else {
    console.log("🏅 It's a draw! Game over!")
  }
}

(async function main() {
  let player1 = { ...characters[0], points: 0 };
  let player2 = { ...characters[1], points: 0 };
  console.log(
    `🚥 Starting race between ${player1.name} and ${player2.name}... 🚥\n`
  );

  await raceEngine(player1, player2);
})();
