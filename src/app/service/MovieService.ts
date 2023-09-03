import {Injectable} from "@angular/core";
import tmdb from "../api/tmdb";
import {Movie} from "../model/Movie";
import {Image} from "../model/Image";
import {CastMember} from "../model/CastMember";
import {WatchProvider} from "../model/WatchProvider";
import {catchError} from "rxjs";
@Injectable(
  {
    providedIn: 'root'
  }
)
export class MovieService{

  async getPopularMovies(): Promise<Movie[]>{
    let movies: Movie[] = [];
    try{
      const response = await tmdb.get('/movie/popular');
      for (const item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }catch (error) {
      console.error('Error fetching movies:', error);
    }
    return movies;
  }
  async getMovieById(id: number): Promise<Movie> {
    try {
      const response = await tmdb.get('/movie/' + id);
      return new Movie(
        response.data.adult,
        response.data.backdrop_path,
        response.data.belongs_to_collection,
        response.data.budget,
        response.data.genres,
        response.data.homepage,
        response.data.id,
        response.data.imdb_id,
        response.data.original_language,
        response.data.original_title,
        response.data.overview,
        response.data.popularity,
        response.data.poster_path,
        response.data.production_companies,
        response.data.production_countries,
        response.data.release_date,
        response.data.revenue,
        response.data.runtime,
        response.data.spoken_languages,
        response.data.status,
        response.data.tagline,
        response.data.title,
        response.data.video,
        response.data.vote_average,
        response.data.vote_count
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getTopRatedMovies(): Promise<Movie[]>{
    let movies: Movie[] = [];
    try{
      const response = await tmdb.get('/movie/top_rated');
      for (const item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }catch (error) {
      console.error('Error fetching movies:', error);
    }
    return movies;
  }
  async getUpcomingMovies(): Promise<Movie[]>{
    let movies: Movie[] = [];
    try{
      const response = await tmdb.get('/movie/upcoming');
      for (const item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }catch (error) {
      console.error('Error fetching movies:', error);
    }
    return movies;
  }
  async searchMovie(query: string): Promise<Movie[]>{
    let movies: Movie[] = [];
    try{
      const response = await tmdb.get('/search/movie', {
        params: {
          query: query,
          include_adult: false,
          language: 'en-US',
          page: 1,
        }
      });
      for (const item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }catch (error) {
      console.error('Error fetching movies:', error);
    }
    return movies;
  }
  async getSimilarMovies(id: number): Promise<Movie[]>{
    let movies: Movie[] = [];
    try{
      const response = await tmdb.get('/movie/' + id + '/similar');
      for (const item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }catch (error) {
      console.error('Error fetching similar movies:', error);
    }
    return movies;
  }
  async getMovieImages(id: number): Promise<Image[]> {
    let images: Image[] = [];

    try {
      const response = await tmdb.get('/movie/' + id + '/images');
      for (const item in response.data.backdrops) {
        images.push(response.data.backdrops[item]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }

    return images;
  }
  async getTrendingMovies(): Promise<Movie[]>{
    let movies: Movie[] = [];
    try{
      const response = await tmdb.get('/trending/movie/week');
      for (const item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }catch (error) {
      console.error('Error fetching images:', error);
    }
    return movies;
  }
  async getMovieCast(id: number): Promise<CastMember[]>{
    let cast: CastMember[] = [];
    try{
      const response = await tmdb.get('/movie/' + id + '/credits');
      for (const item in response.data.cast) {
        cast.push(response.data.cast[item]);
      }
    }
    catch (error) {
      throw new Error('Error fetching cast:' + error)
    }
    return cast;
  }
  async getWatchProviders(movieID: number, locale?: string): Promise<WatchProvider[]> {
    let watchProviders: WatchProvider[] = [];
    let REGION: string = 'PL';
    if(locale){
      REGION = locale;
    }
    try {
      const response = await tmdb.get('/movie/' + movieID + '/watch/providers');
      if (response.data.results && response.data.results[REGION] && response.data.results[REGION].flatrate) {
        for (const item in response.data.results[REGION].flatrate) {
          watchProviders.push(response.data.results[REGION].flatrate[item]);
        }
      }else {
        console.error('This movie is not available on any streaming platform in your country');
      }
    }catch (error) {
      throw new Error('Error fetching watch providers: ' + error);
    }
    return watchProviders;
  }




}
