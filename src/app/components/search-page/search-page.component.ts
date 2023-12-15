import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../service/MovieService";
import {Movie} from "../../model/Movie";
import {Subscription} from "rxjs";
import {SearchService} from "../../service/SearchService";
type TPerson = {
  id: number,
  name: string,
  profile_path: string,
}
type TMovie = {
  id: number,
  title: string,
  genre_uds: number[],
  poster_path: string,
}
type TTVSeries = {
  id: number,
  name: string,
  genre_ids: number[],
  poster_path: string,
}
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy{

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private router: Router,
              private searchEngineService: SearchService
  ){ }
  foundMovies: Movie[] = []
  shouldRenderData: boolean = true;
  query: string = "";
  routeSub: Subscription = new Subscription();
  movies: TMovie[] = [];
  tvSeries: TTVSeries[] = [];
  persons: TPerson[] = [];
  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(async params => {
      this.shouldRenderData = false;
      this.query = params['query'];
      this.movieService.searchMovie(this.query).then(
        (movies) => {
          this.shouldRenderData = false;
          this.foundMovies = movies;
        }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.shouldRenderData = true;
      })
    })

  }
  searchMulti(query: string): void{
    this.movies = [];
    this.tvSeries = [];
    this.persons = [];
    this.searchEngineService.searchByQuery('spider').then(
      (response) => {
        this.aggregateSearchResults(response.results)
      })
  }
  aggregateSearchResults(res: any[]): void{
    res.forEach((item) => {
      if (item.media_type == 'movie') {
        let movie: TMovie = {
          id: item.id,
          title: item.title,
          genre_uds: item.genre_ids,
          poster_path: item.poster_path,
        }
        this.movies.push(movie);
      }
      else if (item.media_type == 'tv') {
        let tvSeries: TTVSeries = {
          id: item.id,
          name: item.name,
          genre_ids: item.genre_ids,
          poster_path: item.poster_path,
        }
        this.tvSeries.push(tvSeries);
      }
      else if (item.media_type == 'person') {
        let person: TPerson = {
          id: item.id,
          name: item.name,
          profile_path: item.profile_path,
        }
        this.persons.push(person);
      }
    })
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); //memory efficient XD
  }

  gotoMovie(movie: Movie) {
    this.router.navigate(['/movie', movie.id]).then();

  }
}
