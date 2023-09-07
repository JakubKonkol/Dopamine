import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../model/Movie";
import {MovieService} from "../../service/MovieService";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../tools/toastConfig";
import {CastMember} from "../../model/helpers/CastMember";
import {WatchProvider} from "../../model/helpers/WatchProvider";
import {UserService} from "../../service/UserService";
import {IUser} from "../../model/IUser";

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
  user!: IUser;
  playlistModalOpen: boolean = false;
  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private toast: HotToastService,
              private userService: UserService
  ){}

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
    this.userService.getCurrentUser$().subscribe(value => {
      if(value == null){
        return;
      }
      this.user = value;
    })
  }
  togglePlaylistModal(){
    this.playlistModalOpen = !this.playlistModalOpen;
  }
  markAsWatched(){
    this.user.movieHistory?.push(this.movieId);
    this.userService.updateUser(this.user).then(() => {
        this.toast.success('Added!',
          toastConfig)
      }
    );
  }
  removeFromHistory(){
    this.user.movieHistory?.splice(this.user.movieHistory.indexOf(this.movieId), 1);
    this.userService.updateUser(this.user).then(
      () => this.toast.success('Removed!',
        toastConfig)
    );
  }
  movieAlreadyInHistory(){
    return this.user.movieHistory?.includes(this.movieId);
  }
  movieAlreadyInWatchList() {
    return this.user.movieWatchList?.includes(this.movieId);
  }

  async addToWatchList(){
    this.user.movieWatchList?.push(this.movieId);
    await this.userService.updateUser(this.user);
    this.toast.success('Added!',
      toastConfig)
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
  removeFromWatchlist() {
    this.user.movieWatchList?.splice(this.user.movieWatchList.indexOf(this.movieId), 1);
    this.userService.updateUser(this.user).then(
      () => this.toast.success('Removed!',
        toastConfig)
    );
  }
}
