import { query, transition, trigger } from "@angular/animations"

export const elementLeaves = (name, animation) => {
  return trigger(name, [
    transition(':leave', [ animation ], { params: { delay: '0ms' } }),
  ])
}
