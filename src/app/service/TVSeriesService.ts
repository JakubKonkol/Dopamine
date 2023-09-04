import {Injectable} from "@angular/core";
import {ISeries} from "../model/ISeries";
import tmdb from "../api/tmdb";
import {TVSeries} from "../model/TVSeries";

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
  async getSeriesById(id: number): Promise<TVSeries>{
    let series: TVSeries = {} as TVSeries
    try{
      const response = await tmdb.get(`tv/${id}`);
      series = response.data;
    }catch (error) {
      console.error('Error fetching series:', error);
    }
    return series;
  }

}
