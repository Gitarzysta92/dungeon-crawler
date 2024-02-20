import { Reward } from "./reward";
import { IRewarding } from "./rewards.interface";

export class Rewarding implements IRewarding {
  rewards: Reward[];
  isRewarding: true;

}