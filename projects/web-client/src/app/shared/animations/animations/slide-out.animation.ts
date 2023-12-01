import { animate, animation, AnimationReferenceMetadata, stagger, style } from "@angular/animations";
import { EASING } from "../constants/animations-constants";
import { TO_DIRECTION } from "../constants/to-direction";


export type SlideOutDirectionType = keyof typeof TO_DIRECTION;
type SlideOutAnimation = (type: SlideOutDirectionType, isStagger?: boolean) => AnimationReferenceMetadata

// interval -> 60ms
// animation duration -> 200ms
export const slideOutAnimation: SlideOutAnimation = (type, isStagger = false) => {
  const initial = style({ 
    opacity: '1', 
    transform: 'translate(0, 0)'
  });

  const final = animate(`{{ duration }} {{delay}} ${EASING.inOut}`, 
    style({ opacity: '0', transform: TO_DIRECTION[type]})
  )

  return animation([
    initial,
    isStagger ? stagger('60ms', final) : final
  ])
};

