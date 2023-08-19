import {Injectable} from "@angular/core";
import {User} from "../model/User";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService{
  isLoggedIn: boolean = false;

  createUser(){
    this.isLoggedIn = true;
    let user = new User();


  }

}
