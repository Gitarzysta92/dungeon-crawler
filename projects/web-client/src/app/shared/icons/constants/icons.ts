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
  comment: { class: "oi oi-comment-square", glyph: "comment-square" },
  undo: { class: "oi oi-action-undo", glyph: "action-undo" },
  'next-player': { class: "oi oi-caret-right", glyph: "caret-right" },
  'exit-game': { class: "oi oi-account-logout", glyph: "account-logout" },
  'sound-unmuted': { class: "oi oi-volume-high", glyph: "volume-high" },
  'sound-muted': { class: "oi oi-volume-low", glyph: "volume-low" },

  // armies icons
  borgo: { class: "", glyph: "borgo" },
  hegemony: { class: "", glyph: "hegemony" },
  random: { class: "", glyph: "random" }
}


const getIconsByType = (type: keyof Variants): IconsTypes => {
  return Object.freeze(Object.keys(ICONS_NAMES).reduce((acc, key) => Object.assign(acc, { [key]: ICONS_NAMES[key][type] }), {})) as IconsTypes;
}
export type Icons = typeof ICONS;
export const ICONS = getIconsByType('glyph');
export const IconsToken = new InjectionToken<IconsTypes>('icons');