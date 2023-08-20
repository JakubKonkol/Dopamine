import { Component } from '@angular/core';
import {Validators} from "../../../tools/Validators";
import {Router} from "@angular/router";
import {FirebaseService} from "../../../service/FirebaseService";
import {AuthService} from "../../../service/AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  alertMessage: string = '';

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router) { }
  onSingIn(){
    if(!Validators.validateUsername(this.username)) throw new Error('Username must be at least 4 characters long');
    if(!Validators.validatePassword(this.password)) throw new Error('Password must be at least 6 characters long');
    this.firebaseService.signIn(this.username, this.password).then(r =>
      console.log("User logged in")).catch(error => alert(error)
     );


    this.router.navigate(['profile']).then();

  }

}
