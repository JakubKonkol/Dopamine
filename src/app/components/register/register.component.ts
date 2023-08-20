import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/AuthService";
import {Validators} from "../../../tools/Validators";
import {FirebaseService} from "../../../service/FirebaseService";
import {Router} from "@angular/router";
import {switchMap} from "rxjs";
import {UserService} from "../../../service/UserService";
import firebase from "firebase/compat";
import {User} from "../../../model/User";

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

  constructor( private firebaseService: FirebaseService, private router: Router, private userService: UserService){

  }

  onRegister(){
    if(this.password !== this.password2) throw new Error('Passwords do not match');
    if(!Validators.validatePassword(this.password)) throw new Error('Password must be at least 6 characters long');
    if(!Validators.validateUsername(this.username)) throw new Error('Username must be at least 4 characters long');
    if(!Validators.validateEmail(this.email)) throw new Error('Email must be valid');

    this.firebaseService.signUp(this.email, this.password).pipe(
      switchMap(({ user: { uid } }) =>
        this.userService.addUser(this.createNewUser())
      ),
    );

  }

  ngOnInit(): void {

  }
  createNewUser(){
    let usr = new User()
    usr.username = this.username;
    usr.email = this.email;
    usr.password = this.password;
    return usr;
  }

}
