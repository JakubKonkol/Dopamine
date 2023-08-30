import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-nav',
  templateUrl: './new-nav.component.html',
  styleUrls: ['./new-nav.component.css']
})
export class NewNavComponent {
    constructor(private router: Router) {
    }

    goto(url: string){
        this.router.navigate([url]);}
}
