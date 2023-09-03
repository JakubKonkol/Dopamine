import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../model/Movie";
import {MovieService} from "../../service/MovieService";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../tools/toastConfig";
import {CastMember} from "../../model/CastMember";
import {WatchProvider} from "../../model/WatchProvider";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{
  movieId!: number;
  movie!: Movie;
  movieCast!: CastMember[];
  filteredCast!: CastMember[];
  watchProviders!: WatchProvider[];
  isWatchProvider:boolean = false;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private toast: HotToastService){}

  async ngOnInit(): Promise<void> {
    this.movieId = this.route.snapshot.params['id'];
    try{
      this.movie = await this.movieService.getMovieById(this.movieId);
      this.movieCast = await this.movieService.getMovieCast(this.movieId);
      this.filteredCast = await this.filterCast(this.movieCast);
      this.watchProviders = await this.movieService.getWatchProviders(this.movieId);
    } catch(error){
      console.error('Error fetching movie data:', error);
    }
    if (this.watchProviders){
      this.isWatchProvider = true;
    }
  }
  getProviderLogo(provider: WatchProvider): string{
    return "https://image.tmdb.org/t/p/w500" + provider.logo_path;
  }
  getActorImage(actor: CastMember): string{
    return "https://image.tmdb.org/t/p/w500" + actor.profile_path;
  }
  async filterCast(cast: CastMember[]): Promise<CastMember[]>{
    let processedCast: CastMember[] = [];
    cast = cast.sort((a, b) => (a.order > b.order) ? 1 : -1);
    processedCast = cast.filter((item, index) => index < 10);
    return processedCast;
  }
  filterDate(date: string): string{
    return date.split('-')[0];
  }
  roundRating(rating: number): number{
    return Math.round(rating * 10) / 10;
  }
  formatDateToLocale(date: string): string{
    return new Date(date).toLocaleDateString();
  }
  roundToMillion(number: number): string{
    if(number > 1000000000){
      return (number / 1000000000).toFixed(1)+' B';
    }
    return (number / 1000000).toFixed(1)+' M';
  }
  test() {
    this.toast.success('Added!',
      toastConfig)
  }
}
