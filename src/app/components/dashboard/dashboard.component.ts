import {Component, OnInit} from '@angular/core';
import {Movie} from "../../model/Movie";
import {MovieService} from "../../service/MovieService";
import {Router} from "@angular/router";
import {Person} from "../../model/Person";
import {PersonService} from "../../service/PersonService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  popularPersons: Person[] = [];
  constructor(
      private movieService: MovieService,
      private router: Router,
      private personService: PersonService
  ){}
  ngOnInit(): void {
    this.popularMovies = this.movieService.getPopularMovies();
    this.topRatedMovies = this.movieService.getTopRatedMovies();
    this.upcomingMovies = this.movieService.getUpcomingMovies();
    this.popularPersons = this.personService.getPopularPersons();
  }


  gotoMovie(id: number) {
    this.router.navigate(['movie', id]).then();
  }
}
