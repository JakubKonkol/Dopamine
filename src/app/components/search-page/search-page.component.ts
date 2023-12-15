import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../../service/MovieService";
import {Movie} from "../../model/Movie";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy{

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
  ){ }
  foundMovies: Movie[] = []
  shouldRenderData: boolean = true;
  query: string = "";
  routeSub: Subscription = new Subscription();
  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(async params => {
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
  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); //memory efficient XD
  }
}
