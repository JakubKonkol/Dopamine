import {Injectable} from "@angular/core";
import {doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {User} from "../model/User";
import {from, Observable, of, switchMap} from "rxjs";
import {FirebaseService} from "./FirebaseService";

@Injectable(
  {providedIn: 'root'}
)
export class UserService{
  get currentUserProfile$(): Observable<User | null> {
    return this.firebaseService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          console.log('could not add user')
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    );
  }
  constructor(private firestore: Firestore, private firebaseService: FirebaseService) {}

  addUser(user: User){
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }
  updateUser(user: User){
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user}));
  }
}
