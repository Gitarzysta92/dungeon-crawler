import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { IAssetDeclaration, IPlainAssetDefinition } from '../interfaces/asset-defintion';

@Directive({
  selector: 'img [assetDeclaration]'
})
export class AssetDirective implements OnInit {
  private _url: string;

  @Input()
  set assetDeclaration(asset: IPlainAssetDefinition) {
    this._url = asset.url;
    this.updateSrc();
  }

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.updateSrc();
  }

  private updateSrc(): void {
    const processedUrl = this.processUrl(this._url);
    this._renderer.setAttribute(this._el.nativeElement, 'src', processedUrl);
  }

  private processUrl(url: string): string {
    return url ? `assets/images/${url}` : '';
  }
}