import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { TranslateComponent } from './modules/translate/translate.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'translate', component:TranslateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
