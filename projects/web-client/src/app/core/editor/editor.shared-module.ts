import { NgModule } from "@angular/core";
import { EditorViewComponent } from "./components/editor-view/editor-view.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    EditorViewComponent
  ],
  imports: [
    SharedModule,
    FormsModule 
  ],
  exports: [
    EditorViewComponent,
  ],
  providers: [

  ]
})
export class EditorSharedModule { }