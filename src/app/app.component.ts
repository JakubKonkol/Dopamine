import {Component, OnInit} from '@angular/core';
import tmdb from "../api/tmdb";
import {MovieService} from "../service/MovieService";
import {Movie} from "../model/Movie";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Escapix';
  popularMovies: Movie[] = [];

  constructor(private movieService: MovieService) {

  }
  ngOnInit(): void {
    this.popularMovies = this.movieService.getPopularMovies();
    this.movieService.getMovieById(550).then((response) => {
      console.log(response);
    })
  }
  getMovieImage(movie: Movie): string{
    return "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  }
}
