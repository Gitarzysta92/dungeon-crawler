import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { MyProfileSharedModule } from "../my-profile/my-profile.shared-module";
import { AdventureRoutingModule } from "./adventure.routing-module";
import { AdventureViewComponent } from "./components/adventure-view/adventure-view.component";
import { HallViewComponent } from './components/hall-view/hall-view.component';

@NgModule({
  declarations: [
    AdventureViewComponent,
    HallViewComponent
  ],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    AdventureRoutingModule
  ]
})
export class AdventureModule { }