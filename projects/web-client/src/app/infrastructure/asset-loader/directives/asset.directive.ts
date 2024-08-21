import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';
import { IAssetDeclaration } from '../interfaces/asset-declaration';
import { AssetType } from 'src/app/core/game-ui/constants/asset-type';
import { AssetLoaderService } from '../services/asset-loader.service';
import { ConfigurationService } from '../../configuration/api';

@Directive({
  selector: 'img [assetDeclaration]'
})
export class AssetDirective implements OnChanges {

  @Input() assetDeclaration: IAssetDeclaration;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _assetLoaderService: AssetLoaderService,
    private readonly _configurationService: ConfigurationService
  ) { }

  ngOnChanges(): void {
    this.updateSrc();
  }

  private updateSrc(): void {
    if (!this.assetDeclaration) {
      throw new Error("Asset declaration not provided");
    }
   
    this._renderer.setAttribute(this._el.nativeElement, 'src', this._assetLoaderService.buildUrl(this.assetDeclaration));
    this._renderer.setStyle(this._el.nativeElement, 'pointer-events', 'none');
  }
}