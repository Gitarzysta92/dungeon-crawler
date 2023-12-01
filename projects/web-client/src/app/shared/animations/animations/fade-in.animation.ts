import { animate, animation, AnimationReferenceMetadata, stagger, style } from "@angular/animations";
import { EASING } from "../constants/animations-constants";


// Params
// interval -> 60ms
// animation duration -> 200ms


type FadeInAnimation = (isStagger?: boolean) => AnimationReferenceMetadata
export const fadeInAnimation: FadeInAnimation = isStagger => {
  const initial = style({  opacity: '0' });

  const final = animate(`{{ duration }} {{ delay }} ${EASING.inOut}`, style({ opacity: '1'}));
  
  return animation([
    initial,
    isStagger ? stagger('60ms', final) : final
  ]);
}
