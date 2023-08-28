import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomViewTemplateComponent } from './components/custom-view/custom-view-template.component';
import { MainViewTemplateComponent } from './components/main-view-template/main-view-template.component';

@NgModule({
  declarations: [
    MainViewTemplateComponent,
    CustomViewTemplateComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
  ],
  exports: [
    MainViewTemplateComponent,
    CustomViewTemplateComponent
  ]
})
export class ViewTemplatesModule { }