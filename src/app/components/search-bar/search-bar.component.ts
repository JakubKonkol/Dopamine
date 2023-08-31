import {Component, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent{
  searchField: string = '';
  constructor(private router: Router,
              private toast: HotToastService,
              private el: ElementRef
  ) {}

  search() {
    if(this.searchField.length < 2) {
      this.toast.warning('Search query must be at least 2 characters long', {
        duration: 1500
      });
      return;
    }
      this.router.navigate(['/search', this.searchField]).then();
  }

  toggleGlow() {
    const el = this.el.nativeElement.querySelector('.search-box');
    el.classList.toggle('glow');
  }
}
