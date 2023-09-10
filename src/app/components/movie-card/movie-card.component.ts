import {Component, Input} from '@angular/core';
import {Movie} from "../../model/Movie";
type ItemType = 'movie' | 'tv';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() type!: ItemType;
}
