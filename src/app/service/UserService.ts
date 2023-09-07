import {Injectable} from "@angular/core";
import {IUser} from "../model/IUser";
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(
    private afs: AngularFirestore
  ) {}
  async saveNewUserWithUID(uid: string, user: IUser) {
    return this.afs.collection('users').doc(uid).set(user);
  }
  async getUserWithUID(uid: string) {
    return this.afs.collection('users').doc(uid).get();
  }
  async updateUser(user: IUser){
      return this.afs.collection('users').doc(user.uid).update(user);
  }
  getCurrentUser$(){
    if(localStorage.getItem('userUID') == null){
      throw new Error('User is not logged in!');
    }
      return this.afs.collection('users').doc(localStorage.getItem('userUID')!).valueChanges() as BehaviorSubject<IUser | null>;
  }

}
