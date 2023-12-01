import { query, transition, trigger } from "@angular/animations"

export const elementEnters = (name, animation) => {
  return trigger(name, [
    transition(':enter', [ animation ], { params: { delay: '0ms' } }),
  ])
}
