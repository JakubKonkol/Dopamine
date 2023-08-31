import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../service/MovieService";
import {Movie} from "../../model/Movie";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../tools/toastConfig";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy{

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private toast: HotToastService,
              private router: Router,
  ){ }
  foundMovies: Movie[] = []
  shouldRenderData: boolean = true;
  query: string = "";
  routeSub: Subscription = new Subscription();
  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.query = params['query'];
      this.foundMovies = this.movieService.searchMovie(this.query);
    })

  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); //memory efficient XD
  }
    gotoMovie(id: number) {
        this.router.navigate(['/movie', id]).then();
    }
}
