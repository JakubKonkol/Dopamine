import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "../../service/UserService";
import {Router} from "@angular/router";
import {AuthService} from "../../service/AuthService";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit{
  constructor(
    private userService: UserService,
    private el: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {}
  userLoggedIn: boolean = false;

  ngOnInit(): void {
    if(this.userService.getCurrentUser$() == null || localStorage.getItem('userUID') == null){
      this.userLoggedIn = false;
    }
    this.userService.getCurrentUser$().subscribe(user => {
      if(user){
        this.userLoggedIn = true;
      }
    })
  }


  toggleDropdown() {
    this.el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show');
  }
  goto(url: string){
    this.router.navigate([url]).then();
    this.toggleDropdown();
  }
  logout(){
    this.toggleDropdown();
    this.authService.logout();
  }

}
