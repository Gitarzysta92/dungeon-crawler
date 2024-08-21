import { Component, Input, OnInit } from '@angular/core';
import { IAssetDeclaration } from 'src/app/infrastructure/asset-loader/api';


@Component({
  selector: 'hero-portrait',
  templateUrl: './hero-portrait.component.html',
  styleUrls: ['./hero-portrait.component.scss']
})
export class HeroPortraitComponent implements OnInit {

  @Input() portrait: IAssetDeclaration;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
