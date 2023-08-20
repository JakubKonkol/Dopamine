import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MovieService} from "../service/MovieService";
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieViewComponent } from './components/movie-view/movie-view.component';
import {FormsModule} from "@angular/forms";
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../service/AuthService";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../env/env";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {FirebaseService} from "../service/FirebaseService";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    MovieViewComponent,
    MoviePageComponent,
    DashboardSectionComponent,
    RegisterComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgOptimizedImage,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule
    ],
  providers: [
    MovieService,
    AuthService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
