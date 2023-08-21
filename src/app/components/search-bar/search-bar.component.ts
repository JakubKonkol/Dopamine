import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent{
  searchField: string = '';
  constructor(private router: Router) {
  }

  search() {
    if(this.searchField.length > 0)
      this.router.navigate(['/search', this.searchField]);
  }
}
