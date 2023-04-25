import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AboutComponent} from "./about/about.component";
import {UploadComponent} from "./upload/upload.component";
import {FoundersComponent} from "./founders/founders.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'home', component: MainComponent
  },
  {
    path: 'upload', component: UploadComponent
  }, {path: 'contact', component: FoundersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
