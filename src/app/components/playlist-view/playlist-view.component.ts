import {Component, OnInit} from '@angular/core';
import {IUser} from "../../model/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/UserService";
import {Playlist} from "../../model/Playlist";
import {MovieService} from "../../service/MovieService";
import {Movie} from "../../model/Movie";
import {TVSeriesService} from "../../service/TVSeriesService";
import {TVSeries} from "../../model/TVSeries";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit {
  playlistId!: number;
  user!: IUser;
  activePlaylist!: Playlist;
  movies: Movie[] = [];
  tvSeries: TVSeries[] = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService,
    private tvSeriesService: TVSeriesService,
    private router: Router,
    private toastService: HotToastService

  ) {
  }
  ngOnInit(): void {
    this.playlistId = this.route.snapshot.params['playlist_id'];
    this.userService.getCurrentUser$().subscribe(value => {
      if(value == null){
        return;
      }
      this.user = value;
      this.getPlaylist();
      this.getMoviesFromPlaylist();
      this.getSeriesFromPlaylist()
    })

    }
  getPlaylist(){
    this.user.playlists?.forEach((value, index) => {
      if (value.id == this.playlistId){
        this.activePlaylist = value;
      }
    })
  }
  getMoviesFromPlaylist(){
    if(this.activePlaylist==null || this.activePlaylist.movies == null){
      return
    }
    let movies: Movie[] = [];
    this.activePlaylist.movies.forEach((value, index) => {
      this.movieService.getMovieById(value).then(movie => {
        movies.push(movie);
      })
    })
    this.movies = movies;
  }
  getSeriesFromPlaylist(){
    if(this.activePlaylist==null || this.activePlaylist.series == null){
      return
    }
    let tvSeries: TVSeries[] = [];
    this.activePlaylist.series.forEach((value, index) => {
      this.tvSeriesService.getSeriesById(value).then(tv => {
        tvSeries.push(tv);
      })
    })
    this.tvSeries = tvSeries;
  }
  deleteMovieFromPlaylist(movie: Movie) {
    this.activePlaylist.movies?.forEach((value, index) => {
      if (value == movie.id){
        this.activePlaylist.movies?.splice(index, 1);
        this.userService.updateUser(this.user).then(() => {
          this.toastService.success('Movie deleted from playlist!');
          this.getMoviesFromPlaylist();
        });
      }
    })
  }
  deleteSeriesFromPlaylist(series: TVSeries) {
    this.activePlaylist.series?.forEach((value, index) => {
      if (value == series.id){
        this.activePlaylist.series?.splice(index, 1);
        this.userService.updateUser(this.user).then(() => {
          this.toastService.success('Series deleted from playlist!');
          this.getSeriesFromPlaylist();
        });
      }
    })
  }
  deletePlaylist(playlist: Playlist) {
    this.user.playlists?.forEach((value, index) => {
      if (value.id == playlist.id){
        this.user.playlists?.splice(index, 1);
        this.userService.updateUser(this.user).then(() => {
          this.toastService.success('Playlist deleted!');
          this.router.navigate(['profile']).then(r => console.log(r));
        });
      }
    })
  }
  getTVSeriesPosterImage(posterPath: string): string{
    return 'https://image.tmdb.org/t/p/w500' + posterPath;
  }
  gotoMovie(movie: Movie) {
    this.router.navigate(['movie', movie.id]).then(r => console.log(r));
  }
  gotoSeries(series: TVSeries) {
    this.router.navigate(['series', series.id]).then(r => console.log(r));
  }
}
