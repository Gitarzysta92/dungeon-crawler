import { ClampToEdgeWrapping, MirroredRepeatWrapping, RepeatWrapping, Texture, TextureLoader, Vector2, Wrapping } from "three";
import { Renderer } from "../internals/rendering/renderer";
import { ITextureDefinition } from "./interfaces/texture-definition";

export class TextureHelper {

  constructor(
    private readonly _renderer: Renderer,
    private readonly _textureLoader: TextureLoader,
  ) { }

  public async preloadTexture(textureDeclaration: ITextureDefinition): Promise<Texture> {
    const texture = await this._textureLoader.loadAsync(textureDeclaration.url);
    texture.wrapS = this._getWrapping(textureDeclaration.wrap);
    texture.wrapT = this._getWrapping(textureDeclaration.wrap);

    if (textureDeclaration.repeat) {
      texture.repeat = this._getVector(textureDeclaration.repeat);
    }

    if (textureDeclaration.offset) {
      texture.offset = this._getVector(textureDeclaration.offset);
    }

    this._renderer.webGlRenderer.initTexture(texture);
    return texture;
  }

  private _getWrapping(wrap: string | undefined): Wrapping {
    if (wrap === 'mirroredRepeatWrapping') {
      return MirroredRepeatWrapping;
    } else if (wrap === 'clampToEdgeWrapping') {
      return ClampToEdgeWrapping;
    } else {
      return RepeatWrapping;
    }
  }

  private _getVector(v: Vector2 | [number, number]): Vector2 {
    if (Array.isArray(v)) {
      return new Vector2(v[0], v[1]);
    } else {
      return v;
    }
  }
}