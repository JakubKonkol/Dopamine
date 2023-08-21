import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../../../service/MovieService";
import {Movie} from "../../../model/Movie";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../../tools/toastConfig";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{

  constructor(private route: ActivatedRoute, private movieService: MovieService, private toast: HotToastService){ }
  foundMovies: Movie[] = []
  shouldRenderData: boolean = false;
  async ngOnInit(): Promise<void> {
      this.toast.loading('Searching for movies...', toastConfig)
      let query = this.route.snapshot.params['id'];
      this.foundMovies = this.movieService.searchMovie(query);
      setTimeout(() => {
        this.shouldRenderData = true;
      }, 1000)
      console.log(this.foundMovies)

  }

}
