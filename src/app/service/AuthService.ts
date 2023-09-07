import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../tools/toastConfig";
import {UserService} from "./UserService";
import {IUser} from "../model/IUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private toast: HotToastService,
    private userService: UserService
  ) {}
  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then(async () => {
        let userUID = await this.fireAuth.currentUser.then(value => value?.uid);
        localStorage.setItem('userUID', userUID!);
        this.toast.success('Logged in successfully!', toastConfig)
        await this.userService.getUserWithUID(userUID!);
        this.router.navigate(['']).then();
    }, err => {
      this.toast.error(err.message, {
        duration: 3500
      });
    })
  }
  register(email: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(async () => {
        let userUID = await this.fireAuth.currentUser.then(value => value?.uid);
        localStorage.setItem('userUID', userUID!);
        this.toast.success('Registered successfully!', toastConfig)
        let user: IUser = {
          uid: userUID!,
          username: email,
          email: email,
          movieHistory: [],
          movieWatchList: [],
          seriesHistory: [],
          seriesWatchList: [],
          playlists: []
        }
        await this.userService.saveNewUserWithUID(userUID!, user);
        this.router.navigate(['']).then();
    }, err => {
      this.toast.error(err.message, {
        duration: 3500
      });
    })
  }
  logout(){
    this.fireAuth.signOut().then(() =>{
      localStorage.removeItem('userUID');
      this.router.navigate(['login']).then()
    })
  }


}
