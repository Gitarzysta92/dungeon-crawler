import { AnimationTriggerMetadata, useAnimation } from "@angular/animations";
import { fadeInAnimation } from "./animations/fade-in.animation";
import { fadeOutAnimation } from "./animations/fade-out.animation";
import { slideInAnimation, SlideInDirectionType } from "./animations/slide-in.animation";
import { slideOutAnimation, SlideOutDirectionType } from "./animations/slide-out.animation";
import { swapAnimation } from "./animations/swap.animation";
import { elementEntersAndLeaves } from "./triggers/element-enters-and-leaves.trigger";
import { elementEnters } from "./triggers/element-enters.trigger";
import { elementLeaves } from "./triggers/element-leaves.trigger";
import { elementsEnters } from "./triggers/nested-elements-enters.trigger";
import { routingNavigation } from "./triggers/routing-navigation.trigger";


export const slideInFromTopMultipleElements = name => elementsEnters(name, useAnimation(slideInAnimation('fromTop', true), { params: { duration: '200ms' } }))
export const fadeInMultipleElements = name => elementsEnters(name, useAnimation(fadeInAnimation(true), { params: { duration: '200ms' } }));
export const slideInOut = name => elementEntersAndLeaves(name, 
  useAnimation(slideInAnimation('fromTop'), { params: { duration: '200ms' }}),
  useAnimation(slideOutAnimation('toTop'), { params: { duration: '200ms' }})
)


type SlideIn = (name: string, direction?: SlideInDirectionType) => AnimationTriggerMetadata;
export const slideIn: SlideIn = (name, direction = 'fromTop') => elementEnters(name, useAnimation(slideInAnimation(direction), { params: { duration: '200ms' }}));

type SlideOut = (name: string, direction?: SlideOutDirectionType) => AnimationTriggerMetadata;
export const slideOut: SlideOut = (name, direction = 'toTop') => elementLeaves(name, useAnimation(slideOutAnimation(direction), { params: { duration: '200ms' }}));

type FadeIn = (name: string) => AnimationTriggerMetadata;
export const fadeIn: FadeIn = name => elementEnters(name, useAnimation(fadeInAnimation(), { params: { duration: '400ms' }}));

type FadeOut = (name: string) => AnimationTriggerMetadata;
export const fadeOut: FadeOut = name => elementLeaves(name, useAnimation(fadeOutAnimation(), { params: { duration: '200ms' }}));

export const swapViews = name => routingNavigation(name, useAnimation(swapAnimation()));

export const swap = name => elementsEnters(name, useAnimation(swapAnimation()));


