import { Component } from '@angular/core';
import {Validators} from "../../../tools/Validators";
import {Router} from "@angular/router";
import {FirebaseService} from "../../../service/FirebaseService";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../../tools/toastConfig";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router, private toast: HotToastService) { }
  onSingIn(){
    if(!Validators.validateUsername(this.username)) throw new Error('Username must be at least 4 characters long');
    if(!Validators.validatePassword(this.password)) throw new Error('Password must be at least 6 characters long');
    this.firebaseService.login(this.username, this.password);

    this.toast.loading('Logged in! Redirecting', toastConfig)
    setTimeout(() => {
      this.router.navigate(['profile']).then();
    }, 1500);


  }

}
