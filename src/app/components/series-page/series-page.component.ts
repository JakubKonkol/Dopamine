import {Component, OnInit} from '@angular/core';
import {TVSeries} from "../../model/TVSeries";
import {ActivatedRoute} from "@angular/router";
import {TVSeriesService} from "../../service/TVSeriesService";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.css']
})
export class SeriesPageComponent implements OnInit{
  tvSerieID!: number;
  serie!: TVSeries;
  constructor(
    private route: ActivatedRoute,
    private tvSeriesService: TVSeriesService,
    private toast: HotToastService
  ) {}
  async ngOnInit(): Promise<void> {
    this.tvSerieID = this.route.snapshot.params['id'];
    try{
      this.serie = await this.tvSeriesService.getSeriesById(this.tvSerieID);
    } catch(error){
      console.error('Error fetching movie data:', error);
    }

    console.log(this.serie)
  }
  getPosterImage(): string{
    return "https://image.tmdb.org/t/p/w500" + this.serie.poster_path;
  }
  roundRating(rating: number): number{
    return Math.round(rating * 10) / 10;
  }
  formatDateToLocale(date: string): string{
    return new Date(date).toLocaleDateString();
  }

}
