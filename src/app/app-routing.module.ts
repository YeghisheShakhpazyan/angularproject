import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {InterventionComponent} from "./intervention/intervention.component";
import {ErrorPageComponent} from "./error-page/error-page.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "intervention/:id", component: InterventionComponent},
  {path: "error", component: ErrorPageComponent},
  {path: "**", redirectTo: "/error"}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
