import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {MoviePageComponent} from "./components/movie-page/movie-page.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {SearchPageComponent} from "./components/search-page/search-page.component";


const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "profile", component: ProfileComponent },
  { path: "movie/:id", component: MoviePageComponent },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent },
  {path: "search/:query", component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
