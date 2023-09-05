import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../tools/toastConfig";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private toast: HotToastService
  ) {}
  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() =>{
      localStorage.setItem('user', 'true');
      this.toast.success('Logged in successfully!', toastConfig)
      this.router.navigate(['']).then();
    }, err => {
      this.toast.error(err.message, {
        duration: 3500
      });
    })
  }
  register(email: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() =>{
      localStorage.setItem('user', 'true');
      this.toast.success('Registered successfully!', toastConfig)
      this.router.navigate(['']).then();
    }, err => {
      this.toast.error(err.message, {
        duration: 3500
      });
    })
  }
  logout(){
    this.fireAuth.signOut().then(() =>{
      localStorage.removeItem('user');
      //navigate
    })
  }

}
