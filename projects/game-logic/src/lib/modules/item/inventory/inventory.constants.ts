export enum InventorySlotType {
  Weapon = "Weapon",
  Chest = "Chest",
  Feet = "Feet",
  Common = "Common",
  Currency = "Currency"
}

export const equipableSlotTypes = [
  InventorySlotType.Weapon,
  InventorySlotType.Chest,
  InventorySlotType.Feet
]