import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieService } from "./service/MovieService";
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieViewComponent } from './components/movie-view/movie-view.component';
import {FormsModule} from "@angular/forms";
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import {NgOptimizedImage} from "@angular/common";
import {HotToastModule} from "@ngneat/hot-toast";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import {UserService} from "./service/UserService";
import { MovieCarouselComponent } from './components/movie-carousel/movie-carousel.component';
import {PersonService} from "./service/PersonService";
import { PersonsViewComponent } from './components/persons-view/persons-view.component';
import { NewNavComponent } from './components/new-nav/new-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    MovieViewComponent,
    MoviePageComponent,
    DashboardSectionComponent,
    SearchBarComponent,
    SearchPageComponent,
    MovieCarouselComponent,
    PersonsViewComponent,
    NewNavComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgOptimizedImage,
        HotToastModule.forRoot()
    ],
  providers: [
      MovieService,
      UserService,
      PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
