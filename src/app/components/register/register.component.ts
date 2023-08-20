import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/AuthService";
import {Validators} from "../../../tools/Validators";
import {FirebaseService} from "../../../service/FirebaseService";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import {environment} from "../../../env/env";
import {getFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  username: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router){

  }

  onRegister(){
    if(this.password !== this.password2) throw new Error('Passwords do not match');
    if(!Validators.validatePassword(this.password)) throw new Error('Password must be at least 6 characters long');
    if(!Validators.validateUsername(this.username)) throw new Error('Username must be at least 4 characters long');
    if(!Validators.validateEmail(this.email)) throw new Error('Email must be valid');

  }

  ngOnInit(): void {

  }

}
