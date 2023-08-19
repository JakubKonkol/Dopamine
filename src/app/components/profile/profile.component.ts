import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.router.navigate(['/login']).then();
    }


  }

}
