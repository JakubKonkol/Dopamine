import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/AuthService";
import {Router} from "@angular/router";
import {FirebaseService} from "../../../service/FirebaseService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebaseService.IsLoggedIn$().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']).then();
      }
    })


  }
  onLogOut(){
    this.firebaseService.logout();
    this.router.navigate(['/login']).then();
  }


  getUID() {
    return this.firebaseService.getCurrentUserUID();
  }
}
