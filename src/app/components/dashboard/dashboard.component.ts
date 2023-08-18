import {Component, OnInit} from '@angular/core';
import {Movie} from "../../../model/Movie";
import {MovieService} from "../../../service/MovieService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  searchField: string ='';
  constructor(private movieService: MovieService) {
  }
  ngOnInit(): void {
    this.popularMovies = this.movieService.getPopularMovies();
    // this.topRatedMovies = this.movieService.getTopRatedMovies();
    // this.upcomingMovies = this.movieService.getUpcomingMovies();
  }
}
