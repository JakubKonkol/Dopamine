import {Component, Input} from '@angular/core';
import {Movie} from "../../model/Movie";

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent {

  @Input() movie!: Movie;

}
