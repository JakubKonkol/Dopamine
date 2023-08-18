import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../../model/Movie";
import {MovieService} from "../../../service/MovieService";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{
  movieId!: number;
  movie!: Movie;
  constructor(private route: ActivatedRoute, private movieService: MovieService){}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.movieId = Number(params.get('movie_id'));
    })

    if (this.movieId) {
      this.movie = await this.movieService.getMovieById(Number(this.movieId)).catch(err => {
        console.log(err);
        return {} as Movie;
      });
    }
  }

}
