import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MyProfileViewComponent } from "./components/my-profile-view/my-profile-view.component";
import { MyProfile } from "./my-profile.routing";

@NgModule({
  imports: [RouterModule.forChild(MyProfile.routes.bindComponents({
    me: MyProfileViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
