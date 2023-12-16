import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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

  constructor(
              private router: Router,
              private searchEngineService: SearchService
  ){ }
  shouldRenderData: boolean = true;
  query: string = "";
  movies: TMovie[] = [];
  tvSeries: TTVSeries[] = [];
  persons: TPerson[] = [];
  results: any[] = [];
  selectedType: string = 'all';
  async ngOnInit(): Promise<void> {

  }
  searchMulti(query: string): void{
    this.shouldRenderData = false;
    this.movies = [];
    this.tvSeries = [];
    this.persons = [];
    this.searchEngineService.searchByQuery(query).then(
      (response) => {
        this.aggregateSearchResults(response.results)
      }).finally(
      () => {
        this.shouldRenderData = true;
      }
    )
  }
  aggregateSearchResults(res: any[]): void{
    this.movies = res
      .filter((item) => item.media_type === 'movie')
      .map((item) => ({
        id: item.id,
        title: item.title,
        genre_uds: item.genre_ids,
        poster_path: item.poster_path,
      }));

    this.tvSeries = res
      .filter((item) => item.media_type === 'tv')
      .map((item) => ({
        id: item.id,
        name: item.name,
        genre_ids: item.genre_ids,
        poster_path: item.poster_path,
      }));

    this.persons = res
      .filter((item) => item.media_type === 'person')
      .map((item) => ({
        id: item.id,
        name: item.name,
        profile_path: item.profile_path,
      }));
      if(this.selectedType === 'all') {
        this.results = res;
      }else if(this.selectedType === 'movie'){
        this.results = this.movies;
      }
      else if(this.selectedType === 'tv'){
        this.results = this.tvSeries;
      }
      else if(this.selectedType === 'people'){
        this.results = this.persons;
      }
  }
  ngOnDestroy(): void {

  }
  getPosterURL(posterPath: string): string{
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  }

  gotoMovie(id: number) {
    this.router.navigate(['/movie', id]).then();
  }
  gotoTVSeries(id: number) {
    this.router.navigate(['/tv', id]).then();
  }

  goto(item: any) {
    if (item.media_type === 'movie') {
      this.gotoMovie(item.id);
    } else if (item.media_type === 'tv') {
      this.gotoTVSeries(item.id);
    }
  }
}
