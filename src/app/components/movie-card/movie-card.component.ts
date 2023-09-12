import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() removeFromHistory = new EventEmitter<number>();
  @Output() gotoDetails = new EventEmitter<number>();
  getSeriePosterUrl(): string {
    return 'https://image.tmdb.org/t/p/w500' + this.serie.poster_path;
  }
  gotoDetailsEmit(){
    if (this.type == 'movie') {
      this.gotoDetails.emit(this.movie.id);
    } else {
      this.gotoDetails.emit(this.serie.id);
    }
  }
  removeFromHistoryEmit(){
    if (this.type == 'movie') {
      this.removeFromHistory.emit(this.movie.id);
    } else {
      this.removeFromHistory.emit(this.serie.id);
    }
  }
}
