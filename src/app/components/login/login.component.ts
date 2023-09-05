import { Component } from '@angular/core';
import {AuthService} from "../../service/AuthService";
import {HotToastService} from "@ngneat/hot-toast";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {toastConfig} from "../../tools/toastConfig";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toast: HotToastService
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })
  login(){
    if (this.loginForm.invalid) {
      this.toast.error('Invalid form!', toastConfig);
      return;
    }

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(email!, password!);
  }
}
