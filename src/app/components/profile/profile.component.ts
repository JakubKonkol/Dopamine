import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/UserService";
import {IUser} from "../../model/IUser";
import {AuthService} from "../../service/AuthService";
import {MovieService} from "../../service/MovieService";
import {Movie} from "../../model/Movie";
import {TVSeries} from "../../model/TVSeries";
import {TVSeriesService} from "../../service/TVSeriesService";
import {HotToastService} from "@ngneat/hot-toast";
import {Playlist} from "../../model/Playlist";

type ChipState = 'All' | 'Playlists' | 'Movie history' | 'TV Series history';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private router: Router,
              private userService:UserService,
              private authService: AuthService,
              private movieService: MovieService,
              private tvSeriesService: TVSeriesService,
              private toast: HotToastService
  ) {}
  chipState: ChipState = 'Movie history';
  currentUser!: IUser;
  userWatchTime!: number;
  userMoviesWatched!: number;
  favGenre!: string;
  userMoviesHistory: Movie[] = [];
  userSeriesHistory: TVSeries[] = [];
  userPlaylists: Playlist[] = [];
  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('userUID') == null) {
      this.router.navigate(['login']).then();
    }
     this.userService.getCurrentUser$().subscribe(async value => {
       if (value == null) {
         localStorage.removeItem('userUID');
         this.router.navigate(['login']).then();
         return;
       }
       this.currentUser = value;
       this.userWatchTime = await this.getUserWatchTime();
       this.userMoviesWatched = this.currentUser.movieHistory?.length ?? 0;
       this.favGenre = await this.getFavGenre();
       this.userPlaylists = this.getUserPlaylists();
       this.userMoviesHistory = await this.getMovieHistoryAsArrayOfObjects();
       this.userSeriesHistory = await this.getSeriesHistoryAsArrayOfObjects();

     })

  }
  gotoPlaylist(playlist: Playlist){
    this.router.navigate(['playlist', playlist.id]).then();
  }
  deletePlaylist(playlist: Playlist){
   this.currentUser.playlists?.forEach((value, index) => {
     if(value.name == playlist.name){
       this.currentUser.playlists?.splice(index, 1);
     }
   })
    this.userService.updateUser(this.currentUser).then(r => {
      this.toast.success('Playlist Removed!');
    })
  }
  getUserPlaylists(){
    return this.currentUser.playlists ?? [];
  }
  gotoDetails(id: number, type: string){
    if (type == 'movie') {
      this.router.navigate(['movie', id]).then();
    } else {
      this.router.navigate(['series', id]).then();
    }
  }
  removeSeriesFromHistory(seriesId: number){
    console.log(seriesId)
   this.currentUser.seriesHistory?.forEach((value, index) => {
      if(value == seriesId){
        this.currentUser.seriesHistory?.splice(index, 1);
      }
   })
    this.userService.updateUser(this.currentUser).then(r => {
      this.toast.success('Removed!');
    });
  }
  removeMovieFromHistory(movieId: number){
    console.log(movieId)
    this.currentUser.movieHistory?.forEach((value, index) => {
      if(value == movieId){
        this.currentUser.movieHistory?.splice(index, 1);
      }
    })
    this.userService.updateUser(this.currentUser).then(r => {
      this.toast.success('Removed!');
    });
  }
  async getMovieHistoryAsArrayOfObjects(): Promise<Movie[]>{
    if(this.currentUser.movieHistory == null) return [];
    let movieHistory: Movie[] = [];
    for(let movieId of this.currentUser.movieHistory){
      await this.movieService.getMovieById(movieId).then(value => {
        movieHistory.push(value);
      })
    }
    return movieHistory;
  }
  async getSeriesHistoryAsArrayOfObjects(): Promise<TVSeries[]>{
    if(this.currentUser.seriesHistory == null) return [];
    let seriesHistory: TVSeries[] = [];
    for(let seriesId of this.currentUser.seriesHistory){
      await this.tvSeriesService.getSeriesById(seriesId).then(value => {
        seriesHistory.push(value);
      })
    }
    return seriesHistory;
  }
  async getFavGenre(): Promise<string> {
    if (!this.currentUser || !this.currentUser.movieHistory) return '';
    const genreCountMap = new Map<string, number>();

    for (const value of this.currentUser.movieHistory) {
      try {
        const movie = await this.movieService.getMovieById(value);
        if (movie.genres && movie.genres.length > 0) {
          const firstGenre = movie.genres[0].name;
          if (genreCountMap.has(firstGenre)) {
            genreCountMap.set(firstGenre, genreCountMap.get(firstGenre)! + 1);
          } else {
            genreCountMap.set(firstGenre, 1);
          }
        }
      } catch (error) {
        console.log('Error at getFavGenre() in profile.component.ts', error);
      }
    }
    let favGenre = '';
    let maxCount = 0;
    for (const [genre, count] of genreCountMap.entries()) {
      if (count > maxCount) {
        maxCount = count;
        favGenre = genre;
      }
    }
    return favGenre;
  }

  async getUserWatchTime(): Promise<number> {
    if (!this.currentUser || !this.currentUser.movieHistory ) return 0;
    let watchTime = 0;

    for (const value of this.currentUser.movieHistory) {
      try {
        const movie = await this.movieService.getMovieById(value);
        watchTime += movie.runtime;
      } catch (error) {
        console.log('Error at getUserWatchTime() in profile.component.ts', error);
      }
    }

    return (watchTime/60).toFixed(1) as unknown as number;
  }
  getUserSeriesWatched(){
    return this.currentUser.seriesHistory?.length ?? 0;
  }


  logout() {
    this.authService.logout();
  }

  isChipActive(all: string) {
    if(this.chipState == all){
      return 'chip active';
    }
    return 'chip';
  }
  setChipState(state: ChipState) {
    this.chipState = state;
  }
}
