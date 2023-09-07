import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/UserService";
import {IUser} from "../../model/IUser";
import {AuthService} from "../../service/AuthService";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private router: Router,
              private userService:UserService,
              private authService: AuthService,
  ) {}

  currentUser!: IUser;
  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('userUID') == null) {
      this.router.navigate(['login']).then();
    }
     this.userService.getCurrentUser$().subscribe(value => {
      if(value == null){
        localStorage.removeItem('userUID');
        this.router.navigate(['login']).then();
        return;
      }
      this.currentUser = value;
    })

  }
  logout() {
    this.authService.logout();
  }
}
