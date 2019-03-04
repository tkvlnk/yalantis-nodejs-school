const ATTACK_TYPE = {
  CHAOTIC: Symbol('CHAOTIC'),
  PHYSICAL: Symbol('PHYSICAL'),
};

class Warrior {
  constructor({ name }) {
    this.name = name;
    this.healthPoints = 100;
  }

  attack() {
    return Math.round(
      Math.random() * 10,
    )
  }

  takeDamage(damage) {
    this.healthPoints -= damage;

    if (this.healthPoints < 0) {
      this.healthPoints = 0;
    }
  }

  isDead() {
    return this.healthPoints <= 0;
  }
}

class Monster extends Warrior {}

// Node js class syntax workaround
Monster.prototype.attackType = ATTACK_TYPE.CHAOTIC;

class Gladiator extends Warrior {}

// Node js class syntax workaround
Gladiator.prototype.attackType = ATTACK_TYPE.PHYSICAL;

class Game {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  isAllAlive() {
    return [
      this.first,
      this.second,
    ].every(opponent => !opponent.isDead())
  }

  start() {
    while (this.isAllAlive()) {
      const {
        first,
        second,
      } = this;

      second.takeDamage(first.attack());

      if (second.isDead()) {
        this.winner = first.name;
        break;
      }

      first.takeDamage(second.attack());

      if (first.isDead()) {
        this.winner = second.name;
      }
    }
  }
}

Game.prototype.winner = null;


const game = new Game(
  new Gladiator({
    name: 'Titus'
  }),
  new Monster({
    name: 'Hydra'
  })
);

game.start();

console.log(game.winner);