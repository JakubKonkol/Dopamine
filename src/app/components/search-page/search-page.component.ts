import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../service/MovieService";
import {Movie} from "../../model/Movie";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../tools/toastConfig";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{

  constructor(private route: ActivatedRoute, private movieService: MovieService, private toast: HotToastService, private router: Router){ }
  foundMovies: Movie[] = []
  shouldRenderData: boolean = true;
  query: string = "";
  async ngOnInit(): Promise<void> {
      this.query = this.route.snapshot.params['query'];
      this.foundMovies = this.movieService.searchMovie(this.query);
      console.log(this.foundMovies)
      console.log(this.query)

  }

    gotoMovie(id: number) {
        this.router.navigate(['/movie', id]).then();
    }
}
