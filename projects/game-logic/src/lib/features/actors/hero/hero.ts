
import { Outlet, Size } from "../../board/board.constants";
import { IBoardObjectRotation, IBoardCoordinates } from "../../board/board.interface";
import { ActorType } from "../actors.constants";
import { IHero } from "./hero.interface";

export class HeroActor implements IHero {
  id!: string;
  name!: string;
  actorType: ActorType.Hero = ActorType.Hero;
  sourceActorId!: string;

  level!: number;
  experiencePoints!: number;

  majorAction!: number;
  majorActionRegain!: number;
  minorAction!: number;
  minorActionRegain!: number;
  moveAction!: number;
  moveActionRegain!: number;

  source!: number;
  sourceUpperLimit!: number;

  effects!: any[];
  groupId!: string;
  maxStack!: number;
  characterId!: string;
  maxItems!: number;

  defence!: number;
  defenceUpperLimit!: number;
  speed!: number;
  speedUpperLimit!: number;
  sight!: number;
  sightUpperLimit!: number;
  health!: number;
  healthUpperLimit!: number;
  attackPower!: number;
  attackPowerUpperLimit!: number;
  spellPower!: number;
  spellPowerUpperLimit!: number;
  
  occupiedAreaId!: string;
  occupiedRootAreaId!: string;

  availableAbilityIds: string;

  rotation!: IBoardObjectRotation;
  position!: IBoardCoordinates;

  outlets!: Outlet[];
  size: Size;

  constructor(data: IHero) {
    Object.assign(this, data);
  }



  public gainExperience(experience: number): void {
    this.experiencePoints += experience;
  }

  public regainActions(): void {
    this.majorAction = 0;
    this.minorAction = 0;
    this.moveAction = 0;

    this.majorAction = this.majorAction += this.majorActionRegain;
    this.minorAction = this.minorAction += this.minorActionRegain;
    this.moveAction = this.moveAction += this.moveActionRegain;
  }

  public isDefeated(): boolean {
    return this.health < 0;
  }
  
}