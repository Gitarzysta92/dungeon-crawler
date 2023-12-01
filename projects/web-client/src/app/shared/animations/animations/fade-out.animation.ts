import { animate, animation, AnimationReferenceMetadata, stagger, style } from "@angular/animations";
import { EASING } from "../constants/animations-constants";



// Params
// interval -> 60ms
// animation duration -> 200ms
type FadeOutAnimation = (isStagger?: boolean) => AnimationReferenceMetadata
export const fadeOutAnimation: FadeOutAnimation = isStagger => {
  const initial = style({  opacity: '1' });

  const final = animate(`{{ duration }} {{ delay }} ${EASING.inOut}`, style({ opacity: '0'}));
  
  return animation([
    initial,
    isStagger ? stagger('60ms', final) : final
  ]);
}

