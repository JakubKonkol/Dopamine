import {Component, Input} from '@angular/core';
import {Movie} from "../../../model/Movie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
export class DashboardSectionComponent {
  @Input() title!: string;
  @Input() iterableMovies!: Movie[]
  constructor(private r: Router) {
  }
  gotoMovie(id: number) {
    this.r.navigate(['/movie', id]).then();
  }
}
