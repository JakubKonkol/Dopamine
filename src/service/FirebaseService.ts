import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "./AuthService";
import {getFirestore} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})

export class FirebaseService{
  isLoggedIn: boolean = false;
  db = getFirestore();
  constructor(public firebaseAuth: AngularFireAuth, private authService: AuthService) {

  }
  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
      this.initializeUser();
  }
  async signUp(email: string, password: string, username: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    this.initializeUser();
  }
  logOut(){
    this.firebaseAuth.signOut()
      .then(res => {
        this.isLoggedIn = false;
        localStorage.removeItem('user');
      });
  }
  initializeUser(){

  }

}
