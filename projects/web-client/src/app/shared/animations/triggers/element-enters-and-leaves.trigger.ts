import { query, transition, trigger } from "@angular/animations"

export const elementEntersAndLeaves = (name, enterAnimation, leaveAnimation) => {
  return trigger(name, [
    transition(':enter', [ enterAnimation ], { params: { delay: '0ms' } }),
    transition(':leave', [ leaveAnimation ], { params: { delay: '0ms' } })
  ])
}
