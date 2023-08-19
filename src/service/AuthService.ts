import {Injectable} from "@angular/core";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService{
  isLoggedIn: boolean = false;

  createUser(username: string, email: string, password: string) {

  }
}
