import {Injectable} from "@angular/core";
import tmdb from "../api/tmdb";
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  async searchByQuery(query: string): Promise<any>{
    try{
      const response = await tmdb.get('/search/multi', {
        params: {
          query: query,
          include_adult: false,
          language: 'en-US',
          page: 1,
        }
      })
      if (response.status == 200) {
        return response.data
      }
    }catch (error) {
      console.error('Error fetching movies:', error);
    }
    return Promise.reject('Error fetching movies');
  }
}
