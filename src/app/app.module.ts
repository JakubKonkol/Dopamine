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
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyDcSaWWnhMhIgJ-0Zwa892JYgn7v-VVLrw",
          authDomain: "escapix-c04ab.firebaseapp.com",
          projectId: "escapix-c04ab",
          storageBucket: "escapix-c04ab.appspot.com",
          messagingSenderId: "341486087810",
          appId: "1:341486087810:web:df5c61ba114e30f5ef0e9b",
          measurementId: "G-EES6HLWYZH"
        })
    ],
  providers: [
    MovieService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
