import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/AuthService";
import {Validators} from "../../../tools/Validators";
import {FirebaseService} from "../../../service/FirebaseService";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
    console.log('Creating user: ', this.username, this.email, this.password);

    this.firebaseService.signUp(this.email, this.password).then(r =>
      console.log("User created")
    );
    this.authService.createUser();
    this.router.navigate(['profile']).then();
  }

  ngOnInit(): void {

  }

}
