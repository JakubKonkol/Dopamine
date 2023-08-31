import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../model/Movie";
import {MovieService} from "../../service/MovieService";
import {ImageFilter} from "../../tools/ImageFilter";


@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit{
  shouldRenderData: boolean = false;
  movie!: Movie;
  backdrop: string = ''
  trendingMovies: Movie[] = [];
  trendingMoviesIDs: number[]  = [];
  constructor(private movieService: MovieService) {}

  async ngOnInit(): Promise<void> {
    this.trendingMovies =  await this.movieService.getTrendingMovies();
    this.extractMovieIDs();
    this.movie = await this.movieService.getMovieById(this.getRandomMovieID());
    await this.getBackdrop(this.movie.id)
    if(this.movie){
      this.shouldRenderData = true;
    }
  }
  async getBackdrop(movieID: number): Promise<void> {
    let results = await this.movieService.getMovieImages(movieID);
    this.backdrop = ImageFilter.getBestBackdrop(results);
  }
  extractMovieIDs(){
    for(let movie in this.trendingMovies){
      this.trendingMoviesIDs.push(this.trendingMovies[movie].id);
    }
  }
  getRandomMovieID(): number{
    return this.trendingMoviesIDs[Math.floor(Math.random() * this.trendingMoviesIDs.length)];
  }



}
