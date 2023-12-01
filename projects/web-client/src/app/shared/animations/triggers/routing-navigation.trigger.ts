import { animate, query, transition, trigger } from "@angular/animations"

export const routingNavigation = (name, animation) => {
  return trigger(name, [
    transition('void => void', [
      animate(0)
    ]),
    transition('* <=> *', [
      animation
    ]),
  ])
}


