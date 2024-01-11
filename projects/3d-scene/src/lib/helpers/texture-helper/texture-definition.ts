import { Vector2 } from "three";

export interface ITextureDefinition {
  url: string;
  wrap?: 'repeatWrapping' | 'clampToEdgeWrapping' | 'mirroredRepeatWrapping';
  repeat?: Vector2;
  offset?: Vector2;
}
