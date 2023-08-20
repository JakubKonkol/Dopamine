import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../../model/Movie";
import {MovieService} from "../../../service/MovieService";
import {HotToastService} from "@ngneat/hot-toast";
import {pipe} from "rxjs";
import {toastConfig} from "../../../tools/toastConfig";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{
  movieId!: number;
  movie!: Movie;
  similarMovies!: Movie[];
  constructor(private route: ActivatedRoute, private movieService: MovieService, private toast: HotToastService){}

  async ngOnInit(): Promise<void> {
    this.movieId = this.route.snapshot.params['id'];
    this.movie = await this.movieService.getMovieById(this.movieId);
    this.similarMovies = this.movieService.getSimilarMovies(this.movieId);
  }
  filterDate(date: string): string{
    return date.split('-')[0];
  }
  roundRating(rating: number): number{
    return Math.round(rating * 10) / 10;

  }

  test() {
    this.toast.success('Added!',
      toastConfig)
  }
}
