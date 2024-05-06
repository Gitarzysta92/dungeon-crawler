import { Component, Input, OnInit } from '@angular/core';
import { IPlainAssetDefinition } from 'src/app/infrastructure/asset-loader/api';

@Component({
  selector: 'hero-avatar-frame',
  templateUrl: './hero-avatar-frame.component.html',
  styleUrls: ['./hero-avatar-frame.component.scss']
})
export class HeroAvatarFrameComponent implements OnInit {

  @Input() assetDeclaration: IPlainAssetDefinition;

  constructor() { }

  ngOnInit(): void { }

}
