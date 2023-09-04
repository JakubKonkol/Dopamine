import {Injectable} from "@angular/core";
import {ISeries} from "../model/ISeries";
import tmdb from "../api/tmdb";
import {TVSeries} from "../model/TVSeries";
import {CastMember} from "../model/helpers/CastMember";
import {WatchProvider} from "../model/helpers/WatchProvider";

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
  async getSeriesCast(id: number): Promise<CastMember[]>{
    let cast: CastMember[] = [];
    try{
      const response = await tmdb.get(`tv/${id}/credits`);
      for (const item in response.data.cast) {
        cast.push(response.data.cast[item])
      }
    }catch (error) {
      console.error('Error fetching series cast:', error);
    }
    return cast;
  }
  async getWatchProviders(id: number, locale?: string): Promise<WatchProvider[]>{
    let providers: WatchProvider[] = [];
    try{
      const response = await tmdb.get(`tv/${id}/watch/providers`);
      if (locale){
        providers = response.data.results[locale].flatrate;
      } else {
        providers = response.data.results.PL.flatrate;
      }
    }catch (error) {
      console.error('Error fetching series watch providers:', error);
    }
    return providers;

  }

}
