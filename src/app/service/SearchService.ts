import {Injectable} from "@angular/core";
import tmdb from "../api/tmdb";
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  async searchByQuery(query: string, page?: number): Promise<any>{
    try{
      if(page == undefined){
        page = 1;
      }
      const response = await tmdb.get('/search/multi', {
        params: {
          query: query,
          include_adult: false,
          language: 'en-US',
          page: page,
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
