import { Side, Size } from "../../lib/modules/board/entities/board-object/board-object.constants";
import { IHeroRaceDeclaration } from "../modules/heroes/entities/hero-race/hero-race.interface";
import { basicAttack, move } from "./abilities.data";
import { additionalAtackPerk } from "./perks.data";
import { improvableAttackPowerStatistic, improvableDefenceStatistic, improvableHealthStatistic, improvableMovementStatistic, improvableSpellPowerStatistic } from "./statistics.data";

export const human: IHeroRaceDeclaration = {
  id: "816120F8-924D-4ECF-9166-833F284CB762",
  size: Size.Medium,
  outlets: [Side.Top],
  statistics: [
    Object.assign(improvableDefenceStatistic, { value: 10 }),
    Object.assign(improvableHealthStatistic, { value: 10 }),
    Object.assign(improvableAttackPowerStatistic, { value: 10 }),
    Object.assign(improvableSpellPowerStatistic, { value: 10 }),
    Object.assign(improvableMovementStatistic, { value: 10 })
  ],
  abilities: [
    basicAttack,
    move,
  ],
  perks: [
    additionalAtackPerk
  ],
  isHeroRace: true,
  isEntity: true,
  isMixin: true
}

export const elf: IHeroRaceDeclaration = {
  id: "222031F9-D2EC-4459-9830-C99BC6D7633A",
  size: Size.Medium,
  outlets: [Side.Top],
  statistics: [
    Object.assign(improvableDefenceStatistic, { value: 10 }),
    Object.assign(improvableHealthStatistic, { value: 10 }),
    Object.assign(improvableAttackPowerStatistic, { value: 10 }),
    Object.assign(improvableSpellPowerStatistic, { value: 10 }),
    Object.assign(improvableMovementStatistic, { value: 10 })
  ],
  abilities: [
    basicAttack,
    move,
  ],
  perks: [
    additionalAtackPerk
  ],
  isHeroRace: true,
  isEntity: true,
  isMixin: true
}