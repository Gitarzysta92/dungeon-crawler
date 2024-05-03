import { NgModule } from "@angular/core";
import { IconsModule } from "../icons/icons.module";
import { AppLogoComponent } from "./components/app-logo/app-logo.component";
import { CircleSpinnerComponent } from "./components/circle-spinner/circle-spinner.component";
import { CircleComponent } from "./components/circle/circle.component";
import { HexagonComponent } from "./components/hexagon/hexagon.component";
import { HoverDirective } from "./directives/hover/hover.directive";
import { OutsideClickDirective } from "./directives/outside-click/outside-click.directive";
import { ShardComponent } from './components/shard/shard.component';
import { SocialsComponent } from './components/socials/socials.component';

@NgModule({
  declarations: [
    AppLogoComponent,
    CircleComponent,
    CircleSpinnerComponent,
    HexagonComponent,
    HoverDirective,
    OutsideClickDirective,
    ShardComponent,
    SocialsComponent
  ],
  imports: [
    IconsModule
  ],
  exports: [
    AppLogoComponent,
    CircleComponent,
    CircleSpinnerComponent,
    HexagonComponent,
    HoverDirective,
    OutsideClickDirective,
    ShardComponent
  ]
})
export class MiscModule { }
