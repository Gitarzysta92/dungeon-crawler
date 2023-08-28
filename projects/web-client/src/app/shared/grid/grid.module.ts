import { NgModule } from "@angular/core";
import { TileComponent } from "./components/tile/tile.component";

@NgModule({
  declarations: [
    TileComponent
  ],
  exports: [
    TileComponent
  ]
})
export class GridModule { }