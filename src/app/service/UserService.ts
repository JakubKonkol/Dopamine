import {Injectable} from "@angular/core";
import {addDoc, collection, doc, Firestore, getDocs, query, setDoc, where} from "@angular/fire/firestore";
import {IUser} from "../model/IUser";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(
    private firestore: Firestore
  ) {}
    private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  async saveNewUserWithUID(uid: string) {
    let newUser: IUser = {
      uid: uid,
      username: 'test',
      email: '',
      movieHistory: [],
      watchList: []
    }
    try{
      const docRef = await addDoc(collection(this.firestore, "users"), newUser);
      await this.getUserWithUID(uid)
      console.log("Document written with ID: ", docRef.id);
    }catch (e){
      console.error("Error adding document: ", e);
    }
  }
  async getUserWithUID(uid: string) {
      try {
          const userQuery = query(collection(this.firestore, "users"), where("uid", "==", uid));
          const querySnapshot = await getDocs(userQuery);
          if(querySnapshot.empty){
              throw new Error("No user found with this UID");
          }
          const userDoc = querySnapshot.docs[0];
          console.log(userDoc.data() as IUser);
          this.currentUserSubject.next(userDoc.data() as IUser);
          return userDoc.data() as IUser;

      } catch (e) {
          console.log(e);
          return null;
      }
  }

    /**
     * This method is working but not working XXDDD
     * @param user
     */
  async updateUser(user: IUser){
      try {
          const userRef = doc(this.firestore, "users", user.uid);
          await setDoc(userRef, user, { merge: true });
          this.currentUserSubject.next(user);
          console.log("User updated successfully");
      } catch (e) {
          console.error("Error updating user: ", e);
      }
  }
  getCurrentUser$(){
      return this.currentUserSubject.asObservable();
  }

}
