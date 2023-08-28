import { query, transition, trigger } from "@angular/animations"

export const elementsEnters = (name, animation) => {
  return trigger(name, [
    transition(':enter', [
      query(':enter', animation, { optional: true })
    ], { params: { delay: '0ms' } })
  ])
}
