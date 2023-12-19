export interface IBasicStats {
  defence: number;
  defenceUpperLimit: number;
  health: number;
  healthUpperLimit: number;
  attackPower: number;
  attackPowerUpperLimit: number;
  spellPower: number;
  spellPowerUpperLimit: number;
}

export interface ISecondaryStats {
  source: number;
  sourceUpperLimit: number;
  speed: number;
  speedUpperLimit: number;
  sight: number;
  sightUpperLimit: number;
}

export interface IUtilizationStats {
  majorAction: number;
  majorActionRegain: number;
  minorAction: number;
  minorActionRegain: number;
  moveAction: number;
  moveActionRegain: number;
}