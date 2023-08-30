import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Movie} from "../../../model/Movie";
import {Router} from "@angular/router";

type Size = 'small' | 'medium' | 'large';
@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
export class DashboardSectionComponent implements OnInit{
  @Input() title!: string;
  @Input() iterableMovies!: Movie[]
  @Input() size: Size = 'small';
  constructor(private r: Router, private el: ElementRef) {
  }
  ngOnInit() {
    const element = this.el.nativeElement.querySelector('.movie-container');
    switch(this.size) {
      case 'small':
        element.style.height = '25rem';
        break;
      case 'medium':
        element.style.height = '50rem';
        break;
      case 'large':
        element.style.height = '100rem';

    }
  }
  gotoMovie(id: number) {
    this.r.navigate(['/movie', id]).then();
  }

}
