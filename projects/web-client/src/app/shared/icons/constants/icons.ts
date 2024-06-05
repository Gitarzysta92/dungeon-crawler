import { InjectionToken } from "@angular/core";

type Variants = { 'class': string, 'glyph': string };
type IconsTypes =  { [key in keyof typeof ICONS_NAMES]: string };

const ICONS_NAMES = {

  // system icons
  error: { class: "oi oi-circle-x", glyph: "circle-x" },
  warning: { class: "oi oi-warning", glyph: "warning" },
  success: { class: "oi oi-circle-check", glyph: "circle-check" },
  login: { class: "oi oi-account-login", glyph: "account-login" },
  registration: { class: "oi oi-check", glyph: "check" },
  reveal: { class: "oi oi-eye", glyph: "eye"  },
  hide: { class: "oi oi-minus", glyph: "minus" },
  approve: { class: "oi oi-check", glyph: "check" },
  disapprove: { class: "oi oi-x" , glyph: "x"},
  win: { class: "oi oi-thumb-up", glyph: "thumb-up" },
  loose: { class: "oi oi-thumb-down", glyph: "thumb-down" },
  logout: { class: "oi oi-account-logout", glyph: "account-logout" },
  profile: { class: "oi oi-person", glyph: "person" },
  profiles: { class: "oi oi-people", glyph: "people" },
  remove: { class: "oi oi-trash", glyph: "trash" },
  add: { class: "oi oi-plus", glyph: "plus" },
  save: { class: "oi oi-cloud-upload", glyph: "cloud-upload" },
  'cartet-bottom': { class: "oi oi-caret-bottom", glyph: "caret-bottom" },
  'cartet-right': { class: "oi oi-caret-right", glyph: "caret-right" },
  comment: { class: "oi oi-comment-square", glyph: "comment-square" },
  undo: { class: "oi oi-action-undo", glyph: "action-undo" },
  'next-player': { class: "oi oi-caret-right", glyph: "caret-right" },
  'exit-game': { class: "oi oi-account-logout", glyph: "account-logout" },
  'sound-unmuted': { class: "oi oi-volume-high", glyph: "volume-high" },
  'sound-muted': { class: "oi oi-volume-low", glyph: "volume-low" },

  sword: { class: "", glyph: "sword" },
  heart: { class: "", glyph: "heart" },
  shield: { class: "", glyph: "shield" },
  wand: { class: "", glyph: "wand" },
  feet: { class: "", glyph: "feet" },
  helmet: { class: "", glyph: "helmet" },
  journal: { class: "", glyph: "journal" },
  map: { class: "", glyph: "map" },
  cog: { class: "", glyph: "cog" },
  bag: { class: "", glyph: "bag" },
  coins: { class: "", glyph: "coins" },
  squest: { class: "", glyph: "squest" },
  fquest: { class: "", glyph: "fquest" },
  armor: { class: "", glyph: "armor" },
  necklace: { class: "", glyph: "necklace" },
  glove: { class: "", glyph: "glove" },
  marker: { class: "", glyph: "marker" },
  swordShield: { class: "", glyph: "swordShield" },
  class: { class: "", glyph: "class" },
  calendar: { class: "", glyph: "calendar" },
  tower: { class: "", glyph: "tower" },
  dungeon: { class: "", glyph: "dungeon" },
  castle: { class: "", glyph: "castle" },
  lock: { class: "", glyph: "lock" },
  level: { class: "", glyph: "level" },

  // social icons
  kickstarter: { class: "", glyph: "random" },
}


const getIconsByType = (type: keyof Variants): IconsTypes => {
  return Object.freeze(Object.keys(ICONS_NAMES).reduce((acc, key) => Object.assign(acc, { [key]: ICONS_NAMES[key][type] }), {})) as IconsTypes;
}
export type Icons = typeof ICONS;
export const ICONS = getIconsByType('glyph');
export const IconsToken = new InjectionToken<IconsTypes>('icons');