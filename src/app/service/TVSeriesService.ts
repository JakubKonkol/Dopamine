import {Injectable} from "@angular/core";
import {ISeries} from "../model/ISeries";
import tmdb from "../api/tmdb";

@Injectable({
  providedIn: 'root'
})
export class TVSeriesService{
  async getTrendingTVSeries(): Promise<ISeries[]>{
    let series: ISeries[] = [];
    try{
      const response = await tmdb.get('trending/tv/day');
      for (const item in response.data.results) {
        series.push(response.data.results[item])
      }
    }catch (error) {
      console.error('Error fetching series:', error);
    }
    return series;
  }

}
