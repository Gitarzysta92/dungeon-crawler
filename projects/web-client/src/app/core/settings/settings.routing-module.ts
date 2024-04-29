import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Settings } from "./settings.routing";
import { SettingsViewComponent } from "./components/settings-view/settings-view.component";

@NgModule({
  imports: [RouterModule.forChild(Settings.routes.bindComponents({
    settings: SettingsViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
