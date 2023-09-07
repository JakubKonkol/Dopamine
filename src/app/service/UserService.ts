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
    private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  async saveNewUserWithUID(uid: string, user: IUser) {
    return this.afs.collection('users').doc(uid).set(user).then(
      () => {
        this.currentUserSubject.next(user);
      }
    );
  }
  async getUserWithUID(uid: string) {
    return this.afs.collection('users').doc(uid).get().subscribe(value => {
      this.currentUserSubject.next(value.data() as IUser);
    })
  }
  async updateUser(user: IUser){
      return this.afs.collection('users').doc(user.uid).update(user).then(() => {
        this.currentUserSubject.next(user);
      })
  }
  getCurrentUser$(){
      return this.currentUserSubject.asObservable();
  }

}
