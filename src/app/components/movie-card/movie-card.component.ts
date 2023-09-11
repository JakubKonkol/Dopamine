import {Component, Input} from '@angular/core';
import {Movie} from "../../model/Movie";
import {TVSeries} from "../../model/TVSeries";
type ItemType = 'movie' | 'tv';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() serie!: TVSeries;
  @Input() type!: ItemType;
  getSeriePosterUrl(): string {
    return 'https://image.tmdb.org/t/p/w500' + this.serie.poster_path;
  }
}
