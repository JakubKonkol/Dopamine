import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService{
  constructor( private auth: Auth) {

  }
  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((userCredential) => {
        let uid = userCredential.user?.uid;
        localStorage.setItem('user_uid', uid);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((userCredential) => {
        let uid = userCredential.user?.uid;
        localStorage.setItem('user_uid', uid);
      })
    );
  }
  logout(): Observable<any>{
    return from(this.auth.signOut());
  }
  getCurrentUserUID(): string{
    if(this.auth.currentUser == null) return 'undefined';
    return this.auth.currentUser.uid;
  }

  IsLoggedIn$(): Observable<boolean>{
    if(this.auth.currentUser == null) return new Observable<boolean>(observer => {  observer.next(false);});
    return new Observable<boolean>(observer => {  observer.next(true);});
  }

}
