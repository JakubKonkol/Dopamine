import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieService } from "./service/MovieService";
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieViewComponent } from './components/movie-view/movie-view.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { FeaturedComponent } from './components/featured/featured.component';
import {TVSeriesService} from "./service/TVSeriesService";
import { SeriesPageComponent } from './components/series-page/series-page.component';
import {environment} from "./environments/environment";
import {AuthService} from "./service/AuthService";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

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
    NewNavComponent,
    FeaturedComponent,
    SeriesPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
      MovieService,
      UserService,
      PersonService,
      TVSeriesService,
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
