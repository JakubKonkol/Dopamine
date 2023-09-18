import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {MoviePageComponent} from "./components/movie-page/movie-page.component";
import {SearchPageComponent} from "./components/search-page/search-page.component";
import {SeriesPageComponent} from "./components/series-page/series-page.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {PlaylistViewComponent} from "./components/playlist-view/playlist-view.component";


const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "profile", component: ProfileComponent },
  { path: "movie/:id", component: MoviePageComponent },
  {path: "tv/:id", component: SeriesPageComponent},
  {path: "search/:query", component: SearchPageComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "playlist/:playlist_id", component: PlaylistViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
