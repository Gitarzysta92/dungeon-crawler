import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "@game-logic/data/actors.data";
import { hero } from "@game-logic/data/commons.data";
import { curse, fireball, healing, meleeAttack, meteorShower, move, teleport, vision, weakness } from "@game-logic/data/skills-and-spells.data";

export const spellsAndAbilities = {
  [meleeAttack.id]: Object.assign({ name: "Melee attack", desciption: "Some text" }, meleeAttack),
  [move.id]: Object.assign({ name: "Move", desciption: "Some text" }, move),
  [fireball.id]: Object.assign({ name: "Fireball", desciption: "Some text" }, fireball),
  [teleport.id]: Object.assign({ name: "Teleport", desciption: "Some text" }, teleport),
  [healing.id]: Object.assign({ name: "Healing", desciption: "Some text" }, healing),
  [vision.id]: Object.assign({ name: "Vision", desciption: "Some text" }, vision),
  [weakness.id]: Object.assign({ name: "Weakness", desciption: "Some text" }, weakness),
  [curse.id]: Object.assign({ name: "Curse", desciption: "Some text" }, curse),
  [meteorShower.id]: Object.assign({ name: "MeteorShower", desciption: "Some text" }, meteorShower)
}

export const actors = {
  [ratActor.id]: Object.assign({ name: "Rat", textureUrl: "assets/images/rat.png" }, ratActor),
  [obstacleActor.id]: Object.assign({ name: "Obstacle", textureUrl: "assets/images/obstacle.png" }, obstacleActor),
  [treasureActor.id]: Object.assign({ name: "Treasure", textureUrl: "assets/images/treasure.png" }, treasureActor),
  [dungeonExitActor.id]: Object.assign({ name: "Exit", textureUrl: "assets/images/exit.png" }, dungeonExitActor),
  [hero.id]: Object.assign({ name: "Hero", textureUrl: "assets/images/hero.png" }, hero)
}