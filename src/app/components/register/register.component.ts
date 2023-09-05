import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/AuthService";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../tools/toastConfig";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private toast: HotToastService
  ) {}
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  })
  register(){
    if (this.registerForm.invalid) {
      this.toast.error('Invalid form!', toastConfig);
      return;
    }

    const email = this.registerForm.get('email')!.value;
    const password = this.registerForm.get('password')!.value;
    const passwordConfirm = this.registerForm.get('passwordConfirm')!.value;

    if (password !== passwordConfirm) {
      this.toast.error('Passwords do not match!', toastConfig);
      return;
    }

    this.authService.register(email!, password!);
  }

}
