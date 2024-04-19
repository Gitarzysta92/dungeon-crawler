import { IHeroClassDeclaration } from "../modules/heroes/entities/hero-class/hero-class.interface";
import { fear, fireball, teleport, weakness } from "./abilities.data";

export const warrior: IHeroClassDeclaration = {
  id: "2FB317CE-DD9E-4256-B0E0-E6EC34090020",
  abilities: [weakness, fear],
  perks: [],
  isHeroClass: true,
  isEntity: true, 
  isMixin: true,
}

export const mage: IHeroClassDeclaration = {
  id: "777DEB7C-862C-4F7F-B2E3-690F77CDB2CB",
  abilities: [fireball, teleport],
  perks: [],
  isHeroClass: true,
  isEntity: true, 
  isMixin: true,
}