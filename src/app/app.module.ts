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
import {environment} from "../env/env";
import {FirebaseService} from "../service/FirebaseService";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {provideFirebaseApp} from "@angular/fire/app";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import {getStorage, provideStorage} from "@angular/fire/storage";
import {HotToastModule} from "@ngneat/hot-toast";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

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
    LoginComponent,
    SearchBarComponent,
    SearchPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgOptimizedImage,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        HotToastModule.forRoot()
    ],
  providers: [
    MovieService,
    AuthService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
