import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetDirective } from './directives/asset.directive';

@NgModule({
  declarations: [
    AssetDirective
  ],
  imports: [
    RouterModule,
    SharedModule,
  ],
  exports: [
    AssetDirective
  ]
})
export class AssetsLoaderModule { }