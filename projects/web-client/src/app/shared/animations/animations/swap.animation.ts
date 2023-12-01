import { animate, animateChild, animation, AnimationReferenceMetadata, group, query, sequence, stagger, style } from "@angular/animations";
import { EASING } from "../constants/animations-constants";


export const swapAnimation = () => {
  return animation([
    style({ position: 'relative' }),
    group([
      query(':enter', [
        style({ 
          transform: 'translate(0, -40px)',
          opacity: 0,
          position: 'absolute',
        }),
      ], { optional: true }),
      query(':leave', [
        style({ 
          transform: 'translate(0, 0)',
          position: 'absolute',
          opacity: 1
        }),
        query('@*', animateChild(), { optional: true })
      ], { optional: true }),
    ]),
    
    group([
      query(':leave', [
        animate('200ms ease-out', style({ transform: 'translate(0, 40px)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        sequence([
          animate('200ms 200ms ease-in-out', style({ transform: 'translate(0, 0)', opacity: 1 })),
          query('@*', animateChild(), { optional: true })
        ])  
      ], { optional: true })
    ])
  ])
};