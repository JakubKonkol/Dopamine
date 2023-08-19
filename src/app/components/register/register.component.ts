import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/AuthService";
import {Validators} from "../../../tools/Validators";

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

  constructor(private authService: AuthService) {

  }

  createUser(){
    if(this.password !== this.password2) throw new Error('Passwords do not match');
    if(!Validators.validatePassword(this.password)) throw new Error('Password must be at least 6 characters long');
    if(!Validators.validateUsername(this.username)) throw new Error('Username must be at least 4 characters long');
    if(!Validators.validateEmail(this.email)) throw new Error('Email must be valid');
    console.log('Creating user: ', this.username, this.email, this.password);
    this.authService.createUser(this.username, this.email, this.password);
  }

  ngOnInit(): void {

  }

}
